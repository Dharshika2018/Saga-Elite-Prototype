window.SAGA_MOCK = {
  users: [
    { id: "u-001", name: "Ayesha Perera", email: "ayesha@sagaelite.lk", role: "user", isActive: true, isVerified: true, whatsappOptIn: true, whatsappNumber: "+94771234567" },
    { id: "u-002", name: "Nethmi Silva", email: "nethmi@sagaelite.lk", role: "user", isActive: true, isVerified: true, whatsappOptIn: false, whatsappNumber: "+94779876543" },
    { id: "a-001", name: "Ravin Jayasekara", email: "admin@sagaelite.lk", role: "admin", isActive: true, isVerified: true, whatsappOptIn: false },
    { id: "s-001", name: "Super Admin", email: "superadmin@sagaelite.lk", role: "superadmin", isActive: true, isVerified: true, whatsappOptIn: false }
  ],
  drops: [
    { id: "d-001", name: "Noir Gold Ritual", slug: "noir-gold-ritual", description: "Urban luxury silhouettes with high-contrast gold accents.", releaseDate: "2026-04-28T18:00:00+05:30", endDate: "2026-05-05T23:59:59+05:30", isPublished: true, isArchived: false, banner: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80" },
    { id: "d-002", name: "Street Myth Archive", slug: "street-myth-archive", description: "Limited archive cuts for peak-street styling.", releaseDate: "2026-05-12T20:00:00+05:30", endDate: "2026-05-20T23:59:59+05:30", isPublished: true, isArchived: false, banner: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80" },
    { id: "d-003", name: "Future Thread", slug: "future-thread", description: "Draft drop for internal planning only.", releaseDate: "2026-06-02T18:00:00+05:30", endDate: "2026-06-08T23:59:59+05:30", isPublished: false, isArchived: false, banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80" }
  ],
  products: [
    {
      id: "p-001",
      artNo: "SE-UG-1001",
      name: "Aurum Edge Bomber",
      description: "Structured bomber jacket with brushed gold zip track and matte-black shell.",
      brand: "Saga Elite",
      category: "Unisex",
      dropId: "d-001",
      basePrice: 7200,
      discountPercent: 10,
      isLimited: true,
      maxPerUser: 2,
      isActive: true,
      soldCount: 62,
      wishCount: 150,
      images: [
        "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=80"
      ],
      variants: [
        { id: "v-001", sku: "SE-UG-1001-BLK-S", size: "S", color: "Black", stock: 12, priceAdjustment: 0 },
        { id: "v-002", sku: "SE-UG-1001-BLK-M", size: "M", color: "Black", stock: 8, priceAdjustment: 0 },
        { id: "v-003", sku: "SE-UG-1001-CHR-L", size: "L", color: "Charcoal", stock: 6, priceAdjustment: 350 }
      ]
    },
    {
      id: "p-002",
      artNo: "SE-GR-2109",
      name: "Velvet Signal Dress",
      description: "Fluid silhouette with metallic embroidery and drop-night tailoring.",
      brand: "Saga Elite",
      category: "Girls",
      dropId: "d-001",
      basePrice: 9800,
      discountPercent: 0,
      isLimited: true,
      maxPerUser: 1,
      isActive: true,
      soldCount: 41,
      wishCount: 132,
      images: [
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80"
      ],
      variants: [
        { id: "v-004", sku: "SE-GR-2109-BGD-S", size: "S", color: "Burgundy", stock: 5, priceAdjustment: 0 },
        { id: "v-005", sku: "SE-GR-2109-BGD-M", size: "M", color: "Burgundy", stock: 4, priceAdjustment: 200 }
      ]
    },
    {
      id: "p-003",
      artNo: "SE-BY-3102",
      name: "Neon Crest Hoodie",
      description: "Street-fit hoodie with premium fleece interior and signature crest patch.",
      brand: "Saga Elite",
      category: "Boys",
      dropId: "d-002",
      basePrice: 5600,
      discountPercent: 15,
      isLimited: false,
      maxPerUser: 2,
      isActive: true,
      soldCount: 75,
      wishCount: 99,
      images: [
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1000&q=80"
      ],
      variants: [
        { id: "v-006", sku: "SE-BY-3102-NBL-M", size: "M", color: "Navy", stock: 20, priceAdjustment: 0 },
        { id: "v-007", sku: "SE-BY-3102-NBL-L", size: "L", color: "Navy", stock: 14, priceAdjustment: 0 }
      ]
    }
  ],
  orders: [
    {
      id: "ord-001",
      userId: "u-001",
      items: [{ productId: "p-001", variantId: "v-002", qty: 1 }],
      totalAmount: 6480,
      paymentMethod: "card",
      paymentStatus: "paid",
      orderStatus: "confirmed",
      contactNumber: "+94771234567",
      shippingAddress: "No. 14, Gregory Road, Colombo 07",
      giftTier: "Premium",
      giftReveal: true,
      createdAt: "2026-04-22T20:13:00+05:30"
    },
    {
      id: "ord-002",
      userId: "u-001",
      items: [{ productId: "p-003", variantId: "v-006", qty: 1 }],
      totalAmount: 4760,
      paymentMethod: "manual",
      paymentStatus: "pending",
      orderStatus: "verification_pending",
      contactNumber: "+94771234567",
      shippingAddress: "No. 14, Gregory Road, Colombo 07",
      paymentProofUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      paymentProofHash: "proofhash-002",
      giftTier: "Standard",
      giftReveal: false,
      expiresAt: "2026-04-22T20:28:00+05:30",
      createdAt: "2026-04-22T20:13:00+05:30"
    }
  ],
  notifications: [
    { id: "n-001", userId: "u-001", type: "drop", title: "Drop is live", message: "Noir Gold Ritual is now live.", isRead: false },
    { id: "n-002", userId: "u-001", type: "order", title: "Order confirmed", message: "Your order ord-001 has been confirmed.", isRead: true }
  ],
  whatsappLogs: [
    { id: "wa-001", userId: "u-001", phoneNumber: "+94771234567", templateName: "order_confirmation", status: "delivered", sentAt: "2026-04-22T20:14:00+05:30", deliveredAt: "2026-04-22T20:14:04+05:30", metaMessageId: "wamid.001" },
    { id: "wa-002", userId: "u-001", phoneNumber: "+94771234567", templateName: "payment_reminder", status: "failed", sentAt: "2026-04-22T20:15:00+05:30", deliveredAt: null, metaMessageId: "wamid.002" }
  ],
  gifts: [
    { id: "g-001", tier: "Basic", name: "Mystery Wristband", stock: 120 },
    { id: "g-002", tier: "Standard", name: "Signature Tote", stock: 80 },
    { id: "g-003", tier: "Premium", name: "Limited Cap", stock: 45 },
    { id: "g-004", tier: "Elite", name: "Collector Box", stock: 12 }
  ]
};
