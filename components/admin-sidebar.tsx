"use client"

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  onSectionChange: (section: string) => void
}

export default function AdminSidebar({ isOpen, onClose, activeSection, onSectionChange }: AdminSidebarProps) {
  const menuItems = [
    { id: "dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard", active: true },
    { id: "analytics", icon: "fas fa-chart-line", label: "Analytics" },
    { id: "announcements", icon: "fas fa-bullhorn", label: "Announcements" },
    { id: "news", icon: "fas fa-newspaper", label: "News & Updates" },
    { id: "activities", icon: "fas fa-calendar-alt", label: "Activities" },
    { id: "gallery", icon: "fas fa-images", label: "Gallery" },
    { id: "videos", icon: "fas fa-video", label: "Videos" },
    { id: "resources", icon: "fas fa-file-alt", label: "Resources" },
    { id: "maps", icon: "fas fa-map-marked-alt", label: "Maps" },
    { id: "hotlines", icon: "fas fa-phone-alt", label: "Hotline Numbers" },
    { id: "users", icon: "fas fa-users", label: "User Management" },
    { id: "settings", icon: "fas fa-cog", label: "General Settings" },
  ]

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 sm:w-80 lg:w-64 bg-blue-950 text-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto`}
        aria-label="Admin Navigation"
      >
        <div className="p-4 sm:p-6 border-b border-blue-800">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <i className="fas fa-shield-alt text-blue-950 text-lg sm:text-xl"></i>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold truncate">MDRRMO Admin</h1>
              <p className="text-blue-200 text-xs sm:text-sm truncate">Pio Duran, Albay</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-blue-900">
          <div className="px-4 sm:px-6 py-3 text-blue-300 text-xs uppercase font-semibold tracking-wider">Main</div>
          {menuItems.slice(0, 2).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id)
                // Auto-close sidebar on mobile after selection
                if (window.innerWidth < 1024) {
                  onClose()
                }
              }}
              className={`w-full flex items-center px-4 sm:px-6 py-3 sm:py-4 text-left transition-all duration-200 border-l-4 hover:bg-blue-800/50 focus:bg-blue-800/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${
                activeSection === item.id
                  ? "bg-blue-800 border-yellow-500 text-white shadow-lg"
                  : "border-transparent text-blue-200 hover:border-yellow-500/50"
              }`}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              <i className={`${item.icon} mr-3 sm:mr-4 text-base sm:text-lg flex-shrink-0`}></i>
              <span className="text-sm sm:text-base font-medium truncate">{item.label}</span>
            </button>
          ))}

          <div className="px-4 sm:px-6 py-3 text-blue-300 text-xs uppercase font-semibold tracking-wider mt-6">
            Content Management
          </div>
          {menuItems.slice(2, 9).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id)
                if (window.innerWidth < 1024) {
                  onClose()
                }
              }}
              className={`w-full flex items-center px-4 sm:px-6 py-3 sm:py-4 text-left transition-all duration-200 border-l-4 hover:bg-blue-800/50 focus:bg-blue-800/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${
                activeSection === item.id
                  ? "bg-blue-800 border-yellow-500 text-white shadow-lg"
                  : "border-transparent text-blue-200 hover:border-yellow-500/50"
              }`}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              <i className={`${item.icon} mr-3 sm:mr-4 text-base sm:text-lg flex-shrink-0`}></i>
              <span className="text-sm sm:text-base font-medium truncate">{item.label}</span>
            </button>
          ))}

          <div className="px-4 sm:px-6 py-3 text-blue-300 text-xs uppercase font-semibold tracking-wider mt-6">
            System
          </div>
          {menuItems.slice(9).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id)
                if (window.innerWidth < 1024) {
                  onClose()
                }
              }}
              className={`w-full flex items-center px-4 sm:px-6 py-3 sm:py-4 text-left transition-all duration-200 border-l-4 hover:bg-blue-800/50 focus:bg-blue-800/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 ${
                activeSection === item.id
                  ? "bg-blue-800 border-yellow-500 text-white shadow-lg"
                  : "border-transparent text-blue-200 hover:border-yellow-500/50"
              }`}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              <i className={`${item.icon} mr-3 sm:mr-4 text-base sm:text-lg flex-shrink-0`}></i>
              <span className="text-sm sm:text-base font-medium truncate">{item.label}</span>
            </button>
          ))}

          <div className="h-6"></div>
        </nav>
      </aside>
    </>
  )
}
