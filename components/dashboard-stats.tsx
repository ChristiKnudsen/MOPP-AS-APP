"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Clock, DollarSign } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface DashboardStatsProps {
  language: Language
  userType: "company" | "employee" | "customer" | "supplier"
}

export function DashboardStats({ language, userType }: DashboardStatsProps) {
  const t = useTranslation(language)

  const getStats = () => {
    switch (userType) {
      case "company":
        return [
          {
            title: t.totalEmployees,
            value: "24",
            icon: Users,
            color: "text-blue-600",
          },
          {
            title: t.activeContracts,
            value: "12",
            icon: FileText,
            color: "text-green-600",
          },
          {
            title: t.pendingTasks,
            value: "8",
            icon: Clock,
            color: "text-orange-600",
          },
          {
            title: t.monthlyRevenue,
            value: "€45,230",
            icon: DollarSign,
            color: "text-purple-600",
          },
        ]
      case "employee":
        return [
          {
            title: "Shifts This Week",
            value: "5",
            icon: Clock,
            color: "text-blue-600",
          },
          {
            title: "Available Jobs",
            value: "3",
            icon: FileText,
            color: "text-green-600",
          },
          {
            title: "Messages",
            value: "2",
            icon: Users,
            color: "text-orange-600",
          },
          {
            title: "This Month Earnings",
            value: "€2,840",
            icon: DollarSign,
            color: "text-purple-600",
          },
        ]
      case "customer":
        return [
          {
            title: "Active Services",
            value: "2",
            icon: FileText,
            color: "text-blue-600",
          },
          {
            title: "Scheduled Cleanings",
            value: "4",
            icon: Clock,
            color: "text-green-600",
          },
          {
            title: "Preferred Cleaners",
            value: "3",
            icon: Users,
            color: "text-orange-600",
          },
          {
            title: "Monthly Cost",
            value: "€890",
            icon: DollarSign,
            color: "text-purple-600",
          },
        ]
      case "supplier":
        return [
          {
            title: "Products Listed",
            value: "156",
            icon: FileText,
            color: "text-blue-600",
          },
          {
            title: "Pending Orders",
            value: "23",
            icon: Clock,
            color: "text-green-600",
          },
          {
            title: "Active Customers",
            value: "89",
            icon: Users,
            color: "text-orange-600",
          },
          {
            title: "Monthly Sales",
            value: "€12,450",
            icon: DollarSign,
            color: "text-purple-600",
          },
        ]
      default:
        return []
    }
  }

  const stats = getStats()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
