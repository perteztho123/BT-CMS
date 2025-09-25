"use client"

import { useEffect, useRef } from "react"

interface MapContainerProps {
  layers: {
    evacuationCenters: boolean
    governmentFacilities: boolean
    schools: boolean
    markets: boolean
    transportation: boolean
    hazardZones: boolean
  }
}

export default function MapContainer({ layers }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const layersRef = useRef<any>({})

  // Sample data
  const evacuationCenters = [
    { name: "Pio Duran Central School", lat: 13.029, lng: 123.444, capacity: 500 },
    { name: "Barangay Hall - Poblacion", lat: 13.0295, lng: 123.446, capacity: 300 },
    { name: "Banga Elementary School", lat: 13.0355, lng: 123.4505, capacity: 400 },
    { name: "Duran Barangay Hall", lat: 13.04, lng: 123.46, capacity: 250 },
  ]

  const governmentFacilities = [
    { name: "Municipal Hall", lat: 13.0293, lng: 123.445, type: "Main Office" },
    { name: "MDRRMO Office", lat: 13.0291, lng: 123.4455, type: "Emergency Services" },
    { name: "Health Center", lat: 13.0288, lng: 123.4445, type: "Healthcare" },
  ]

  const schools = [
    { name: "Pio Duran Central School", lat: 13.029, lng: 123.444, level: "Elementary/Secondary" },
    { name: "Banga Elementary School", lat: 13.0355, lng: 123.4505, level: "Elementary" },
    { name: "Duran Elementary School", lat: 13.04, lng: 123.46, level: "Elementary" },
  ]

  const markets = [
    { name: "Pio Duran Public Market", lat: 13.0285, lng: 123.4435, type: "Public Market" },
    { name: "Banga Market", lat: 13.035, lng: 123.45, type: "Community Market" },
  ]

  const transportation = [
    { name: "Pio Duran Bus Terminal", lat: 13.028, lng: 123.443, type: "Bus Terminal" },
    { name: "Jeepney Stop - Poblacion", lat: 13.029, lng: 123.445, type: "Jeepney Stop" },
    { name: "Tricycle Terminal", lat: 13.03, lng: 123.446, type: "Tricycle" },
  ]

  const hazardZones = [
    {
      name: "Flood Hazard Zone",
      coordinates: [
        [13.025, 123.44],
        [13.035, 123.44],
        [13.035, 123.45],
        [13.025, 123.45],
      ],
      type: "flood",
    },
    {
      name: "Landslide Hazard Zone",
      coordinates: [
        [13.03, 123.455],
        [13.035, 123.455],
        [13.035, 123.46],
        [13.03, 123.46],
      ],
      type: "landslide",
    },
  ]

  useEffect(() => {
    const initializeMap = async () => {
      try {
        console.log("[v0] Initializing map...")

        // Import Leaflet using proper ES module syntax
        const L = (await import("leaflet")).default

        // Import CSS using a different approach to avoid MIME type issues
        if (typeof document !== "undefined") {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          link.crossOrigin = "anonymous"
          document.head.appendChild(link)
        }

        // Fix for default marker icons in Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        })

        if (mapRef.current && !mapInstanceRef.current) {
          // Initialize map
          const map = L.map(mapRef.current).setView([13.0293, 123.445], 13)

          // Add tile layer
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map)

          // Custom icons
          const evacuationIcon = L.icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })

          const governmentIcon = L.icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })

          const schoolIcon = L.icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })

          const marketIcon = L.icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })

          const transportIcon = L.icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })

          // Add markers and layers
          const addEvacuationCenters = () => {
            const group = L.layerGroup()
            evacuationCenters.forEach((center) => {
              const marker = L.marker([center.lat, center.lng], { icon: evacuationIcon }).bindPopup(
                `<b>${center.name}</b><br>Evacuation Center<br>Capacity: ${center.capacity} persons`,
              )
              group.addLayer(marker)
            })
            group.addTo(map)
            layersRef.current.evacuationCenters = group
          }

          const addGovernmentFacilities = () => {
            const group = L.layerGroup()
            governmentFacilities.forEach((facility) => {
              const marker = L.marker([facility.lat, facility.lng], { icon: governmentIcon }).bindPopup(
                `<b>${facility.name}</b><br>Government Facility<br>Type: ${facility.type}`,
              )
              group.addLayer(marker)
            })
            group.addTo(map)
            layersRef.current.governmentFacilities = group
          }

          const addSchools = () => {
            const group = L.layerGroup()
            schools.forEach((school) => {
              const marker = L.marker([school.lat, school.lng], { icon: schoolIcon }).bindPopup(
                `<b>${school.name}</b><br>School<br>Level: ${school.level}`,
              )
              group.addLayer(marker)
            })
            group.addTo(map)
            layersRef.current.schools = group
          }

          const addMarkets = () => {
            const group = L.layerGroup()
            markets.forEach((market) => {
              const marker = L.marker([market.lat, market.lng], { icon: marketIcon }).bindPopup(
                `<b>${market.name}</b><br>Market<br>Type: ${market.type}`,
              )
              group.addLayer(marker)
            })
            group.addTo(map)
            layersRef.current.markets = group
          }

          const addTransportation = () => {
            const group = L.layerGroup()
            transportation.forEach((transport) => {
              const marker = L.marker([transport.lat, transport.lng], { icon: transportIcon }).bindPopup(
                `<b>${transport.name}</b><br>Transportation<br>Type: ${transport.type}`,
              )
              group.addLayer(marker)
            })
            group.addTo(map)
            layersRef.current.transportation = group
          }

          const addHazardZones = () => {
            const group = L.layerGroup()
            hazardZones.forEach((zone) => {
              const color = zone.type === "flood" ? "#ff0000" : "#ffa500"
              const polygon = L.polygon(zone.coordinates, {
                color: color,
                fillColor: color,
                fillOpacity: 0.3,
              }).bindPopup(`<b>${zone.name}</b><br>Hazard Zone<br>Type: ${zone.type}`)
              group.addLayer(polygon)
            })
            group.addTo(map)
            layersRef.current.hazardZones = group
          }

          // Add initial markers and layers
          addEvacuationCenters()
          addGovernmentFacilities()
          addSchools()
          addMarkets()
          addTransportation()
          addHazardZones()

          // Add legend
          const legend = L.control({ position: "bottomright" })

          legend.onAdd = () => {
            const div = L.DomUtil.create("div", "info legend")
            div.style.backgroundColor = "white"
            div.style.padding = "10px"
            div.style.borderRadius = "5px"
            div.style.boxShadow = "0 0 15px rgba(0,0,0,0.2)"
            div.style.fontSize = "12px"
            div.innerHTML = `
              <h4 style="margin: 0 0 5px 0; font-weight: bold;">Map Legend</h4>
              <div><span style="color: #ff0000;">■</span> Flood Zone</div>
              <div><span style="color: #ffa500;">■</span> Landslide Zone</div>
              <div><span style="color: #28a745;">●</span> Evacuation Centers</div>
              <div><span style="color: #007bff;">●</span> Government Facilities</div>
              <div><span style="color: #6f42c1;">●</span> Schools</div>
              <div><span style="color: #fd7e14;">●</span> Markets</div>
              <div><span style="color: #dc3545;">●</span> Transportation</div>
            `
            return div
          }

          legend.addTo(map)

          mapInstanceRef.current = map
          console.log("[v0] Map initialized successfully")
        }
      } catch (error) {
        console.error("[v0] Error initializing map:", error)
      }
    }

    if (typeof window !== "undefined") {
      initializeMap()
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Update layer visibility when layers prop changes
  useEffect(() => {
    if (mapInstanceRef.current && layersRef.current) {
      Object.keys(layers).forEach((layerName) => {
        const layer = layersRef.current[layerName]
        if (layer) {
          if (layers[layerName as keyof typeof layers]) {
            if (!mapInstanceRef.current.hasLayer(layer)) {
              layer.addTo(mapInstanceRef.current)
            }
          } else {
            if (mapInstanceRef.current.hasLayer(layer)) {
              mapInstanceRef.current.removeLayer(layer)
            }
          }
        }
      })
    }
  }, [layers])

  return (
    <div
      ref={mapRef}
      className="h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 border border-gray-200"
      style={{ zIndex: 1 }}
    />
  )
}
