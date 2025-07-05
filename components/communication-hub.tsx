"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
  Bell,
  Send,
  Search,
  Users,
  Phone,
  Video,
  Paperclip,
  MoreHorizontal,
  CheckCircle,
  Star,
  Flag,
  Archive,
  Eye,
  VolumeX,
  Settings,
  Plus,
  ImageIcon,
  Download,
} from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface CommunicationHubProps {
  language: Language
}

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  senderRole: string
  content: string
  timestamp: string
  type: "text" | "image" | "file" | "system"
  attachments?: Attachment[]
  isRead: boolean
  priority: "low" | "normal" | "high" | "urgent"
}

interface Attachment {
  id: string
  name: string
  type: string
  size: string
  url: string
}

interface Conversation {
  id: string
  title: string
  participants: Participant[]
  lastMessage: Message
  unreadCount: number
  type: "direct" | "group" | "announcement"
  isArchived: boolean
  isMuted: boolean
  isPinned: boolean
}

interface Participant {
  id: string
  name: string
  avatar: string
  role: string
  status: "online" | "offline" | "away" | "busy"
}

interface Notification {
  id: string
  title: string
  message: string
  type: "message" | "system" | "alert" | "reminder"
  timestamp: string
  isRead: boolean
  priority: "low" | "normal" | "high" | "urgent"
  actionUrl?: string
  sender?: string
}

interface Announcement {
  id: string
  title: string
  content: string
  author: string
  authorRole: string
  timestamp: string
  priority: "low" | "normal" | "high" | "urgent"
  category: string
  isRead: boolean
  attachments?: Attachment[]
  targetAudience: string[]
}

