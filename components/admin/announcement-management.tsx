"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface Announcement {
  id: number
  title: string
  category: string
  priority: string
  content: string
  image_url?: string
  status: string
  created_at: string
}

export default function AnnouncementManagement() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [currentAnnouncements, setCurrentAnnouncements] = useState<Announcement[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 5
  const supabase = createClient()

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  useEffect(() => {
    handleSearch()
  }, [searchTerm, announcements])

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase.from("announcements").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setAnnouncements(data || [])
    } catch (error) {
      console.error("Error fetching announcements:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    const filtered = announcements.filter(
      (announcement) =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setCurrentAnnouncements(filtered)
    setCurrentPage(1)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const announcementData = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      priority: formData.get("priority") as string,
      content: formData.get("content") as string,
      status: formData.get("status") as string,
      image_url: (formData.get("image_url") as string) || null,
    }

    try {
      if (editingId) {
        const { error } = await supabase.from("announcements").update(announcementData).eq("id", editingId)

        if (error) throw error
        alert("Announcement updated successfully!")
      } else {
        const { error } = await supabase.from("announcements").insert([announcementData])

        if (error) throw error
        alert("Announcement created successfully!")
      }

      resetForm()
      fetchAnnouncements()
    } catch (error) {
      console.error("Error saving announcement:", error)
      alert("Error saving announcement. Please try again.")
    }
  }

  const resetForm = () => {
    const form = document.getElementById("announcementForm") as HTMLFormElement
    form?.reset()
    setEditingId(null)
  }

  const editAnnouncement = (announcement: Announcement) => {
    const form = document.getElementById("announcementForm") as HTMLFormElement
    if (form) {
      ;(form.elements.namedItem("title") as HTMLInputElement).value =
        announcement.title(form.elements.namedItem("category") as HTMLSelectElement).value =
        announcement.category(form.elements.namedItem("priority") as HTMLSelectElement).value =
        announcement.priority(form.elements.namedItem("content") as HTMLTextAreaElement).value =
        announcement.content(form.elements.namedItem("status") as HTMLSelectElement).value =
          announcement.status
      if (announcement.image_url) {
        ;(form.elements.namedItem("image_url") as HTMLInputElement).value = announcement.image_url
      }
    }
    setEditingId(announcement.id)
  }

  const deleteAnnouncement = (id: number) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!deleteId) return

    try {
      const { error } = await supabase.from("announcements").delete().eq("id", deleteId)

      if (error) throw error

      alert("Announcement deleted successfully!")
      fetchAnnouncements()
    } catch (error) {
      console.error("Error deleting announcement:", error)
      alert("Error deleting announcement. Please try again.")
    } finally {
      setShowDeleteModal(false)
      setDeleteId(null)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedAnnouncements = currentAnnouncements.slice(startIndex, endIndex)

  if (isLoading) {
    return (
      <main className="flex-1 overflow-y-auto p-6">
        <div className="text-center py-12">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-950 mb-4"></i>
          <p className="text-gray-600">Loading announcements...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-950 rounded-full flex items-center justify-center">
            <i className="fas fa-bullhorn text-yellow-500 text-2xl"></i>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-2">Announcement Management</h1>
        <p className="text-gray-600">Create, read, update, and delete announcements</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-5 text-white">
              <h2 className="text-xl font-bold mb-1">{editingId ? "Edit Announcement" : "Create New Announcement"}</h2>
              <p className="text-blue-200 text-sm">Fill in the details below</p>
            </div>

            <div className="p-5">
              <form id="announcementForm" onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-950 focus:outline-none transition-colors"
                    placeholder="Enter announcement title"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-950 focus:outline-none transition-colors"
                  >
                    <option value="">Select category</option>
                    <option value="emergency">Emergency</option>
                    <option value="event">Event</option>
                    <option value="notice">Notice</option>
                    <option value="update">Update</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-950 focus:outline-none transition-colors"
                  >
                    <option value="">Select priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows={4}
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-950 focus:outline-none transition-colors"
                    placeholder="Enter announcement content"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    id="image_url"
                    name="image_url"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-950 focus:outline-none transition-colors"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-950 focus:outline-none transition-colors"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-950 to-blue-800 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    <i className="fas fa-save mr-2"></i>
                    {editingId ? "Update" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column - Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-5 text-blue-950">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-1">Announcements</h2>
                  <p className="text-blue-800 text-sm">Manage all announcements</p>
                </div>
                <div className="mt-3 md:mt-0">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search announcements..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                    />
                    <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="rounded-lg overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {paginatedAnnouncements.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                            <i className="fas fa-inbox text-3xl mb-2"></i>
                            <p>No announcements found</p>
                          </td>
                        </tr>
                      ) : (
                        paginatedAnnouncements.map((announcement) => (
                          <tr key={announcement.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="font-medium text-gray-900">{announcement.title}</div>
                              <div className="text-sm text-gray-500 mt-1 line-clamp-2">{announcement.content}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  announcement.category === "emergency"
                                    ? "bg-red-100 text-red-800"
                                    : announcement.category === "event"
                                      ? "bg-blue-100 text-blue-800"
                                      : announcement.category === "notice"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                }`}
                              >
                                {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                                  announcement.priority === "high"
                                    ? "bg-red-100 text-red-800"
                                    : announcement.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }`}
                              >
                                {announcement.priority}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  announcement.status === "published"
                                    ? "bg-green-100 text-green-800"
                                    : announcement.status === "draft"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {new Date(announcement.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => editAnnouncement(announcement)}
                                  className="text-blue-600 hover:text-blue-800 p-1 hover:scale-105 transition-all"
                                  title="Edit"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  onClick={() => deleteAnnouncement(announcement.id)}
                                  className="text-red-600 hover:text-red-800 p-1 hover:scale-105 transition-all"
                                  title="Delete"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {Math.min(endIndex, currentAnnouncements.length)} of {currentAnnouncements.length}{" "}
                  announcements
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={endIndex >= currentAnnouncements.length}
                    className="px-3 py-1 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900 mb-2">Delete Announcement</h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete this announcement? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
