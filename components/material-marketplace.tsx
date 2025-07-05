"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { type Language, useTranslation } from "@/lib/i18n"
import {
  ShoppingCart,
  Plus,
  Search,
  Star,
  Package,
  Truck,
  CreditCard,
  Heart,
  Eye,
  Minus,
  X,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

interface MaterialMarketplaceProps {
  language: Language
}

type ProductCategory = "cleaning-supplies" | "equipment" | "tools" | "safety" | "paper-products" | "chemicals"
type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"

interface Product {
  id: string
  name: string
  description: string
  category: ProductCategory
  price: number
  unit: string
  minOrder: number
  inStock: number
  rating: number
  reviews: number
  supplier: Supplier
  images: string[]
  specifications: Record<string, string>
  certifications: string[]
  isEcoFriendly: boolean
  isFavorite: boolean
}

interface Supplier {
  id: string
  name: string
  logo: string
  rating: number
  reviews: number
  location: string
  phone: string
  email: string
  website: string
  description: string
  certifications: string[]
  totalProducts: number
  yearsInBusiness: number
  responseTime: string
}

interface CartItem {
  product: Product
  quantity: number
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: OrderStatus
  items: CartItem[]
  total: number
  supplier: Supplier
  deliveryDate: string
  trackingNumber?: string
}

const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "CleanPro Supplies",
    logo: "/placeholder-logo.png",
    rating: 4.8,
    reviews: 156,
    location: "Oslo, Norway",
    phone: "+47 22 12 34 56",
    email: "contact@cleanpro.no",
    website: "www.cleanpro.no",
    description: "Leading supplier of professional cleaning supplies and equipment in Norway.",
    certifications: ["ISO 9001", "ISO 14001", "EU Ecolabel"],
    totalProducts: 245,
    yearsInBusiness: 15,
    responseTime: "< 2 hours",
  },
  {
    id: "2",
    name: "Nordic Clean Solutions",
    logo: "/placeholder-logo.png",
    rating: 4.6,
    reviews: 89,
    location: "Bergen, Norway",
    phone: "+47 55 98 76 54",
    email: "info@nordicclean.no",
    website: "www.nordicclean.no",
    description: "Eco-friendly cleaning solutions for sustainable operations.",
    certifications: ["Green Seal", "GREENGUARD", "Cradle to Cradle"],
    totalProducts: 178,
    yearsInBusiness: 8,
    responseTime: "< 4 hours",
  },
]

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Professional All-Purpose Cleaner",
    description: "Concentrated multi-surface cleaner suitable for all commercial cleaning applications.",
    category: "cleaning-supplies",
    price: 45.99,
    unit: "per liter",
    minOrder: 12,
    inStock: 150,
    rating: 4.7,
    reviews: 34,
    supplier: mockSuppliers[0],
    images: ["/placeholder.jpg"],
    specifications: {
      Volume: "1 Liter",
      Concentration: "1:50",
      "pH Level": "7.2",
      Fragrance: "Fresh Lemon",
    },
    certifications: ["EU Ecolabel", "GREENGUARD Gold"],
    isEcoFriendly: true,
    isFavorite: false,
  },
  {
    id: "2",
    name: "Industrial Vacuum Cleaner V2000",
    description: "Heavy-duty commercial vacuum cleaner with HEPA filtration system.",
    category: "equipment",
    price: 2499.99,
    unit: "per unit",
    minOrder: 1,
    inStock: 8,
    rating: 4.9,
    reviews: 12,
    supplier: mockSuppliers[0],
    images: ["/placeholder.jpg"],
    specifications: {
      Power: "2000W",
      Capacity: "15L",
      Filtration: "HEPA H13",
      "Noise Level": "68 dB",
    },
    certifications: ["CE", "Energy Star"],
    isEcoFriendly: false,
    isFavorite: true,
  },
  {
    id: "3",
    name: "Microfiber Cleaning Cloths (Pack of 50)",
    description: "Premium microfiber cloths for streak-free cleaning on all surfaces.",
    category: "tools",
    price: 89.99,
    unit: "per pack",
    minOrder: 5,
    inStock: 75,
    rating: 4.5,
    reviews: 67,
    supplier: mockSuppliers[1],
    images: ["/placeholder.jpg"],
    specifications: {
      Material: "80% Polyester, 20% Polyamide",
      Size: "40x40 cm",
      Weight: "300 GSM",
      Color: "Blue",
    },
    certifications: ["Oeko-Tex Standard 100"],
    isEcoFriendly: true,
    isFavorite: false,
  },
  {
    id: "4",
    name: "Safety Gloves - Nitrile (Box of 100)",
    description: "Powder-free nitrile gloves for chemical protection and hygiene.",
    category: "safety",
    price: 24.99,
    unit: "per box",
    minOrder: 10,
    inStock: 200,
    rating: 4.3,
    reviews: 45,
    supplier: mockSuppliers[1],
    images: ["/placeholder.jpg"],
    specifications: {
      Material: "Nitrile",
      Thickness: "4 mil",
      Length: "240mm",
      Sizes: "S, M, L, XL",
    },
    certifications: ["EN 374", "FDA Approved"],
    isEcoFriendly: false,
    isFavorite: false,
  },
]

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    items: [
      { product: mockProducts[0], quantity: 24 },
      { product: mockProducts[2], quantity: 10 },
    ],
    total: 2003.66,
    supplier: mockSuppliers[0],
    deliveryDate: "2024-01-18",
    trackingNumber: "TRK123456789",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    date: "2024-01-20",
    status: "shipped",
    items: [{ product: mockProducts[1], quantity: 1 }],
    total: 2499.99,
    supplier: mockSuppliers[0],
    deliveryDate: "2024-01-25",
    trackingNumber: "TRK987654321",
  },
]

