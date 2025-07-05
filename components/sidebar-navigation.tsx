"use client"

import {
  Home,
  Users,
  FileText,
  ShoppingBag,
  MessageSquare,
  Calendar,
  DollarSign,
  Shield,
  Smartphone,
  Banknote,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface SidebarNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
  userRole: string
  permissions: string[]
  onLogout: () => void
}

export function SidebarNavigation({
  activeSection,
  setActiveSection,
  userRole,
  permissions,
  onLogout,
}: SidebarNavigationProps) {
  const allSections = [
    { id: "dashboard", label: "Dashboard", icon: Home, requiredPermission: "dashboard" },
    { id: "employees", label: "Employees", icon: Users, requiredPermission: "employees" },
    { id: "contracts", label: "Contracts", icon: FileText, requiredPermission: "contracts" },
    { id: "marketplace", label: "Marketplace", icon: ShoppingBag, requiredPermission: "marketplace" },
    { id: "communication", label: "Communication", icon: MessageSquare, requiredPermission: "communication" },
    { id: "scheduling", label: "Scheduling", icon: Calendar, requiredPermission: "scheduling" },
    { id: "financial", label: "Financials", icon: DollarSign, requiredPermission: "financial" },
    { id: "quality", label: "Quality Control", icon: Shield, requiredPermission: "quality" },
    { id: "mobile", label: "Mobile Interface", icon: Smartphone, requiredPermission: "mobile" },
    { id: "payroll", label: "Payroll", icon: Banknote, requiredPermission: "payroll" },
  ]

  // Filter sections based on user permissions
  const availableSections = allSections.filter(
    (section) => permissions.includes("all") || permissions.includes(section.requiredPermission),
  )

  return (
    <div className="flex flex-col h-full">
      <nav className="space-y-2 flex-1">
        {availableSections.map((section) => (
          <Button
            key={section.id}
            variant="ghost"
            className={`w-full justify-start text-white hover:bg-gray-700 ${
              activeSection === section.id ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            <section.icon className="h-4 w-4 mr-2" />
            {section.label}
          </Button>
        ))}
      </nav>

      <div className="mt-auto pt-4">
        <Separator className="mb-4 bg-gray-600" />
        <div className="text-xs text-gray-400 mb-2 px-2">
          Role: <span className="capitalize text-white">{userRole}</span>
        </div>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-red-600" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
