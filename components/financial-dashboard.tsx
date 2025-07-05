"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Receipt,
  FileText,
  CalendarIcon,
  Download,
  Plus,
  Eye,
  Edit,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  User,
  Search,
  BarChart3,
  PieChart,
  LineChart,
  Calculator,
  Target,
} from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"
import { format, parseISO } from "date-fns"

interface FinancialDashboardProps {
  language: Language
}

interface Invoice {
  id: string
  invoiceNumber: string
  clientName: string
  clientEmail: string
  amount: number
  tax: number
  total: number
  issueDate: string
  dueDate: string
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  contractId?: string
  services: InvoiceService[]
  notes?: string
  paymentTerms: string
  createdBy: string
  createdAt: string
  paidAt?: string
  paymentMethod?: string
}

interface InvoiceService {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

interface Payment {
  id: string
  invoiceId: string
  amount: number
  method: "bank_transfer" | "credit_card" | "cash" | "check"
  reference: string
  date: string
  status: "pending" | "completed" | "failed"
  notes?: string
}

interface Expense {
  id: string
  description: string
  category: string
  amount: number
  date: string
  vendor: string
  receipt?: string
  status: "pending" | "approved" | "rejected"
  approvedBy?: string
  approvedAt?: string
  notes?: string
  tags: string[]
}

interface Budget {
  id: string
  name: string
  category: string
  allocated: number
  spent: number
  period: "monthly" | "quarterly" | "yearly"
  startDate: string
  endDate: string
  status: "active" | "exceeded" | "completed"
}

interface FinancialReport {
  period: string
  revenue: number
  expenses: number
  profit: number
  profitMargin: number
  outstandingInvoices: number
  paidInvoices: number
  averagePaymentTime: number
}

export function FinancialDashboard({ language }: FinancialDashboardProps) {
  const t = useTranslation(language)
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [showCreateInvoice, setShowCreateInvoice] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Sample data
  const invoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      clientName: "ABC Corporation",
      clientEmail: "billing@abc-corp.com",
      amount: 2500.0,
      tax: 625.0,
      total: 3125.0,
      issueDate: "2024-01-15",
      dueDate: "2024-02-14",
      status: "sent",
      contractId: "CNT-2024-001",
      services: [
        {
          id: "1",
          description: "Office cleaning services - January",
          quantity: 20,
          rate: 125.0,
          amount: 2500.0,
        },
      ],
      paymentTerms: "Net 30",
      createdBy: "John Smith",
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      clientName: "Mall Management Ltd",
      clientEmail: "finance@mallmgmt.com",
      amount: 4800.0,
      tax: 1200.0,
      total: 6000.0,
      issueDate: "2024-01-10",
      dueDate: "2024-01-25",
      status: "paid",
      contractId: "CNT-2024-002",
      services: [
        {
          id: "1",
          description: "Deep cleaning services",
          quantity: 1,
          rate: 4800.0,
          amount: 4800.0,
        },
      ],
      paymentTerms: "Net 15",
      createdBy: "Sarah Johnson",
      createdAt: "2024-01-10T14:00:00Z",
      paidAt: "2024-01-24T16:30:00Z",
      paymentMethod: "bank_transfer",
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      clientName: "Restaurant Group",
      clientEmail: "accounts@restaurant.com",
      amount: 1800.0,
      tax: 450.0,
      total: 2250.0,
      issueDate: "2024-01-05",
      dueDate: "2024-01-20",
      status: "overdue",
      services: [
        {
          id: "1",
          description: "Kitchen deep cleaning",
          quantity: 12,
          rate: 150.0,
          amount: 1800.0,
        },
      ],
      paymentTerms: "Net 15",
      createdBy: "Mike Wilson",
      createdAt: "2024-01-05T09:00:00Z",
    },
  ]

  const payments: Payment[] = [
    {
      id: "1",
      invoiceId: "2",
      amount: 6000.0,
      method: "bank_transfer",
      reference: "TXN-20240124-001",
      date: "2024-01-24",
      status: "completed",
    },
    {
      id: "2",
      invoiceId: "1",
      amount: 1500.0,
      method: "credit_card",
      reference: "CC-20240120-002",
      date: "2024-01-20",
      status: "completed",
      notes: "Partial payment",
    },
  ]

  const expenses: Expense[] = [
    {
      id: "1",
      description: "Cleaning supplies - January batch",
      category: "Supplies",
      amount: 850.0,
      date: "2024-01-12",
      vendor: "CleanTech Solutions",
      status: "approved",
      approvedBy: "John Smith",
      approvedAt: "2024-01-13T10:00:00Z",
      tags: ["supplies", "monthly"],
    },
    {
      id: "2",
      description: "Vehicle fuel and maintenance",
      category: "Transportation",
      amount: 320.0,
      date: "2024-01-10",
      vendor: "Auto Service Center",
      status: "approved",
      approvedBy: "Sarah Johnson",
      approvedAt: "2024-01-11T14:30:00Z",
      tags: ["vehicle", "maintenance"],
    },
    {
      id: "3",
      description: "New vacuum cleaner equipment",
      category: "Equipment",
      amount: 1200.0,
      date: "2024-01-08",
      vendor: "ProClean Equipment",
      status: "pending",
      tags: ["equipment", "tools"],
    },
  ]

  const budgets: Budget[] = [
    {
      id: "1",
      name: "Supplies Budget",
      category: "Supplies",
      allocated: 5000.0,
      spent: 2850.0,
      period: "monthly",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      status: "active",
    },
    {
      id: "2",
      name: "Equipment Budget",
      category: "Equipment",
      allocated: 3000.0,
      spent: 3200.0,
      period: "quarterly",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "exceeded",
    },
    {
      id: "3",
      name: "Marketing Budget",
      category: "Marketing",
      allocated: 2000.0,
      spent: 450.0,
      period: "monthly",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      status: "active",
    },
  ]

  const currentReport: FinancialReport = {
    period: "January 2024",
    revenue: 11375.0,
    expenses: 2370.0,
    profit: 9005.0,
    profitMargin: 79.2,
    outstandingInvoices: 5375.0,
    paidInvoices: 6000.0,
    averagePaymentTime: 18,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
      case "completed":
      case "approved":
        return "bg-green-100 text-green-800"
      case "sent":
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
      case "failed":
      case "exceeded":
        return "bg-red-100 text-red-800"
      case "draft":
      case "cancelled":
      case "rejected":
        return "bg-gray-100 text-gray-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalRevenue = invoices.reduce((sum, invoice) => sum + (invoice.status === "paid" ? invoice.total : 0), 0)
  const totalOutstanding = invoices.reduce(
    (sum, invoice) => sum + (invoice.status !== "paid" && invoice.status !== "cancelled" ? invoice.total : 0),
    0,
  )
  const totalExpenses = expenses.reduce((sum, expense) => sum + (expense.status === "approved" ? expense.amount : 0), 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("no-NO", {
      style: "currency",
      currency: "NOK",
    }).format(amount)
  }

  const calculateBudgetPercentage = (spent: number, allocated: number) => {
    return Math.min((spent / allocated) * 100, 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
          <p className="text-gray-600">Track revenue, expenses, and financial performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowCreateInvoice(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Receipt className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{formatCurrency(totalOutstanding)}</p>
                <p className="text-sm text-gray-600">Outstanding</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-orange-600" />
                  <span className="text-xs text-orange-600">{currentReport.averagePaymentTime} days avg</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  <span className="text-xs text-red-600">-5.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{formatCurrency(totalRevenue - totalExpenses)}</p>
                <p className="text-sm text-gray-600">Net Profit</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-purple-600">{currentReport.profitMargin}% margin</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Revenue Trend
                </CardTitle>
                <CardDescription>Monthly revenue over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Revenue chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expense Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Expense Breakdown
                </CardTitle>
                <CardDescription>Expenses by category this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Supplies", "Transportation", "Equipment", "Marketing"].map((category, index) => {
                    const categoryExpenses = expenses.filter((e) => e.category === category && e.status === "approved")
                    const total = categoryExpenses.reduce((sum, e) => sum + e.amount, 0)
                    const percentage = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0

                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{category}</span>
                          <span className="font-medium">{formatCurrency(total)}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <div className="text-xs text-gray-600 text-right">
                          {percentage.toFixed(1)}% of total expenses
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Financial Activity</CardTitle>
              <CardDescription>Latest invoices, payments, and expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Recent Invoices */}
                <div>
                  <h4 className="font-medium mb-2">Recent Invoices</h4>
                  <div className="space-y-2">
                    {invoices.slice(0, 3).map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="font-medium text-sm">{invoice.invoiceNumber}</p>
                            <p className="text-xs text-gray-600">{invoice.clientName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{formatCurrency(invoice.total)}</p>
                          <Badge className={`text-xs ${getStatusColor(invoice.status)}`}>{invoice.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Expenses */}
                <div>
                  <h4 className="font-medium mb-2">Recent Expenses</h4>
                  <div className="space-y-2">
                    {expenses.slice(0, 3).map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-3">
                          <Receipt className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="font-medium text-sm">{expense.description}</p>
                            <p className="text-xs text-gray-600">{expense.vendor}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{formatCurrency(expense.amount)}</p>
                          <Badge className={`text-xs ${getStatusColor(expense.status)}`}>{expense.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Invoices List */}
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{invoice.invoiceNumber}</h3>
                        <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span>{invoice.clientName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                          <span>Due: {format(parseISO(invoice.dueDate), "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span>{formatCurrency(invoice.total)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span>{invoice.createdBy}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedInvoice(invoice)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      {invoice.status === "draft" && (
                        <Button size="sm">
                          <Send className="h-3 w-3 mr-1" />
                          Send
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium ml-2">{formatCurrency(invoice.amount)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Tax:</span>
                        <span className="font-medium ml-2">{formatCurrency(invoice.tax)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Total:</span>
                        <span className="font-bold ml-2">{formatCurrency(invoice.total)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="space-y-4">
            {payments.map((payment) => {
              const invoice = invoices.find((inv) => inv.id === payment.invoiceId)
              return (
                <Card key={payment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">Payment #{payment.reference}</h3>
                          <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <span>Invoice: {invoice?.invoiceNumber}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-gray-400" />
                            <span>{format(parseISO(payment.date), "MMM d, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-gray-400" />
                            <span className="capitalize">{payment.method.replace("_", " ")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{formatCurrency(payment.amount)}</span>
                          </div>
                        </div>

                        {payment.notes && <p className="text-sm text-gray-600 mt-2">{payment.notes}</p>}
                      </div>

                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="space-y-4">
            {expenses.map((expense) => (
              <Card key={expense.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{expense.description}</h3>
                        <Badge className={getStatusColor(expense.status)}>{expense.status}</Badge>
                        <Badge variant="secondary">{expense.category}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span>{expense.vendor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                          <span>{format(parseISO(expense.date), "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{formatCurrency(expense.amount)}</span>
                        </div>
                      </div>

                      {expense.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {expense.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {expense.approvedBy && expense.approvedAt && (
                        <p className="text-xs text-gray-600">
                          Approved by {expense.approvedBy} on{" "}
                          {format(parseISO(expense.approvedAt), "MMM d, yyyy HH:mm")}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      {expense.status === "pending" && (
                        <>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="budgets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgets.map((budget) => {
              const percentage = calculateBudgetPercentage(budget.spent, budget.allocated)
              const remaining = budget.allocated - budget.spent

              return (
                <Card key={budget.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{budget.name}</h3>
                      <Badge className={getStatusColor(budget.status)}>{budget.status}</Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Spent</span>
                          <span className="font-medium">{formatCurrency(budget.spent)}</span>
                        </div>
                        <Progress value={percentage} className="h-3" />
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span>{percentage.toFixed(1)}% used</span>
                          <span>{formatCurrency(budget.allocated)} allocated</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Remaining</p>
                          <p className={`font-medium ${remaining >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {formatCurrency(remaining)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Period</p>
                          <p className="font-medium capitalize">{budget.period}</p>
                        </div>
                      </div>

                      <div className="text-xs text-gray-600">
                        {format(parseISO(budget.startDate), "MMM d")} -{" "}
                        {format(parseISO(budget.endDate), "MMM d, yyyy")}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>{currentReport.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="font-medium">Total Revenue</span>
                    <span className="font-bold text-green-600">{formatCurrency(currentReport.revenue)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                    <span className="font-medium">Total Expenses</span>
                    <span className="font-bold text-red-600">{formatCurrency(currentReport.expenses)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="font-medium">Net Profit</span>
                    <span className="font-bold text-blue-600">{formatCurrency(currentReport.profit)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                    <span className="font-medium">Profit Margin</span>
                    <span className="font-bold text-purple-600">{currentReport.profitMargin}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invoice Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Analytics</CardTitle>
                <CardDescription>Payment performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Outstanding Invoices</span>
                    <span className="font-bold">{formatCurrency(currentReport.outstandingInvoices)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Paid Invoices</span>
                    <span className="font-bold">{formatCurrency(currentReport.paidInvoices)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Average Payment Time</span>
                    <span className="font-bold">{currentReport.averagePaymentTime} days</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Collection Rate</span>
                    <span className="font-bold">92.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle>Export Reports</CardTitle>
              <CardDescription>Download financial reports in various formats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Profit & Loss</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Receipt className="h-6 w-6 mb-2" />
                  <span>Invoice Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Calculator className="h-6 w-6 mb-2" />
                  <span>Tax Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Invoice Details Dialog */}
      {selectedInvoice && (
        <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedInvoice.invoiceNumber}</DialogTitle>
              <DialogDescription>Invoice details and payment information</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(selectedInvoice.status)}>{selectedInvoice.status}</Badge>
                {selectedInvoice.contractId && <Badge variant="secondary">{selectedInvoice.contractId}</Badge>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Client Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedInvoice.clientName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedInvoice.clientEmail}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Invoice Details</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Issue Date:</strong> {format(parseISO(selectedInvoice.issueDate), "MMM d, yyyy")}
                    </p>
                    <p>
                      <strong>Due Date:</strong> {format(parseISO(selectedInvoice.dueDate), "MMM d, yyyy")}
                    </p>
                    <p>
                      <strong>Payment Terms:</strong> {selectedInvoice.paymentTerms}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Services</h4>
                <div className="space-y-2">
                  {selectedInvoice.services.map((service) => (
                    <div key={service.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{service.description}</p>
                        <p className="text-xs text-gray-600">
                          {service.quantity} × {formatCurrency(service.rate)}
                        </p>
                      </div>
                      <span className="font-medium">{formatCurrency(service.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(selectedInvoice.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>{formatCurrency(selectedInvoice.tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>{formatCurrency(selectedInvoice.total)}</span>
                  </div>
                </div>
              </div>

              {selectedInvoice.notes && (
                <div>
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedInvoice.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Send className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Invoice
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Invoice Dialog */}
      <Dialog open={showCreateInvoice} onOpenChange={setShowCreateInvoice}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>Generate a new invoice for your client</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client-name">Client Name</Label>
                <Input id="client-name" placeholder="Enter client name" />
              </div>
              <div>
                <Label htmlFor="client-email">Client Email</Label>
                <Input id="client-email" type="email" placeholder="Enter client email" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issue-date">Issue Date</Label>
                <Input id="issue-date" type="date" />
              </div>
              <div>
                <Label htmlFor="due-date">Due Date</Label>
                <Input id="due-date" type="date" />
              </div>
            </div>

            <div>
              <Label htmlFor="contract-id">Contract ID (Optional)</Label>
              <Input id="contract-id" placeholder="Enter contract ID" />
            </div>

            <div>
              <Label>Services</Label>
              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-600">
                  <div className="col-span-5">Description</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2">Rate</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-1"></div>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <Input className="col-span-5" placeholder="Service description" />
                  <Input className="col-span-2" type="number" placeholder="1" />
                  <Input className="col-span-2" type="number" placeholder="0.00" />
                  <Input className="col-span-2" type="number" placeholder="0.00" disabled />
                  <Button size="sm" variant="outline" className="col-span-1 bg-transparent">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="payment-terms">Payment Terms</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="net-15">Net 15</SelectItem>
                    <SelectItem value="net-30">Net 30</SelectItem>
                    <SelectItem value="net-60">Net 60</SelectItem>
                    <SelectItem value="due-on-receipt">Due on Receipt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                <Input id="tax-rate" type="number" placeholder="25" />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Additional notes or terms" />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowCreateInvoice(false)} className="flex-1">
                Cancel
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Save as Draft
              </Button>
              <Button onClick={() => setShowCreateInvoice(false)} className="flex-1">
                Create & Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
