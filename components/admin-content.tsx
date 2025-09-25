import * as Table from "@radix-ui/react-table"

export default function AdminContent() {
  return (
    <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-blue-900 p-3 sm:p-4 lg:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-xl p-4 sm:p-6 text-white card-hover">
          <div className="flex justify-between items-center">
            <div className="min-w-0">
              <p className="text-blue-200 text-sm sm:text-base">Total Announcements</p>
              <h3 className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">24</h3>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-bullhorn text-blue-950 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-xl p-4 sm:p-6 text-white card-hover">
          <div className="flex justify-between items-center">
            <div className="min-w-0">
              <p className="text-blue-200 text-sm sm:text-base">News Articles</p>
              <h3 className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">42</h3>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-newspaper text-blue-950 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-xl p-4 sm:p-6 text-white card-hover">
          <div className="flex justify-between items-center">
            <div className="min-w-0">
              <p className="text-blue-200 text-sm sm:text-base">Gallery Images</p>
              <h3 className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">128</h3>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-images text-blue-950 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-xl p-4 sm:p-6 text-white card-hover">
          <div className="flex justify-between items-center">
            <div className="min-w-0">
              <p className="text-blue-200 text-sm sm:text-base">Active Users</p>
              <h3 className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">156</h3>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-users text-blue-950 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-blue-950 mb-4 sm:mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <button className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 sm:p-4 flex flex-col items-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-950 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-bullhorn text-yellow-500 text-sm sm:text-base"></i>
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-950 text-center">Add Announcement</span>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 sm:p-4 flex flex-col items-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-950 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-newspaper text-yellow-500 text-sm sm:text-base"></i>
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-950 text-center">Add News</span>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 sm:p-4 flex flex-col items-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-950 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-calendar-plus text-yellow-500 text-sm sm:text-base"></i>
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-950 text-center">Add Activity</span>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 sm:p-4 flex flex-col items-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-950 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-upload text-yellow-500 text-sm sm:text-base"></i>
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-950 text-center">Upload Media</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-blue-950 mb-4 sm:mb-6">Recent Activity</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <i className="fas fa-plus text-blue-950 text-xs"></i>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-blue-950">New announcement posted</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-950 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <i className="fas fa-user text-yellow-500 text-xs"></i>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-blue-950">New user registered</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <i className="fas fa-edit text-white text-xs"></i>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-blue-950">News article updated</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Hotline Numbers Management */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-blue-950">Hotline Numbers Management</h2>
            <button className="bg-blue-950 hover:bg-blue-800 text-yellow-500 px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20 self-start sm:self-auto">
              <i className="fas fa-plus mr-2"></i>Add Hotline
            </button>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
              <Table.Root className="w-full">
                <Table.Header>
                  <Table.Row className="bg-gray-50 border-b border-gray-200">
                    <Table.ColumnHeaderCell className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                      Service
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                      Number
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                      Status
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                      Actions
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                    <Table.Cell className="px-4 py-3">
                      <div className="font-medium text-blue-950 whitespace-nowrap">MDRRMO Emergency</div>
                    </Table.Cell>
                    <Table.Cell className="px-4 py-3">
                      <div className="text-gray-600 whitespace-nowrap">911 / (052) 234-5678</div>
                    </Table.Cell>
                    <Table.Cell className="px-4 py-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                        Active
                      </span>
                    </Table.Cell>
                    <Table.Cell className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-blue-950 hover:text-blue-700 p-1 hover:bg-blue-50 rounded focus:outline-none focus:ring-2 focus:ring-blue-950/20">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded focus:outline-none focus:ring-2 focus:ring-red-500/20">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                    <Table.Cell className="px-4 py-3">
                      <div className="font-medium text-blue-950 whitespace-nowrap">Police</div>
                    </Table.Cell>
                    <Table.Cell className="px-4 py-3">
                      <div className="text-gray-600 whitespace-nowrap">117 / (052) 456-7890</div>
                    </Table.Cell>
                    <Table.Cell className="px-4 py-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                        Active
                      </span>
                    </Table.Cell>
                    <Table.Cell className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-blue-950 hover:text-blue-700 p-1 hover:bg-blue-50 rounded focus:outline-none focus:ring-2 focus:ring-blue-950/20">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded focus:outline-none focus:ring-2 focus:ring-red-500/20">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-blue-950">User Management</h2>
            <button className="bg-blue-950 hover:bg-blue-800 text-yellow-500 px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20 self-start sm:self-auto">
              <i className="fas fa-plus mr-2"></i>Add User
            </button>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
              <Table.Root className="w-full">
                <Table.Header>
                  <Table.Row className="bg-gray-50 border-b border-gray-200">
                    <Table.ColumnHeaderCell className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                      User
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                      Role
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                      Email
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                      Status
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                      Actions
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                    <Table.Cell className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-blue-950 font-bold text-xs">A</span>
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-blue-950 whitespace-nowrap">Admin User</div>
                          <div className="text-xs text-gray-500 whitespace-nowrap">Administrator</div>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="px-4 py-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs whitespace-nowrap">
                        Administrator
                      </span>
                    </Table.Cell>
                    <Table.Cell className="px-4 py-3">
                      <div className="text-gray-600 whitespace-nowrap">admin@pioduran.gov.ph</div>
                    </Table.Cell>
                    <Table.Cell className="px-4 py-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                        Active
                      </span>
                    </Table.Cell>
                    <Table.Cell className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-blue-950 hover:text-blue-700 p-1 hover:bg-blue-50 rounded focus:outline-none focus:ring-2 focus:ring-blue-950/20">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded focus:outline-none focus:ring-2 focus:ring-red-500/20">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
