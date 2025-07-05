"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, FileText, Clock, DollarSign, Package, Star, CheckCircle, AlertCircle } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface DashboardStatsProps {
  language: Language
  userType: "company" | "employee" | "customer" | "supplier"
  userData: any
}

export function DashboardStats({ language, userType, userData }: DashboardStatsProps) {
  const t = useTranslation(language)

  const getStats = () => {
    switch (userType) {
      case "company":
        return [
          {
            title: "Total Employees",
            value: "24",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
          },
          {
            title: "Active Contracts",
            value: "12",
            icon: FileText,
            color: "text-green-600",
            bgColor: "bg-green-50",
          },
          {
            title: "Pending Tasks",
            value: "8",
            icon: Clock,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
          },
          {
            title: "Monthly Revenue",
            value: "kr 245,230",
            icon: DollarSign,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
          },
        ]
      case "employee":
        return [
          {
            title: "Shifts This Week",
            value: "5",
            icon: Clock,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
          },
          {
            title: "Completed Tasks",
            value: "23",
            icon: CheckCircle,
            color: "text-green-600",
            bgColor: "bg-green-50",
          },
          {
            title: "Messages",
            value: "2",
            icon: Users,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
          },
          {
            title: "Performance Rating",
            value: "4.8",
            icon: Star,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
          },
        ]
      case "customer":
        return [
          {
            title: "Active Contracts",
            value: "1",
            icon: FileText,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
          },
          {
            title: "Scheduled Cleanings",
            value: "4",
            icon: Clock,
            color: "text-green-600",
            bgColor: "bg-green-50",
          },
          {
            title: "Service Rating",
            value: "4.9",
            icon: Star,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
          },
          {
            title: "Monthly Cost",
            value: "kr 8,900",
            icon: DollarSign,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
          },
        ]
      case "supplier":
        return [
          {
            title: "Products Listed",
            value: "156",
            icon: Package,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
          },
          {
            title: "Pending Orders",
            value: "23",
            icon: Clock,
            color: "text-green-600",
            bgColor: "bg-green-50",
          },
          {
            title: "Active Customers",
            value: "89",
            icon: Users,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
          },
          {
            title: "Monthly Sales",
            value: "kr 112,450",
            icon: DollarSign,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
          },
        ]
      default:
        return []
    }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {userData.name}!</h2>
        <p className="text-gray-600">
          {userType === "company" && "Manage your cleaning operations and team from your dashboard."}
          {userType === "employee" && "Check your schedule and stay connected with your team."}
          {userType === "customer" && "Monitor your cleaning services and communicate with your team."}
          {userType === "supplier" && "Manage your products and track orders in the marketplace."}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Role-specific Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userType === "company" && (
          <>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Manage Employees</h3>
                <p className="text-sm text-gray-600">Add, edit, and manage your cleaning team</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Create Contract</h3>
                <p className="text-sm text-gray-600">Set up new cleaning contracts</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Financial Reports</h3>
                <p className="text-sm text-gray-600">View revenue and expense reports</p>
              </CardContent>
            </Card>
          </>
        )}

        {userType === "employee" && (
          <>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">View Schedule</h3>
                <p className="text-sm text-gray-600">Check your upcoming shifts and tasks</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Complete Tasks</h3>
                <p className="text-sm text-gray-600">Mark tasks as completed</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Team Chat</h3>
                <p className="text-sm text-gray-600">Communicate with your team</p>
              </CardContent>
            </Card>
          </>
        )}

        {userType === "customer" && (
          <>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">View Contract</h3>
                <p className="text-sm text-gray-600">Review your cleaning contract details</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Rate Service</h3>
                <p className="text-sm text-gray-600">Provide feedback on cleaning quality</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">View Invoices</h3>
                <p className="text-sm text-gray-600">Check your billing and payments</p>
              </CardContent>
            </Card>
          </>
        )}

        {userType === "supplier" && (
          <>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Manage Products</h3>
                <p className="text-sm text-gray-600">Add and update your product catalog</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Process Orders</h3>
                <p className="text-sm text-gray-600">Manage incoming orders and shipments</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Sales Analytics</h3>
                <p className="text-sm text-gray-600">Track your sales performance</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
