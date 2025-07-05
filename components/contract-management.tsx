"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { type Language, useTranslation } from "@/lib/i18n"
import {
  FileText,
  Plus,
  Search,
  Eye,
  Edit,
  Copy,
  Calendar,
  DollarSign,
  Building,
  Home,
  Factory,
  Download,
  Upload,
  Trash2,
} from "lucide-react"

interface ContractManagementProps {
  language: Language
  userRole: string
  userData: any
}

type ContractStatus = "draft" | "active" | "pending" | "expired" | "terminated"
type ContractType = "residential" | "commercial" | "industrial"
type ServiceFrequency = "oneTime" | "weekly" | "biWeekly" | "monthly" | "quarterly"

interface Contract {
  id: string
  contractNumber: string
  clientName: string
  clientEmail: string
  clientPhone: string
  clientAddress: string
  serviceType: string
  contractType: ContractType
  status: ContractStatus
  startDate: string
  endDate: string
  renewalDate: string
  value: number
  frequency: ServiceFrequency
  assignedTeam: string[]
  services: ContractService[]
  documents: ContractDocument[]
  termsConditions: string
  specialRequirements: string
  paymentTerms: string
  customerId?: string
}

interface ContractService {
  id: string
  name: string
  description: string
  price: number
  unit: string
  quantity: number
}

interface ContractDocument {
  id: string
  name: string
  type: string
  uploadDate: string
  size: string
}

const mockContracts: Contract[] = [
  {
    id: "1",
    contractNumber: "CNT-2024-001",
    clientName: "ABC Corporation",
    clientEmail: "contact@abc-corp.com",
    clientPhone: "+47 22 12 34 56",
    clientAddress: "Karl Johans gate 1, 0154 Oslo, Norway",
    serviceType: "Office Cleaning",
    contractType: "commercial",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    renewalDate: "2024-11-30",
    value: 125000,
    frequency: "weekly",
    assignedTeam: ["team-1", "team-2"],
    services: [
      {
        id: "s1",
        name: "Office Cleaning",
        description: "Daily office cleaning service",
        price: 2500,
        unit: "per week",
        quantity: 1,
      },
      {
        id: "s2",
        name: "Window Cleaning",
        description: "Monthly window cleaning",
        price: 1500,
        unit: "per month",
        quantity: 1,
      },
    ],
    documents: [
      { id: "d1", name: "Service Agreement.pdf", type: "PDF", uploadDate: "2024-01-10", size: "2.3 MB" },
      { id: "d2", name: "Insurance Certificate.pdf", type: "PDF", uploadDate: "2024-01-10", size: "1.1 MB" },
    ],
    termsConditions:
      "Standard commercial cleaning terms apply. Service includes all common areas, offices, and restrooms.",
    specialRequirements: "Access required outside business hours. Security clearance needed for all staff.",
    paymentTerms: "Net 30 days",
    customerId: "cust-1",
  },
  {
    id: "2",
    contractNumber: "CNT-2024-002",
    clientName: "Hansen Family",
    clientEmail: "lars.hansen@email.com",
    clientPhone: "+47 98 76 54 32",
    clientAddress: "Storgata 15, 0184 Oslo, Norway",
    serviceType: "Residential Cleaning",
    contractType: "residential",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    renewalDate: "2024-12-01",
    value: 24000,
    frequency: "biWeekly",
    assignedTeam: ["team-3"],
    services: [
      {
        id: "s3",
        name: "House Cleaning",
        description: "Bi-weekly house cleaning",
        price: 1000,
        unit: "per visit",
        quantity: 2,
      },
    ],
    documents: [{ id: "d3", name: "Residential Agreement.pdf", type: "PDF", uploadDate: "2024-01-25", size: "1.8 MB" }],
    termsConditions: "Residential cleaning service agreement. Client to provide access and basic supplies.",
    specialRequirements: "Pet-friendly cleaning products required. Key holder access.",
    paymentTerms: "Monthly billing",
    customerId: "cust-2",
  },
]

