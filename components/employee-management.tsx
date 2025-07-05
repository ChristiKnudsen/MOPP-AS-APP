"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Plus,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Award,
  Clock,
  User,
  Edit,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  department: string
  hireDate: string
  status: "active" | "inactive" | "on-leave"
  avatar?: string
  address: string
  skills: string[]
  certifications: string[]
  rating: number
  hoursWorked: number
  salary: number
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
}

interface EmployeeManagementProps {
  language: Language
}

export function EmployeeManagement({ language }: EmployeeManagementProps) {
  const t = useTranslation(language)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Mock employee data
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      firstName: "Anna",
      lastName: "Hansen",
      email: "anna.hansen@mopp.no",
      phone: "+47 123 45 678",
      position: "Senior Cleaner",
      department: "Residential",
      hireDate: "2023-01-15",
      status: "active",
      address: "Oslo, Norway",
      skills: ["Deep Cleaning", "Window Cleaning", "Carpet Care"],
      certifications: ["Safety Training", "Chemical Handling"],
      rating: 4.8,
      hoursWorked: 1240,
      salary: 45000,
      emergencyContact: {
        name: "Erik Hansen",
        phone: "+47 987 65 432",
        relationship: "Spouse",
      },
    },
    {
      id: "2",
      firstName: "Carlos",
      lastName: "Silva",
      email: "carlos.silva@mopp.no",
      phone: "+47 234 56 789",
      position: "Team Leader",
      department: "Commercial",
      hireDate: "2022-08-20",
      status: "active",
      address: "Bergen, Norway",
      skills: ["Team Management", "Quality Control", "Equipment Maintenance"],
      certifications: ["Leadership Training", "First Aid"],
      rating: 4.9,
      hoursWorked: 1580,
      salary: 52000,
      emergencyContact: {
        name: "Maria Silva",
        phone: "+47 876 54 321",
        relationship: "Spouse",
      },
    },
    {
      id: "3",
      firstName: "Fatima",
      lastName: "Al-Rashid",
      email: "fatima.rashid@mopp.no",
      phone: "+47 345 67 890",
      position: "Cleaner",
      department: "Residential",
      hireDate: "2023-06-10",
      status: "on-leave",
      address: "Trondheim, Norway",
      skills: ["Eco-Friendly Cleaning", "Sanitization"],
      certifications: ["Green Cleaning", "Health & Safety"],
      rating: 4.6,
      hoursWorked: 680,
      salary: 38000,
      emergencyContact: {
        name: "Ahmed Al-Rashid",
        phone: "+47 765 43 210",
        relationship: "Brother",
      },
    },
    {
      id: "4",
      firstName: "Lars",
      lastName: "Andersen",
      email: "lars.andersen@mopp.no",
      phone: "+47 456 78 901",
      position: "Supervisor",
      department: "Commercial",
      hireDate: "2021-03-05",
      status: "active",
      address: "Stavanger, Norway",
      skills: ["Project Management", "Client Relations", "Training"],
      certifications: ["Management Certification", "Customer Service"],
      rating: 4.7,
      hoursWorked: 2100,
      salary: 58000,
      emergencyContact: {
        name: "Ingrid Andersen",
        phone: "+47 654 32 109",
        relationship: "Mother",
      },
    },
  ])

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || employee.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "on-leave":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "inactive":
        return <XCircle className="h-4 w-4" />
      case "on-leave":
        return <Clock className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{t.employees}</h2>
          <p className="text-gray-600">Manage your cleaning team and workforce</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>Enter the details for the new team member.</DialogDescription>
            </DialogHeader>
            <AddEmployeeForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold">{employees.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {employees.filter((e) => e.status === "active").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On Leave</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {employees.filter((e) => e.status === "on-leave").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(employees.reduce((acc, e) => acc + e.rating, 0) / employees.length).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employee List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {employee.firstName[0]}
                      {employee.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {employee.firstName} {employee.lastName}
                    </h3>
                    <p className="text-gray-600 text-sm">{employee.position}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(employee.status)} gap-1`}>
                  {getStatusIcon(employee.status)}
                  {employee.status}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  {employee.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  {employee.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {employee.address}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Hired: {new Date(employee.hireDate).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{employee.rating}</span>
                </div>
                <div className="text-sm text-gray-600">{employee.hoursWorked}h worked</div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {employee.skills.slice(0, 2).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {employee.skills.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{employee.skills.length - 2} more
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedEmployee(employee)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Employee Details Dialog */}
      {selectedEmployee && (
        <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </DialogTitle>
              <DialogDescription>Employee details and information</DialogDescription>
            </DialogHeader>
            <EmployeeDetails employee={selectedEmployee} />
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Employee Dialog */}
      {selectedEmployee && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Employee</DialogTitle>
              <DialogDescription>Update employee information</DialogDescription>
            </DialogHeader>
            <EditEmployeeForm
              employee={selectedEmployee}
              onClose={() => {
                setIsEditDialogOpen(false)
                setSelectedEmployee(null)
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function EmployeeDetails({ employee }: { employee: Employee }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-600">Full Name</Label>
                <p className="text-sm">
                  {employee.firstName} {employee.lastName}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Position</Label>
                <p className="text-sm">{employee.position}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Department</Label>
                <p className="text-sm">{employee.department}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Hire Date</Label>
                <p className="text-sm">{new Date(employee.hireDate).toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Status</Label>
                <Badge className={`${getStatusColor(employee.status)} mt-1`}>{employee.status}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Work Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-600">Total Hours Worked</Label>
                <p className="text-sm">{employee.hoursWorked} hours</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Performance Rating</Label>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm">{employee.rating}/5.0</span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Annual Salary</Label>
                <p className="text-sm">NOK {employee.salary.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="skills" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {employee.certifications.map((cert) => (
                  <Badge key={cert} className="bg-green-100 text-green-800">
                    <Award className="h-3 w-3 mr-1" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="performance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{employee.rating}</div>
                <div className="text-sm text-gray-600">Overall Rating</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{employee.hoursWorked}</div>
                <div className="text-sm text-gray-600">Hours Worked</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-sm text-gray-600">Attendance Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contact" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{employee.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{employee.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{employee.address}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-600">Name</Label>
                <p className="text-sm">{employee.emergencyContact.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Phone</Label>
                <p className="text-sm">{employee.emergencyContact.phone}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Relationship</Label>
                <p className="text-sm">{employee.emergencyContact.relationship}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

function AddEmployeeForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="Enter first name" />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Enter last name" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter email address" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="Enter phone number" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="position">Position</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cleaner">Cleaner</SelectItem>
              <SelectItem value="senior-cleaner">Senior Cleaner</SelectItem>
              <SelectItem value="team-leader">Team Leader</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" placeholder="Enter full address" />
      </div>

      <div>
        <Label htmlFor="salary">Annual Salary (NOK)</Label>
        <Input id="salary" type="number" placeholder="Enter annual salary" />
      </div>

      <Separator />

      <div>
        <Label>Emergency Contact</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <Input placeholder="Contact name" />
          <Input placeholder="Contact phone" />
          <Input placeholder="Relationship" />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Employee</Button>
      </div>
    </form>
  )
}

function EditEmployeeForm({ employee, onClose }: { employee: Employee; onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" defaultValue={employee.firstName} />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" defaultValue={employee.lastName} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue={employee.email} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" defaultValue={employee.phone} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="position">Position</Label>
          <Select defaultValue={employee.position.toLowerCase().replace(" ", "-")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cleaner">Cleaner</SelectItem>
              <SelectItem value="senior-cleaner">Senior Cleaner</SelectItem>
              <SelectItem value="team-leader">Team Leader</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select defaultValue={employee.status}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="on-leave">On Leave</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" defaultValue={employee.address} />
      </div>

      <div>
        <Label htmlFor="salary">Annual Salary (NOK)</Label>
        <Input id="salary" type="number" defaultValue={employee.salary} />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Update Employee</Button>
      </div>
    </form>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "inactive":
      return "bg-red-100 text-red-800"
    case "on-leave":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
