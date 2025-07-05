"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, User, Users, Package } from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

export type UserType = "company" | "employee" | "customer" | "supplier"

interface UserTypeSelectorProps {
  language: Language
  onSelectUserType: (type: UserType) => void
}

export function UserTypeSelector({ language, onSelectUserType }: UserTypeSelectorProps) {
  const t = useTranslation(language)

  const userTypes = [
    {
      type: "company" as UserType,
      title: t.cleaningCompany,
      description: t.employeeManagement,
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      type: "employee" as UserType,
      title: t.employee,
      description: t.transparentCommunication,
      icon: User,
      color: "bg-green-500",
    },
    {
      type: "customer" as UserType,
      title: t.customer,
      description: t.transparentCommunication,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      type: "supplier" as UserType,
      title: t.supplier,
      description: t.materialSupplies,
      icon: Package,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {userTypes.map((userType) => {
        const Icon = userType.icon
        return (
          <Card key={userType.type} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className={`w-16 h-16 ${userType.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <CardTitle>{userType.title}</CardTitle>
              <CardDescription>{userType.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => onSelectUserType(userType.type)}>
                {t.add} {userType.title}
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
