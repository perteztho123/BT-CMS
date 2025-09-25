"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"

export default function GallerySection() {
  const [galleryImages, setGalleryImages] = useState([])

  // Fetch images from Cloudinary
  useEffect(() => {
    const fetchCloudinaryImages = async () => {
      try {
        // In a real implementation, you would use your Cloudinary credentials
        // For demo purposes, we'll use a sample Cloudinary account
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dedcmctqk'
        
        // Create images with portrait aspect ratio (3:4)
        const images = Array.from({ length: 15 }, (_, i) => ({
          id: i + 1,
          src: `https://res.cloudinary.com/${cloudName}/image/upload/w_300,h_400,c_fill/sample.jpg?v=${i}`,
          alt: `MDRRMO community activity ${i + 1} - disaster preparedness training and community engagement`,
          title: `Community Activity ${i + 1}`,
        }))
        
        // Duplicate images for seamless infinite scroll
        const duplicatedImages = [...images, ...images, ...images]
        setGalleryImages(duplicatedImages)
      } catch (error) {
        // Fallback to Unsplash with portrait aspect ratio
        const fallbackImages = Array.from({ length: 15 }, (_, i) => ({
          id: i + 1,
          src: `https://images.unsplash.com/photo-${1500000000000 + (i % 10)}?w=300&h=400&fit=crop&auto=format`,
          alt: `MDRRMO community activity ${i + 1} - disaster preparedness training and community engagement`,
          title: `Community Activity ${i + 1}`,
        }))
        
        // Duplicate images for seamless infinite scroll
        const duplicatedImages = [...fallbackImages, ...fallbackImages, ...fallbackImages]
        setGalleryImages(duplicatedImages)
      }
    }

    fetchCloudinaryImages()
  }, [])

  return (
    <section id="gallery" className="bg-blue-900 py-16" aria-labelledby="gallery-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 id="gallery-heading" className="section-title text-3xl md:text-4xl font-bold text-yellow-500 mb-4">
            Our Activities and Events
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Photos from our disaster preparedness activities and community events
          </p>
        </div>

        {/* Horizontal Infinite Scrolling Gallery with Portrait Images */}
        <div className="relative overflow-hidden py-8">
          <div className="animate-scroll flex whitespace-nowrap">
            {galleryImages.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="gallery-item group relative inline-block mx-3 w-60 h-80 rounded-xl overflow-hidden shadow-lg focus-within:ring-2 focus-within:ring-yellow-500 focus-within:ring-offset-2 hover:scale-105 transition-transform duration-300"
                role="img"
                aria-label={image.alt}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="300px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-sm">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Duplicate for seamless loop */}
          <div className="animate-scroll2 flex whitespace-nowrap absolute top-0 left-0">
            {galleryImages.map((image, index) => (
              <div
                key={`duplicate-${image.id}-${index}`}
                className="gallery-item group relative inline-block mx-3 w-60 h-80 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                role="img"
                aria-label={image.alt}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="300px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-sm">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          
          @keyframes scroll2 {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(0);
            }
          }
          
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          
          .animate-scroll2 {
            animation: scroll2 40s linear infinite;
          }
          
          .animate-scroll:hover,
          .animate-scroll2:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  )
}
