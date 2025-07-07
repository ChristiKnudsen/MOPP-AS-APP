"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/language-selector"
import { LoginForm } from "@/components/auth/login-form"
import { UserTypeSelector } from "@/components/user-type-selector"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { DashboardStats } from "@/components/dashboard-stats"
import { EmployeeManagement } from "@/components/employee-management"
import { ContractManagement } from "@/components/contract-management"
import { MaterialMarketplace } from "@/components/material-marketplace"
import { CommunicationHub } from "@/components/communication-hub"
import { SchedulingSystem } from "@/components/scheduling-system"
import { FinancialDashboard } from "@/components/financial-dashboard"
import { QualityControl } from "@/components/quality-control"
import { MobileInterface } from "@/components/mobile-interface"
import { PayrollSystem } from "@/components/payroll-system"
import { useLanguage } from "@/contexts/language-context"
import { Globe, Users, Shield } from "lucide-react"

type UserType = "company" | "employee" | "customer" | "supplier"
type AppSection =
  | "dashboard"
  | "employees"
  | "contracts"
  | "marketplace"
  | "communication"
  | "scheduling"
  | "financial"
  | "quality"
  | "mobile"
  | "payroll"

export default function Home() {
  const { t } = useLanguage()
  const [currentView, setCurrentView] = useState<"welcome" | "login" | "dashboard">("welcome")
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null)
  const [activeSection, setActiveSection] = useState<AppSection>("dashboard")

  const handleUserTypeSelect = (userType: UserType) => {
    setSelectedUserType(userType)
    setCurrentView("login")
  }

  const handleLogin = () => {
    setCurrentView("dashboard")
  }

  const handleBackToWelcome = () => {
    setCurrentView("welcome")
    setSelectedUserType(null)
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardStats />
      case "employees":
        return <EmployeeManagement />
      case "contracts":
        return <ContractManagement />
      case "marketplace":
        return <MaterialMarketplace />
      case "communication":
        return <CommunicationHub />
      case "scheduling":
        return <SchedulingSystem />
      case "financial":
        return <FinancialDashboard />
      case "quality":
        return <QualityControl />
      case "mobile":
        return <MobileInterface />
      case "payroll":
        return <PayrollSystem />
      default:
        return <div className="p-8 text-center text-muted-foreground">{t.common.sectionNotFound}</div>
    }
  }

  if (currentView === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center space-x-4">
              <Image src="/mopp-logo.png" alt="MOPP Logo" width={60} height={60} className="rounded-lg" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MOPP</h1>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{t.common.tagline}</p>
              </div>
            </div>
            <LanguageSelector />
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">{t.welcome.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">{t.welcome.description}</p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <Shield className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>{t.welcome.features.transparency.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.welcome.features.transparency.description}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto text-green-600 mb-4" />
                <CardTitle>{t.welcome.features.collaboration.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.welcome.features.collaboration.description}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>{t.welcome.features.multilanguage.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.welcome.features.multilanguage.description}</CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* User Type Selection */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.welcome.chooseRole.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t.welcome.chooseRole.description}</p>
            </div>
            <UserTypeSelector onUserTypeSelect={handleUserTypeSelect} />
          </div>
        </div>
      </div>
    )
  }

  if (currentView === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <Image src="/mopp-logo.png" alt="MOPP Logo" width={50} height={50} className="rounded-lg" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">MOPP</h1>
                <Badge variant="secondary" className="text-xs">
                  {selectedUserType && t.userTypes[selectedUserType].title}
                </Badge>
              </div>
            </div>
            <LanguageSelector />
          </div>
          <LoginForm userType={selectedUserType!} onLogin={handleLogin} onBack={handleBackToWelcome} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <SidebarNavigation
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          userType={selectedUserType!}
        />
        <div className="flex-1 flex flex-col">
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
            <div className="flex justify-between items-center px-6 py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.dashboard.title}</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.dashboard.welcome}, {selectedUserType && t.userTypes[selectedUserType].title}
                </p>
              </div>
              <LanguageSelector />
            </div>
          </header>
          <main className="flex-1 overflow-auto">{renderActiveSection()}</main>
        </div>
      </div>
    </div>
  )
}
