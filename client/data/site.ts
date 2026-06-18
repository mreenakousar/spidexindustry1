export const productCategories = [
  {
    id: "sportware",
    label: "Sportware",
    icon: "SportIcon",
    href: "/product-categories/sportware",
    sub: [
      {
        label: "Performance Tees",
        href: "/product-categories/sportware/performance-tees",
        sub: [
          { label: "Moisture-Wicking", href: "/product-categories/sportware/performance-tees/moisture-wicking" },
          { label: "UV Protection", href: "/product-categories/sportware/performance-tees/uv-protection" },
        ],
      },
      {
        label: "Tracksuits",
        href: "/product-categories/sportware/tracksuits",
        sub: [
          { label: "Zip Jackets", href: "/product-categories/sportware/tracksuits/zip-jackets" },
          { label: "Set Pants", href: "/product-categories/sportware/tracksuits/set-pants" },
        ],
      },
      { label: "Jerseys", href: "/product-categories/sportware/jerseys", sub: [] },
      { label: "Sport Shorts", href: "/product-categories/sportware/shorts", sub: [] },
      { label: "Outerwear", href: "/product-categories/sportware/outerwear", sub: [] },
    ],
  },
  {
    id: "gymware",
    label: "Gymware",
    icon: "GymIcon",
    href: "/product-categories/gymware",
    sub: [
      {
        label: "Tank Tops",
        href: "/product-categories/gymware/tank-tops",
        sub: [
          { label: "Racerback", href: "/product-categories/gymware/tank-tops/racerback" },
          { label: "Loose Fit", href: "/product-categories/gymware/tank-tops/loose-fit" },
        ],
      },
      { label: "Leggings", href: "/product-categories/gymware/leggings", sub: [] },
      { label: "Compression Wear", href: "/product-categories/gymware/compression", sub: [] },
      { label: "Sports Bras", href: "/product-categories/gymware/sports-bras", sub: [] },
      { label: "Gym Shorts", href: "/product-categories/gymware/shorts", sub: [] },
    ],
  },
  {
    id: "streetware",
    label: "Streetware",
    icon: "StreetIcon",
    href: "/product-categories/streetware",
    sub: [
      {
        label: "Graphic Tees",
        href: "/product-categories/streetware/graphic-tees",
        sub: [
          { label: "Screen Print", href: "/product-categories/streetware/graphic-tees/screen-print" },
          { label: "DTG", href: "/product-categories/streetware/graphic-tees/dtg" },
        ],
      },
      { label: "Hoodies", href: "/product-categories/streetware/hoodies", sub: [] },
      { label: "Cargo Pants", href: "/product-categories/streetware/cargo-pants", sub: [] },
      { label: "Bomber Jackets", href: "/product-categories/streetware/bomber-jackets", sub: [] },
      { label: "Caps & Hats", href: "/product-categories/streetware/caps", sub: [] },
    ],
  },
  {
    id: "jackets",
    label: "Jackets",
    icon: "JacketIcon",
    href: "/product-categories/jackets",
    sub: [
      { label: "Bomber Jackets", href: "/product-categories/jackets/bomber", sub: [] },
      { label: "Softshell", href: "/product-categories/jackets/softshell", sub: [] },
      { label: "Puffer", href: "/product-categories/jackets/puffer", sub: [] },
    ],
  },
  {
    id: "gloves",
    label: "Gloves",
    icon: "GlovesIcon",
    href: "/product-categories/gloves",
    sub: [
      { label: "Training Gloves", href: "/product-categories/gloves/training", sub: [] },
      { label: "Winter Gloves", href: "/product-categories/gloves/winter", sub: [] },
      { label: "Sport Gloves", href: "/product-categories/gloves/sport", sub: [] },
    ],
  },
];

export const capabilities = [
  { id: 'ts', title: 'T-Shirts', description: 'Cut & sew, multiple fabrics' },
  { id: 'hd', title: 'Hoodies', description: 'Fleece, zippers, embroidery' },
  { id: 'tr', title: 'Tracksuits', description: 'Set matching, trims' },
  { id: 'sp', title: 'Sportswear', description: 'Performance fabrics, bonding' },
  { id: 'sh', title: 'Shorts', description: 'Stitching, linings' },
  { id: 'ca', title: 'Custom Apparel', description: 'Private label, custom specs' },
];

export const services = [
  { id: 'custom-tshirt', title: 'Custom T-Shirts', description: 'Full-service t-shirt manufacturing', moq: '100' },
  { id: 'hoodies', title: 'Hoodies Manufacturing', description: 'Bulk and small batch hoodies', moq: '200' },
  { id: 'embroidery', title: 'Embroidery Services', description: 'In-house embroidery', moq: '50' },
];

export const portfolio = [
  { id: 'p1', title: 'Premium Tee Run', category: 'T-Shirts', image: '/product-1.svg' },
  { id: 'p2', title: 'Capsule Hoodie', category: 'Hoodies', image: '/product-1.svg' },
  { id: 'p3', title: 'Sports Performance', category: 'Sportswear', image: '/product-1.svg' },
];

export const testimonials = [
  { client: 'Global Apparel Co', company: 'Global Apparel Co', quote: 'Reliable partner for our private label lines.' },
  { client: 'Athlete Brand', company: 'Athlete Brand', quote: 'High quality and consistent delivery.' },
  { client: 'Retail Chain', company: 'Retail Chain', quote: 'Professional communication and documentation.' },
];

export const stats = [
  { label: 'Years Experience', value: 18 },
  { label: 'Monthly Production', value: 120000 },
  { label: 'Countries Served', value: 45 },
  { label: 'Clients Worldwide', value: 320 },
];

export const team = [
  { id: 't1', name: 'Maria Chen', role: 'Head of Production' },
  { id: 't2', name: "Liam O\u2019Connor", role: 'Quality Manager' },
];