export function MaterialMarketplace({ language }: MaterialMarketplaceProps) {
  const t = useTranslation(language)
  const [activeTab, setActiveTab] = useState("browse")
  const [products] = useState<Product[]>(mockProducts)
  const [suppliers] = useState<Supplier[]>(mockSuppliers)
  const [orders] = useState<Order[]>(mockOrders)
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [showCart, setShowCart] = useState(false)

  const categories = {
    "cleaning-supplies": "Cleaning Supplies",
    equipment: "Equipment",
    tools: "Tools & Accessories",
    safety: "Safety Equipment",
    "paper-products": "Paper Products",
    chemicals: "Chemicals",
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...prev, { product, quantity }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "confirmed":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "confirmed":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "cancelled":
        return <X className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Material Marketplace</h1>
          <p className="text-gray-600">Source cleaning supplies and equipment from trusted suppliers</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setShowCart(true)} className="relative">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Available Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Trusted Suppliers</p>
                <p className="text-2xl font-bold">{suppliers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Eco Products</p>
                <p className="text-2xl font-bold">{products.filter((p) => p.isEcoFriendly).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse Products</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {Object.entries(categories).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 relative overflow-hidden">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.isEcoFriendly && (
                      <Badge className="absolute top-2 left-2 bg-green-100 text-green-800">Eco-Friendly</Badge>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() => {
                        /* Toggle favorite */
                      }}
                    >
                      <Heart className={`h-4 w-4 ${product.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">kr {product.price}</p>
                      <p className="text-sm text-gray-600">{product.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Min order: {product.minOrder}</p>
                      <p className="text-sm text-green-600">{product.inStock} in stock</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>by {product.supplier.name}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedProduct(product)} className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" onClick={() => addToCart(product, product.minOrder)} className="flex-1">
                      <Plus className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suppliers.map((supplier) => (
              <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={supplier.logo || "/placeholder.svg"} alt={supplier.name} />
                      <AvatarFallback>{supplier.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{supplier.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4" />
                        {supplier.location}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(supplier.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({supplier.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{supplier.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Products</p>
                      <p className="font-medium">{supplier.totalProducts}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Experience</p>
                      <p className="font-medium">{supplier.yearsInBusiness} years</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Response Time</p>
                      <p className="font-medium">{supplier.responseTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Rating</p>
                      <p className="font-medium">{supplier.rating}/5.0</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Certifications</p>
                    <div className="flex flex-wrap gap-1">
                      {supplier.certifications.map((cert) => (
                        <Badge key={cert} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedSupplier(supplier)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                      <CardDescription>
                        Ordered on {new Date(order.date).toLocaleDateString()} from {order.supplier.name}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                      </Badge>
                      <p className="text-lg font-bold mt-1">kr {order.total.toLocaleString()}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.images[0] || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">kr {(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Truck className="h-4 w-4" />
                        <span>Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</span>
                      </div>
                      {order.trackingNumber && (
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          <span>Tracking: {order.trackingNumber}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {order.status === "delivered" && (
                        <Button size="sm" variant="outline">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products
              .filter((p) => p.isFavorite)
              .map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 relative overflow-hidden">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.isEcoFriendly && (
                        <Badge className="absolute top-2 left-2 bg-green-100 text-green-800">Eco-Friendly</Badge>
                      )}
                      <Button size="sm" variant="ghost" className="absolute top-2 right-2 h-8 w-8 p-0">
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold">kr {product.price}</p>
                        <p className="text-sm text-gray-600">{product.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-600">{product.inStock} in stock</p>
                      </div>
                    </div>

                    <Button size="sm" onClick={() => addToCart(product, product.minOrder)} className="w-full">
                      <Plus className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Details Dialog */}
      {selectedProduct && (
        <ProductDetailsDialog
          product={selectedProduct}
          language={language}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Supplier Details Dialog */}
      {selectedSupplier && (
        <SupplierDetailsDialog
          supplier={selectedSupplier}
          language={language}
          onClose={() => setSelectedSupplier(null)}
        />
      )}

      {/* Shopping Cart Dialog */}
      {showCart && (
        <ShoppingCartDialog
          cart={cart}
          language={language}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          total={cartTotal}
        />
      )}
    </div>
  )
}

function ProductDetailsDialog({
  product,
  language,
  onClose,
  onAddToCart,
}: {
  product: Product
  language: Language
  onClose: () => void
  onAddToCart: (product: Product, quantity: number) => void
}) {
  const t = useTranslation(language)
  const [quantity, setQuantity] = useState(product.minOrder)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {product.name}
          </DialogTitle>
          <DialogDescription>Product details and specifications</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Specifications</h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {product.certifications.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Certifications</h3>
                  <div className="flex flex-wrap gap-1">
                    {product.certifications.map((cert) => (
                      <Badge key={cert} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-4">{product.description}</p>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>

              {product.isEcoFriendly && (
                <Badge className="bg-green-100 text-green-800 mb-4">Eco-Friendly Product</Badge>
              )}
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-3xl font-bold">kr {product.price}</p>
                  <p className="text-gray-600">{product.unit}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Min order: {product.minOrder}</p>
                  <p className="text-sm text-green-600">{product.inStock} in stock</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setQuantity(Math.max(product.minOrder, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(product.minOrder, Number.parseInt(e.target.value) || product.minOrder))
                      }
                      className="w-20 text-center"
                      min={product.minOrder}
                    />
                    <Button size="sm" variant="outline" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>kr {(product.price * quantity).toLocaleString()}</span>
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    onAddToCart(product, quantity)
                    onClose()
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Supplier Information</h3>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={product.supplier.logo || "/placeholder.svg"} alt={product.supplier.name} />
                  <AvatarFallback>{product.supplier.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{product.supplier.name}</p>
                  <p className="text-sm text-gray-600">{product.supplier.location}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">
                      {product.supplier.rating} ({product.supplier.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function SupplierDetailsDialog({
  supplier,
  language,
  onClose,
}: {
  supplier: Supplier
  language: Language
  onClose: () => void
}) {
  const t = useTranslation(language)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {supplier.name}
          </DialogTitle>
          <DialogDescription>Supplier profile and information</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={supplier.logo || "/placeholder.svg"} alt={supplier.name} />
              <AvatarFallback className="text-2xl">{supplier.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{supplier.name}</h2>
              <p className="text-gray-700 mb-4">{supplier.description}</p>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(supplier.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({supplier.reviews} reviews)</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Products</p>
                  <p className="font-bold text-lg">{supplier.totalProducts}</p>
                </div>
                <div>
                  <p className="text-gray-600">Experience</p>
                  <p className="font-bold text-lg">{supplier.yearsInBusiness} years</p>
                </div>
                <div>
                  <p className="text-gray-600">Response Time</p>
                  <p className="font-bold text-lg">{supplier.responseTime}</p>
                </div>
                <div>
                  <p className="text-gray-600">Rating</p>
                  <p className="font-bold text-lg">{supplier.rating}/5.0</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span>{supplier.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span>{supplier.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-600" />
                  <span>{supplier.website}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications & Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {supplier.certifications.map((cert) => (
                    <Badge key={cert} variant="outline">
                      <Award className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Globe className="h-4 w-4 mr-2" />
              Visit Website
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ShoppingCartDialog({
  cart,
  language,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  total,
}: {
  cart: CartItem[]
  language: Language
  onClose: () => void
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  total: number
}) {
  const t = useTranslation(language)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({cart.length} items)
          </DialogTitle>
          <DialogDescription>Review your items before checkout</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img
                    src={item.product.images[0] || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">by {item.product.supplier.name}</p>
                    <p className="text-sm font-medium">
                      kr {item.product.price} {item.product.unit}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">kr {(item.product.price * item.quantity).toLocaleString()}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>kr {total.toLocaleString()}</span>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                  Continue Shopping
                </Button>
                <Button className="flex-1">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
