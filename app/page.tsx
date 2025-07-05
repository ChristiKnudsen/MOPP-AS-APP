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
import type { Language } from "@/lib/i18n"
import { Shield, Globe, Users } from "lucide-react"

export default function MOPPApp() {
  const [language, setLanguage] = useState<Language>("en")
  const [userType, setUserType] = useState<UserType | null>(null)
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardStats language={language} userType={userType} />
      case "employees":
        return <EmployeeManagement language={language} />
      case "contracts":
        return <ContractManagement language={language} />
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

  if (!userType) {
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
            <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
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
              <UserTypeSelector language={language} onSelectUserType={setUserType} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <img src="/mopp-logo.png" alt="MOPP Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">MOPP</h1>
              <p className="text-xs text-gray-500 capitalize">{userType}</p>
            </div>
          </div>
        </div>

        <SidebarNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="mt-4">
          <LanguageSelector language={language} setLanguage={setLanguage} />
          <UserTypeSelector userType={userType} setUserType={setUserType} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">{renderContent()}</main>
    </div>
  )
}