export function CommunicationHub({ language }: CommunicationHubProps) {
  const t = useTranslation(language)
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showNotifications, setShowNotifications] = useState(false)

  // Sample data
  const conversations: Conversation[] = [
    {
      id: "1",
      title: "Team Alpha - Daily Updates",
      participants: [
        { id: "1", name: "John Smith", avatar: "/placeholder-user.jpg", role: "Manager", status: "online" },
        { id: "2", name: "Sarah Johnson", avatar: "/placeholder-user.jpg", role: "Supervisor", status: "online" },
        { id: "3", name: "Mike Wilson", avatar: "/placeholder-user.jpg", role: "Cleaner", status: "away" },
      ],
      lastMessage: {
        id: "1",
        senderId: "2",
        senderName: "Sarah Johnson",
        senderAvatar: "/placeholder-user.jpg",
        senderRole: "Supervisor",
        content: "Morning shift completed successfully. All areas cleaned according to checklist.",
        timestamp: "2024-01-15T10:30:00Z",
        type: "text",
        isRead: false,
        priority: "normal",
      },
      unreadCount: 3,
      type: "group",
      isArchived: false,
      isMuted: false,
      isPinned: true,
    },
    {
      id: "2",
      title: "Contract ABC-2024 Discussion",
      participants: [
        { id: "1", name: "John Smith", avatar: "/placeholder-user.jpg", role: "Manager", status: "online" },
        { id: "4", name: "Emma Davis", avatar: "/placeholder-user.jpg", role: "Client", status: "offline" },
      ],
      lastMessage: {
        id: "2",
        senderId: "4",
        senderName: "Emma Davis",
        senderAvatar: "/placeholder-user.jpg",
        senderRole: "Client",
        content: "Can we schedule a meeting to discuss the contract renewal?",
        timestamp: "2024-01-15T09:15:00Z",
        type: "text",
        isRead: true,
        priority: "high",
      },
      unreadCount: 0,
      type: "direct",
      isArchived: false,
      isMuted: false,
      isPinned: false,
    },
  ]

  const notifications: Notification[] = [
    {
      id: "1",
      title: "New Contract Assigned",
      message: "You have been assigned to contract ABC-2024 starting tomorrow.",
      type: "system",
      timestamp: "2024-01-15T11:00:00Z",
      isRead: false,
      priority: "high",
      actionUrl: "/contracts/abc-2024",
      sender: "System",
    },
    {
      id: "2",
      title: "Shift Reminder",
      message: "Your shift starts in 30 minutes at Downtown Office Building.",
      type: "reminder",
      timestamp: "2024-01-15T10:30:00Z",
      isRead: false,
      priority: "urgent",
      sender: "System",
    },
    {
      id: "3",
      title: "Quality Rating Received",
      message: "Client rated your work 5 stars with positive feedback.",
      type: "message",
      timestamp: "2024-01-15T09:45:00Z",
      isRead: true,
      priority: "normal",
      sender: "Emma Davis",
    },
  ]

  const announcements: Announcement[] = [
    {
      id: "1",
      title: "New Safety Protocols Effective Immediately",
      content:
        "All team members must follow the updated safety protocols when handling chemical products. Please review the attached document and confirm your understanding.",
      author: "John Smith",
      authorRole: "Manager",
      timestamp: "2024-01-15T08:00:00Z",
      priority: "urgent",
      category: "Safety",
      isRead: false,
      attachments: [
        {
          id: "1",
          name: "Safety_Protocols_2024.pdf",
          type: "application/pdf",
          size: "2.3 MB",
          url: "/documents/safety-protocols.pdf",
        },
      ],
      targetAudience: ["all"],
    },
    {
      id: "2",
      title: "Company Meeting - Q1 Review",
      content:
        "Join us for the quarterly review meeting this Friday at 2 PM. We'll discuss performance metrics, upcoming projects, and team achievements.",
      author: "Management",
      authorRole: "Administration",
      timestamp: "2024-01-14T16:00:00Z",
      priority: "normal",
      category: "General",
      isRead: true,
      targetAudience: ["managers", "supervisors"],
    },
  ]

  const messages: Message[] = [
    {
      id: "1",
      senderId: "2",
      senderName: "Sarah Johnson",
      senderAvatar: "/placeholder-user.jpg",
      senderRole: "Supervisor",
      content: "Good morning team! Ready for today's assignments?",
      timestamp: "2024-01-15T08:00:00Z",
      type: "text",
      isRead: true,
      priority: "normal",
    },
    {
      id: "2",
      senderId: "3",
      senderName: "Mike Wilson",
      senderAvatar: "/placeholder-user.jpg",
      senderRole: "Cleaner",
      content: "Yes, I'm ready. Should I start with the lobby area?",
      timestamp: "2024-01-15T08:05:00Z",
      type: "text",
      isRead: true,
      priority: "normal",
    },
    {
      id: "3",
      senderId: "2",
      senderName: "Sarah Johnson",
      senderAvatar: "/placeholder-user.jpg",
      senderRole: "Supervisor",
      content: "Perfect! Here's the updated checklist for today.",
      timestamp: "2024-01-15T08:10:00Z",
      type: "file",
      attachments: [
        {
          id: "1",
          name: "Daily_Checklist_Jan15.pdf",
          type: "application/pdf",
          size: "1.2 MB",
          url: "/documents/checklist.pdf",
        },
      ],
      isRead: true,
      priority: "normal",
    },
    {
      id: "4",
      senderId: "1",
      senderName: "John Smith",
      senderAvatar: "/placeholder-user.jpg",
      senderRole: "Manager",
      content: "Great work everyone! Client feedback has been excellent.",
      timestamp: "2024-01-15T10:30:00Z",
      type: "text",
      isRead: false,
      priority: "normal",
    },
  ]

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.participants.some((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFilter =
      filterType === "all" ||
      (filterType === "unread" && conv.unreadCount > 0) ||
      (filterType === "pinned" && conv.isPinned) ||
      (filterType === "archived" && conv.isArchived)
    return matchesSearch && matchesFilter
  })

  const unreadNotifications = notifications.filter((n) => !n.isRead).length
  const unreadAnnouncements = announcements.filter((a) => !a.isRead).length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In a real app, this would send the message to the server
      setNewMessage("")
    }
  }

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full lg:w-80 space-y-4">
        {/* Header */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Communication Hub</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="h-4 w-4" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  New
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conversations</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="pinned">Pinned</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Conversations List */}
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Conversations</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation === conversation.id
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        {conversation.type === "group" ? (
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                        ) : (
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={conversation.participants[0]?.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {conversation.participants[0]?.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        {conversation.type === "direct" && conversation.participants[0] && (
                          <div
                            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(conversation.participants[0].status)}`}
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm truncate">{conversation.title}</h4>
                          <div className="flex items-center gap-1">
                            {conversation.isPinned && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                            {conversation.isMuted && <VolumeX className="h-3 w-3 text-gray-400" />}
                            <span className="text-xs text-gray-500">
                              {formatTime(conversation.lastMessage.timestamp)}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 truncate mb-1">
                          {conversation.lastMessage.senderName}: {conversation.lastMessage.content}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {conversation.participants.slice(0, 3).map((participant) => (
                              <Avatar key={participant.id} className="w-4 h-4">
                                <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">
                                  {participant.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {conversation.participants.length > 3 && (
                              <span className="text-xs text-gray-500">+{conversation.participants.length - 3}</span>
                            )}
                          </div>

                          {conversation.unreadCount > 0 && (
                            <Badge className="h-5 px-2 text-xs">{conversation.unreadCount}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Tabs defaultValue="messages" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="notifications" className="relative">
              Notifications
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="announcements" className="relative">
              Announcements
              {unreadAnnouncements > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                  {unreadAnnouncements}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="flex-1 flex flex-col">
            {selectedConversation ? (
              <Card className="flex-1 flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {conversations.find((c) => c.id === selectedConversation)?.type === "group" ? (
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                        ) : (
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={
                                conversations.find((c) => c.id === selectedConversation)?.participants[0]?.avatar ||
                                "/placeholder.svg"
                              }
                            />
                            <AvatarFallback>
                              {conversations
                                .find((c) => c.id === selectedConversation)
                                ?.participants[0]?.name.split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {conversations.find((c) => c.id === selectedConversation)?.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {conversations.find((c) => c.id === selectedConversation)?.participants.length} participants
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col pt-0">
                  <ScrollArea className="flex-1 mb-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {message.senderName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{message.senderName}</span>
                              <Badge variant="secondary" className="text-xs">
                                {message.senderRole}
                              </Badge>
                              <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                              {message.priority !== "normal" && (
                                <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>
                                  {message.priority}
                                </Badge>
                              )}
                            </div>

                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-sm">{message.content}</p>

                              {message.attachments && message.attachments.length > 0 && (
                                <div className="mt-2 space-y-2">
                                  {message.attachments.map((attachment) => (
                                    <div
                                      key={attachment.id}
                                      className="flex items-center gap-2 p-2 bg-white rounded border"
                                    >
                                      <ImageIcon className="h-4 w-4 text-gray-400" />
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">{attachment.name}</p>
                                        <p className="text-xs text-gray-600">{attachment.size}</p>
                                      </div>
                                      <Button size="sm" variant="ghost">
                                        <Download className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={sendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="flex-1 flex items-center justify-center">
                <CardContent className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the sidebar to start messaging.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="notifications" className="flex-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Notifications</CardTitle>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-1" />
                    Settings
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border transition-colors ${
                          notification.isRead ? "bg-white" : "bg-blue-50 border-blue-200"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              notification.isRead ? "bg-gray-300" : "bg-blue-500"
                            }`}
                          />

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-sm">{notification.title}</h4>
                              <div className="flex items-center gap-2">
                                <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                  {notification.priority}
                                </Badge>
                                <span className="text-xs text-gray-500">{formatTime(notification.timestamp)}</span>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>

                            {notification.sender && (
                              <p className="text-xs text-gray-500 mb-2">From: {notification.sender}</p>
                            )}

                            <div className="flex items-center gap-2">
                              {notification.actionUrl && (
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                              )}
                              {!notification.isRead && (
                                <Button size="sm" variant="ghost">
                                  <Eye className="h-3 w-3 mr-1" />
                                  Mark as Read
                                </Button>
                              )}
                              <Button size="sm" variant="ghost">
                                <Archive className="h-3 w-3 mr-1" />
                                Archive
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements" className="flex-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Company Announcements</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    New Announcement
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <Card
                        key={announcement.id}
                        className={`${announcement.isRead ? "bg-white" : "bg-blue-50 border-blue-200"}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                announcement.isRead ? "bg-gray-300" : "bg-blue-500"
                              }`}
                            />

                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{announcement.title}</h3>
                                <Badge className={`text-xs ${getPriorityColor(announcement.priority)}`}>
                                  {announcement.priority}
                                </Badge>
                              </div>

                              <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                                <span>
                                  By {announcement.author} ({announcement.authorRole})
                                </span>
                                <span>•</span>
                                <span>{formatTime(announcement.timestamp)}</span>
                                <span>•</span>
                                <Badge variant="secondary" className="text-xs">
                                  {announcement.category}
                                </Badge>
                              </div>

                              <p className="text-sm text-gray-700 mb-3">{announcement.content}</p>

                              {announcement.attachments && announcement.attachments.length > 0 && (
                                <div className="space-y-2 mb-3">
                                  {announcement.attachments.map((attachment) => (
                                    <div
                                      key={attachment.id}
                                      className="flex items-center gap-2 p-2 bg-gray-50 rounded border"
                                    >
                                      <ImageIcon className="h-4 w-4 text-gray-400" />
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">{attachment.name}</p>
                                        <p className="text-xs text-gray-600">{attachment.size}</p>
                                      </div>
                                      <Button size="sm" variant="ghost">
                                        <Download className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center gap-2">
                                {!announcement.isRead && (
                                  <Button size="sm" variant="outline">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Mark as Read
                                  </Button>
                                )}
                                <Button size="sm" variant="ghost">
                                  <Flag className="h-3 w-3 mr-1" />
                                  Important
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Archive className="h-3 w-3 mr-1" />
                                  Archive
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
