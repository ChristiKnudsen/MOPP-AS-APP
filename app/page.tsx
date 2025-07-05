"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, User, Users, Package, Shield, MessageSquare, Globe } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { LoginForm } from "@/components/auth/login-form"
import type { UserType } from "@/components/user-type-selector"
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

type AppState = "welcome" | "login" | "dashboard"

interface UserData {
  id: string
  name: string
  role: string
  permissions: string[]
  companyId?: string
  contractIds?: string[]
}

export default function HomePage() {
  const { language, t } = useLanguage()
  const [appState, setAppState] = useState<AppState>("welcome")
  const [currentUserType, setCurrentUserType] = useState<UserType | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [activeSection, setActiveSection] = useState("dashboard")

  const handleUserTypeSelect = (userType: UserType) => {
    setCurrentUserType(userType)
    setAppState("login")
  }

  const handleLogin = (userType: UserType, loginUserData: UserData) => {
    setCurrentUserType(userType)
    setUserData(loginUserData)
    setAppState("dashboard")
  }

  const handleLogout = () => {
    setCurrentUserType(null)
    setUserData(null)
    setActiveSection("dashboard")
    setAppState("welcome")
  }

  const handleBackToWelcome = () => {
    setCurrentUserType(null)
    setAppState("welcome")
  }

  const renderActiveSection = () => {
    if (!userData || !currentUserType) return null

    switch (activeSection) {
      case "dashboard":
        return <DashboardStats userType={currentUserType} userData={userData} />
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
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">{t.common.sectionNotFound}</p>
          </div>
        )
    }
  }

  if (appState === "login" && currentUserType) {
    return <LoginForm userType={currentUserType} onLogin={handleLogin} onBack={handleBackToWelcome} />
  }

  if (appState === "dashboard" && userData && currentUserType) {
    return (
      <div className="flex h-screen bg-gray-50">
        <SidebarNavigation
          userType={currentUserType}
          userData={userData}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeSection === "dashboard"
                    ? t.dashboard.title
                    : t.navigation[activeSection as keyof typeof t.navigation]}
                </h1>
                <p className="text-gray-600">
                  {t.dashboard.welcome}, {userData.name}
                </p>
              </div>
              <LanguageSelector />
            </div>
            {renderActiveSection()}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <img src="/mopp-logo.png" alt="MOPP Logo" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">MOPP</h1>
              <p className="text-sm text-gray-600">{t.common.tagline}</p>
            </div>
          </div>
          <LanguageSelector />
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.welcome.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.welcome.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>{t.welcome.features.transparency.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t.welcome.features.transparency.description}</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>{t.welcome.features.collaboration.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t.welcome.features.collaboration.description}</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>{t.welcome.features.multilanguage.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t.welcome.features.multilanguage.description}</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.welcome.chooseRole.title}</h3>
            <p className="text-gray-600">{t.welcome.chooseRole.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleUserTypeSelect("company")}
            >
              <CardHeader className="text-center">
                <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">{t.userTypes.company.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{t.userTypes.company.description}</CardDescription>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleUserTypeSelect("employee")}
            >
              <CardHeader className="text-center">
                <User className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">{t.userTypes.employee.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{t.userTypes.employee.description}</CardDescription>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleUserTypeSelect("customer")}
            >
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-lg">{t.userTypes.customer.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{t.userTypes.customer.description}</CardDescription>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleUserTypeSelect("supplier")}
            >
              <CardHeader className="text-center">
                <Package className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-lg">{t.userTypes.supplier.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{t.userTypes.supplier.description}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
