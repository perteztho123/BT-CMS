"use client"

import type React from "react"
import { useState } from "react"
import { X, MapPin, Camera, AlertTriangle } from "lucide-react"
import { BARANGAYS, INCIDENT_TYPES } from "@/utils/constants"
import { validateRequired, validatePhone, sanitizeInput } from "@/utils/validation"
import { validateFileUpload, rateLimit } from "@/utils/security"

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

  const handleSubmit = (e: React.FormEvent) => {
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

    // Generate reference number
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
      image_url: imagePreview,
      imageFile,
    }

    onSubmit(incidentData)
    setIsUploading(false)
    // Reset form
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
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 pt-20">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-blue-900">Report an Emergency or Disaster-Related Incident</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-start">
          <AlertTriangle className="text-red-500 text-xl mr-3 mt-1" size={20} />
          <div>
            <h4 className="font-bold text-red-700 mb-1">Emergency Notice</h4>
            <p className="text-sm text-gray-700">
              Use this secure form to report emergencies, hazards, or disaster-related incidents within the Municipality
              of Pio Duran. All submissions are reviewed by MDRRMO responders.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name (Required)</label>
              <input
                type="text"
                name="reporterName"
                value={formData.reporterName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.reporterName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.reporterName && <p className="text-red-500 text-sm mt-1">{errors.reporterName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number (Required)</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.contactNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location of Incident</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-2"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={getLocation}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <MapPin className="mr-1" size={16} />
              Use My Current Location
            </button>
          </div>

          {/* Incident Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type of Incident</label>
            <select
              name="incidentType"
              value={formData.incidentType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {INCIDENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Incident Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Provide a detailed description: what happened, how many people affected, visible risks..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
            <div className="flex space-x-4">
              {["LOW", "MEDIUM", "HIGH"].map((level) => (
                <label key={level} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value={level}
                    checked={formData.urgency === level}
                    onChange={handleInputChange}
                    className={`h-5 w-5 focus:ring-2 ${
                      level === "LOW"
                        ? "text-green-500 focus:ring-green-500"
                        : level === "MEDIUM"
                          ? "text-yellow-500 focus:ring-yellow-500"
                          : "text-red-500 focus:ring-red-500"
                    }`}
                  />
                  <span className="ml-2">
                    {level} {level === "HIGH" && "(require immediate attention)"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo (Optional)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
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
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-2">
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                  <div className="flex items-center">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-md"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{imageFile?.name}</p>
                      <p className="text-xs text-gray-500">
                        {imageFile && (imageFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-xs text-green-600">✓ Ready to upload</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="text-red-600 hover:text-red-800"
                    disabled={isUploading}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Upload Error */}
            {errors.image && (
              <div className="mt-2 bg-red-50 border-l-4 border-red-500 p-4 flex items-start">
                <AlertTriangle className="text-red-500 mr-3 mt-1" size={16} />
                <p className="text-sm text-red-700">{errors.image}</p>
              </div>
            )}
          </div>

          {/* Agreement */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleInputChange}
                className={`focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded ${
                  errors.agreement ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700">
                I confirm that the information provided is accurate to the best of my knowledge.
              </label>
              {errors.agreement && <p className="text-red-500 text-sm mt-1">{errors.agreement}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pb-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-md hover:from-red-700 hover:to-red-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isUploading}
            >
              {isUploading ? "Submitting Report..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default IncidentModal
