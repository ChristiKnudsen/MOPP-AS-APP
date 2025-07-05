"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageSelector } from "@/components/language-selector"
import { UserTypeSelector, type UserType } from "@/components/user-type-selector"
import { DashboardStats } from "@/components/dashboard-stats"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { EmployeeManagement } from "@/components/employee-management"
import { ContractManagement } from "@/components/contract-management"
import { MaterialMarketplace } from "@/components/material-marketplace"
import { CommunicationHub } from "@/components/communication-hub"
import { SchedulingSystem } from "@/components/scheduling-system"
import { FinancialDashboard } from "@/components/financial-dashboard"
import { QualityControl } from "@/components/quality-control"
import { MobileInterface } from "@/components/mobile-interface"
import { PayrollSystem } from "@/components/payroll-system"
import { LoginForm } from "@/components/auth/login-form"
import type { Language } from "@/lib/i18n"
import { Shield, Globe, Users } from "lucide-react"
import { useSearchParams } from "next/navigation"

interface AuthenticatedUser {
  id: string
  name: string
  role: string
  userType: UserType
  permissions: string[]
  [key: string]: any
}

export default function MOPPApp() {
  const searchParams = useSearchParams()
  const language: Language = (searchParams.get("lang") as Language) || "en"
  const [userType, setUserType] = useState<UserType | null>(null)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AuthenticatedUser | null>(null)
  const [showLogin, setShowLogin] = useState(false)

  const handleUserTypeSelection = (type: UserType) => {
    setUserType(type)
    setShowLogin(true)
  }

  const handleLogin = (selectedUserType: UserType, userData: any) => {
    setUser({
      ...userData,
      userType: selectedUserType,
    })
    setUserType(selectedUserType)
    setIsAuthenticated(true)
    setShowLogin(false)
  }

  const handleLogout = () => {
    setUser(null)
    setUserType(null)
    setIsAuthenticated(false)
    setShowLogin(false)
    setActiveSection("dashboard")
  }

  const handleBackToWelcome = () => {
    setShowLogin(false)
    setUserType(null)
  }

  const renderContent = () => {
    if (!user) return null

    switch (activeSection) {
      case "dashboard":
        return <DashboardStats language={language} userType={user.userType} userData={user} />
      case "employees":
        return <EmployeeManagement language={language} />
      case "contracts":
        return <ContractManagement language={language} userRole={user.role} userData={user} />
      case "marketplace":
        return <MaterialMarketplace language={language} />
      case "communication":
        return <CommunicationHub language={language} />
      case "scheduling":
        return <SchedulingSystem language={language} />
      case "financial":
        return <FinancialDashboard language={language} />
      case "quality":
        return <QualityControl language={language} />
      case "mobile":
        return <MobileInterface language={language} />
      case "payroll":
        return <PayrollSystem language={language} />
      default:
        return <div>Section not found</div>
    }
  }

  // Show login form
  if (showLogin) {
    return <LoginForm language={language} onLogin={handleLogin} onBack={handleBackToWelcome} />
  }

  // Show welcome screen if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <img src="/mopp-logo.png" alt="MOPP Logo" className="w-16 h-16 object-contain" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">MOPP</h1>
                <p className="text-gray-600">VI GJØR RENT!</p>
              </div>
            </div>
            <LanguageSelector currentLanguage={language} />
          </div>

          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to MOPP</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The comprehensive platform connecting cleaning companies, employees, customers, and suppliers for
              transparent and efficient operations.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  Promoting transparency in the cleaning industry with clear communication and fair practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  Seamless collaboration between companies, employees, and customers on one platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Multi-Language</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  Available in English, Norwegian, Portuguese, French, Swedish, and Danish.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* User Type Selection */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Choose Your Role</CardTitle>
              <CardDescription>
                Select how you want to use MOPP to get started with the right features for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserTypeSelector language={language} onSelectUserType={handleUserTypeSelection} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Show authenticated app
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <img src="/mopp-logo.png" alt="MOPP Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-white">MOPP</h1>
              <p className="text-xs text-gray-300 capitalize">{user.userType}</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <SidebarNavigation
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            userRole={user.role}
            permissions={user.permissions}
            onLogout={handleLogout}
          />
        </div>

        <div className="mt-auto p-4 border-t border-gray-700">
          <LanguageSelector currentLanguage={language} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
    </div>
  )
}
