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
  CheckCircle,
  Star,
  ClipboardCheck,
  TrendingUp,
  BarChart3,
  Users,
  MapPin,
  Calendar,
  Clock,
  Plus,
  Eye,
  Edit,
  Download,
  Search,
  Award,
  Target,
  Shield,
} from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"
import { format, parseISO } from "date-fns"

interface QualityControlProps {
  language: Language
}

interface QualityInspection {
  id: string
  inspectionNumber: string
  contractId: string
  clientName: string
  location: string
  address: string
  inspectorId: string
  inspectorName: string
  inspectionDate: string
  inspectionTime: string
  status: "scheduled" | "in-progress" | "completed" | "failed" | "cancelled"
  overallScore: number
  maxScore: number
  checklist: ChecklistItem[]
  photos: InspectionPhoto[]
  notes: string
  recommendations: string[]
  followUpRequired: boolean
  followUpDate?: string
  clientFeedback?: ClientFeedback
  createdAt: string
  completedAt?: string
}

interface ChecklistItem {
  id: string
  category: string
  item: string
  description: string
  isRequired: boolean
  status: "pass" | "fail" | "na" | "pending"
  score: number
  maxScore: number
  notes?: string
  photo?: string
}

interface InspectionPhoto {
  id: string
  url: string
  caption: string
  category: string
  timestamp: string
}

interface ClientFeedback {
  rating: number
  comments: string
  submittedAt: string
  submittedBy: string
}

interface QualityStandard {
  id: string
  name: string
  description: string
  category: string
  criteria: QualityCriteria[]
  minimumScore: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface QualityCriteria {
  id: string
  name: string
  description: string
  weight: number
  checkpoints: string[]
}

interface QualityMetrics {
  totalInspections: number
  averageScore: number
  passRate: number
  clientSatisfaction: number
  trendsData: {
    period: string
    score: number
    inspections: number
  }[]
}

export function QualityControl({ language }: QualityControlProps) {
  const t = useTranslation(language)
  const [selectedInspection, setSelectedInspection] = useState<QualityInspection | null>(null)
  const [showCreateInspection, setShowCreateInspection] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedStandard, setSelectedStandard] = useState<QualityStandard | null>(null)