export function ContractManagement({ language, userRole, userData }: ContractManagementProps) {
  const t = useTranslation(language)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  // Filter contracts based on user role
  const getFilteredContracts = () => {
    let contracts = mockContracts

    // For customers, only show their own contracts
    if (userRole === "customer") {
      contracts = contracts.filter((contract) => contract.customerId === userData.id)
    }

    // Apply search and status filters
    return contracts.filter((contract) => {
      const matchesSearch =
        contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || contract.status === statusFilter
      const matchesType = typeFilter === "all" || contract.contractType === typeFilter
      return matchesSearch && matchesStatus && matchesType
    })
  }

  const filteredContracts = getFilteredContracts()

  const getStatusColor = (status: ContractStatus) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-blue-100 text-blue-800"
      case "terminated":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: ContractType) => {
    switch (type) {
      case "residential":
        return <Home className="h-4 w-4" />
      case "commercial":
        return <Building className="h-4 w-4" />
      case "industrial":
        return <Factory className="h-4 w-4" />
      default:
        return <Building className="h-4 w-4" />
    }
  }

  const contractStats = {
    total: filteredContracts.length,
    active: filteredContracts.filter((c) => c.status === "active").length,
    pending: filteredContracts.filter((c) => c.status === "pending").length,
    expired: filteredContracts.filter((c) => c.status === "expired").length,
    totalValue: filteredContracts.reduce((sum, c) => sum + c.value, 0),
  }

  const canCreateContract = userRole === "company"
  const canEditContract = userRole === "company"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === "customer" ? "My Contracts" : "Contract Management"}
          </h1>
          <p className="text-gray-600">
            {userRole === "customer"
              ? "View and manage your cleaning service contracts"
              : "Manage client contracts and service agreements"}
          </p>
        </div>
        {canCreateContract && (
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Contract
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Contract</DialogTitle>
                <DialogDescription>Create a new service contract for your client</DialogDescription>
              </DialogHeader>
              <CreateContractForm language={language} onClose={() => setShowCreateDialog(false)} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Contracts</p>
                <p className="text-2xl font-bold">{contractStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">{contractStats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{contractStats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Expired</p>
                <p className="text-2xl font-bold">{contractStats.expired}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">kr {contractStats.totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search contracts, clients, or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cards")}
              >
                Cards
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                Table
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contracts Display */}
      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContracts.map((contract) => (
            <Card key={contract.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{contract.contractNumber}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      {getTypeIcon(contract.contractType)}
                      {contract.clientName}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(contract.status)}>{contract.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Type:</span>
                  <span className="font-medium">{contract.serviceType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Contract Value:</span>
                  <span className="font-medium">kr {contract.value.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frequency:</span>
                  <span className="font-medium capitalize">{contract.frequency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">End Date:</span>
                  <span className="font-medium">{new Date(contract.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => setSelectedContract(contract)} className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  {canEditContract && (
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract Number</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Contract Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contract Value</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.contractNumber}</TableCell>
                    <TableCell>{contract.clientName}</TableCell>
                    <TableCell>{contract.serviceType}</TableCell>
                    <TableCell className="capitalize">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(contract.contractType)}
                        {contract.contractType}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(contract.status)}>{contract.status}</Badge>
                    </TableCell>
                    <TableCell>kr {contract.value.toLocaleString()}</TableCell>
                    <TableCell>{new Date(contract.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => setSelectedContract(contract)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {canEditContract && (
                          <>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Contract Details Dialog */}
      {selectedContract && (
        <ContractDetailsDialog
          contract={selectedContract}
          language={language}
          userRole={userRole}
          onClose={() => setSelectedContract(null)}
        />
      )}
    </div>
  )
}

function CreateContractForm({ language, onClose }: { language: Language; onClose: () => void }) {
  const t = useTranslation(language)
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="client">Client</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="terms">Terms</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contractNumber">Contract Number</Label>
            <Input id="contractNumber" placeholder="CNT-2024-XXX" />
          </div>
          <div>
            <Label htmlFor="serviceType">Service Type</Label>
            <Input id="serviceType" placeholder="Office Cleaning" />
          </div>
          <div>
            <Label htmlFor="contractType">Contract Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="frequency">Frequency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="oneTime">One Time</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biWeekly">Bi-Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" type="date" />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="client" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="clientName">Client Name</Label>
            <Input id="clientName" placeholder="Client Name" />
          </div>
          <div>
            <Label htmlFor="clientEmail">Email</Label>
            <Input id="clientEmail" type="email" placeholder="client@email.com" />
          </div>
          <div>
            <Label htmlFor="clientPhone">Phone</Label>
            <Input id="clientPhone" placeholder="+47 12 34 56 78" />
          </div>
          <div>
            <Label htmlFor="paymentTerms">Payment Terms</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select payment terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="net15">Net 15 days</SelectItem>
                <SelectItem value="net30">Net 30 days</SelectItem>
                <SelectItem value="monthly">Monthly billing</SelectItem>
                <SelectItem value="advance">Payment in advance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="clientAddress">Address</Label>
          <Textarea id="clientAddress" placeholder="Full address" />
        </div>
      </TabsContent>

      <TabsContent value="services" className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Contract Services</h3>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
        <div className="border rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <Label htmlFor="serviceName">Service Name</Label>
              <Input id="serviceName" placeholder="Office Cleaning" />
            </div>
            <div>
              <Label htmlFor="servicePrice">Price</Label>
              <Input id="servicePrice" type="number" placeholder="2500" />
            </div>
            <div>
              <Label htmlFor="serviceUnit">Unit</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per-hour">Per Hour</SelectItem>
                  <SelectItem value="per-day">Per Day</SelectItem>
                  <SelectItem value="per-week">Per Week</SelectItem>
                  <SelectItem value="per-month">Per Month</SelectItem>
                  <SelectItem value="per-visit">Per Visit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="serviceQuantity">Quantity</Label>
              <Input id="serviceQuantity" type="number" placeholder="1" />
            </div>
          </div>
          <div>
            <Label htmlFor="serviceDescription">Description</Label>
            <Textarea id="serviceDescription" placeholder="Service description" />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="terms" className="space-y-4">
        <div>
          <Label htmlFor="termsConditions">Terms & Conditions</Label>
          <Textarea id="termsConditions" placeholder="Enter terms and conditions" className="min-h-32" />
        </div>
        <div>
          <Label htmlFor="specialRequirements">Special Requirements</Label>
          <Textarea id="specialRequirements" placeholder="Any special requirements or notes" className="min-h-24" />
        </div>
      </TabsContent>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button>Save Contract</Button>
      </div>
    </Tabs>
  )
}

function ContractDetailsDialog({
  contract,
  language,
  userRole,
  onClose,
}: {
  contract: Contract
  language: Language
  userRole: string
  onClose: () => void
}) {
  const t = useTranslation(language)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {contract.contractNumber} - {contract.clientName}
          </DialogTitle>
          <DialogDescription>Complete contract details and management</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="client">Client</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contract Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contract Number:</span>
                    <span className="font-medium">{contract.contractNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Type:</span>
                    <span className="font-medium">{contract.serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contract Type:</span>
                    <span className="font-medium capitalize">{contract.contractType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-medium capitalize">{contract.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge
                      className={`${
                        contract.status === "active"
                          ? "bg-green-100 text-green-800"
                          : contract.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {contract.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Timeline & Value</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">{new Date(contract.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date:</span>
                    <span className="font-medium">{new Date(contract.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Renewal Date:</span>
                    <span className="font-medium">{new Date(contract.renewalDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contract Value:</span>
                    <span className="font-bold text-lg">kr {contract.value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Terms:</span>
                    <span className="font-medium">{contract.paymentTerms}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {userRole === "company" && (
                    <>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Contract
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate Contract
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Renewal
                      </Button>
                    </>
                  )}
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Contract
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{contract.termsConditions}</p>
              </CardContent>
            </Card>

            {contract.specialRequirements && (
              <Card>
                <CardHeader>
                  <CardTitle>Special Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{contract.specialRequirements}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contract Services</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contract.services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell>{service.description}</TableCell>
                        <TableCell>kr {service.price.toLocaleString()}</TableCell>
                        <TableCell>{service.unit}</TableCell>
                        <TableCell>{service.quantity}</TableCell>
                        <TableCell className="font-medium">
                          kr {(service.price * service.quantity).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="client" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Client Name</Label>
                    <p className="text-lg font-medium">{contract.clientName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Email</Label>
                    <p className="text-lg">{contract.clientEmail}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Phone</Label>
                    <p className="text-lg">{contract.clientPhone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Payment Terms</Label>
                    <p className="text-lg">{contract.paymentTerms}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Address</Label>
                  <p className="text-lg">{contract.clientAddress}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contract.assignedTeam.map((teamId, index) => (
                    <div key={teamId} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Avatar>
                        <AvatarImage src={`/placeholder-user.jpg`} />
                        <AvatarFallback>T{index + 1}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Team {index + 1}</p>
                        <p className="text-sm text-gray-600">Cleaning Team</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Contract Documents</CardTitle>
                  {userRole === "company" && (
                    <Button size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contract.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-600">
                            {doc.type} • {doc.size} • {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        {userRole === "company" && (
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
