"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Plus,
  FileText,
  Calendar,
  DollarSign,
  Building,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Eye,
  Download,
  Upload,
  Trash2,
  Copy,
} from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface Contract {
  id: string
  contractNumber: string
  clientName: string
  clientEmail: string
  clientPhone: string
  clientAddress: string
  serviceType: string
  contractType: "residential" | "commercial" | "industrial"
  status: "draft" | "active" | "expired" | "terminated" | "pending"
  startDate: string
  endDate: string
  value: number
  currency: string
  frequency: "one-time" | "weekly" | "bi-weekly" | "monthly" | "quarterly"
  description: string
  services: ContractService[]
  terms: string
  createdDate: string
  lastModified: string
  assignedTeam: string[]
  documents: ContractDocument[]
  renewalDate?: string
  paymentTerms: string
  specialRequirements?: string
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

interface ContractManagementProps {
  language: Language
}

export function ContractManagement({ language }: ContractManagementProps) {
  const t = useTranslation(language)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")

  // Mock contract data
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: "1",
      contractNumber: "MOPP-2024-001",
      clientName: "Oslo Business Center",
      clientEmail: "facilities@oslobusiness.no",
      clientPhone: "+47 22 12 34 56",
      clientAddress: "Storgata 15, 0155 Oslo, Norway",
      serviceType: "Office Cleaning",
      contractType: "commercial",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      value: 180000,
      currency: "NOK",
      frequency: "weekly",
      description: "Comprehensive office cleaning services for 5-story business center",
      services: [
        {
          id: "1",
          name: "Office Cleaning",
          description: "Daily office cleaning",
          price: 2500,
          unit: "per week",
          quantity: 1,
        },
        {
          id: "2",
          name: "Window Cleaning",
          description: "Monthly window cleaning",
          price: 5000,
          unit: "per month",
          quantity: 1,
        },
        {
          id: "3",
          name: "Deep Cleaning",
          description: "Quarterly deep cleaning",
          price: 15000,
          unit: "per quarter",
          quantity: 1,
        },
      ],
      terms: "Standard commercial cleaning terms and conditions apply. 30-day notice required for termination.",
      createdDate: "2024-01-10",
      lastModified: "2024-01-15",
      assignedTeam: ["Carlos Silva", "Lars Andersen"],
      documents: [
        { id: "1", name: "Signed Contract.pdf", type: "PDF", uploadDate: "2024-01-15", size: "2.3 MB" },
        { id: "2", name: "Service Schedule.xlsx", type: "Excel", uploadDate: "2024-01-15", size: "156 KB" },
      ],
      renewalDate: "2024-11-01",
      paymentTerms: "Net 30 days",
      specialRequirements: "Green cleaning products only, after-hours access required",
    },
    {
      id: "2",
      contractNumber: "MOPP-2024-002",
      clientName: "Hansen Family",
      clientEmail: "erik.hansen@email.com",
      clientPhone: "+47 98 76 54 32",
      clientAddress: "Bygdøy Allé 42, 0262 Oslo, Norway",
      serviceType: "Residential Cleaning",
      contractType: "residential",
      status: "active",
      startDate: "2024-02-01",
      endDate: "2025-01-31",
      value: 48000,
      currency: "NOK",
      frequency: "bi-weekly",
      description: "Bi-weekly residential cleaning for 4-bedroom house",
      services: [
        {
          id: "1",
          name: "House Cleaning",
          description: "Bi-weekly house cleaning",
          price: 2000,
          unit: "per visit",
          quantity: 1,
        },
        {
          id: "2",
          name: "Deep Clean",
          description: "Seasonal deep cleaning",
          price: 8000,
          unit: "per season",
          quantity: 1,
        },
      ],
      terms: "Residential cleaning agreement with flexible scheduling options.",
      createdDate: "2024-01-25",
      lastModified: "2024-02-01",
      assignedTeam: ["Anna Hansen"],
      documents: [{ id: "1", name: "Residential Contract.pdf", type: "PDF", uploadDate: "2024-02-01", size: "1.8 MB" }],
      renewalDate: "2024-12-01",
      paymentTerms: "Monthly billing",
    },
    {
      id: "3",
      contractNumber: "MOPP-2024-003",
      clientName: "Bergen Industrial Park",
      clientEmail: "maintenance@bergenpark.no",
      clientPhone: "+47 55 12 34 56",
      clientAddress: "Industriveien 88, 5179 Bergen, Norway",
      serviceType: "Industrial Cleaning",
      contractType: "industrial",
      status: "pending",
      startDate: "2024-03-01",
      endDate: "2025-02-28",
      value: 360000,
      currency: "NOK",
      frequency: "weekly",
      description: "Industrial facility cleaning and maintenance services",
      services: [
        {
          id: "1",
          name: "Facility Cleaning",
          description: "Weekly industrial cleaning",
          price: 5000,
          unit: "per week",
          quantity: 1,
        },
        {
          id: "2",
          name: "Equipment Cleaning",
          description: "Monthly equipment cleaning",
          price: 12000,
          unit: "per month",
          quantity: 1,
        },
        {
          id: "3",
          name: "Safety Compliance",
          description: "Safety and compliance cleaning",
          price: 8000,
          unit: "per month",
          quantity: 1,
        },
      ],
      terms: "Industrial cleaning contract with safety compliance requirements.",
      createdDate: "2024-02-15",
      lastModified: "2024-02-20",
      assignedTeam: ["Carlos Silva", "Lars Andersen"],
      documents: [
        { id: "1", name: "Draft Contract.pdf", type: "PDF", uploadDate: "2024-02-20", size: "3.1 MB" },
        { id: "2", name: "Safety Requirements.pdf", type: "PDF", uploadDate: "2024-02-20", size: "892 KB" },
      ],
      paymentTerms: "Net 45 days",
      specialRequirements: "Safety certification required, hazardous material handling protocols",
    },
    {
      id: "4",
      contractNumber: "MOPP-2024-004",
      clientName: "Trondheim Medical Center",
      clientEmail: "admin@trondheimedical.no",
      clientPhone: "+47 73 12 34 56",
      clientAddress: "Medisinsk Gate 12, 7030 Trondheim, Norway",
      serviceType: "Medical Facility Cleaning",
      contractType: "commercial",
      status: "expired",
      startDate: "2023-06-01",
      endDate: "2024-01-31",
      value: 240000,
      currency: "NOK",
      frequency: "weekly",
      description: "Specialized medical facility cleaning with infection control protocols",
      services: [
        {
          id: "1",
          name: "Medical Cleaning",
          description: "Specialized medical cleaning",
          price: 4000,
          unit: "per week",
          quantity: 1,
        },
        {
          id: "2",
          name: "Disinfection",
          description: "Deep disinfection services",
          price: 6000,
          unit: "per month",
          quantity: 1,
        },
      ],
      terms: "Medical facility cleaning with strict hygiene and safety protocols.",
      createdDate: "2023-05-15",
      lastModified: "2024-01-31",
      assignedTeam: ["Fatima Al-Rashid"],
      documents: [
        { id: "1", name: "Medical Contract.pdf", type: "PDF", uploadDate: "2023-06-01", size: "2.7 MB" },
        { id: "2", name: "Hygiene Protocols.pdf", type: "PDF", uploadDate: "2023-06-01", size: "1.2 MB" },
      ],
      paymentTerms: "Net 30 days",
      specialRequirements: "Medical-grade disinfectants, certified cleaning staff",
    },
  ])

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.serviceType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || contract.status === filterStatus
    const matchesType = filterType === "all" || contract.contractType === filterType

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "terminated":
        return "bg-gray-100 text-gray-800"
      case "draft":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "expired":
        return <XCircle className="h-4 w-4" />
      case "terminated":
        return <XCircle className="h-4 w-4" />
      case "draft":
        return <FileText className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "residential":
        return <User className="h-4 w-4" />
      case "commercial":
        return <Building className="h-4 w-4" />
      case "industrial":
        return <Building className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{t.contracts}</h2>
          <p className="text-gray-600">Manage client contracts and service agreements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === "cards" ? "table" : "cards")}>
            {viewMode === "cards" ? "Table View" : "Card View"}
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Contract
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Contract</DialogTitle>
                <DialogDescription>Create a new service contract for a client.</DialogDescription>
              </DialogHeader>
              <CreateContractForm onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contracts</p>
                <p className="text-2xl font-bold">{contracts.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {contracts.filter((c) => c.status === "active").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {contracts.filter((c) => c.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-red-600">
                  {contracts.filter((c) => c.status === "expired").length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(contracts.reduce((acc, c) => acc + c.value, 0) / 1000).toFixed(0)}K
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
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
        </CardContent>
      </Card>

      {/* Contract List */}
      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredContracts.map((contract) => (
            <Card key={contract.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(contract.contractType)}
                    <div>
                      <h3 className="font-semibold text-lg">{contract.contractNumber}</h3>
                      <p className="text-gray-600 text-sm">{contract.clientName}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(contract.status)} gap-1`}>
                    {getStatusIcon(contract.status)}
                    {contract.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="h-4 w-4" />
                    {contract.serviceType}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {new Date(contract.startDate).toLocaleDateString()} -{" "}
                    {new Date(contract.endDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    {contract.value.toLocaleString()} {contract.currency}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {contract.frequency}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="capitalize">
                    {contract.contractType}
                  </Badge>
                  <div className="text-sm text-gray-600">
                    {contract.assignedTeam.length} team member{contract.assignedTeam.length !== 1 ? "s" : ""}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => setSelectedContract(contract)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedContract(contract)
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
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
                  <TableHead>Contract #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Start Date</TableHead>
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
                    <TableCell>
                      <Badge className={`${getStatusColor(contract.status)} gap-1`}>
                        {getStatusIcon(contract.status)}
                        {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {contract.value.toLocaleString()} {contract.currency}
                    </TableCell>
                    <TableCell>{new Date(contract.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(contract.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" onClick={() => setSelectedContract(contract)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedContract(contract)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
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
        <Dialog open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedContract.contractNumber}</DialogTitle>
              <DialogDescription>Contract details and information</DialogDescription>
            </DialogHeader>
            <ContractDetails contract={selectedContract} />
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Contract Dialog */}
      {selectedContract && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Contract</DialogTitle>
              <DialogDescription>Update contract information</DialogDescription>
            </DialogHeader>
            <EditContractForm
              contract={selectedContract}
              onClose={() => {
                setIsEditDialogOpen(false)
                setSelectedContract(null)
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function ContractDetails({ contract }: { contract: Contract }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="client">Client</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Contract Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-600">Contract Number</Label>
                <p className="text-sm">{contract.contractNumber}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Service Type</Label>
                <p className="text-sm">{contract.serviceType}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Contract Type</Label>
                <Badge variant="secondary" className="capitalize">
                  {contract.contractType}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Status</Label>
                <Badge className={`${getStatusColor(contract.status)} mt-1`}>{contract.status}</Badge>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Frequency</Label>
                <p className="text-sm capitalize">{contract.frequency}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timeline & Value
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-600">Start Date</Label>
                <p className="text-sm">{new Date(contract.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">End Date</Label>
                <p className="text-sm">{new Date(contract.endDate).toLocaleDateString()}</p>
              </div>
              {contract.renewalDate && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Renewal Date</Label>
                  <p className="text-sm">{new Date(contract.renewalDate).toLocaleDateString()}</p>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium text-gray-600">Contract Value</Label>
                <p className="text-lg font-semibold text-green-600">
                  {contract.value.toLocaleString()} {contract.currency}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Payment Terms</Label>
                <p className="text-sm">{contract.paymentTerms}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{contract.description}</p>
          </CardContent>
        </Card>

        {contract.specialRequirements && (
          <Card>
            <CardHeader>
              <CardTitle>Special Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{contract.specialRequirements}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{contract.terms}</p>
          </CardContent>
        </Card>
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
                  <TableHead>Service</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contract.services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>{service.quantity}</TableCell>
                    <TableCell>
                      {service.price.toLocaleString()} {contract.currency} {service.unit}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {(service.price * service.quantity).toLocaleString()} {contract.currency}
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
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Client Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-gray-600">Client Name</Label>
              <p className="text-sm">{contract.clientName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Email</Label>
              <p className="text-sm">{contract.clientEmail}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Phone</Label>
              <p className="text-sm">{contract.clientPhone}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Address</Label>
              <p className="text-sm">{contract.clientAddress}</p>
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
            <div className="space-y-2">
              {contract.assignedTeam.map((member, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{member}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="documents" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Contract Documents
              <Button size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contract.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        {doc.type} • {doc.size} • {new Date(doc.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function CreateContractForm({ onClose }: { onClose: () => void }) {
  const [services, setServices] = useState<ContractService[]>([
    { id: "1", name: "", description: "", price: 0, unit: "per month", quantity: 1 },
  ])

  const addService = () => {
    setServices([
      ...services,
      {
        id: Date.now().toString(),
        name: "",
        description: "",
        price: 0,
        unit: "per month",
        quantity: 1,
      },
    ])
  }

  const removeService = (id: string) => {
    setServices(services.filter((s) => s.id !== id))
  }

  return (
    <form className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="client">Client</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="terms">Terms</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contractNumber">Contract Number</Label>
              <Input id="contractNumber" placeholder="MOPP-2024-XXX" />
            </div>
            <div>
              <Label htmlFor="serviceType">Service Type</Label>
              <Input id="serviceType" placeholder="e.g., Office Cleaning" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <SelectItem value="one-time">One-time</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Contract description..." rows={3} />
          </div>
        </TabsContent>

        <TabsContent value="client" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input id="clientName" placeholder="Client or company name" />
            </div>
            <div>
              <Label htmlFor="clientEmail">Email</Label>
              <Input id="clientEmail" type="email" placeholder="client@example.com" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientPhone">Phone</Label>
              <Input id="clientPhone" placeholder="+47 123 45 678" />
            </div>
            <div>
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="net-15">Net 15 days</SelectItem>
                  <SelectItem value="net-30">Net 30 days</SelectItem>
                  <SelectItem value="net-45">Net 45 days</SelectItem>
                  <SelectItem value="monthly">Monthly billing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="clientAddress">Address</Label>
            <Textarea id="clientAddress" placeholder="Full client address..." rows={2} />
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Contract Services</h3>
            <Button type="button" onClick={addService} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Service
            </Button>
          </div>

          {services.map((service, index) => (
            <Card key={service.id}>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Service Name</Label>
                    <Input placeholder="e.g., Office Cleaning" />
                  </div>
                  <div>
                    <Label>Unit</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="per hour">Per Hour</SelectItem>
                        <SelectItem value="per day">Per Day</SelectItem>
                        <SelectItem value="per week">Per Week</SelectItem>
                        <SelectItem value="per month">Per Month</SelectItem>
                        <SelectItem value="per quarter">Per Quarter</SelectItem>
                        <SelectItem value="per visit">Per Visit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label>Quantity</Label>
                    <Input type="number" placeholder="1" min="1" />
                  </div>
                  <div>
                    <Label>Price (NOK)</Label>
                    <Input type="number" placeholder="0" min="0" />
                  </div>
                  <div className="flex items-end">
                    {services.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeService(service.id)}
                        className="w-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea placeholder="Service description..." rows={2} />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="terms" className="space-y-4">
          <div>
            <Label htmlFor="terms">Terms & Conditions</Label>
            <Textarea id="terms" placeholder="Enter contract terms and conditions..." rows={6} />
          </div>

          <div>
            <Label htmlFor="specialRequirements">Special Requirements</Label>
            <Textarea id="specialRequirements" placeholder="Any special requirements or notes..." rows={3} />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
        <Button type="submit">Create Contract</Button>
      </div>
    </form>
  )
}

function EditContractForm({ contract, onClose }: { contract: Contract; onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contractNumber">Contract Number</Label>
          <Input id="contractNumber" defaultValue={contract.contractNumber} />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select defaultValue={contract.status}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="terminated">Terminated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="clientName">Client Name</Label>
          <Input id="clientName" defaultValue={contract.clientName} />
        </div>
        <div>
          <Label htmlFor="serviceType">Service Type</Label>
          <Input id="serviceType" defaultValue={contract.serviceType} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" type="date" defaultValue={contract.startDate} />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" type="date" defaultValue={contract.endDate} />
        </div>
      </div>

      <div>
        <Label htmlFor="value">Contract Value (NOK)</Label>
        <Input id="value" type="number" defaultValue={contract.value} />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" defaultValue={contract.description} rows={3} />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Update Contract</Button>
      </div>
    </form>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "expired":
      return "bg-red-100 text-red-800"
    case "terminated":
      return "bg-gray-100 text-gray-800"
    case "draft":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
