"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import AdminSidebar from "@/components/admin-sidebar"
import AdminHeader from "@/components/admin-header"
import AdminContent from "@/components/admin-content"
import AnnouncementManagement from "@/components/admin/announcement-management"
import NewsManagement from "@/components/admin/news-management"
import EventsManagement from "@/components/admin/events-management"
import GalleryManagement from "@/components/admin/gallery-management"
import VideoManagement from "@/components/admin/video-management"
import DocumentsManagement from "@/components/admin/documents-management"
import MapsManagement from "@/components/admin/maps-management"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("[v0] Checking authentication status")
        const supabase = createClient()

        if (!supabase) {
          console.error("[v0] Failed to initialize Supabase client")
          router.push("/login")
          return
        }

        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error) {
          console.error("[v0] Auth check error:", error)
          router.push("/login")
          return
        }

        if (user) {
          console.log("[v0] User authenticated:", user.email)
          setIsAuthenticated(true)
        } else {
          console.log("[v0] No user found, redirecting to login")
          router.push("/login")
        }
      } catch (error) {
        console.error("[v0] Error checking auth:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      console.log("[v0] Logging out from admin dashboard")
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push("/login")
    } catch (error) {
      console.error("[v0] Error during logout:", error)
      // Force redirect even if logout fails
      router.push("/login")
    }
  }

  const renderActiveContent = () => {
    switch (activeSection) {
      case "announcements":
        return <AnnouncementManagement />
      case "news":
        return <NewsManagement />
      case "activities":
        return <EventsManagement />
      case "gallery":
        return <GalleryManagement />
      case "videos":
        return <VideoManagement />
      case "resources":
        return <DocumentsManagement />
      case "maps":
        return <MapsManagement />
      default:
        return <AdminContent />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-950 mb-4"></i>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} onLogout={handleLogout} />
        <div className="flex-1 overflow-hidden">{renderActiveContent()}</div>
      </div>
    </div>
  )
}
