"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { UserTypeSelector, type UserType } from "@/components/user-type-selector"
import { DashboardStats } from "@/components/dashboard-stats"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { type Language, useTranslation } from "@/lib/i18n"
import { Shield, Globe, Users } from "lucide-react"
import { EmployeeManagement } from "@/components/employee-management"
import { ContractManagement } from "@/components/contract-management"
import { MaterialMarketplace } from "@/components/material-marketplace"

export default function MOPPApp() {
  const [language, setLanguage] = useState<Language>("en")
  const [userType, setUserType] = useState<UserType | null>(null)
  const [activeSection, setActiveSection] = useState("dashboard")
  const t = useTranslation(language)

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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.welcome}</h2>
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
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <img src="/mopp-logo.png" alt="MOPP Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">MOPP</h1>
              <p className="text-xs text-gray-500 capitalize">{userType}</p>
            </div>
          </div>
        </div>

        <SidebarNavigation
          language={language}
          userType={userType}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">{t.dashboard}</h2>
            <div className="flex items-center gap-4">
              <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
              <Button variant="outline" onClick={() => setUserType(null)}>
                Switch Role
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              <DashboardStats language={language} userType={userType} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">New contract signed with ABC Corp</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Employee shift updated</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Material order pending approval</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {userType === "company" && (
                      <>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          Add New Employee
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          Create Contract
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          Order Materials
                        </Button>
                      </>
                    )}
                    {userType === "employee" && (
                      <>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          View Available Jobs
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          Request Shift Exchange
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          Update Profile
                        </Button>
                      </>
                    )}
                    {userType === "customer" && (
                      <>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          Book Cleaning Service
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          Browse Cleaners
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          Leave Review
                        </Button>
                      </>
                    )}
                    {userType === "supplier" && (
                      <>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          Add New Product
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          Process Orders
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          View Analytics
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === "employees" && userType === "company" && <EmployeeManagement language={language} />}

          {activeSection === "contracts" && userType === "company" && <ContractManagement language={language} />}

          {activeSection === "materials" && <MaterialMarketplace language={language} />}

          {activeSection !== "dashboard" &&
            activeSection !== "employees" &&
            activeSection !== "contracts" &&
            activeSection !== "materials" && (
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{activeSection}</CardTitle>
                  <CardDescription>This section is under development. More features coming soon!</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    The {activeSection} module will provide comprehensive tools for managing your {userType} operations.
                  </p>
                </CardContent>
              </Card>
            )}
        </div>
      </div>
    </div>
  )
}
