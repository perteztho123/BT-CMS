"use client"

import { useState } from "react"
import { Download, X, Trees, Map, Building, Camera } from "lucide-react"

interface Video {
  id: number
  title: string
  category: string
  date: string
  duration: string
  thumbnail: string
  url: string
}

interface Album {
  id: number
  name: string
  description: string
  icon: string
  count: number
  coverImage: string
  videos: number[]
}

const albums: Album[] = [
  {
    id: 1,
    name: "DRRM Training Sessions",
    description: "Community training and workshops",
    icon: "trees",
    count: 3,
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    videos: [1, 3, 6],
  },
  {
    id: 2,
    name: "Emergency Response",
    description: "Real emergency response operations",
    icon: "map",
    count: 2,
    coverImage: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
    videos: [2, 8],
  },
  {
    id: 3,
    name: "Community Events",
    description: "Public awareness campaigns",
    icon: "building",
    count: 2,
    coverImage: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop",
    videos: [4, 7],
  },
  {
    id: 4,
    name: "Disaster Documentation",
    description: "Historical disaster events",
    icon: "camera",
    count: 1,
    coverImage: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    videos: [5],
  },
]

const videos: Video[] = [
  {
    id: 1,
    title: "Earthquake Drill Training",
    category: "Training",
    date: "2024-01-15",
    duration: "3:45",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForestCamping.mp4",
  },
  {
    id: 2,
    title: "Flood Response Operation",
    category: "Emergency",
    date: "2024-01-20",
    duration: "2:30",
    thumbnail: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  },
  {
    id: 3,
    title: "Fire Safety Workshop",
    category: "Training",
    date: "2024-01-25",
    duration: "4:12",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  },
  {
    id: 4,
    title: "Community Awareness Campaign",
    category: "Event",
    date: "2024-02-01",
    duration: "1:58",
    thumbnail: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 5,
    title: "Typhoon Aftermath Documentation",
    category: "Documentation",
    date: "2024-02-05",
    duration: "5:20",
    thumbnail: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 6,
    title: "First Aid Training",
    category: "Training",
    date: "2024-02-10",
    duration: "3:33",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
  {
    id: 7,
    title: "Disaster Preparedness Fair",
    category: "Event",
    date: "2024-02-15",
    duration: "2:45",
    thumbnail: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
  {
    id: 8,
    title: "Rescue Operation Training",
    category: "Emergency",
    date: "2024-02-20",
    duration: "4:07",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  },
]

export default function VideoGallery() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [currentAlbumId, setCurrentAlbumId] = useState<number | null>(null)
  const [currentVideos, setCurrentVideos] = useState(videos)
  const [modalOpen, setModalOpen] = useState(false)
  const [galleryTitle, setGalleryTitle] = useState("DRRM Captured Events")
  const [galleryDescription, setGalleryDescription] = useState("A curated collection of events & activities")

  const selectAlbum = (albumId: number | null) => {
    setCurrentAlbumId(albumId)

    if (albumId === null) {
      setCurrentVideos(videos)
      setGalleryTitle("DRRM Captured Events")
      setGalleryDescription("A curated collection of events & activities")
    } else {
      const album = albums.find((a) => a.id === albumId)
      if (album) {
        setCurrentVideos(videos.filter((video) => album.videos.includes(video.id)))
        setGalleryTitle(album.name)
        setGalleryDescription(album.description)
      }
    }
  }

  const openModal = (index: number) => {
    setCurrentVideoIndex(index)
    setModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = "auto"
  }

  const downloadVideo = () => {
    const video = currentVideos[currentVideoIndex]
    const a = document.createElement("a")
    a.href = video.url
    a.download = `${video.title.replace(/\s+/g, "_")}.mp4`
    a.target = "_blank"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "trees":
        return <Trees className="w-4 h-4 text-yellow-500" />
      case "map":
        return <Map className="w-4 h-4 text-yellow-500" />
      case "building":
        return <Building className="w-4 h-4 text-yellow-500" />
      case "camera":
        return <Camera className="w-4 h-4 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-950 to-blue-900 min-h-screen">
      <div className="flex h-screen">
        {/* Video Albums Sidebar */}
        <div className="w-80 bg-blue-950 shadow-xl border-r border-yellow-500/20 overflow-y-auto">
          <div className="p-6 border-b border-yellow-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Trees className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-yellow-500">Video Albums</h2>
            </div>
            <p className="text-yellow-200 text-sm">Browse your video collections</p>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {/* All Videos Album */}
              <div
                onClick={() => selectAlbum(null)}
                className="bg-blue-900 rounded-xl p-4 cursor-pointer border border-yellow-500/20 hover:border-yellow-500/40 transition-all hover:bg-yellow-500/10 hover:translate-x-1"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                    <Trees className="w-8 h-8 text-blue-950" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-yellow-500 mb-1">All Videos</h3>
                    <p className="text-sm text-yellow-200">{videos.length} videos</p>
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
                      <p className="text-sm text-yellow-200">{album.count} videos</p>
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
              {currentVideos.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => openModal(index)}
                  className="bg-blue-900 rounded-xl shadow-lg overflow-hidden border border-yellow-500/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-yellow-500/90 rounded-full w-16 h-16 flex items-center justify-center">
                        <Trees className="w-8 h-8 text-blue-950 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-yellow-500 mb-1">{video.title}</h3>
                    <p className="text-sm text-yellow-200">
                      {video.category} • {video.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Video Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative max-w-7xl max-h-full w-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-yellow-500 text-2xl font-bold z-10 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <video
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              controls
              autoPlay
              src={currentVideos[currentVideoIndex]?.url}
            >
              Your browser does not support the video tag.
            </video>

            <div className="absolute bottom-4 right-4 flex gap-3">
              <button
                onClick={downloadVideo}
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-6 py-3 rounded-full font-medium shadow-lg flex items-center gap-2 transition-all hover:scale-110"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>

            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded-full">
              <span className="font-medium">{currentVideos[currentVideoIndex]?.title}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
