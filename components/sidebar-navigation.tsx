"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Package,
  MessageSquare,
  User,
  Settings,
  Building2,
  ShoppingCart,
  Clock,
  Star,
} from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"
import type { UserType } from "./user-type-selector"

interface SidebarNavigationProps {
  language: Language
  userType: UserType
  activeSection: string
  onSectionChange: (section: string) => void
}

export function SidebarNavigation({ language, userType, activeSection, onSectionChange }: SidebarNavigationProps) {
  const t = useTranslation(language)

  const getNavigationItems = () => {
    const commonItems = [
      { id: "dashboard", label: t.dashboard, icon: LayoutDashboard },
      { id: "profile", label: t.profile, icon: User },
      { id: "communication", label: t.communication, icon: MessageSquare },
      { id: "settings", label: t.settings, icon: Settings },
    ]

    switch (userType) {
      case "company":
        return [
          { id: "dashboard", label: t.dashboard, icon: LayoutDashboard },
          { id: "employees", label: t.employees, icon: Users },
          { id: "contracts", label: t.contracts, icon: FileText },
          { id: "schedule", label: t.schedule, icon: Calendar },
          { id: "materials", label: t.materials, icon: Package },
          { id: "communication", label: t.communication, icon: MessageSquare },
          { id: "profile", label: t.profile, icon: Building2 },
          { id: "settings", label: t.settings, icon: Settings },
        ]
      case "employee":
        return [
          { id: "dashboard", label: t.dashboard, icon: LayoutDashboard },
          { id: "schedule", label: t.schedule, icon: Calendar },
          { id: "jobs", label: "Available Jobs", icon: FileText },
          { id: "shifts", label: "Shift Exchange", icon: Clock },
          { id: "communication", label: t.communication, icon: MessageSquare },
          { id: "profile", label: t.profile, icon: User },
          { id: "settings", label: t.settings, icon: Settings },
        ]
      case "customer":
        return [
          { id: "dashboard", label: t.dashboard, icon: LayoutDashboard },
          { id: "services", label: "My Services", icon: FileText },
          { id: "cleaners", label: "Find Cleaners", icon: Users },
          { id: "schedule", label: t.schedule, icon: Calendar },
          { id: "reviews", label: "Reviews", icon: Star },
          { id: "communication", label: t.communication, icon: MessageSquare },
          { id: "profile", label: t.profile, icon: User },
          { id: "settings", label: t.settings, icon: Settings },
        ]
      case "supplier":
        return [
          { id: "dashboard", label: t.dashboard, icon: LayoutDashboard },
          { id: "products", label: "Products", icon: Package },
          { id: "orders", label: "Orders", icon: ShoppingCart },
          { id: "customers", label: "Customers", icon: Users },
          { id: "communication", label: t.communication, icon: MessageSquare },
          { id: "profile", label: t.profile, icon: Building2 },
          { id: "settings", label: t.settings, icon: Settings },
        ]
      default:
        return commonItems
    }
  }

  const navigationItems = getNavigationItems()

  return (
    <ScrollArea className="h-full py-6">
      <div className="space-y-2 px-3">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={cn("w-full justify-start gap-2", activeSection === item.id && "bg-accent")}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          )
        })}
      </div>
    </ScrollArea>
  )
}
