"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CalendarIcon,
  Clock,
  Users,
  MapPin,
  Plus,
  Edit,
  CheckCircle,
  XCircle,
  RotateCcw,
  Search,
  Download,
  Building2,
  Phone,
  Mail,
  Star,
  ChevronLeft,
  ChevronRight,
  Eye,
  Copy,
  Share,
} from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO } from "date-fns"

interface SchedulingSystemProps {
  language: Language
}

interface Shift {
  id: string
  title: string
  description: string
  startTime: string
  endTime: string
  date: string
  location: string
  address: string
  assignedEmployees: Employee[]
  requiredSkills: string[]
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "pending"
  priority: "low" | "normal" | "high" | "urgent"
  contractId?: string
  clientName: string
  estimatedHours: number
  actualHours?: number
  notes?: string
  equipment: string[]
  createdBy: string
  createdAt: string
  updatedAt: string
}

interface Employee {
  id: string
  name: string
  avatar: string
  role: string
  skills: string[]
  availability: AvailabilitySlot[]
  rating: number
  phone: string
  email: string
  status: "available" | "busy" | "off-duty" | "on-leave"
  currentLocation?: string
}

interface AvailabilitySlot {
  id: string
  employeeId: string
  date: string
  startTime: string
  endTime: string
  isAvailable: boolean
  reason?: string
}

interface ShiftExchange {
  id: string
  originalShiftId: string
  requestedBy: string
  requestedTo?: string
  reason: string
  status: "pending" | "approved" | "rejected" | "completed"
  createdAt: string
  approvedBy?: string
  approvedAt?: string
}

interface TimeOffRequest {
  id: string
  employeeId: string
  employeeName: string
  startDate: string
  endDate: string
  reason: string
  type: "vacation" | "sick" | "personal" | "emergency"
  status: "pending" | "approved" | "rejected"
  requestedAt: string
  reviewedBy?: string
  reviewedAt?: string
  notes?: string
}

