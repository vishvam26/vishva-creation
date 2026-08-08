export const products = [
  // PAINTINGS
  {
    id: "p1",
    title: "Village Landscape Oil Painting",
    category: "paintings",
    price: 59999,
    originalPrice: 75000,
    rating: 4.9,
    reviewsCount: 28,
    isBestSeller: true,
    isNew: true,
    medium: "Acrylic on Canvas",
    canvasSize: "16 x 20 inches",
    frameOptions: ["Unframed Canvas", "Teak Wood Frame", "Black Floating Frame"],
    craftTime: "4-5 Days",
    deliveryTime: "3-5 Business Days",
    certificate: true,
    signedByArtist: true,
    description: "An original hand-painted acrylic artwork capturing the ethereal golden rays piercing through monsoon rain clouds over tranquil lakes. Hand-signed with a certificate of authenticity.",
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578926377703-668f4506a092?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-artist-painting-on-a-canvas-42934-large.mp4",
    allowCustomization: true,
    customFields: ["Custom Name on Corner", "Specific Canvas Size", "Gift Message Card"]
  },
  {
    id: "p2",
    title: "Botanical Wildflower Watercolor Series",
    category: "paintings",
    price: 1299,
    originalPrice: 1699,
    rating: 4.8,
    reviewsCount: 19,
    isBestSeller: false,
    isNew: true,
    medium: "Cold-pressed Watercolor on 300GSM Paper",
    canvasSize: "A4 (8.3 x 11.7 inches)",
    frameOptions: ["Glass Oak Frame", "White Minimal Frame"],
    craftTime: "2-3 Days",
    deliveryTime: "3-4 Business Days",
    certificate: true,
    signedByArtist: true,
    description: "Delicate hand-painted botanical watercolors of lavenders, daisies, and wild poppies. Painted on archival 300GSM cold-pressed paper.",
    images: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
    ],
    allowCustomization: true,
    customFields: ["Add Custom Flower Choice", "Add Handwritten Quote"]
  },

  // CROCHET TOYS & PLUSHIES
  {
    id: "c1",
    title: "Handcrafted Honey Bear Amigurumi Plushie",
    category: "crochetToys",
    price: 899,
    originalPrice: 1199,
    rating: 5.0,
    reviewsCount: 42,
    isBestSeller: true,
    isNew: false,
    material: "100% Milk Cotton Yarn & Hypoallergenic Fiberfill",
    size: "8 inches tall",
    washCare: "Hand wash gently with mild baby shampoo. Air dry in shade.",
    craftTime: "3 Days",
    deliveryTime: "3-5 Business Days",
    description: "Ultra-soft handcrafted teddy bear with cute overalls and a mini honey pot. Made using premium milk cotton yarn, perfectly safe for kids and plush lovers.",
    images: [
      "https://images.unsplash.com/photo-1558060370-d644479be967?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
    ],
    allowCustomization: true,
    customFields: ["Custom Sweater Color", "Embroidered Initial Tag"]
  },
  {
    id: "c2",
    title: "Pastel Bunny Amigurumi with Floral Wreath",
    category: "crochetToys",
    price: 999,
    originalPrice: 1299,
    rating: 4.9,
    reviewsCount: 31,
    isBestSeller: false,
    isNew: true,
    material: "Soft Velvet Plush Yarn",
    size: "10 inches tall",
    washCare: "Gentle surface clean with damp cloth.",
    craftTime: "3-4 Days",
    deliveryTime: "3-5 Business Days",
    description: "An adorable fluffy bunny wearing a hand-crocheted floral crown. Crafted with ultra-soft baby velvet yarn.",
    images: [
      "https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&w=800&q=80"
    ],
    allowCustomization: true,
    customFields: ["Bunny Color (Cream/Pink/Lavender)", "Gift Wrap Message"]
  },

  // CROCHET FLOWERS
  {
    id: "f1",
    title: "Forever Blooming Tulip & Lavender Bouquet",
    category: "crochetFlowers",
    price: 1499,
    originalPrice: 1999,
    rating: 5.0,
    reviewsCount: 64,
    isBestSeller: true,
    isNew: false,
    material: "Comb Cotton Yarn & Floral Wire Stems",
    size: "Set of 7 Flower Stems (12 inch height)",
    washCare: "Dust with soft brush or dry air blower.",
    craftTime: "4 Days",
    deliveryTime: "3-5 Business Days",
    description: "Flowers that never wilt! A stunning hand-crocheted bouquet including 3 Tulips, 2 Lavenders, 1 Sunflower, and eucalyptus leaves wrapped in aesthetic korean paper.",
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558060370-d644479be967?auto=format&fit=crop&w=800&q=80"
    ],
    allowCustomization: true,
    customFields: ["Custom Flower Palette", "Add Greeting Ribbon"]
  },
  {
    id: "f2",
    title: "Handmade Potted Sunflower desk Companion",
    category: "crochetFlowers",
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 53,
    isBestSeller: true,
    isNew: true,
    material: "Cotton Yarn in Terracotta Pot",
    size: "6 inches height",
    craftTime: "2 Days",
    deliveryTime: "3-4 Business Days",
    description: "A cheery little potted sunflower that brightens any study or office desk. Never needs watering!",
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
    ],
    allowCustomization: true,
    customFields: ["Engraved Wooden Name Tag"]
  },

  // CROCHET BAGS
  {
    id: "b1",
    title: "Daisy Flower Pastel Crochet Tote Bag",
    category: "crochetBags",
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviewsCount: 22,
    isBestSeller: true,
    isNew: true,
    material: "Heavy-duty Cotton Yarn with Linen Inner Lining & Zip",
    size: "14 x 15 inches with 10 inch shoulder straps",
    washCare: "Hand wash in cold water, line dry.",
    craftTime: "5 Days",
    deliveryTime: "4-6 Business Days",
    description: "A trendy aesthetic granny square tote bag featuring 16 hand-crocheted daisy flowers. Comes with a soft inner linen lining and interior pocket.",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
    ],
    allowCustomization: true,
    customFields: ["Base Bag Color (Beige/Sage/Black)", "Add Zip Inner Pocket"]
  },

  // KEYCHAINS & ACCESSORIES
  {
    id: "k1",
    title: "Personalized Pressed Flower Resin & Crochet Charm Keychain",
    category: "keychains",
    price: 349,
    originalPrice: 499,
    rating: 4.9,
    reviewsCount: 88,
    isBestSeller: true,
    isNew: false,
    material: "Real Dried Flowers, Crystal Resin & Mini Crochet Berry",
    size: "Letter height: 2 inches",
    craftTime: "1-2 Days",
    deliveryTime: "3-4 Business Days",
    description: "Bespoke initial letter keychain embedded with real hand-pressed flowers, paired with a tiny hand-crocheted strawberry charm.",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
    ],
    allowCustomization: true,
    customFields: ["Select Initial Letter (A-Z)", "Select Foil Color (Gold/Rose Gold/Silver)"]
  },

  // BOOKMARKS
  {
    id: "bm1",
    title: "Hand-painted Wooden Floral Bookmark with Tassel",
    category: "bookmarks",
    price: 299,
    originalPrice: 399,
    rating: 5.0,
    reviewsCount: 35,
    isBestSeller: false,
    isNew: true,
    material: "Natural Teak Wood Plaque & Silk Tassel",
    size: "1.5 x 6 inches",
    craftTime: "1 Day",
    deliveryTime: "3-4 Business Days",
    description: "Original hand-painted wildflower bookmark sealed with protective varnish. Perfect gift for book lovers and avid readers.",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ],
    allowCustomization: true,
    customFields: ["Add Calligraphy Name/Quote on Back"]
  },

  // GIFT HAMPERS
  {
    id: "h1",
    title: "The Ultimate Royal Handmade Keepsake Gift Box",
    category: "giftHampers",
    price: 2999,
    originalPrice: 3999,
    rating: 5.0,
    reviewsCount: 47,
    isBestSeller: true,
    isNew: true,
    material: "Rigid Gold-foil Gift Box, Satin Ribbon",
    craftTime: "4-5 Days",
    deliveryTime: "3-5 Business Days",
    description: "Includes: 1 Mini Hand-painted Canvas with Wooden Easel, 1 Crochet Flower Bouquet, 1 Custom Name Keychain, 1 Scented Soy Candle, and 1 Handwritten Calligraphy Card.",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
    ],
    allowCustomization: true,
    customFields: ["Recipients Name", "Custom Message Text", "Photo Attachment"]
  },

  // FESTIVE COLLECTION
  {
    id: "fest1",
    title: "Festive Diya & Toran Handcrafted Gift Set",
    category: "festive",
    price: 1199,
    originalPrice: 1599,
    rating: 4.9,
    reviewsCount: 29,
    isBestSeller: false,
    isNew: true,
    material: "Crochet Marigold Garland & Terracotta Painted Diyas",
    craftTime: "3 Days",
    deliveryTime: "3-4 Business Days",
    description: "Celebrate festivals with vibrant hand-crocheted marigold garlands that last forever, paired with 4 hand-painted decorative terracotta diyas.",
    images: [
      "https://images.unsplash.com/photo-1605656816944-971cd5c1407f?auto=format&fit=crop&w=800&q=80"
    ],
    allowCustomization: true,
    customFields: ["Garland Length (3ft/5ft)"]
  }
];

export const reviewsData = [
  {
    id: "r1",
    name: "Ananya Sharma",
    city: "Ahmedabad",
    rating: 5,
    date: "August 2, 2026",
    productName: "Forever Blooming Tulip Bouquet",
    comment: "આ ક્રોશે બુકે અદ્ભુત છે! મારી બહેનને બર્થડે પર ગિફ્ટ આપ્યું અને તે ખૂબ ખુશ થઈ ગઈ. પેકિંગ પણ રોયલ હતું! ❤️",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    verified: true
  },
  {
    id: "r2",
    name: "Rohan Patel",
    city: "Surat",
    rating: 5,
    date: "July 28, 2026",
    productName: "Golden Hour Monsoon Canvas Painting",
    comment: "The artwork looks even better in person than in the photos! Authentic artist signature and certificate included. Really elevates my living room wall.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    verified: true
  },
  {
    id: "r3",
    name: "Pooja Mehta",
    city: "Mumbai",
    rating: 5,
    date: "July 20, 2026",
    productName: "Honey Bear Amigurumi Plushie",
    comment: "Super soft quality yarn! The AI gift finder suggested this for my niece and it was the best decision ever.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    verified: true
  }
];
