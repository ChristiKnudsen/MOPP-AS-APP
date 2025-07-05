"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2, User, Users, Package, Eye, EyeOff } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import type { UserType } from "@/components/user-type-selector"

interface LoginFormProps {
  userType: UserType
  onLogin: (userType: UserType, userData: any) => void
  onBack: () => void
}

interface LoginCredentials {
  email: string
  password: string
  companyCode?: string
}

export function LoginForm({ userType, onLogin, onBack }: LoginFormProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<UserType>(userType)
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
    companyCode: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Mock user data for demonstration
  const mockUsers = {
    company: {
      email: "admin@cleantech.no",
      password: "admin123",
      userData: {
        id: "comp-1",
        name: "CleanTech Solutions",
        role: "admin",
        permissions: ["all"],
      },
    },
    employee: {
      email: "john.doe@cleantech.no",
      password: "emp123",
      userData: {
        id: "emp-1",
        name: "John Doe",
        role: "employee",
        companyId: "comp-1",
        permissions: ["dashboard", "communication", "scheduling", "quality", "mobile"],
      },
    },
    customer: {
      email: "customer@abc-corp.com",
      password: "cust123",
      userData: {
        id: "cust-1",
        name: "ABC Corporation",
        role: "customer",
        contractIds: ["CNT-2024-001"],
        permissions: ["dashboard", "contracts", "marketplace", "communication", "financial"],
      },
    },
    supplier: {
      email: "supplier@proclean.no",
      password: "supp123",
      userData: {
        id: "supp-1",
        name: "ProClean Equipment",
        role: "supplier",
        permissions: ["dashboard", "marketplace", "communication", "financial"],
      },
    },
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = mockUsers[activeTab]

      if (credentials.email === mockUser.email && credentials.password === mockUser.password) {
        // For company login, also check company code if provided
        if (activeTab === "company" && credentials.companyCode && credentials.companyCode !== "CLEAN001") {
          throw new Error("Invalid company code")
        }

        onLogin(activeTab, mockUser.userData)
      } else {
        throw new Error("Invalid email or password")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const getTabIcon = (userType: UserType) => {
    switch (userType) {
      case "company":
        return <Building2 className="h-4 w-4" />
      case "employee":
        return <User className="h-4 w-4" />
      case "customer":
        return <Users className="h-4 w-4" />
      case "supplier":
        return <Package className="h-4 w-4" />
    }
  }

  const getTabTitle = (userType: UserType) => {
    return t.userTypes[userType].title
  }

  const getDemoCredentials = (userType: UserType) => {
    const user = mockUsers[userType]
    return {
      email: user.email,
      password: user.password,
      companyCode: userType === "company" ? "CLEAN001" : undefined,
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img src="/mopp-logo.png" alt="MOPP Logo" className="w-12 h-12 object-contain" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MOPP</h1>
                <p className="text-sm text-gray-600">{t.common.tagline}</p>
              </div>
            </div>
            <LanguageSelector />
          </div>
          <CardTitle className="text-xl">{t.auth.login.title}</CardTitle>
          <CardDescription>{t.auth.login.subtitle}</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UserType)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="company" className="flex items-center gap-2">
                {getTabIcon("company")}
                <span className="hidden sm:inline">{getTabTitle("company")}</span>
              </TabsTrigger>
              <TabsTrigger value="employee" className="flex items-center gap-2">
                {getTabIcon("employee")}
                <span className="hidden sm:inline">{getTabTitle("employee")}</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="customer" className="flex items-center gap-2">
                  {getTabIcon("customer")}
                  <span className="hidden sm:inline">{getTabTitle("customer")}</span>
                </TabsTrigger>
                <TabsTrigger value="supplier" className="flex items-center gap-2">
                  {getTabIcon("supplier")}
                  <span className="hidden sm:inline">{getTabTitle("supplier")}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {(["company", "employee", "customer", "supplier"] as UserType[]).map((userType) => (
              <TabsContent key={userType} value={userType} className="mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {getTabIcon(userType)}
                      <h3 className="font-semibold">
                        {getTabTitle(userType)} {t.common.login}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">{t.userTypes[userType].description}</p>
                  </div>

                  {userType === "company" && (
                    <div className="space-y-2">
                      <Label htmlFor="companyCode">Company Code</Label>
                      <Input
                        id="companyCode"
                        type="text"
                        placeholder="Enter company code"
                        value={credentials.companyCode}
                        onChange={(e) => handleInputChange("companyCode", e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">{t.common.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.auth.login.emailPlaceholder}
                      value={credentials.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">{t.common.password}</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t.auth.login.passwordPlaceholder}
                        value={credentials.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? `${t.auth.login.loginButton}...` : t.auth.login.loginButton}
                  </Button>

                  {/* Demo credentials */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs font-medium text-blue-800 mb-2">Demo Credentials:</p>
                    <div className="text-xs text-blue-700 space-y-1">
                      <p>Email: {getDemoCredentials(userType).email}</p>
                      <p>Password: {getDemoCredentials(userType).password}</p>
                      {userType === "company" && <p>Company Code: CLEAN001</p>}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 bg-transparent"
                      onClick={() => {
                        const demo = getDemoCredentials(userType)
                        setCredentials({
                          email: demo.email,
                          password: demo.password,
                          companyCode: demo.companyCode || "",
                        })
                      }}
                    >
                      Use Demo Credentials
                    </Button>
                  </div>
                </form>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-6 text-center">
            <Button variant="ghost" onClick={onBack} className="text-sm">
              ← {t.auth.login.backToWelcome}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}





const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  setError("")
  
  // Log state and credentials for debugging
  console.log("Active Tab:", activeTab)
  console.log("Credentials:", credentials)

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = mockUsers[activeTab]
    console.log("Mock User:", mockUser)

    if (credentials.email === mockUser.email && credentials.password === mockUser.password) {
      // Mock company login check
      if (activeTab === "company" && credentials.companyCode && credentials.companyCode !== "CLEAN001") {
        throw new Error("Invalid company code")
      }

      onLogin(activeTab, mockUser.userData)
    } else {
      throw new Error("Invalid email or password")
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : "Login failed")
    console.error("Error during login:", err)
  } finally {
    setIsLoading(false)
  }
}
