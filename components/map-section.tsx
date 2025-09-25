"use client"

import type React from "react"
import { useState } from "react"
import dynamic from "next/dynamic"

const MapContainer = dynamic(() => import("./map-container"), {
  ssr: false,
  loading: () => (
    <div className="h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 border border-gray-200 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading interactive map...</p>
      </div>
    </div>
  ),
})

export default function MapSection() {
  // State for toggle switches
  const [layers, setLayers] = useState({
    evacuationCenters: true,
    governmentFacilities: true,
    schools: true,
    markets: true,
    transportation: true,
    hazardZones: true,
  })

  // Toggle layer visibility
  const toggleLayer = (layerName: string) => {
    setLayers((prev) => ({
      ...prev,
      [layerName]: !prev[layerName],
    }))
  }

  // Simple switch component
  const Switch = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          checked ? "bg-primary" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would search locations
    console.log("[v0] Map search functionality triggered")
  }

  return (
    <section id="map-section" className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">Interactive Community Map</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our municipality with our interactive map featuring hazard zones, evacuation centers, and emergency
            services.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12 overflow-hidden">
          <div className="lg:col-span-1">
            <div className="bg-yellow-500 rounded-xl p-6 shadow-lg sticky top-24 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Map Controls</h2>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Map Layers
                </h3>
                <div className="space-y-2">
                  <Switch
                    checked={layers.evacuationCenters}
                    onChange={() => toggleLayer("evacuationCenters")}
                    label="Evacuation Centers"
                  />
                  <Switch
                    checked={layers.governmentFacilities}
                    onChange={() => toggleLayer("governmentFacilities")}
                    label="Government Facilities"
                  />
                  <Switch checked={layers.schools} onChange={() => toggleLayer("schools")} label="Schools" />
                  <Switch checked={layers.markets} onChange={() => toggleLayer("markets")} label="Markets" />
                  <Switch
                    checked={layers.transportation}
                    onChange={() => toggleLayer("transportation")}
                    label="Transportation"
                  />
                  <Switch
                    checked={layers.hazardZones}
                    onChange={() => toggleLayer("hazardZones")}
                    label="Hazard Zones"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search Location
                </h3>
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search barangay, landmark..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button type="submit" className="absolute right-3 top-3 text-gray-400 hover:text-primary">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>


            </div>
          </div>
          <div className="lg:col-span-3">
            <MapContainer layers={layers} />
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                Interactive map showing barangay locations, hazard zones, and evacuation centers in Pio Duran, Albay
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
