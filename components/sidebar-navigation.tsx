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
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function SidebarNavigation({ activeSection, setActiveSection }: SidebarNavigationProps) {
  const sections = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "employees", label: "Employees", icon: Users },
    { id: "contracts", label: "Contracts", icon: FileText },
    { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
    { id: "communication", label: "Communication", icon: MessageSquare },
    { id: "scheduling", label: "Scheduling", icon: Calendar },
    { id: "financial", label: "Financials", icon: DollarSign },
    { id: "quality", label: "Quality Control", icon: Shield },
    { id: "mobile", label: "Mobile Interface", icon: Smartphone },
    { id: "payroll", label: "Payroll", icon: Banknote },
  ]

  return (
    <nav className="space-y-2">
      {sections.map((section) => (
        <Button
          key={section.id}
          variant="ghost"
          className={`w-full justify-start ${activeSection === section.id ? "bg-gray-700" : ""}`}
          onClick={() => setActiveSection(section.id)}
        >
          <section.icon className="h-4 w-4 mr-2" />
          {section.label}
        </Button>
      ))}
    </nav>
  )
}
