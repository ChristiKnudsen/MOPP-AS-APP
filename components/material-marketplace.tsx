"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  ShoppingCart,
  Star,
  Package,
  Phone,
  Mail,
  Globe,
  MapPin,
  Plus,
  Minus,
  Heart,
  Award,
  Leaf,
  Building2,
  Calendar,
  Eye,
  ShoppingBag,
} from "lucide-react"
import { type Language, useTranslation } from "@/lib/i18n"

interface MaterialMarketplaceProps {
  language: Language
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  unit: string
  category: string
  supplier: string
  supplierRating: number
  productRating: number
  reviewCount: number
  image: string
  inStock: boolean
  stockLevel: number
  minOrderQty: number
  isEcoFriendly: boolean
  certifications: string[]
  specifications: Record<string, string>
}

interface Supplier {
  id: string
  name: string
  description: string
  rating: number
  reviewCount: number
  location: string
  phone: string
  email: string
  website: string
  certifications: string[]
  specialties: string[]
  logo: string
  establishedYear: number
  totalProducts: number
}

interface CartItem {
  product: Product
  quantity: number
}

interface Order {
  id: string
  orderNumber: string
  date: string
  supplier: string
  items: CartItem[]
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  trackingNumber?: string
  estimatedDelivery?: string
}

export function MaterialMarketplace({ language }: MaterialMarketplaceProps) {
  const t = useTranslation(language)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showEcoOnly, setShowEcoOnly] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)

  // Sample data
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "cleaning-supplies", name: "Cleaning Supplies" },
    { id: "equipment", name: "Equipment" },
    { id: "tools", name: "Tools" },
    { id: "safety", name: "Safety Gear" },
    { id: "paper", name: "Paper Products" },
    { id: "chemicals", name: "Chemicals" },
  ]

  const products: Product[] = [
    {
      id: "1",
      name: "Professional All-Purpose Cleaner",
      description: "Concentrated multi-surface cleaner suitable for all commercial cleaning applications",
      price: 24.99,
      unit: "5L bottle",
      category: "cleaning-supplies",
      supplier: "CleanTech Solutions",
      supplierRating: 4.8,
      productRating: 4.6,
      reviewCount: 127,
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
      stockLevel: 45,
      minOrderQty: 2,
      isEcoFriendly: true,
      certifications: ["EU Ecolabel", "ISO 14001"],
      specifications: {
        "pH Level": "7.0-8.0",
        Concentration: "1:50",
        "Shelf Life": "24 months",
        Packaging: "Recyclable plastic",
      },
    },
    {
      id: "2",
      name: "Industrial Vacuum Cleaner",
      description: "Heavy-duty commercial vacuum with HEPA filtration system",
      price: 899.99,
      unit: "unit",
      category: "equipment",
      supplier: "ProClean Equipment",
      supplierRating: 4.9,
      productRating: 4.8,
      reviewCount: 89,
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
      stockLevel: 12,
      minOrderQty: 1,
      isEcoFriendly: false,
      certifications: ["CE", "Energy Star"],
      specifications: {
        Power: "1400W",
        Capacity: "15L",
        Filtration: "HEPA H13",
        Warranty: "3 years",
      },
    },
    {
      id: "3",
      name: "Microfiber Cleaning Cloths",
      description: "Premium microfiber cloths for streak-free cleaning",
      price: 19.99,
      unit: "pack of 12",
      category: "tools",
      supplier: "FiberTech",
      supplierRating: 4.7,
      productRating: 4.5,
      reviewCount: 203,
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
      stockLevel: 78,
      minOrderQty: 5,
      isEcoFriendly: true,
      certifications: ["OEKO-TEX"],
      specifications: {
        Material: "80% Polyester, 20% Polyamide",
        Size: "40x40cm",
        Weight: "300gsm",
        Washable: "Up to 500 cycles",
      },
    },
    {
      id: "4",
      name: "Safety Gloves - Nitrile",
      description: "Disposable nitrile gloves for chemical protection",
      price: 34.99,
      unit: "box of 100",
      category: "safety",
      supplier: "SafeGuard Supplies",
      supplierRating: 4.6,
      productRating: 4.4,
      reviewCount: 156,
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
      stockLevel: 234,
      minOrderQty: 10,
      isEcoFriendly: false,
      certifications: ["EN 374", "FDA Approved"],
      specifications: {
        Material: "Nitrile",
        Thickness: "4 mil",
        Length: "240mm",
        "Powder Free": "Yes",
      },
    },
  ]

  const suppliers: Supplier[] = [
    {
      id: "1",
      name: "CleanTech Solutions",
      description: "Leading supplier of eco-friendly cleaning products for commercial use",
      rating: 4.8,
      reviewCount: 342,
      location: "Oslo, Norway",
      phone: "+47 22 12 34 56",
      email: "contact@cleantech.no",
      website: "www.cleantech-solutions.no",
      certifications: ["ISO 9001", "ISO 14001", "EU Ecolabel"],
      specialties: ["Eco-friendly products", "Commercial cleaning", "Industrial solutions"],
      logo: "/placeholder.svg?height=80&width=80",
      establishedYear: 2010,
      totalProducts: 156,
    },
    {
      id: "2",
      name: "ProClean Equipment",
      description: "Professional cleaning equipment and machinery supplier",
      rating: 4.9,
      reviewCount: 198,
      location: "Bergen, Norway",
      phone: "+47 55 98 76 54",
      email: "sales@proclean.no",
      website: "www.proclean-equipment.no",
      certifications: ["ISO 9001", "CE Marking"],
      specialties: ["Industrial equipment", "Vacuum systems", "Floor care machines"],
      logo: "/placeholder.svg?height=80&width=80",
      establishedYear: 2005,
      totalProducts: 89,
    },
  ]

  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      date: "2024-01-15",
      supplier: "CleanTech Solutions",
      items: [
        { product: products[0], quantity: 5 },
        { product: products[2], quantity: 10 },
      ],
      total: 324.85,
      status: "delivered",
      trackingNumber: "TRK123456789",
      estimatedDelivery: "2024-01-18",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      date: "2024-01-20",
      supplier: "ProClean Equipment",
      items: [{ product: products[1], quantity: 1 }],
      total: 899.99,
      status: "shipped",
      trackingNumber: "TRK987654321",
      estimatedDelivery: "2024-01-25",
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesEco = !showEcoOnly || product.isEcoFriendly
    return matchesSearch && matchesCategory && matchesEco
  })

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.max(item.quantity + quantity, product.minOrderQty) }
            : item,
        )
      }
      return [...prev, { product, quantity: Math.max(quantity, product.minOrderQty) }]
    })
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) => {
      const product = products.find((p) => p.id === productId)
      if (!product) return prev

      if (quantity < product.minOrderQty) {
        return prev.filter((item) => item.product.id !== productId)
      }

      return prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Material Marketplace</h1>
          <p className="text-gray-600">Find and order cleaning supplies from trusted suppliers</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="relative bg-transparent">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart ({cartItemCount})
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{products.length}</p>
                <p className="text-sm text-gray-600">Products Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{suppliers.length}</p>
                <p className="text-sm text-gray-600">Trusted Suppliers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{orders.length}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-2xl font-bold">{products.filter((p) => p.isEcoFriendly).length}</p>
                <p className="text-sm text-gray-600">Eco Products</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant={showEcoOnly ? "default" : "outline"}
                  onClick={() => setShowEcoOnly(!showEcoOnly)}
                  className="whitespace-nowrap"
                >
                  <Leaf className="h-4 w-4 mr-2" />
                  Eco-Friendly Only
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                        }`}
                      />
                    </Button>
                    {product.isEcoFriendly && (
                      <Badge className="absolute top-2 left-2 bg-green-100 text-green-800">
                        <Leaf className="h-3 w-3 mr-1" />
                        Eco
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.productRating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({product.reviewCount})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-lg">${product.price}</p>
                        <p className="text-xs text-gray-600">per {product.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Min: {product.minOrderQty}</p>
                        <p className={`text-xs ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                          {product.inStock ? `${product.stockLevel} in stock` : "Out of stock"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => setSelectedProduct(product)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{selectedProduct?.name}</DialogTitle>
                            <DialogDescription>{selectedProduct?.description}</DialogDescription>
                          </DialogHeader>
                          {selectedProduct && (
                            <div className="space-y-4">
                              <img
                                src={selectedProduct.image || "/placeholder.svg"}
                                alt={selectedProduct.name}
                                className="w-full h-48 object-cover rounded-md"
                              />

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Product Details</h4>
                                  <div className="space-y-1 text-sm">
                                    <p>
                                      <strong>Price:</strong> ${selectedProduct.price} per {selectedProduct.unit}
                                    </p>
                                    <p>
                                      <strong>Supplier:</strong> {selectedProduct.supplier}
                                    </p>
                                    <p>
                                      <strong>Min Order:</strong> {selectedProduct.minOrderQty}
                                    </p>
                                    <p>
                                      <strong>Stock:</strong> {selectedProduct.stockLevel} available
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Specifications</h4>
                                  <div className="space-y-1 text-sm">
                                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                                      <p key={key}>
                                        <strong>{key}:</strong> {value}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {selectedProduct.certifications.length > 0 && (
                                <div>
                                  <h4 className="font-semibold mb-2">Certifications</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedProduct.certifications.map((cert) => (
                                      <Badge key={cert} variant="secondary">
                                        <Award className="h-3 w-3 mr-1" />
                                        {cert}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="flex items-center gap-2 pt-4">
                                <Button
                                  onClick={() => addToCart(selectedProduct)}
                                  disabled={!selectedProduct.inStock}
                                  className="flex-1"
                                >
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className="flex-1"
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suppliers.map((supplier) => (
              <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={supplier.logo || "/placeholder.svg"}
                      alt={supplier.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{supplier.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{supplier.rating}</span>
                          <span className="text-sm text-gray-600">({supplier.reviewCount})</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-3">{supplier.description}</p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{supplier.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Established {supplier.establishedYear}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span>{supplier.totalProducts} products</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {supplier.specialties.slice(0, 3).map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Globe className="h-3 w-3 mr-1" />
                          Website
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{order.orderNumber}</h3>
                      <p className="text-sm text-gray-600">
                        {order.supplier} • {order.date}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>
                          {item.product.name} × {item.quantity}
                        </span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p>
                        <strong>Total: ${order.total.toFixed(2)}</strong>
                      </p>
                      {order.trackingNumber && <p className="text-gray-600">Tracking: {order.trackingNumber}</p>}
                      {order.estimatedDelivery && (
                        <p className="text-gray-600">Est. Delivery: {order.estimatedDelivery}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      {order.status === "delivered" && (
                        <Button size="sm">
                          <ShoppingCart className="h-3 w-3 mr-1" />
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

        <TabsContent value="favorites" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products
              .filter((product) => favorites.includes(product.id))
              .map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                      <p className="font-bold text-lg">${product.price}</p>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className="w-full"
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
          {favorites.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                <p className="text-gray-600">Start adding products to your favorites to see them here.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Shopping Cart Sidebar */}
      {cart.length > 0 && (
        <Card className="fixed bottom-4 right-4 w-80 max-h-96 shadow-lg z-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Shopping Cart
              <Badge>{cartItemCount} items</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ScrollArea className="h-48">
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-600">${item.product.price} each</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 w-6 p-0 bg-transparent"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 w-6 p-0 bg-transparent"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator className="my-3" />
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">Total: ${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCart([])}>
                Clear
              </Button>
              <Button size="sm" className="flex-1">
                Checkout
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
