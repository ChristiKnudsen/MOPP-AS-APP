"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Clock,
  Users,
  CalendarIcon,
  Download,
  Plus,
  Eye,
  Edit,
  Send,
  Calculator,
  TrendingUp,
  BarChart3,
  FileText,
  User,
  Search,
  Timer,
  Target,
  Award,
} from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"
import { format, parseISO } from "date-fns"

interface PayrollSystemProps {
  language: Language
}

interface Employee {
  id: string
  name: string
  avatar: string
  role: string
  employeeId: string
  department: string
  hireDate: string
  hourlyRate: number
  overtimeRate: number
  status: "active" | "inactive" | "on-leave"
  payrollSettings: PayrollSettings
}

interface PayrollSettings {
  payFrequency: "weekly" | "bi-weekly" | "monthly"
  taxWithholding: number
  benefits: Benefit[]
  bankAccount: string
  paymentMethod: "direct-deposit" | "check" | "cash"
}

interface Benefit {
  id: string
  name: string
  type: "health" | "dental" | "vision" | "retirement" | "other"
  employeeContribution: number
  employerContribution: number
  isActive: boolean
}

interface TimeEntry {
  id: string
  employeeId: string
  date: string
  clockIn: string
  clockOut?: string
  breakDuration: number
  regularHours: number
  overtimeHours: number
  status: "active" | "completed" | "approved" | "disputed"
  location: string
  shiftId?: string
  notes?: string
  approvedBy?: string
  approvedAt?: string
}

interface PayrollPeriod {
  id: string
  startDate: string
  endDate: string
  payDate: string
  status: "draft" | "processing" | "approved" | "paid" | "cancelled"
  totalEmployees: number
  totalHours: number
  totalGrossPay: number
  totalNetPay: number
  totalTaxes: number
  totalBenefits: number
  createdBy: string
  createdAt: string
  approvedBy?: string
  approvedAt?: string
}

interface PayStub {
  id: string
  employeeId: string
  payrollPeriodId: string
  payPeriodStart: string
  payPeriodEnd: string
  payDate: string
  regularHours: number
  overtimeHours: number
  regularPay: number
  overtimePay: number
  grossPay: number
  federalTax: number
  stateTax: number
  socialSecurity: number
  medicare: number
  benefitDeductions: number
  totalDeductions: number
  netPay: number
  status: "draft" | "issued" | "paid"
}

interface PayrollReport {
  period: string
  totalPayroll: number
  totalHours: number
  averageHourlyRate: number
  overtimePercentage: number
  employeeCount: number
  departmentBreakdown: {
    department: string
    employees: number
    totalPay: number
    totalHours: number
  }[]
}