export function SchedulingSystem({ language }: SchedulingSystemProps) {
  const t = useTranslation(language)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week")
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null)
  const [showCreateShift, setShowCreateShift] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Sample data
  const employees: Employee[] = [
    {
      id: "1",
      name: "John Smith",
      avatar: "/placeholder-user.jpg",
      role: "Senior Cleaner",
      skills: ["Deep Cleaning", "Window Cleaning", "Floor Care"],
      availability: [],
      rating: 4.8,
      phone: "+47 123 45 678",
      email: "john.smith@company.com",
      status: "available",
      currentLocation: "Downtown Office",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      role: "Supervisor",
      skills: ["Team Management", "Quality Control", "Training"],
      availability: [],
      rating: 4.9,
      phone: "+47 987 65 432",
      email: "sarah.johnson@company.com",
      status: "busy",
      currentLocation: "Shopping Mall",
    },
    {
      id: "3",
      name: "Mike Wilson",
      avatar: "/placeholder-user.jpg",
      role: "Cleaner",
      skills: ["General Cleaning", "Sanitization"],
      availability: [],
      rating: 4.6,
      phone: "+47 555 12 345",
      email: "mike.wilson@company.com",
      status: "available",
    },
  ]

  const shifts: Shift[] = [
    {
      id: "1",
      title: "Morning Office Cleaning",
      description: "Daily cleaning of downtown office building",
      startTime: "08:00",
      endTime: "12:00",
      date: format(new Date(), "yyyy-MM-dd"),
      location: "Downtown Office Building",
      address: "123 Business Street, Oslo",
      assignedEmployees: [employees[0], employees[2]],
      requiredSkills: ["General Cleaning", "Window Cleaning"],
      status: "scheduled",
      priority: "normal",
      contractId: "CNT-2024-001",
      clientName: "ABC Corporation",
      estimatedHours: 4,
      notes: "Focus on conference rooms and lobby area",
      equipment: ["Vacuum cleaner", "Cleaning supplies", "Window cleaning kit"],
      createdBy: "Sarah Johnson",
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-01-15T08:00:00Z",
    },
    {
      id: "2",
      title: "Shopping Mall Deep Clean",
      description: "Weekly deep cleaning of shopping center",
      startTime: "06:00",
      endTime: "14:00",
      date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
      location: "City Shopping Mall",
      address: "456 Commerce Avenue, Oslo",
      assignedEmployees: [employees[1], employees[0]],
      requiredSkills: ["Deep Cleaning", "Floor Care"],
      status: "scheduled",
      priority: "high",
      contractId: "CNT-2024-002",
      clientName: "Mall Management Ltd",
      estimatedHours: 8,
      equipment: ["Floor scrubber", "Deep cleaning equipment", "Safety gear"],
      createdBy: "John Smith",
      createdAt: "2024-01-14T16:00:00Z",
      updatedAt: "2024-01-14T16:00:00Z",
    },
    {
      id: "3",
      title: "Restaurant Evening Clean",
      description: "Post-service cleaning and sanitization",
      startTime: "22:00",
      endTime: "02:00",
      date: format(new Date(), "yyyy-MM-dd"),
      location: "Fine Dining Restaurant",
      address: "789 Gourmet Street, Oslo",
      assignedEmployees: [employees[2]],
      requiredSkills: ["Sanitization", "Kitchen Cleaning"],
      status: "in-progress",
      priority: "urgent",
      contractId: "CNT-2024-003",
      clientName: "Gourmet Restaurant Group",
      estimatedHours: 4,
      actualHours: 2.5,
      equipment: ["Sanitization supplies", "Kitchen cleaning tools"],
      createdBy: "Sarah Johnson",
      createdAt: "2024-01-15T20:00:00Z",
      updatedAt: "2024-01-15T22:30:00Z",
    },
  ]

  const shiftExchanges: ShiftExchange[] = [
    {
      id: "1",
      originalShiftId: "1",
      requestedBy: "Mike Wilson",
      requestedTo: "John Smith",
      reason: "Family emergency - need to attend to sick child",
      status: "pending",
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      originalShiftId: "2",
      requestedBy: "John Smith",
      reason: "Doctor appointment conflict",
      status: "approved",
      createdAt: "2024-01-14T14:00:00Z",
      approvedBy: "Sarah Johnson",
      approvedAt: "2024-01-14T15:30:00Z",
    },
  ]

  const timeOffRequests: TimeOffRequest[] = [
    {
      id: "1",
      employeeId: "1",
      employeeName: "John Smith",
      startDate: "2024-01-20",
      endDate: "2024-01-25",
      reason: "Annual vacation",
      type: "vacation",
      status: "pending",
      requestedAt: "2024-01-10T09:00:00Z",
    },
    {
      id: "2",
      employeeId: "3",
      employeeName: "Mike Wilson",
      startDate: "2024-01-16",
      endDate: "2024-01-16",
      reason: "Medical appointment",
      type: "personal",
      status: "approved",
      requestedAt: "2024-01-12T11:00:00Z",
      reviewedBy: "Sarah Johnson",
      reviewedAt: "2024-01-12T14:00:00Z",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getEmployeeStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "off-duty":
        return "bg-gray-500"
      case "on-leave":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredShifts = shifts.filter((shift) => {
    const matchesSearch =
      shift.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || shift.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getWeekDays = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 })
    const end = endOfWeek(date, { weekStartsOn: 1 })
    return eachDayOfInterval({ start, end })
  }

  const getShiftsForDate = (date: Date) => {
    return filteredShifts.filter((shift) => isSameDay(parseISO(shift.date), date))
  }

  const formatTime = (time: string) => {
    return time.slice(0, 5)
  }

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}:00`)
    const end = new Date(`2000-01-01T${endTime}:00`)
    const diff = end.getTime() - start.getTime()
    return Math.round((diff / (1000 * 60 * 60)) * 10) / 10
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scheduling System</h1>
          <p className="text-gray-600">Manage shifts, availability, and team schedules</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowCreateShift(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Shift
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{shifts.length}</p>
                <p className="text-sm text-gray-600">Total Shifts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{employees.filter((e) => e.status === "available").length}</p>
                <p className="text-sm text-gray-600">Available Staff</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{shifts.reduce((sum, shift) => sum + shift.estimatedHours, 0)}</p>
                <p className="text-sm text-gray-600">Scheduled Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <RotateCcw className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{shiftExchanges.filter((se) => se.status === "pending").length}</p>
                <p className="text-sm text-gray-600">Pending Exchanges</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="shifts">Shifts</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="exchanges">Exchanges</TabsTrigger>
          <TabsTrigger value="time-off">Time Off</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          {/* Calendar Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, -7))}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-semibold">{format(selectedDate, "MMMM yyyy")}</h3>
                  <Button variant="outline" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, 7))}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Select value={viewMode} onValueChange={(value: "day" | "week" | "month") => setViewMode(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                    Today
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar View */}
          {viewMode === "week" && (
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-8 gap-2">
                  <div className="font-medium text-sm text-gray-600 p-2">Time</div>
                  {getWeekDays(selectedDate).map((day) => (
                    <div key={day.toISOString()} className="text-center">
                      <div className="font-medium text-sm">{format(day, "EEE")}</div>
                      <div className={`text-lg ${isSameDay(day, new Date()) ? "text-blue-600 font-bold" : ""}`}>
                        {format(day, "d")}
                      </div>
                    </div>
                  ))}

                  {/* Time slots */}
                  {Array.from({ length: 24 }, (_, hour) => (
                    <div key={hour} className="contents">
                      <div className="text-xs text-gray-500 p-2 border-t">{hour.toString().padStart(2, "0")}:00</div>
                      {getWeekDays(selectedDate).map((day) => {
                        const dayShifts = getShiftsForDate(day).filter((shift) => {
                          const startHour = Number.parseInt(shift.startTime.split(":")[0])
                          const endHour = Number.parseInt(shift.endTime.split(":")[0])
                          return hour >= startHour && hour < endHour
                        })

                        return (
                          <div key={`${day.toISOString()}-${hour}`} className="min-h-12 border-t border-l p-1">
                            {dayShifts.map((shift) => (
                              <div
                                key={shift.id}
                                className="bg-blue-100 text-blue-800 text-xs p-1 rounded mb-1 cursor-pointer hover:bg-blue-200"
                                onClick={() => setSelectedShift(shift)}
                              >
                                <div className="font-medium truncate">{shift.title}</div>
                                <div className="truncate">
                                  {formatTime(shift.startTime)}-{formatTime(shift.endTime)}
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {viewMode === "day" && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{format(selectedDate, "EEEE, MMMM d, yyyy")}</h3>

                  <div className="space-y-2">
                    {getShiftsForDate(selectedDate).map((shift) => (
                      <Card
                        key={shift.id}
                        className="hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedShift(shift)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">{shift.title}</h4>
                                <Badge className={getStatusColor(shift.status)}>{shift.status}</Badge>
                                <Badge className={getPriorityColor(shift.priority)}>{shift.priority}</Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {shift.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {shift.assignedEmployees.length} assigned
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {shift.assignedEmployees.slice(0, 3).map((employee) => (
                                <Avatar key={employee.id} className="w-8 h-8">
                                  <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="text-xs">
                                    {employee.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {shift.assignedEmployees.length > 3 && (
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs">
                                  +{shift.assignedEmployees.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {getShiftsForDate(selectedDate).length === 0 && (
                      <Card>
                        <CardContent className="p-8 text-center">
                          <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No shifts scheduled</h3>
                          <p className="text-gray-600 mb-4">No shifts are scheduled for this date.</p>
                          <Button onClick={() => setShowCreateShift(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Shift
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="shifts" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search shifts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Shifts List */}
          <div className="space-y-4">
            {filteredShifts.map((shift) => (
              <Card key={shift.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{shift.title}</h3>
                        <Badge className={getStatusColor(shift.status)}>{shift.status}</Badge>
                        <Badge className={getPriorityColor(shift.priority)}>{shift.priority}</Badge>
                      </div>

                      <p className="text-gray-600 mb-3">{shift.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                          <span>{format(parseISO(shift.date), "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>
                            {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{shift.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span>{shift.clientName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedShift(shift)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Assigned to:</span>
                      <div className="flex items-center gap-1">
                        {shift.assignedEmployees.map((employee) => (
                          <div key={employee.id} className="flex items-center gap-1">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{employee.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      <span>{shift.estimatedHours}h estimated</span>
                      {shift.actualHours && <span className="ml-2">• {shift.actualHours}h actual</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getEmployeeStatusColor(employee.status)}`}
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{employee.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{employee.role}</p>

                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{employee.rating}</span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span>{employee.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span>{employee.email}</span>
                        </div>
                        {employee.currentLocation && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span>{employee.currentLocation}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3">
                        <p className="text-xs text-gray-600 mb-1">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {employee.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {employee.skills.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{employee.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          Schedule
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exchanges" className="space-y-4">
          <div className="space-y-4">
            {shiftExchanges.map((exchange) => {
              const originalShift = shifts.find((s) => s.id === exchange.originalShiftId)
              return (
                <Card key={exchange.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">Shift Exchange Request</h3>
                          <Badge className={getStatusColor(exchange.status)}>{exchange.status}</Badge>
                        </div>

                        {originalShift && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <h4 className="font-medium text-sm mb-1">{originalShift.title}</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-3 w-3" />
                                <span>{format(parseISO(originalShift.date), "MMM d, yyyy")}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {formatTime(originalShift.startTime)} - {formatTime(originalShift.endTime)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                <span>{originalShift.location}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Requested by:</span> {exchange.requestedBy}
                          </div>
                          {exchange.requestedTo && (
                            <div>
                              <span className="font-medium">Requested to:</span> {exchange.requestedTo}
                            </div>
                          )}
                          <div>
                            <span className="font-medium">Reason:</span> {exchange.reason}
                          </div>
                          <div>
                            <span className="font-medium">Requested:</span>{" "}
                            {format(parseISO(exchange.createdAt), "MMM d, yyyy HH:mm")}
                          </div>
                          {exchange.approvedBy && exchange.approvedAt && (
                            <div>
                              <span className="font-medium">Approved by:</span> {exchange.approvedBy} on{" "}
                              {format(parseISO(exchange.approvedAt), "MMM d, yyyy HH:mm")}
                            </div>
                          )}
                        </div>
                      </div>

                      {exchange.status === "pending" && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="time-off" className="space-y-4">
          <div className="space-y-4">
            {timeOffRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">Time Off Request</h3>
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                        <Badge variant="secondary" className="capitalize">
                          {request.type}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Employee:</span> {request.employeeName}
                        </div>
                        <div>
                          <span className="font-medium">Dates:</span>{" "}
                          {format(parseISO(request.startDate), "MMM d, yyyy")} -{" "}
                          {format(parseISO(request.endDate), "MMM d, yyyy")}
                        </div>
                        <div>
                          <span className="font-medium">Reason:</span> {request.reason}
                        </div>
                        <div>
                          <span className="font-medium">Requested:</span>{" "}
                          {format(parseISO(request.requestedAt), "MMM d, yyyy HH:mm")}
                        </div>
                        {request.reviewedBy && request.reviewedAt && (
                          <div>
                            <span className="font-medium">Reviewed by:</span> {request.reviewedBy} on{" "}
                            {format(parseISO(request.reviewedAt), "MMM d, yyyy HH:mm")}
                          </div>
                        )}
                        {request.notes && (
                          <div>
                            <span className="font-medium">Notes:</span> {request.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Shift Details Dialog */}
      {selectedShift && (
        <Dialog open={!!selectedShift} onOpenChange={() => setSelectedShift(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedShift.title}</DialogTitle>
              <DialogDescription>{selectedShift.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(selectedShift.status)}>{selectedShift.status}</Badge>
                <Badge className={getPriorityColor(selectedShift.priority)}>{selectedShift.priority}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Schedule Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      <span>{format(parseISO(selectedShift.date), "EEEE, MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>
                        {formatTime(selectedShift.startTime)} - {formatTime(selectedShift.endTime)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{selectedShift.location}</span>
                    </div>
                    <div className="text-xs text-gray-600">{selectedShift.address}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Client Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Client:</span> {selectedShift.clientName}
                    </div>
                    {selectedShift.contractId && (
                      <div>
                        <span className="font-medium">Contract:</span> {selectedShift.contractId}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Estimated Hours:</span> {selectedShift.estimatedHours}h
                    </div>
                    {selectedShift.actualHours && (
                      <div>
                        <span className="font-medium">Actual Hours:</span> {selectedShift.actualHours}h
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Assigned Team</h4>
                <div className="space-y-2">
                  {selectedShift.assignedEmployees.map((employee) => (
                    <div key={employee.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{employee.name}</div>
                        <div className="text-xs text-gray-600">{employee.role}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{employee.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedShift.requiredSkills.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedShift.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedShift.equipment.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Required Equipment</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedShift.equipment.map((item) => (
                      <Badge key={item} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedShift.notes && (
                <div>
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedShift.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Shift
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Shift Dialog */}
      <Dialog open={showCreateShift} onOpenChange={setShowCreateShift}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Shift</DialogTitle>
            <DialogDescription>Schedule a new shift for your team</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shift-title">Shift Title</Label>
                <Input id="shift-title" placeholder="Enter shift title" />
              </div>
              <div>
                <Label htmlFor="client-name">Client Name</Label>
                <Input id="client-name" placeholder="Enter client name" />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter shift description" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(selectedDate, "MMM d, yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="start-time">Start Time</Label>
                <Input id="start-time" type="time" />
              </div>
              <div>
                <Label htmlFor="end-time">End Time</Label>
                <Input id="end-time" type="time" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="address">Full Address</Label>
              <Input id="address" placeholder="Enter full address" />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Additional notes or instructions" />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowCreateShift(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => setShowCreateShift(false)} className="flex-1">
                Create Shift
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
