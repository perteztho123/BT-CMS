export default function CalendarSection() {
  return (
    <section id="calendar" className="bg-blue-950">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">

          <h2 className="text-yellow-500">Calendar of Activities</h2>
        </div>
        <div className="bg-white rounded-xl shadow-md border-2 border-yellow-500 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-accent uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-accent uppercase tracking-wider"
                  >
                    Event
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-accent uppercase tracking-wider"
                  >
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">August 15, 2024</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Barangay-level First Aid Training</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Brgy. Hall</div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">September 5, 2024</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Municipal-wide Earthquake Drill</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Town Plaza</div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">September 20, 2024</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Flood Awareness Seminar</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Municipal Auditorium</div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">October 10, 2024</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Fire Safety Training</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Central Fire Station</div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">November 5, 2024</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Disaster Preparedness Workshop</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Municipal Hall</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
