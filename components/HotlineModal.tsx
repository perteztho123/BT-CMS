"use client"

import React from "react"
import { X, Phone, Users, Stethoscope, Shield } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface HotlineModalProps {
  isOpen: boolean
  onClose: () => void
}

const HotlineModal: React.FC<HotlineModalProps> = ({ isOpen, onClose }) => {
  const [hotlines, setHotlines] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (isOpen) {
      fetchHotlines()
    }
  }, [isOpen])

  const fetchHotlines = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("emergency_hotlines")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true })

      if (error && !error.message.includes('relation "emergency_hotlines" does not exist')) {
        throw error
      }

      if (data && data.length > 0) {
        setHotlines(
          data.map((hotline) => ({
            icon: Phone,
            name: hotline.contact_name,
            number: hotline.phone_number,
            department: hotline.department,
            description: hotline.description,
            logo: hotline.logo,
            color: hotline.is_primary ? "bg-red-50" : "bg-blue-50",
            iconColor: hotline.is_primary ? "text-red-600" : "text-blue-600",
          })),
        )
      } else {
        // Fallback to default hotlines
        setHotlines([
          {
            icon: Shield,
            name: "MDRRMO",
            number: "911 / (052) 234-5678",
            color: "bg-red-50",
            iconColor: "text-red-600",
          },
          {
            icon: Users,
            name: "Office of the Mayor",
            number: "(052) 123-4567",
            color: "bg-blue-50",
            iconColor: "text-blue-600",
          },
          {
            icon: Stethoscope,
            name: "Medical/MHO",
            number: "(052) 345-6789",
            color: "bg-blue-50",
            iconColor: "text-blue-600",
          },
        ])
      }
    } catch (error) {
      console.error("Error fetching hotlines:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center transition-all duration-300 px-4 pt-20">
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-lg w-full animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl transition-colors"
        >
          <X size={24} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Phone className="text-blue-600" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-blue-950">Emergency Hotlines</h3>
        </div>

        {/* Hotline List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading emergency hotlines...</p>
          </div>
        ) : (
          <div className="space-y-3 text-gray-800 text-sm">
            {hotlines.map((hotline, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${hotline.color} rounded-lg p-3 hover:shadow-md transition duration-300`}
              >
                {hotline.logo ? (
                  <img src={hotline.logo || "/placeholder.svg"} alt={hotline.name} className="w-6 h-6 mt-1 rounded" />
                ) : (
                  <hotline.icon className={`${hotline.iconColor} w-6 h-6 mt-1`} />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{hotline.name}:</p>
                  {hotline.department && <p className="text-xs text-gray-500">{hotline.department}</p>}
                  <div className="flex flex-wrap gap-2">
                    {hotline.number.split(" / ").map((num: string, numIndex: number) => (
                      <a
                        key={numIndex}
                        href={`tel:${num.replace(/[^\d]/g, "")}`}
                        className="text-yellow-600 hover:text-yellow-700 hover:underline font-medium transition-colors"
                      >
                        {num}
                      </a>
                    ))}
                  </div>
                  {hotline.description && <p className="text-xs text-gray-600 mt-1">{hotline.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> For life-threatening emergencies, call <strong>911</strong> immediately. Keep these
            numbers handy for quick access during emergencies.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HotlineModal
