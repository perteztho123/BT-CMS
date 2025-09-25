"use client"

import { useState } from "react"

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-blue-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="bg-repeat w-full h-full"
            style={{
              backgroundImage:
                "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+CiAgPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSJub25lIi8+CiAgPHBhdGggZD0iTTAgMEg1MFY1MEgweiIgc3Ryb2tlPSIjZmNkNTMwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Official Announcements</h1>
              <p className="text-xl mb-8 text-blue-100">
                Stay informed with the latest updates, events, and important notices
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-yellow-500 text-blue-950 px-6 py-3 rounded-full font-semibold">
                  <i className="fas fa-bullhorn mr-2"></i>Latest Updates
                </div>
                <div className="bg-blue-800 px-6 py-3 rounded-full font-semibold">
                  <i className="fas fa-calendar-alt mr-2"></i>Upcoming Events
                </div>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-yellow-500 rounded-full opacity-20 absolute -top-6 -left-6"></div>
                <div className="w-48 h-48 md:w-64 md:h-64 bg-blue-950 rounded-full opacity-20 absolute -bottom-6 -right-6"></div>
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-yellow-500 flex items-center justify-center animate-pulse">
                  <i className="fas fa-megaphone text-yellow-500 text-6xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Featured Announcement Banner */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <span className="bg-yellow-500 text-blue-950 px-4 py-2 rounded-full font-bold text-sm mr-4">
                    FEATURED
                  </span>
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                    <i className="fas fa-exclamation-triangle mr-2"></i>URGENT
                  </span>
                </div>
                <div className="text-white text-sm">
                  <i className="fas fa-clock mr-2"></i>Posted: December 15, 2024 • 2:30 PM
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Emergency Weather Advisory - Tropical Storm Juanito
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Residents are advised to take necessary precautions as Tropical Storm Juanito approaches our region.
                Evacuation centers are now open and ready to accommodate affected families.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-yellow-500 text-blue-950 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors">
                  <i className="fas fa-map-marker-alt mr-2"></i>Evacuation Centers
                </button>
                <button className="bg-white text-blue-950 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                  <i className="fas fa-info-circle mr-2"></i>More Information
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Filter and Search Section */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="text-3xl font-bold text-blue-950 mb-4 md:mb-0">All Announcements</h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
                  />
                  <i className="fas fa-search absolute left-3 top-4 text-gray-400"></i>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  <option value="events">Events</option>
                  <option value="notices">Notices</option>
                  <option value="emergencies">Emergencies</option>
                </select>
              </div>
            </div>

            {/* Announcement Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Announcement 1 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-red-500 hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold mr-2">
                        <i className="fas fa-exclamation-triangle mr-1"></i>Emergency
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                        High Priority
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm">Dec 15, 2024</div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-950 mb-4">
                    Mandatory Evacuation Order for Low-Lying Areas
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Due to the approaching tropical storm, all residents in flood-prone areas are required to evacuate
                    immediately to designated evacuation centers. Transportation will be provided.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-950 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        M
                      </div>
                      <div>
                        <p className="font-semibold text-blue-950">MDRRMO Office</p>
                        <p className="text-sm text-gray-500">Official Announcement</p>
                      </div>
                    </div>
                    <button className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              </div>

              {/* Announcement 2 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-r from-yellow-500 to-yellow-400 flex items-center justify-center">
                    <i className="fas fa-calendar-alt text-blue-950 text-6xl"></i>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      <i className="fas fa-calendar mr-1"></i>Event
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Medium Priority
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm">Dec 12, 2024</div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-950 mb-4">Annual Community Christmas Festival</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Join us for our annual Christmas Festival featuring local vendors, food stalls, and entertainment.
                    The event will be held at the Municipal Plaza on December 20th from 3 PM onwards.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-blue-950 font-bold mr-3">
                        T
                      </div>
                      <div>
                        <p className="font-semibold text-blue-950">Tourism Office</p>
                        <p className="text-sm text-gray-500">Community Event</p>
                      </div>
                    </div>
                    <button className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              </div>

              {/* Announcement 3 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold mr-2">
                        <i className="fas fa-info-circle mr-1"></i>Notice
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Medium Priority
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm">Dec 10, 2024</div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-950 mb-4">New Waste Collection Schedule</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Starting January 2025, our waste collection schedule will be adjusted to better serve all barangays.
                    Please check the new schedule posted at your local barangay office.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-950 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        S
                      </div>
                      <div>
                        <p className="font-semibold text-blue-950">Sanitation Management Office</p>
                        <p className="text-sm text-gray-500">Administrative Notice</p>
                      </div>
                    </div>
                    <button className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              </div>

              {/* Announcement 4 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <i className="fas fa-play-circle text-blue-950 text-4xl mb-2"></i>
                      <p className="text-gray-600">Mayor's Monthly Address</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mr-2">
                        <i className="fas fa-video mr-1"></i>Video
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Low Priority
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm">Dec 8, 2024</div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-950 mb-4">Mayor's Monthly Address</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Watch the Mayor's latest monthly address discussing recent developments, upcoming projects, and
                    community initiatives for the coming months.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-blue-950 font-bold mr-3">
                        M
                      </div>
                      <div>
                        <p className="font-semibold text-blue-950">Mayor's Office</p>
                        <p className="text-sm text-gray-500">Official Video</p>
                      </div>
                    </div>
                    <button className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                      Watch Video
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics and Quick Info */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Total Announcements */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-bullhorn text-yellow-500 text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-blue-950 mb-2">47</h3>
              <p className="text-gray-600">Total Announcements</p>
            </div>

            {/* Active Emergencies */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-exclamation-triangle text-white text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-blue-950 mb-2">2</h3>
              <p className="text-gray-600">Active Emergencies</p>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-calendar-alt text-blue-950 text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-blue-950 mb-2">5</h3>
              <p className="text-gray-600">Upcoming Events</p>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section>
          <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl shadow-xl p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-xl text-blue-100 mb-6">
                  Subscribe to our newsletter to receive important announcements directly to your email.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="px-6 py-3 rounded-lg text-blue-950 focus:ring-2 focus:ring-yellow-500 focus:outline-none w-full sm:w-auto"
                  />
                  <button className="bg-yellow-500 text-blue-950 px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-envelope-open-text text-blue-950 text-4xl"></i>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
