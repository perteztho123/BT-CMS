"use client"

import { PreparednessSidebar } from "@/components/preparedness-sidebar"
import { useState } from "react"
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const upcomingTrainings = [
  {
    id: 1,
    title: "Basic First Aid Training",
    date: "2024-02-15",
    time: "09:00 - 17:00",
    location: "Municipal Hall Conference Room",
    capacity: 30,
    registered: 18,
    type: "Medical",
    description: "Learn essential first aid skills for emergency situations",
  },
  {
    id: 2,
    title: "Community Emergency Response Team (CERT)",
    date: "2024-02-22",
    time: "08:00 - 18:00",
    location: "Barangay San Miguel Covered Court",
    capacity: 50,
    registered: 35,
    type: "Response",
    description: "Comprehensive training for community emergency responders",
  },
  {
    id: 3,
    title: "Earthquake Drill Coordination",
    date: "2024-03-01",
    time: "14:00 - 16:00",
    location: "All Public Schools",
    capacity: 200,
    registered: 145,
    type: "Drill",
    description: "Training for teachers and staff on earthquake drill procedures",
  },
  {
    id: 4,
    title: "Fire Safety and Prevention",
    date: "2024-03-08",
    time: "10:00 - 15:00",
    location: "Fire Station Training Ground",
    capacity: 40,
    registered: 22,
    type: "Prevention",
    description: "Fire safety awareness and prevention techniques",
  },
]

const pastEvents = [
  {
    id: 1,
    title: "Flood Response Training",
    date: "2024-01-20",
    participants: 45,
    type: "Response",
    summary: "Successful training on flood response procedures with hands-on rescue simulations",
    photos: 12,
    report: "flood-response-jan2024.pdf",
  },
  {
    id: 2,
    title: "Typhoon Preparedness Workshop",
    date: "2024-01-10",
    participants: 78,
    type: "Preparedness",
    summary: "Community workshop covering typhoon preparation and family emergency planning",
    photos: 25,
    report: "typhoon-prep-jan2024.pdf",
  },
  {
    id: 3,
    title: "Search and Rescue Basic Course",
    date: "2023-12-15",
    participants: 32,
    type: "Response",
    summary: "Intensive 3-day course on basic search and rescue techniques",
    photos: 18,
    report: "sar-basic-dec2023.pdf",
  },
]

export default function TrainingsPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Medical":
        return "bg-red-100 text-red-800"
      case "Response":
        return "bg-blue-100 text-blue-800"
      case "Prevention":
        return "bg-green-100 text-green-800"
      case "Drill":
        return "bg-yellow-100 text-yellow-800"
      case "Preparedness":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAvailabilityColor = (registered: number, capacity: number) => {
    const percentage = (registered / capacity) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 70) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <PreparednessSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Trainings & Drills</h1>

              {/* Upcoming Trainings */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Upcoming Trainings</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium px-3">
                      {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {upcomingTrainings.map((training) => (
                    <Card key={training.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge className={getTypeColor(training.type)}>{training.type}</Badge>
                          <span
                            className={`text-sm font-medium ${getAvailabilityColor(training.registered, training.capacity)}`}
                          >
                            {training.registered}/{training.capacity} registered
                          </span>
                        </div>
                        <CardTitle className="text-xl">{training.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm">{training.description}</p>

                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-mdrrmo-primary" />
                            {new Date(training.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-mdrrmo-primary" />
                            {training.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-mdrrmo-primary" />
                            {training.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-2 text-mdrrmo-primary" />
                            Capacity: {training.capacity} participants
                          </div>
                        </div>

                        <Button className="w-full" disabled={training.registered >= training.capacity}>
                          {training.registered >= training.capacity ? "Fully Booked" : "Register Now"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Past Events */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Events</h2>

                <div className="space-y-4">
                  {pastEvents.map((event) => (
                    <Card key={event.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                              <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(event.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {event.participants} participants
                              </div>
                            </div>

                            <p className="text-gray-700 mb-4">{event.summary}</p>

                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View Photos ({event.photos})
                              </Button>
                              <Button variant="outline" size="sm">
                                Download Report
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Training Information</h3>
                <div className="text-green-700 space-y-2">
                  <p className="text-sm">
                    • All trainings are free of charge and open to residents of our municipality
                  </p>
                  <p className="text-sm">• Certificates of completion will be provided for all participants</p>
                  <p className="text-sm">• Pre-registration is required due to limited capacity</p>
                  <p className="text-sm">• For group trainings or custom workshops, contact our office directly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