export function PayrollSystem({ language }: PayrollSystemProps) {
  const t = useTranslation(language)
  const [selectedPeriod, setSelectedPeriod] = useState("current")
  const [showCreatePayroll, setShowCreatePayroll] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [selectedPayStub, setSelectedPayStub] = useState<PayStub | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Sample data
  const employees: Employee[] = [
    {
      id: "1",
      name: "John Smith",
      avatar: "/placeholder-user.jpg",
      role: "Senior Cleaner",
      employeeId: "EMP-001",
      department: "Operations",
      hireDate: "2023-01-15",
      hourlyRate: 25.0,
      overtimeRate: 37.5,
      status: "active",
      payrollSettings: {
        payFrequency: "bi-weekly",
        taxWithholding: 22,
        benefits: [
          {
            id: "1",
            name: "Health Insurance",
            type: "health",
            employeeContribution: 150,
            employerContribution: 300,
            isActive: true,
          },
          {
            id: "2",
            name: "Retirement Plan",
            type: "retirement",
            employeeContribution: 200,
            employerContribution: 100,
            isActive: true,
          },
        ],
        bankAccount: "****1234",
        paymentMethod: "direct-deposit",
      },
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      role: "Supervisor",
      employeeId: "EMP-002",
      department: "Management",
      hireDate: "2022-08-10",
      hourlyRate: 32.0,
      overtimeRate: 48.0,
      status: "active",
      payrollSettings: {
        payFrequency: "bi-weekly",
        taxWithholding: 24,
        benefits: [
          {
            id: "1",
            name: "Health Insurance",
            type: "health",
            employeeContribution: 150,
            employerContribution: 300,
            isActive: true,
          },
        ],
        bankAccount: "****5678",
        paymentMethod: "direct-deposit",
      },
    },
    {
      id: "3",
      name: "Mike Wilson",
      avatar: "/placeholder-user.jpg",
      role: "Cleaner",
      employeeId: "EMP-003",
      department: "Operations",
      hireDate: "2023-06-01",
      hourlyRate: 22.0,
      overtimeRate: 33.0,
      status: "active",
      payrollSettings: {
        payFrequency: "weekly",
        taxWithholding: 18,
        benefits: [],
        bankAccount: "****9012",
        paymentMethod: "direct-deposit",
      },
    },
  ]

  const timeEntries: TimeEntry[] = [
    {
      id: "1",
      employeeId: "1",
      date: "2024-01-15",
      clockIn: "08:00",
      clockOut: "16:30",
      breakDuration: 30,
      regularHours: 8.0,
      overtimeHours: 0,
      status: "approved",
      location: "Downtown Office",
      shiftId: "SH-001",
      approvedBy: "Sarah Johnson",
      approvedAt: "2024-01-16T09:00:00Z",
    },
    {
      id: "2",
      employeeId: "1",
      date: "2024-01-16",
      clockIn: "08:00",
      clockOut: "18:00",
      breakDuration: 60,
      regularHours: 8.0,
      overtimeHours: 1.0,
      status: "approved",
      location: "Shopping Mall",
      shiftId: "SH-002",
      approvedBy: "Sarah Johnson",
      approvedAt: "2024-01-17T09:00:00Z",
    },
    {
      id: "3",
      employeeId: "2",
      date: "2024-01-15",
      clockIn: "07:30",
      clockOut: "16:00",
      breakDuration: 30,
      regularHours: 8.0,
      overtimeHours: 0,
      status: "approved",
      location: "Multiple Locations",
      approvedBy: "John Smith",
      approvedAt: "2024-01-16T10:00:00Z",
    },
  ]

  const payrollPeriods: PayrollPeriod[] = [
    {
      id: "1",
      startDate: "2024-01-01",
      endDate: "2024-01-15",
      payDate: "2024-01-20",
      status: "paid",
      totalEmployees: 3,
      totalHours: 240,
      totalGrossPay: 6800.0,
      totalNetPay: 5304.0,
      totalTaxes: 1156.0,
      totalBenefits: 340.0,
      createdBy: "Admin",
      createdAt: "2024-01-16T10:00:00Z",
      approvedBy: "Manager",
      approvedAt: "2024-01-18T14:00:00Z",
    },
    {
      id: "2",
      startDate: "2024-01-16",
      endDate: "2024-01-31",
      payDate: "2024-02-05",
      status: "processing",
      totalEmployees: 3,
      totalHours: 256,
      totalGrossPay: 7200.0,
      totalNetPay: 5616.0,
      totalTaxes: 1224.0,
      totalBenefits: 360.0,
      createdBy: "Admin",
      createdAt: "2024-02-01T10:00:00Z",
    },
  ]

  const payStubs: PayStub[] = [
    {
      id: "1",
      employeeId: "1",
      payrollPeriodId: "1",
      payPeriodStart: "2024-01-01",
      payPeriodEnd: "2024-01-15",
      payDate: "2024-01-20",
      regularHours: 80,
      overtimeHours: 4,
      regularPay: 2000.0,
      overtimePay: 150.0,
      grossPay: 2150.0,
      federalTax: 387.0,
      stateTax: 129.0,
      socialSecurity: 133.3,
      medicare: 31.18,
      benefitDeductions: 350.0,
      totalDeductions: 1030.48,
      netPay: 1119.52,
      status: "paid",
    },
    {
      id: "2",
      employeeId: "2",
      payrollPeriodId: "1",
      payPeriodStart: "2024-01-01",
      payPeriodEnd: "2024-01-15",
      payDate: "2024-01-20",
      regularHours: 80,
      overtimeHours: 0,
      regularPay: 2560.0,
      overtimePay: 0,
      grossPay: 2560.0,
      federalTax: 512.0,
      stateTax: 153.6,
      socialSecurity: 158.72,
      medicare: 37.12,
      benefitDeductions: 150.0,
      totalDeductions: 1011.44,
      netPay: 1548.56,
      status: "paid",
    },
  ]

  const currentReport: PayrollReport = {
    period: "January 2024",
    totalPayroll: 14000.0,
    totalHours: 496,
    averageHourlyRate: 26.33,
    overtimePercentage: 8.5,
    employeeCount: 3,
    departmentBreakdown: [
      {
        department: "Operations",
        employees: 2,
        totalPay: 8400.0,
        totalHours: 336,
      },
      {
        department: "Management",
        employees: 1,
        totalPay: 5600.0,
        totalHours: 160,
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
      case "approved":
      case "issued":
        return "bg-green-100 text-green-800"
      case "processing":
      case "active":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "disputed":
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "inactive":
      case "on-leave":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || employee.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const calculateTotalHours = (employeeId: string, startDate: string, endDate: string) => {
    const entries = timeEntries.filter(
      (entry) =>
        entry.employeeId === employeeId &&
        entry.date >= startDate &&
        entry.date <= endDate &&
        entry.status === "approved",
    )
    return entries.reduce((total, entry) => total + entry.regularHours + entry.overtimeHours, 0)
  }

  const calculateGrossPay = (employee: Employee, regularHours: number, overtimeHours: number) => {
    return regularHours * employee.hourlyRate + overtimeHours * employee.overtimeRate
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("no-NO", {
      style: "currency",
      currency: "NOK",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll System</h1>
          <p className="text-gray-600">Manage employee payroll and time tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Period</SelectItem>
              <SelectItem value="last">Last Period</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowCreatePayroll(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Run Payroll
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{formatCurrency(currentReport.totalPayroll)}</p>
                <p className="text-sm text-gray-600">Total Payroll</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+8.5% from last month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{currentReport.totalHours}</p>
                <p className="text-sm text-gray-600">Total Hours</p>
                <div className="flex items-center gap-1 mt-1">
                  <Timer className="h-3 w-3 text-blue-600" />
                  <span className="text-xs text-blue-600">{currentReport.overtimePercentage}% overtime</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{currentReport.employeeCount}</p>
                <p className="text-sm text-gray-600">Active Employees</p>
                <div className="flex items-center gap-1 mt-1">
                  <Target className="h-3 w-3 text-purple-600" />
                  <span className="text-xs text-purple-600">100% participation</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{formatCurrency(currentReport.averageHourlyRate)}</p>
                <p className="text-sm text-gray-600">Avg. Hourly Rate</p>
                <div className="flex items-center gap-1 mt-1">
                  <Award className="h-3 w-3 text-orange-600" />
                  <span className="text-xs text-orange-600">Competitive rate</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="time-tracking">Time Tracking</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="pay-stubs">Pay Stubs</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payroll Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Payroll Summary
                </CardTitle>
                <CardDescription>Current period payroll breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="font-medium">Gross Pay</span>
                    <span className="font-bold text-green-600">{formatCurrency(currentReport.totalPayroll)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                    <span className="font-medium">Total Deductions</span>
                    <span className="font-bold text-red-600">{formatCurrency(currentReport.totalPayroll * 0.25)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="font-medium">Net Pay</span>
                    <span className="font-bold text-blue-600">{formatCurrency(currentReport.totalPayroll * 0.75)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Department Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Department Breakdown</CardTitle>
                <CardDescription>Payroll distribution by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentReport.departmentBreakdown.map((dept) => (
                    <div key={dept.department} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{dept.department}</span>
                        <span>{formatCurrency(dept.totalPay)}</span>
                      </div>
                      <Progress value={(dept.totalPay / currentReport.totalPayroll) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{dept.employees} employees</span>
                        <span>{dept.totalHours} hours</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Payroll Periods */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Payroll Periods</CardTitle>
              <CardDescription>Latest payroll processing history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payrollPeriods.map((period) => (
                  <div key={period.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">
                          {format(parseISO(period.startDate), "MMM d")} -{" "}
                          {format(parseISO(period.endDate), "MMM d, yyyy")}
                        </h4>
                        <Badge className={getStatusColor(period.status)}>{period.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Employees:</span> {period.totalEmployees}
                        </div>
                        <div>
                          <span className="font-medium">Hours:</span> {period.totalHours}
                        </div>
                        <div>
                          <span className="font-medium">Gross:</span> {formatCurrency(period.totalGrossPay)}
                        </div>
                        <div>
                          <span className="font-medium">Net:</span> {formatCurrency(period.totalNetPay)}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search employees..."
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
                    <SelectItem value="all">All Employees</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Employees List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmployees.map((employee) => {
              const totalHours = calculateTotalHours(employee.id, "2024-01-01", "2024-01-31")
              const grossPay = calculateGrossPay(employee, totalHours, 0)

              return (
                <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{employee.name}</h3>
                          <Badge className={getStatusColor(employee.status)}>{employee.status}</Badge>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          <p>
                            <strong>ID:</strong> {employee.employeeId}
                          </p>
                          <p>
                            <strong>Role:</strong> {employee.role}
                          </p>
                          <p>
                            <strong>Department:</strong> {employee.department}
                          </p>
                          <p>
                            <strong>Rate:</strong> {formatCurrency(employee.hourlyRate)}/hr
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-gray-600">Hours (MTD)</p>
                              <p className="font-medium">{totalHours}h</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Gross Pay (MTD)</p>
                              <p className="font-medium">{formatCurrency(grossPay)}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => setSelectedEmployee(employee)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="time-tracking" className="space-y-4">
          <div className="space-y-4">
            {timeEntries.map((entry) => {
              const employee = employees.find((e) => e.id === entry.employeeId)
              if (!employee) return null

              return (
                <Card key={entry.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{employee.name}</h3>
                          <p className="text-sm text-gray-600">{employee.role}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(entry.status)}>{entry.status}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{format(parseISO(entry.date), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {entry.clockIn} - {entry.clockOut || "Active"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{entry.regularHours + entry.overtimeHours}h total</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{entry.location}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Regular Hours</p>
                          <p className="font-medium">{entry.regularHours}h</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Overtime Hours</p>
                          <p className="font-medium">{entry.overtimeHours}h</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Break Time</p>
                          <p className="font-medium">{entry.breakDuration}m</p>
                        </div>
                      </div>
                    </div>

                    {entry.notes && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                          <strong>Notes:</strong> {entry.notes}
                        </p>
                      </div>
                    )}

                    {entry.approvedBy && entry.approvedAt && (
                      <div className="mt-3 text-xs text-gray-500">
                        Approved by {entry.approvedBy} on {format(parseISO(entry.approvedAt), "MMM d, yyyy HH:mm")}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <div className="space-y-4">
            {payrollPeriods.map((period) => (
              <Card key={period.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">
                          Pay Period: {format(parseISO(period.startDate), "MMM d")} -{" "}
                          {format(parseISO(period.endDate), "MMM d, yyyy")}
                        </h3>
                        <Badge className={getStatusColor(period.status)}>{period.status}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-600">Pay Date</p>
                          <p className="font-medium">{format(parseISO(period.payDate), "MMM d, yyyy")}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Employees</p>
                          <p className="font-medium">{period.totalEmployees}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Hours</p>
                          <p className="font-medium">{period.totalHours}h</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Created By</p>
                          <p className="font-medium">{period.createdBy}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      {period.status === "draft" && (
                        <Button size="sm">
                          <Send className="h-3 w-3 mr-1" />
                          Process
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(period.totalGrossPay)}</p>
                        <p className="text-sm text-gray-600">Gross Pay</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">{formatCurrency(period.totalTaxes)}</p>
                        <p className="text-sm text-gray-600">Taxes</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{formatCurrency(period.totalBenefits)}</p>
                        <p className="text-sm text-gray-600">Benefits</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(period.totalNetPay)}</p>
                        <p className="text-sm text-gray-600">Net Pay</p>
                      </div>
                    </div>
                  </div>

                  {period.approvedBy && period.approvedAt && (
                    <div className="mt-3 text-xs text-gray-500">
                      Approved by {period.approvedBy} on {format(parseISO(period.approvedAt), "MMM d, yyyy HH:mm")}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pay-stubs" className="space-y-4">
          <div className="space-y-4">
            {payStubs.map((payStub) => {
              const employee = employees.find((e) => e.id === payStub.employeeId)
              if (!employee) return null

              return (
                <Card key={payStub.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{employee.name}</h3>
                          <p className="text-sm text-gray-600">
                            {format(parseISO(payStub.payPeriodStart), "MMM d")} -{" "}
                            {format(parseISO(payStub.payPeriodEnd), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(payStub.status)}>{payStub.status}</Badge>
                        <p className="text-sm text-gray-600 mt-1">
                          Pay Date: {format(parseISO(payStub.payDate), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Earnings</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Regular Hours ({payStub.regularHours}h)</span>
                            <span>{formatCurrency(payStub.regularPay)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Overtime Hours ({payStub.overtimeHours}h)</span>
                            <span>{formatCurrency(payStub.overtimePay)}</span>
                          </div>
                          <div className="flex justify-between font-medium border-t pt-2">
                            <span>Gross Pay</span>
                            <span>{formatCurrency(payStub.grossPay)}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Deductions</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Federal Tax</span>
                            <span>{formatCurrency(payStub.federalTax)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>State Tax</span>
                            <span>{formatCurrency(payStub.stateTax)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Social Security</span>
                            <span>{formatCurrency(payStub.socialSecurity)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Medicare</span>
                            <span>{formatCurrency(payStub.medicare)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Benefits</span>
                            <span>{formatCurrency(payStub.benefitDeductions)}</span>
                          </div>
                          <div className="flex justify-between font-medium border-t pt-2">
                            <span>Total Deductions</span>
                            <span>{formatCurrency(payStub.totalDeductions)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Net Pay</span>
                        <span className="text-2xl font-bold text-blue-600">{formatCurrency(payStub.netPay)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedPayStub(payStub)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Full Stub
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Download className="h-3 w-3 mr-1" />
                        Download PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payroll Summary Report */}
            <Card>
              <CardHeader>
                <CardTitle>Payroll Summary Report</CardTitle>
                <CardDescription>{currentReport.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-green-50 p-3 rounded">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(currentReport.totalPayroll)}
                      </div>
                      <div className="text-sm text-gray-600">Total Payroll</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-2xl font-bold text-blue-600">{currentReport.totalHours}</div>
                      <div className="text-sm text-gray-600">Total Hours</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Average Hourly Rate</span>
                      <span className="font-medium">{formatCurrency(currentReport.averageHourlyRate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overtime Percentage</span>
                      <span className="font-medium">{currentReport.overtimePercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Employee Count</span>
                      <span className="font-medium">{currentReport.employeeCount}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Department Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Department Analysis</CardTitle>
                <CardDescription>Payroll breakdown by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentReport.departmentBreakdown.map((dept) => (
                    <div key={dept.department} className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{dept.department}</h4>
                        <span className="font-bold">{formatCurrency(dept.totalPay)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>Employees: {dept.employees}</div>
                        <div>Hours: {dept.totalHours}</div>
                      </div>
                      <Progress value={(dept.totalPay / currentReport.totalPayroll) * 100} className="h-2 mt-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle>Export Reports</CardTitle>
              <CardDescription>Download payroll reports in various formats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Payroll Summary</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Calculator className="h-6 w-6 mb-2" />
                  <span>Tax Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Clock className="h-6 w-6 mb-2" />
                  <span>Time Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Employee Details Dialog */}
      {selectedEmployee && (
        <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedEmployee.name}</DialogTitle>
              <DialogDescription>Employee payroll information and settings</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedEmployee.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedEmployee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedEmployee.name}</h3>
                  <p className="text-gray-600">{selectedEmployee.role}</p>
                  <Badge className={getStatusColor(selectedEmployee.status)}>{selectedEmployee.status}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Employee Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Employee ID:</strong> {selectedEmployee.employeeId}
                    </div>
                    <div>
                      <strong>Department:</strong> {selectedEmployee.department}
                    </div>
                    <div>
                      <strong>Hire Date:</strong> {format(parseISO(selectedEmployee.hireDate), "MMM d, yyyy")}
                    </div>
                    <div>
                      <strong>Hourly Rate:</strong> {formatCurrency(selectedEmployee.hourlyRate)}
                    </div>
                    <div>
                      <strong>Overtime Rate:</strong> {formatCurrency(selectedEmployee.overtimeRate)}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Payroll Settings</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Pay Frequency:</strong> {selectedEmployee.payrollSettings.payFrequency}
                    </div>
                    <div>
                      <strong>Tax Withholding:</strong> {selectedEmployee.payrollSettings.taxWithholding}%
                    </div>
                    <div>
                      <strong>Payment Method:</strong> {selectedEmployee.payrollSettings.paymentMethod}
                    </div>
                    <div>
                      <strong>Bank Account:</strong> {selectedEmployee.payrollSettings.bankAccount}
                    </div>
                  </div>
                </div>
              </div>

              {selectedEmployee.payrollSettings.benefits.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Benefits</h4>
                  <div className="space-y-2">
                    {selectedEmployee.payrollSettings.benefits.map((benefit) => (
                      <div key={benefit.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{benefit.name}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {benefit.type}
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <span>Employee: {formatCurrency(benefit.employeeContribution)}</span>
                          <span className="ml-2">Employer: {formatCurrency(benefit.employerContribution)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Employee
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  View Pay Stubs
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Pay Stub Details Dialog */}
      {selectedPayStub && (
        <Dialog open={!!selectedPayStub} onOpenChange={() => setSelectedPayStub(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Pay Stub Details</DialogTitle>
              <DialogDescription>
                Pay period: {format(parseISO(selectedPayStub.payPeriodStart), "MMM d")} -{" "}
                {format(parseISO(selectedPayStub.payPeriodEnd), "MMM d, yyyy")}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Employee Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Employee Information</h4>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Name:</strong> {employees.find((e) => e.id === selectedPayStub.employeeId)?.name}
                      </p>
                      <p>
                        <strong>Employee ID:</strong>{" "}
                        {employees.find((e) => e.id === selectedPayStub.employeeId)?.employeeId}
                      </p>
                      <p>
                        <strong>Pay Date:</strong> {format(parseISO(selectedPayStub.payDate), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Pay Period</h4>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Start Date:</strong> {format(parseISO(selectedPayStub.payPeriodStart), "MMM d, yyyy")}
                      </p>
                      <p>
                        <strong>End Date:</strong> {format(parseISO(selectedPayStub.payPeriodEnd), "MMM d, yyyy")}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <Badge className={getStatusColor(selectedPayStub.status)}>{selectedPayStub.status}</Badge>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Earnings and Deductions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">Earnings</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span>Regular Hours ({selectedPayStub.regularHours}h)</span>
                      <span>{formatCurrency(selectedPayStub.regularPay)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Overtime Hours ({selectedPayStub.overtimeHours}h)</span>
                      <span>{formatCurrency(selectedPayStub.overtimePay)}</span>
                    </div>
                    <div className="flex justify-between py-2 font-semibold text-lg border-t-2">
                      <span>Gross Pay</span>
                      <span>{formatCurrency(selectedPayStub.grossPay)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-red-600">Deductions</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span>Federal Tax</span>
                      <span>{formatCurrency(selectedPayStub.federalTax)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>State Tax</span>
                      <span>{formatCurrency(selectedPayStub.stateTax)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Social Security</span>
                      <span>{formatCurrency(selectedPayStub.socialSecurity)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Medicare</span>
                      <span>{formatCurrency(selectedPayStub.medicare)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Benefits</span>
                      <span>{formatCurrency(selectedPayStub.benefitDeductions)}</span>
                    </div>
                    <div className="flex justify-between py-2 font-semibold text-lg border-t-2">
                      <span>Total Deductions</span>
                      <span>{formatCurrency(selectedPayStub.totalDeductions)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Net Pay */}
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Net Pay</h3>
                <div className="text-4xl font-bold text-blue-600">{formatCurrency(selectedPayStub.netPay)}</div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Send className="h-4 w-4 mr-2" />
                  Email to Employee
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Payroll Dialog */}
      <Dialog open={showCreatePayroll} onOpenChange={setShowCreatePayroll}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Run Payroll</DialogTitle>
            <DialogDescription>Create a new payroll period for processing</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Pay Period Start</Label>
                <Input id="start-date" type="date" />
              </div>
              <div>
                <Label htmlFor="end-date">Pay Period End</Label>
                <Input id="end-date" type="date" />
              </div>
            </div>

            <div>
              <Label htmlFor="pay-date">Pay Date</Label>
              <Input id="pay-date" type="date" />
            </div>

            <div>
              <Label htmlFor="employees">Include Employees</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select employees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Active Employees</SelectItem>
                  <SelectItem value="operations">Operations Department</SelectItem>
                  <SelectItem value="management">Management Department</SelectItem>
                  <SelectItem value="custom">Custom Selection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Additional notes for this payroll period" />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Payroll Preview</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    <strong>Employees:</strong> 3
                  </p>
                  <p>
                    <strong>Total Hours:</strong> 256h
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Estimated Gross:</strong> {formatCurrency(7200)}
                  </p>
                  <p>
                    <strong>Estimated Net:</strong> {formatCurrency(5400)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowCreatePayroll(false)} className="flex-1">
                Cancel
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Save as Draft
              </Button>
              <Button onClick={() => setShowCreatePayroll(false)} className="flex-1">
                Process Payroll
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