  // Sample data
  const inspections: QualityInspection[] = [
    {
      id: "1",
      inspectionNumber: "QC-2024-001",
      contractId: "CNT-2024-001",
      clientName: "ABC Corporation",
      location: "Downtown Office Building",
      address: "123 Business Street, Oslo",
      inspectorId: "1",
      inspectorName: "Sarah Johnson",
      inspectionDate: "2024-01-15",
      inspectionTime: "14:00",
      status: "completed",
      overallScore: 92,
      maxScore: 100,
      checklist: [
        {
          id: "1",
          category: "General Cleaning",
          item: "Floor Cleanliness",
          description: "All floors are clean, mopped, and free of debris",
          isRequired: true,
          status: "pass",
          score: 10,
          maxScore: 10,
          notes: "Excellent condition, no issues found",
        },
        {
          id: "2",
          category: "Restrooms",
          item: "Sanitization",
          description: "All surfaces sanitized and supplies restocked",
          isRequired: true,
          status: "pass",
          score: 9,
          maxScore: 10,
          notes: "Minor issue with soap dispenser, refilled during inspection",
        },
        {
          id: "3",
          category: "Windows",
          item: "Window Cleaning",
          description: "Windows are streak-free and clean",
          isRequired: false,
          status: "fail",
          score: 6,
          maxScore: 10,
          notes: "Some streaks visible on 3rd floor windows, needs attention",
        },
      ],
      photos: [
        {
          id: "1",
          url: "/placeholder.svg?height=200&width=300",
          caption: "Main lobby after cleaning",
          category: "General Cleaning",
          timestamp: "2024-01-15T14:30:00Z",
        },
        {
          id: "2",
          url: "/placeholder.svg?height=200&width=300",
          caption: "Window streaks on 3rd floor",
          category: "Windows",
          timestamp: "2024-01-15T15:15:00Z",
        },
      ],
      notes: "Overall excellent work. Minor issues with window cleaning that need to be addressed.",
      recommendations: [
        "Retrain window cleaning technique for 3rd floor team",
        "Check soap dispensers more frequently",
        "Consider upgrading window cleaning equipment",
      ],
      followUpRequired: true,
      followUpDate: "2024-01-22",
      clientFeedback: {
        rating: 4,
        comments: "Very satisfied with the cleaning quality. The lobby looks great!",
        submittedAt: "2024-01-16T09:00:00Z",
        submittedBy: "Emma Davis",
      },
      createdAt: "2024-01-15T13:00:00Z",
      completedAt: "2024-01-15T16:00:00Z",
    },
    {
      id: "2",
      inspectionNumber: "QC-2024-002",
      contractId: "CNT-2024-002",
      clientName: "Mall Management Ltd",
      location: "City Shopping Mall",
      address: "456 Commerce Avenue, Oslo",
      inspectorId: "2",
      inspectorName: "John Smith",
      inspectionDate: "2024-01-12",
      inspectionTime: "10:00",
      status: "completed",
      overallScore: 88,
      maxScore: 100,
      checklist: [
        {
          id: "1",
          category: "General Cleaning",
          item: "Floor Maintenance",
          description: "All floors properly maintained and polished",
          isRequired: true,
          status: "pass",
          score: 9,
          maxScore: 10,
        },
        {
          id: "2",
          category: "Food Court",
          item: "Deep Sanitization",
          description: "Food court areas thoroughly sanitized",
          isRequired: true,
          status: "pass",
          score: 10,
          maxScore: 10,
        },
      ],
      photos: [],
      notes: "Good overall performance with room for improvement in some areas.",
      recommendations: [
        "Increase frequency of floor polishing in high-traffic areas",
        "Implement additional quality checks during peak hours",
      ],
      followUpRequired: false,
      createdAt: "2024-01-12T09:00:00Z",
      completedAt: "2024-01-12T13:00:00Z",
    },
  ]

  const qualityStandards: QualityStandard[] = [
    {
      id: "1",
      name: "Office Building Standard",
      description: "Quality standards for office building cleaning services",
      category: "Commercial Office",
      criteria: [
        {
          id: "1",
          name: "General Cleaning",
          description: "Basic cleaning requirements for office spaces",
          weight: 40,
          checkpoints: [
            "All floors swept, mopped, and dry",
            "Desks and surfaces dusted and clean",
            "Trash bins emptied and liners replaced",
            "Vacuum carpeted areas thoroughly",
          ],
        },
        {
          id: "2",
          name: "Restroom Maintenance",
          description: "Restroom cleaning and sanitization standards",
          weight: 30,
          checkpoints: [
            "All surfaces sanitized with approved chemicals",
            "Toilets, sinks, and mirrors cleaned",
            "Supplies restocked (toilet paper, soap, towels)",
            "Floors mopped and dried",
          ],
        },
        {
          id: "3",
          name: "Common Areas",
          description: "Lobby, hallways, and common area standards",
          weight: 30,
          checkpoints: [
            "Lobby floors polished and spotless",
            "Windows and glass surfaces streak-free",
            "Elevator interiors cleaned",
            "Stairwells swept and mopped",
          ],
        },
      ],
      minimumScore: 85,
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
    },
  ]

  const qualityMetrics: QualityMetrics = {
    totalInspections: 24,
    averageScore: 89.5,
    passRate: 91.7,
    clientSatisfaction: 4.3,
    trendsData: [
      { period: "Week 1", score: 87, inspections: 6 },
      { period: "Week 2", score: 89, inspections: 8 },
      { period: "Week 3", score: 91, inspections: 5 },
      { period: "Week 4", score: 90, inspections: 5 },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "pass":
        return "bg-green-100 text-green-800"
      case "in-progress":
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
      case "fail":
        return "bg-red-100 text-red-800"
      case "scheduled":
      case "na":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 80) return "text-yellow-600"
    if (percentage >= 70) return "text-orange-600"
    return "text-red-600"
  }

