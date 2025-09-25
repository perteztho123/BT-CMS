"use client"

import { useState } from "react"
import { Download, X, ImageIcon, Trees, Waves, Building, Sun } from "lucide-react"

interface Photo {
  id: number
  title: string
  category: string
  date: string
  url: string
}

interface Album {
  id: number
  name: string
  description: string
  icon: string
  count: number
  coverImage: string
  photos: number[]
}

const albums: Album[] = [
  {
    id: 1,
    name: "DRRM Activities",
    description: "Training sessions and workshops",
    icon: "trees",
    count: 4,
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    photos: [1, 3, 6, 7],
  },
  {
    id: 2,
    name: "Emergency Response",
    description: "Real emergency operations",
    icon: "waves",
    count: 2,
    coverImage: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop",
    photos: [2, 8],
  },
  {
    id: 3,
    name: "Community Events",
    description: "Public awareness campaigns",
    icon: "building",
    count: 1,
    coverImage: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
    photos: [4],
  },
  {
    id: 4,
    name: "Disaster Documentation",
    description: "Historical disaster events",
    icon: "sun",
    count: 1,
    coverImage: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    photos: [5],
  },
]

const photos: Photo[] = [
  {
    id: 1,
    title: "Earthquake Drill Training",
    category: "Training",
    date: "2024-01-15",
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Flood Response Team",
    category: "Emergency",
    date: "2024-01-20",
    url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Fire Safety Workshop",
    category: "Training",
    date: "2024-01-25",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Community Awareness Event",
    category: "Event",
    date: "2024-02-01",
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Typhoon Aftermath",
    category: "Documentation",
    date: "2024-02-05",
    url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "First Aid Training",
    category: "Training",
    date: "2024-02-10",
    url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
  },
  {
    id: 7,
    title: "Rescue Equipment Demo",
    category: "Training",
    date: "2024-02-15",
    url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop",
  },
  {
    id: 8,
    title: "Emergency Evacuation",
    category: "Emergency",
    date: "2024-02-20",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
  },
]

export default function PhotoGallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentAlbumId, setCurrentAlbumId] = useState<number | null>(null)
  const [currentPhotos, setCurrentPhotos] = useState(photos)
  const [modalOpen, setModalOpen] = useState(false)
  const [galleryTitle, setGalleryTitle] = useState("Document Gallery")
  const [galleryDescription, setGalleryDescription] = useState("A curated collection of events and activities")

  const selectAlbum = (albumId: number | null) => {
    setCurrentAlbumId(albumId)

    if (albumId === null) {
      setCurrentPhotos(photos)
      setGalleryTitle("Document Gallery")
      setGalleryDescription("A curated collection of events and activities")
    } else {
      const album = albums.find((a) => a.id === albumId)
      if (album) {
        setCurrentPhotos(photos.filter((photo) => album.photos.includes(photo.id)))
        setGalleryTitle(album.name)
        setGalleryDescription(album.description)
      }
    }
  }

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = "auto"
  }

  const downloadImage = () => {
    const photo = currentPhotos[currentImageIndex]
    const a = document.createElement("a")
    a.href = photo.url
    a.download = `${photo.title.replace(/\s+/g, "_")}.jpg`
    a.target = "_blank"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "trees":
        return <Trees className="w-4 h-4 text-yellow-500" />
      case "waves":
        return <Waves className="w-4 h-4 text-yellow-500" />
      case "building":
        return <Building className="w-4 h-4 text-yellow-500" />
      case "sun":
        return <Sun className="w-4 h-4 text-yellow-500" />
      default:
        return <ImageIcon className="w-4 h-4 text-yellow-500" />
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-950 to-blue-900 min-h-screen">
      <div className="flex h-screen">
        {/* Photo Albums Sidebar */}
        <div className="w-80 bg-blue-950 shadow-xl border-r border-yellow-500/20 overflow-y-auto">
          <div className="p-6 border-b border-yellow-500/20">
            <div className="flex items-center gap-3 mb-4">
              <ImageIcon className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-yellow-500">Through the lens</h2>
            </div>
            <p className="text-yellow-200 text-sm">DRRMO collections</p>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {/* All Photos Album */}
              <div
                onClick={() => selectAlbum(null)}
                className="bg-blue-900 rounded-xl p-4 cursor-pointer border border-yellow-500/20 hover:border-yellow-500/40 transition-all hover:bg-yellow-500/10 hover:translate-x-1"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-blue-950" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-yellow-500 mb-1">All Photos</h3>
                    <p className="text-sm text-yellow-200">{photos.length} photos</p>
                  </div>
                </div>
                <p className="text-xs text-yellow-300">Complete collection</p>
              </div>

              {/* Individual Albums */}
              {albums.map((album) => (
                <div
                  key={album.id}
                  onClick={() => selectAlbum(album.id)}
                  className="bg-blue-900 rounded-xl p-4 cursor-pointer border border-yellow-500/20 hover:border-yellow-500/40 transition-all hover:bg-yellow-500/10 hover:translate-x-1"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img
                        src={album.coverImage || "/placeholder.svg"}
                        alt={album.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getIcon(album.icon)}
                        <h3 className="font-semibold text-yellow-500">{album.name}</h3>
                      </div>
                      <p className="text-sm text-yellow-200">{album.count} photos</p>
                    </div>
                  </div>
                  <p className="text-xs text-yellow-300">{album.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Gallery */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-yellow-500 mb-2">{galleryTitle}</h1>
              <p className="text-yellow-200">{galleryDescription}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => openModal(index)}
                  className="bg-blue-900 rounded-xl shadow-lg overflow-hidden border border-yellow-500/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={photo.url || "/placeholder.svg"}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-yellow-500 mb-1">{photo.title}</h3>
                    <p className="text-sm text-yellow-200">
                      {photo.category} • {photo.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-yellow-500 text-2xl font-bold z-10 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <img
              src={currentPhotos[currentImageIndex]?.url || "/placeholder.svg"}
              alt={currentPhotos[currentImageIndex]?.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />

            <div className="absolute bottom-4 right-4 flex gap-3">
              <button
                onClick={downloadImage}
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-6 py-3 rounded-full font-medium shadow-lg flex items-center gap-2 transition-all hover:scale-110"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>

            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded-full">
              <span className="font-medium">{currentPhotos[currentImageIndex]?.title}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
