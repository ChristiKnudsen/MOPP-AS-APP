"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Camera,
  MessageSquare,
  Bell,
  User,
  Star,
  Phone,
  Mail,
  Battery,
  Wifi,
  Signal,
  Home,
  Briefcase,
  Settings,
  LogOut,
  Play,
  Pause,
  Square,
} from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"
import { format, parseISO } from "date-fns"

interface MobileInterfaceProps {
  language: Language
}

interface MobileShift {
  id: string
  title: string
  location: string
  address: string
  startTime: string
  endTime: string
  date: string
  status: "upcoming" | "active" | "completed" | "cancelled"
  checklist: MobileChecklistItem[]
  clientName: string
  instructions: string
  estimatedDuration: number
  actualDuration?: number
}

interface MobileChecklistItem {
  id: string
  task: string
  completed: boolean
  required: boolean
  notes?: string
  photo?: string
}

interface TimeEntry {
  id: string
  shiftId: string
  startTime: string
  endTime?: string
  breakDuration: number
  status: "active" | "paused" | "completed"
  location: string
}

interface MobileNotification {
  id: string
  title: string
  message: string
  type: "shift" | "message" | "alert" | "update"
  timestamp: string
  read: boolean
}

export function MobileInterface({ language }: MobileInterfaceProps) {
  const t = useTranslation(language)
  const [currentView, setCurrentView] = useState<
    "dashboard" | "shifts" | "checklist" | "time" | "messages" | "profile"
  >("dashboard")
  const [activeShift, setActiveShift] = useState<MobileShift | null>(null)
  const [timeEntry, setTimeEntry] = useState<TimeEntry | null>(null)
  const [selectedShift, setSelectedShift] = useState<MobileShift | null>(null)

  // Sample data
  const currentUser = {
    id: "1",
    name: "John Smith",
    role: "Senior Cleaner",
    avatar: "/placeholder-user.jpg",
    phone: "+47 123 45 678",
    email: "john.smith@company.com",
    rating: 4.8,
    completedShifts: 156,
    onTimeRate: 98,
  }

  const shifts: MobileShift[] = [
    {
      id: "1",
      title: "Morning Office Cleaning",
      location: "Downtown Office Building",
      address: "123 Business Street, Oslo",
      startTime: "08:00",
      endTime: "12:00",
      date: format(new Date(), "yyyy-MM-dd"),
      status: "upcoming",
      clientName: "ABC Corporation",
      instructions: "Focus on conference rooms and lobby area. Client has important meeting at 2 PM.",
      estimatedDuration: 240,
      checklist: [
        {
          id: "1",
          task: "Clean and vacuum lobby area",
          completed: false,
          required: true,
        },
        {
          id: "2",
          task: "Sanitize all conference rooms",
          completed: false,
          required: true,
        },
        {
          id: "3",
          task: "Empty trash bins and replace liners",
          completed: false,
          required: true,
        },
        {
          id: "4",
          task: "Clean windows in lobby",
          completed: false,
          required: false,
        },
      ],
    },
    {
      id: "2",
      title: "Restaurant Evening Clean",
      location: "Fine Dining Restaurant",
      address: "789 Gourmet Street, Oslo",
      startTime: "22:00",
      endTime: "02:00",
      date: format(new Date(), "yyyy-MM-dd"),
      status: "active",
      clientName: "Gourmet Restaurant Group",
      instructions: "Deep clean kitchen and dining areas. Pay special attention to food prep surfaces.",
      estimatedDuration: 240,
      actualDuration: 180,
      checklist: [
        {
          id: "1",
          task: "Deep clean kitchen surfaces",
          completed: true,
          required: true,
          notes: "All surfaces sanitized with approved chemicals",
        },
        {
          id: "2",
          task: "Clean dining area floors",
          completed: true,
          required: true,
        },
        {
          id: "3",
          task: "Sanitize restrooms",
          completed: false,
          required: true,
        },
      ],
    },
  ]

  const notifications: MobileNotification[] = [
    {
      id: "1",
      title: "Shift Starting Soon",
      message: "Your shift at Downtown Office Building starts in 30 minutes",
      type: "shift",
      timestamp: "2024-01-15T07:30:00Z",
      read: false,
    },
    {
      id: "2",
      title: "New Message",
      message: "Sarah Johnson: Great work on yesterday's cleaning!",
      type: "message",
      timestamp: "2024-01-15T06:45:00Z",
      read: false,
    },
    {
      id: "3",
      title: "Schedule Update",
      message: "Tomorrow's shift time has been changed to 9:00 AM",
      type: "update",
      timestamp: "2024-01-14T18:00:00Z",
      read: true,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const startShift = (shift: MobileShift) => {
    setActiveShift(shift)
    setTimeEntry({
      id: Date.now().toString(),
      shiftId: shift.id,
      startTime: new Date().toISOString(),
      breakDuration: 0,
      status: "active",
      location: shift.location,
    })
    setCurrentView("time")
  }

  const toggleChecklistItem = (shiftId: string, itemId: string) => {
    // In a real app, this would update the backend
    console.log(`Toggle checklist item ${itemId} for shift ${shiftId}`)
  }

  const unreadNotifications = notifications.filter((n) => !n.read).length

  // Mobile-first responsive design
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Mobile Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 text-white text-sm">
        <div className="flex items-center gap-1">
          <span>09:41</span>
        </div>
        <div className="flex items-center gap-1">
          <Signal className="h-3 w-3" />
          <Wifi className="h-3 w-3" />
          <Battery className="h-3 w-3" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{currentUser.name}</h2>
              <p className="text-blue-100 text-sm">{currentUser.role}</p>
            </div>
          </div>
          <div className="relative">
            <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 relative">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {activeShift && (
          <div className="bg-blue-700 rounded-lg p-3 mt-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Active Shift</p>
                <p className="text-blue-100 text-xs">{activeShift.location}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{timeEntry && format(parseISO(timeEntry.startTime), "HH:mm")}</p>
                <p className="text-blue-100 text-xs">Started</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {currentView === "dashboard" && (
          <div className="p-4 space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentUser.completedShifts}</div>
                  <div className="text-xs text-gray-600">Completed Shifts</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">{currentUser.onTimeRate}%</div>
                  <div className="text-xs text-gray-600">On-Time Rate</div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Shifts */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Today's Shifts</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {shifts.map((shift) => (
                    <div
                      key={shift.id}
                      className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedShift(shift)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{shift.title}</h4>
                        <Badge className={getStatusColor(shift.status)}>{shift.status}</Badge>
                      </div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {shift.startTime} - {shift.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{shift.location}</span>
                        </div>
                      </div>
                      {shift.status === "upcoming" && (
                        <Button
                          size="sm"
                          className="w-full mt-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            startShift(shift)
                          }}
                        >
                          Start Shift
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Notifications</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {notifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-2 rounded border-l-4 ${
                        notification.read ? "border-gray-300 bg-gray-50" : "border-blue-500 bg-blue-50"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(parseISO(notification.timestamp), "HH:mm")}
                          </p>
                        </div>
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentView === "shifts" && (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">My Shifts</h3>
            <div className="space-y-3">
              {shifts.map((shift) => (
                <Card key={shift.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{shift.title}</h4>
                      <Badge className={getStatusColor(shift.status)}>{shift.status}</Badge>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {shift.startTime} - {shift.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{shift.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{shift.clientName}</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 mb-3">{shift.instructions}</div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedShift(shift)}
                      >
                        View Details
                      </Button>
                      {shift.status === "upcoming" && (
                        <Button size="sm" className="flex-1" onClick={() => startShift(shift)}>
                          Start Shift
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentView === "checklist" && selectedShift && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Button size="sm" variant="ghost" onClick={() => setCurrentView("shifts")}>
                ← Back
              </Button>
              <h3 className="text-lg font-semibold">Checklist</h3>
            </div>

            <Card className="mb-4">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">{selectedShift.title}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>{selectedShift.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>
                      {selectedShift.startTime} - {selectedShift.endTime}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {selectedShift.checklist.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Button
                        size="sm"
                        variant={item.completed ? "default" : "outline"}
                        className="mt-1"
                        onClick={() => toggleChecklistItem(selectedShift.id, item.id)}
                      >
                        {item.completed ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      </Button>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className={`font-medium ${item.completed ? "line-through text-gray-500" : ""}`}>
                            {item.task}
                          </p>
                          {item.required && (
                            <Badge variant="outline" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                        {item.notes && <p className="text-sm text-gray-600 mt-1">{item.notes}</p>}
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            <Camera className="h-3 w-3 mr-1" />
                            Photo
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            Add Note
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Button className="w-full">Complete Shift</Button>
            </div>
          </div>
        )}

        {currentView === "time" && (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Time Tracking</h3>

            {timeEntry && (
              <Card className="mb-6">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {format(parseISO(timeEntry.startTime), "HH:mm")}
                  </div>
                  <div className="text-gray-600 mb-4">Started at {activeShift?.location}</div>

                  <div className="flex justify-center gap-4 mb-4">
                    <Button
                      size="lg"
                      variant={timeEntry.status === "active" ? "default" : "outline"}
                      className="flex-1"
                    >
                      {timeEntry.status === "active" ? (
                        <>
                          <Pause className="h-5 w-5 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5 mr-2" />
                          Resume
                        </>
                      )}
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1 bg-transparent">
                      <Square className="h-5 w-5 mr-2" />
                      End Shift
                    </Button>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>
                      Break time: {Math.floor(timeEntry.breakDuration / 60)}h {timeEntry.breakDuration % 60}m
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Hours:</span>
                    <span className="font-medium">6.5h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Break Time:</span>
                    <span className="font-medium">45m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overtime:</span>
                    <span className="font-medium text-green-600">0.5h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentView === "messages" && (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Messages</h3>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card key={notification.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <span className="text-xs text-gray-500">
                            {format(parseISO(notification.timestamp), "HH:mm")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                      </div>
                      {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentView === "profile" && (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Profile</h3>

            <Card className="mb-4">
              <CardContent className="p-4 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-3">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {currentUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h4 className="font-semibold text-lg">{currentUser.name}</h4>
                <p className="text-gray-600">{currentUser.role}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{currentUser.rating}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-gray-600">{currentUser.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">{currentUser.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 text-gray-400" />
                      <span className="font-medium">Settings</span>
                    </div>
                    <Button size="sm" variant="ghost">
                      →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <LogOut className="h-5 w-5 text-red-500" />
                      <span className="font-medium text-red-600">Sign Out</span>
                    </div>
                    <Button size="sm" variant="ghost">
                      →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-2 py-2">
        <div className="flex justify-around">
          {[
            { id: "dashboard", icon: Home, label: "Home" },
            { id: "shifts", icon: Briefcase, label: "Shifts" },
            { id: "time", icon: Clock, label: "Time" },
            { id: "messages", icon: MessageSquare, label: "Messages" },
            { id: "profile", icon: User, label: "Profile" },
          ].map(({ id, icon: Icon, label }) => (
            <Button
              key={id}
              variant="ghost"
              size="sm"
              className={`flex-col h-auto py-2 px-3 ${currentView === id ? "text-blue-600" : "text-gray-600"}`}
              onClick={() => setCurrentView(id as any)}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{label}</span>
              {id === "messages" && unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Shift Details Modal */}
      {selectedShift && currentView !== "checklist" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-lg p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Shift Details</h3>
              <Button size="sm" variant="ghost" onClick={() => setSelectedShift(null)}>
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">{selectedShift.title}</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      {selectedShift.startTime} - {selectedShift.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedShift.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{selectedShift.clientName}</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2">Instructions</h5>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedShift.instructions}</p>
              </div>

              <div>
                <h5 className="font-medium mb-2">Checklist Progress</h5>
                <div className="space-y-2">
                  {selectedShift.checklist.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-sm">
                      {item.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-400" />
                      )}
                      <span className={item.completed ? "line-through text-gray-500" : ""}>{item.task}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    setCurrentView("checklist")
                    // Don't close the modal, just change view
                  }}
                >
                  View Checklist
                </Button>
                {selectedShift.status === "upcoming" && (
                  <Button
                    className="flex-1"
                    onClick={() => {
                      startShift(selectedShift)
                      setSelectedShift(null)
                    }}
                  >
                    Start Shift
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
