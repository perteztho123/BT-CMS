"use client"

import type React from "react"
import { useState } from "react"
import { X, MapPin, Camera, AlertTriangle, Upload, Loader2 } from "lucide-react"
import { BARANGAYS, INCIDENT_TYPES } from "@/utils/constants"
import { validateRequired, validatePhone, sanitizeInput } from "@/utils/validation"
import { validateFileUpload, rateLimit } from "@/utils/security"
import { createClient } from "@/lib/supabase/client"
import * as Dialog from "@radix-ui/react-dialog"
import * as ScrollArea from "@radix-ui/react-scroll-area"

interface IncidentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
}

const IncidentModal: React.FC<IncidentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    reporterName: "",
    contactNumber: "",
    location: "",
    landmark: "",
    incidentType: "Fire",
    description: "",
    urgency: "HIGH",
    agreement: false,
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : sanitizeInput(value),
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validation = validateFileUpload(file, {
      maxSize: 5 * 1024 * 1024,
      allowedTypes: ["image/*"],
    })

    if (!validation.valid) {
      setErrors((prev) => ({ ...prev, image: validation.error || "Invalid file" }))
      return
    }

    setImageFile(file)
    setErrors((prev) => ({ ...prev, image: "" }))

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    try {
      const supabase = createClient()

      // Create unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `incident-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      // Upload to mdrrmo-images bucket
      const { data, error } = await supabase.storage.from("mdrrmo-images").upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        console.error("Upload error:", error)
        throw error
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("mdrrmo-images").getPublicUrl(fileName)

      return publicUrl
    } catch (error) {
      console.error("Error uploading image:", error)
      return null
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setErrors((prev) => ({ ...prev, image: "" }))
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setFormData((prev) => ({
          ...prev,
          landmark: `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`,
        }))
      },
      (error) => {
        let message = "Unable to get location. Please enter manually."
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Location access denied. Please enable location services."
            break
          case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable."
            break
          case error.TIMEOUT:
            message = "Location request timed out."
            break
        }
        alert(message)
      },
    )
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!validateRequired(formData.reporterName)) {
      newErrors.reporterName = "Name is required"
    }

    if (!validateRequired(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number is required"
    } else if (!validatePhone(formData.contactNumber)) {
      newErrors.contactNumber = "Please enter a valid phone number"
    }

    if (!formData.agreement) {
      newErrors.agreement = "You must agree to the terms"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Rate limiting
    if (!rateLimit("incident_report", 3, 60000)) {
      setErrors((prev) => ({ ...prev, form: "Too many reports submitted. Please wait before submitting again." }))
      return
    }

    if (!validateForm()) {
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      let imageUrl = null

      if (imageFile) {
        setUploadProgress(50)
        imageUrl = await uploadImageToSupabase(imageFile)
        if (!imageUrl) {
          setErrors((prev) => ({ ...prev, image: "Failed to upload image. Please try again." }))
          setIsUploading(false)
          return
        }
        setUploadProgress(80)
      }

      const referenceNumber = `RD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0")}`

      const incidentData = {
        reference_number: referenceNumber,
        reporter_name: formData.reporterName,
        contact_number: formData.contactNumber,
        location: formData.location,
        landmark: formData.landmark,
        incident_type: formData.incidentType,
        description: formData.description,
        urgency: formData.urgency,
        status: "pending" as const,
        image_url: imageUrl,
        imageFile: null,
      }

      setUploadProgress(100)
      await onSubmit(incidentData)

      setFormData({
        reporterName: "",
        contactNumber: "",
        location: "",
        landmark: "",
        incidentType: "Fire",
        description: "",
        urgency: "HIGH",
        agreement: false,
      })
      setImageFile(null)
      setImagePreview(null)
      setErrors({})
    } catch (error) {
      console.error("Error submitting incident:", error)
      setErrors((prev) => ({ ...prev, form: "Failed to submit incident report. Please try again." }))
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl mx-4 max-h-[90vh]">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold text-[#042189]">
              Report an Emergency or Disaster-Related Incident
            </Dialog.Title>
            <Dialog.Close className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#042189] focus:ring-offset-2 disabled:pointer-events-none">
              <X className="h-6 w-6 text-slate-400 hover:text-red-500 transition-colors" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-start rounded-r-lg">
            <AlertTriangle className="text-red-500 text-xl mr-3 mt-1" size={20} />
            <div>
              <h4 className="font-bold text-red-700 mb-1">Emergency Notice</h4>
              <p className="text-sm text-slate-700">
                Use this secure form to report emergencies, hazards, or disaster-related incidents within the
                Municipality of Pio Duran. All submissions are reviewed by MDRRMO responders.
              </p>
            </div>
          </div>

          <ScrollArea.Root className="flex-1 overflow-hidden">
            <ScrollArea.Viewport className="h-full w-full rounded">
              <div className="pr-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Your Name (Required)</label>
                      <input
                        type="text"
                        name="reporterName"
                        value={formData.reporterName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-[#042189] focus:border-[#042189] transition-colors ${
                          errors.reporterName ? "border-red-500" : "border-slate-300"
                        }`}
                      />
                      {errors.reporterName && <p className="text-red-500 text-sm mt-1">{errors.reporterName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number (Required)</label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-[#042189] focus:border-[#042189] transition-colors ${
                          errors.contactNumber ? "border-red-500" : "border-slate-300"
                        }`}
                      />
                      {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Location of Incident</label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-[#042189] focus:border-[#042189] mb-2 transition-colors"
                    >
                      <option value="">Select Barangay</option>
                      {BARANGAYS.map((barangay) => (
                        <option key={barangay} value={barangay}>
                          {barangay}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      placeholder="Nearest landmark or specific location"
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-[#042189] focus:border-[#042189] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={getLocation}
                      className="mt-2 text-sm text-[#042189] hover:text-[#fccf03] flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#042189] focus:ring-offset-2 rounded px-1"
                    >
                      <MapPin className="mr-1" size={16} />
                      Use My Current Location
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Type of Incident</label>
                    <select
                      name="incidentType"
                      value={formData.incidentType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-[#042189] focus:border-[#042189] transition-colors"
                    >
                      {INCIDENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Incident Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Provide a detailed description: what happened, how many people affected, visible risks..."
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-[#042189] focus:border-[#042189] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Urgency Level</label>
                    <div className="flex space-x-4">
                      {["LOW", "MEDIUM", "HIGH"].map((level) => (
                        <label key={level} className="inline-flex items-center">
                          <input
                            type="radio"
                            name="urgency"
                            value={level}
                            checked={formData.urgency === level}
                            onChange={handleInputChange}
                            className={`h-5 w-5 focus:ring-2 transition-colors ${
                              level === "LOW"
                                ? "text-emerald-500 focus:ring-emerald-500"
                                : level === "MEDIUM"
                                  ? "text-orange-500 focus:ring-orange-500"
                                  : "text-red-500 focus:ring-red-500"
                            }`}
                          />
                          <span className="ml-2 text-slate-700">
                            {level} {level === "HIGH" && "(require immediate attention)"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Upload Photo (Optional)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md hover:border-[#042189] transition-colors">
                      <div className="space-y-1 text-center">
                        <Camera className="mx-auto h-12 w-12 text-slate-400" />
                        <div className="flex text-sm text-slate-600 justify-center">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#042189] hover:text-[#fccf03] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#042189] focus-within:ring-offset-2 transition-colors">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageChange}
                              disabled={isUploading}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    </div>

                    {imagePreview && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between bg-slate-50 p-2 rounded-md border">
                          <div className="flex items-center">
                            <img
                              src={imagePreview || "/placeholder.svg"}
                              alt="Preview"
                              className="h-20 w-20 object-cover rounded-md"
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-slate-900">{imageFile?.name}</p>
                              <p className="text-xs text-slate-500">
                                {imageFile && (imageFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                              <p className="text-xs text-emerald-600">✓ Ready to upload</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeImage}
                            className="text-red-600 hover:text-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded p-1"
                            disabled={isUploading}
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    )}

                    {isUploading && uploadProgress > 0 && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm text-slate-600 mb-1">
                          <span>Uploading image...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-[#042189] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {errors.image && (
                      <div className="mt-2 bg-red-50 border-l-4 border-red-500 p-4 flex items-start rounded-r-lg">
                        <AlertTriangle className="text-red-500 mr-3 mt-1" size={16} />
                        <p className="text-sm text-red-700">{errors.image}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={handleInputChange}
                        className={`focus:ring-[#042189] h-4 w-4 text-[#042189] border-slate-300 rounded transition-colors ${
                          errors.agreement ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="font-medium text-slate-700">
                        I confirm that the information provided is accurate to the best of my knowledge.
                      </label>
                      {errors.agreement && <p className="text-red-500 text-sm mt-1">{errors.agreement}</p>}
                    </div>
                  </div>

                  {errors.form && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start rounded-r-lg">
                      <AlertTriangle className="text-red-500 mr-3 mt-1" size={16} />
                      <p className="text-sm text-red-700">{errors.form}</p>
                    </div>
                  )}

                  <div className="pb-4">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-md hover:from-red-700 hover:to-red-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Submitting Report...
                        </>
                      ) : (
                        <>
                          <Upload className="h-5 w-5" />
                          Submit Report
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex select-none touch-none p-0.5 bg-slate-100 transition-colors duration-[160ms] ease-out hover:bg-slate-200 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="flex-1 bg-slate-300 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default IncidentModal