  const filteredInspections = inspections.filter((inspection) => {
    const matchesSearch =
      inspection.inspectionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || inspection.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const calculateCategoryScore = (checklist: ChecklistItem[], category: string) => {
    const categoryItems = checklist.filter((item) => item.category === category)
    if (categoryItems.length === 0) return 0

    const totalScore = categoryItems.reduce((sum, item) => sum + item.score, 0)
    const maxScore = categoryItems.reduce((sum, item) => sum + item.maxScore, 0)
    return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quality Control</h1>
          <p className="text-gray-600">Monitor and maintain service quality standards</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={() => setShowCreateInspection(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Inspection
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{qualityMetrics.totalInspections}</p>
                <p className="text-sm text-gray-600">Total Inspections</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+15% this month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{qualityMetrics.averageScore}%</p>
                <p className="text-sm text-gray-600">Average Score</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+2.3% improvement</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-2xl font-bold">{qualityMetrics.passRate}%</p>
                <p className="text-sm text-gray-600">Pass Rate</p>
                <div className="flex items-center gap-1 mt-1">
                  <Shield className="h-3 w-3 text-emerald-600" />
                  <span className="text-xs text-emerald-600">Above target</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{qualityMetrics.clientSatisfaction}/5</p>
                <p className="text-sm text-gray-600">Client Satisfaction</p>
                <div className="flex items-center gap-1 mt-1">
                  <Award className="h-3 w-3 text-yellow-600" />
                  <span className="text-xs text-yellow-600">Excellent rating</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inspections" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="standards">Standards</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="inspections" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search inspections..."
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
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Inspections List */}
          <div className="space-y-4">
            {filteredInspections.map((inspection) => (
              <Card key={inspection.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{inspection.inspectionNumber}</h3>
                        <Badge className={getStatusColor(inspection.status)}>{inspection.status}</Badge>
                        {inspection.followUpRequired && (
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            Follow-up Required
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>{inspection.clientName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{inspection.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{format(parseISO(inspection.inspectionDate), "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{inspection.inspectionTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Inspector:</span>
                          <span className="text-sm font-medium">{inspection.inspectorName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Score:</span>
                          <span
                            className={`text-sm font-bold ${getScoreColor(inspection.overallScore, inspection.maxScore)}`}
                          >
                            {inspection.overallScore}/{inspection.maxScore} (
                            {Math.round((inspection.overallScore / inspection.maxScore) * 100)}%)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedInspection(inspection)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Category Scores</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Array.from(new Set(inspection.checklist.map((item) => item.category))).map((category) => {
                        const score = calculateCategoryScore(inspection.checklist, category)
                        return (
                          <div key={category} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{category}</span>
                              <span className={`font-medium ${getScoreColor(score, 100)}`}>{score}%</span>
                            </div>
                            <Progress value={score} className="h-2" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="standards" className="space-y-4">
          <div className="space-y-4">
            {qualityStandards.map((standard) => (
              <Card key={standard.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{standard.name}</h3>
                        <Badge
                          className={standard.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {standard.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="secondary">{standard.category}</Badge>
                      </div>

                      <p className="text-gray-600 mb-4">{standard.description}</p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="h-4 w-4 text-gray-400" />
                          <span>
                            Minimum Score: <strong>{standard.minimumScore}%</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <ClipboardCheck className="h-4 w-4 text-gray-400" />
                          <span>
                            Criteria: <strong>{standard.criteria.length}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedStandard(standard)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {standard.criteria.map((criteria) => (
                      <div key={criteria.id} className="bg-gray-50 rounded-lg p-3">
                        <h4 className="font-medium text-sm mb-1">{criteria.name}</h4>
                        <p className="text-xs text-gray-600 mb-2">{criteria.description}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Weight:</span>
                          <span className="text-xs font-medium">{criteria.weight}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quality Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Quality Score Trends
                </CardTitle>
                <CardDescription>Weekly quality score performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Quality trends chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Performance by Category</CardTitle>
                <CardDescription>Average scores across different categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["General Cleaning", "Restrooms", "Windows", "Common Areas"].map((category, index) => {
                    const scores = [92, 88, 85, 90]
                    const score = scores[index]

                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{category}</span>
                          <span className={`font-medium ${getScoreColor(score, 100)}`}>{score}%</span>
                        </div>
                        <Progress value={score} className="h-3" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Quality Analytics Summary</CardTitle>
              <CardDescription>Comprehensive quality performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">96%</div>
                  <div className="text-sm text-gray-600">On-Time Completion</div>
                  <div className="text-xs text-green-600 mt-1">↑ 3% from last month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">4.2</div>
                  <div className="text-sm text-gray-600">Avg. Client Rating</div>
                  <div className="text-xs text-blue-600 mt-1">↑ 0.2 from last month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
                  <div className="text-sm text-gray-600">Issues Resolved</div>
                  <div className="text-xs text-purple-600 mt-1">↓ 25% from last month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">2.1</div>
                  <div className="text-sm text-gray-600">Avg. Response Time (hrs)</div>
                  <div className="text-xs text-orange-600 mt-1">↓ 0.5 from last month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <div className="space-y-4">
            {inspections
              .filter((inspection) => inspection.clientFeedback)
              .map((inspection) => (
                <Card key={inspection.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{inspection.clientName}</h3>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < (inspection.clientFeedback?.rating || 0)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm font-medium ml-1">{inspection.clientFeedback?.rating}/5</span>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 mb-3">
                          <span>{inspection.location} • </span>
                          <span>{inspection.inspectionNumber} • </span>
                          <span>{format(parseISO(inspection.clientFeedback?.submittedAt || ""), "MMM d, yyyy")}</span>
                        </div>

                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                          "{inspection.clientFeedback?.comments}"
                        </p>

                        <div className="text-xs text-gray-500 mt-2">
                          Submitted by {inspection.clientFeedback?.submittedBy}
                        </div>
                      </div>

                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View Inspection
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Inspection Details Dialog */}
      {selectedInspection && (
        <Dialog open={!!selectedInspection} onOpenChange={() => setSelectedInspection(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedInspection.inspectionNumber}</DialogTitle>
              <DialogDescription>
                {selectedInspection.clientName} • {selectedInspection.location}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(selectedInspection.status)}>{selectedInspection.status}</Badge>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-600">Overall Score:</span>
                  <span
                    className={`font-bold ${getScoreColor(selectedInspection.overallScore, selectedInspection.maxScore)}`}
                  >
                    {selectedInspection.overallScore}/{selectedInspection.maxScore} (
                    {Math.round((selectedInspection.overallScore / selectedInspection.maxScore) * 100)}%)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Inspection Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{format(parseISO(selectedInspection.inspectionDate), "EEEE, MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{selectedInspection.inspectionTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{selectedInspection.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>Inspector: {selectedInspection.inspectorName}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Status Information</h4>
                  <div className="space-y-2 text-sm">
                    {selectedInspection.completedAt && (
                      <div>
                        <span className="text-gray-600">Completed:</span>
                        <span className="ml-2">
                          {format(parseISO(selectedInspection.completedAt), "MMM d, yyyy HH:mm")}
                        </span>
                      </div>
                    )}
                    {selectedInspection.followUpRequired && (
                      <div>
                        <span className="text-gray-600">Follow-up Date:</span>
                        <span className="ml-2 text-orange-600 font-medium">
                          {selectedInspection.followUpDate
                            ? format(parseISO(selectedInspection.followUpDate), "MMM d, yyyy")
                            : "TBD"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div>
                <h4 className="font-semibold mb-3">Inspection Checklist</h4>
                <div className="space-y-3">
                  {selectedInspection.checklist.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium">{item.item}</h5>
                            <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                            {item.isRequired && (
                              <Badge variant="outline" className="text-red-600 border-red-600">
                                Required
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <div className="text-xs text-gray-500">Category: {item.category}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${getScoreColor(item.score, item.maxScore)}`}>
                            {item.score}/{item.maxScore}
                          </div>
                          <div className="text-xs text-gray-500">{Math.round((item.score / item.maxScore) * 100)}%</div>
                        </div>
                      </div>
                      {item.notes && (
                        <div className="bg-gray-50 p-2 rounded text-sm">
                          <strong>Notes:</strong> {item.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Photos */}
              {selectedInspection.photos.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Inspection Photos</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedInspection.photos.map((photo) => (
                      <div key={photo.id} className="space-y-2">
                        <img
                          src={photo.url || "/placeholder.svg"}
                          alt={photo.caption}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        <div className="text-sm">
                          <p className="font-medium">{photo.caption}</p>
                          <p className="text-xs text-gray-600">{photo.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes and Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedInspection.notes && (
                  <div>
                    <h4 className="font-semibold mb-2">Inspector Notes</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedInspection.notes}</p>
                  </div>
                )}

                {selectedInspection.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Recommendations</h4>
                    <ul className="text-sm space-y-1">
                      {selectedInspection.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Client Feedback */}
              {selectedInspection.clientFeedback && (
                <div>
                  <h4 className="font-semibold mb-2">Client Feedback</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < selectedInspection.clientFeedback!.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{selectedInspection.clientFeedback.rating}/5</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">"{selectedInspection.clientFeedback.comments}"</p>
                    <div className="text-xs text-gray-600">
                      Submitted by {selectedInspection.clientFeedback.submittedBy} on{" "}
                      {format(parseISO(selectedInspection.clientFeedback.submittedAt), "MMM d, yyyy HH:mm")}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Inspection
                </Button>
                {selectedInspection.followUpRequired && (
                  <Button className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Follow-up
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Quality Standard Details Dialog */}
      {selectedStandard && (
        <Dialog open={!!selectedStandard} onOpenChange={() => setSelectedStandard(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedStandard.name}</DialogTitle>
              <DialogDescription>{selectedStandard.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge
                  className={selectedStandard.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                >
                  {selectedStandard.isActive ? "Active" : "Inactive"}
                </Badge>
                <Badge variant="secondary">{selectedStandard.category}</Badge>
                <div className="text-sm text-gray-600">
                  Minimum Score: <strong>{selectedStandard.minimumScore}%</strong>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Quality Criteria</h4>
                <div className="space-y-4">
                  {selectedStandard.criteria.map((criteria) => (
                    <div key={criteria.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{criteria.name}</h5>
                        <Badge variant="outline">Weight: {criteria.weight}%</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{criteria.description}</p>
                      <div>
                        <h6 className="text-sm font-medium mb-2">Checkpoints:</h6>
                        <ul className="text-sm space-y-1">
                          {criteria.checkpoints.map((checkpoint, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                              <span>{checkpoint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Standard
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Create Inspection
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Inspection Dialog */}
      <Dialog open={showCreateInspection} onOpenChange={setShowCreateInspection}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Quality Inspection</DialogTitle>
            <DialogDescription>Schedule a quality inspection for a client location</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client-select">Client</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abc-corp">ABC Corporation</SelectItem>
                    <SelectItem value="mall-mgmt">Mall Management Ltd</SelectItem>
                    <SelectItem value="restaurant">Restaurant Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contract-select">Contract</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contract" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cnt-001">CNT-2024-001</SelectItem>
                    <SelectItem value="cnt-002">CNT-2024-002</SelectItem>
                    <SelectItem value="cnt-003">CNT-2024-003</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter location name" />
            </div>

            <div>
              <Label htmlFor="address">Full Address</Label>
              <Input id="address" placeholder="Enter full address" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="inspection-date">Inspection Date</Label>
                <Input id="inspection-date" type="date" />
              </div>
              <div>
                <Label htmlFor="inspection-time">Inspection Time</Label>
                <Input id="inspection-time" type="time" />
              </div>
            </div>

            <div>
              <Label htmlFor="inspector">Inspector</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select inspector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="mike">Mike Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quality-standard">Quality Standard</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality standard" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Office Building Standard</SelectItem>
                  <SelectItem value="retail">Retail Space Standard</SelectItem>
                  <SelectItem value="restaurant">Restaurant Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Additional notes or special instructions" />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowCreateInspection(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => setShowCreateInspection(false)} className="flex-1">
                Schedule Inspection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
