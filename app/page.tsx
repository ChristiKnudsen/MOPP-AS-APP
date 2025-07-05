"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, ShoppingCart, Truck, Globe, Shield, MessageSquare } from "lucide-react"
import Image from "next/image"
import { LanguageSelector } from "@/components/language-selector"
import { LoginForm } from "@/components/auth/login-form"
import { UserTypeSelector } from "@/components/user-type-selector"
import { useLanguage } from "@/contexts/language-context"
import { getTranslations } from "@/lib/i18n"

export default function WelcomePage() {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null)
  const [showLogin, setShowLogin] = useState(false)
  const { language } = useLanguage()
  const t = getTranslations(language)

  if (showLogin) {
    return <LoginForm onBack={() => setShowLogin(false)} />
  }

  if (selectedUserType) {
    return <UserTypeSelector userType={selectedUserType} onBack={() => setSelectedUserType(null)} />
  }

  const userTypes = [
    {
      id: "company",
      title: t.userTypes.company.title,
      description: t.userTypes.company.description,
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      id: "employee",
      title: t.userTypes.employee.title,
      description: t.userTypes.employee.description,
      icon: Users,
      color: "bg-green-500",
    },
    {
      id: "customer",
      title: t.userTypes.customer.title,
      description: t.userTypes.customer.description,
      icon: ShoppingCart,
      color: "bg-purple-500",
    },
    {
      id: "supplier",
      title: t.userTypes.supplier.title,
      description: t.userTypes.supplier.description,
      icon: Truck,
      color: "bg-orange-500",
    },
  ]

  const features = [
    {
      icon: Shield,
      title: t.welcome.features.transparency.title,
      description: t.welcome.features.transparency.description,
    },
    {
      icon: MessageSquare,
      title: t.welcome.features.collaboration.title,
      description: t.welcome.features.collaboration.description,
    },
    {
      icon: Globe,
      title: t.welcome.features.multilanguage.title,
      description: t.welcome.features.multilanguage.description,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image src="/mopp-logo.png" alt="MOPP Logo" width={50} height={50} className="rounded-lg" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MOPP</h1>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{t.common.tagline}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          <Button onClick={() => setShowLogin(true)} variant="outline">
            {t.common.login}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge variant="secondary" className="mb-4">
          {t.welcome.features.multilanguage.title}
        </Badge>
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">{t.welcome.title}</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">{t.welcome.description}</p>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <feature.icon className="h-12 w-12 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* User Types Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.welcome.chooseRole.title}</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t.welcome.chooseRole.description}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userTypes.map((type) => (
            <Card
              key={type.id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => setSelectedUserType(type.id)}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <type.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg">{type.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{type.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
