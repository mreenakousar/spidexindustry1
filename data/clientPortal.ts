import type {
  DashboardStat,
  OrderItem,
  ProductionStage,
  Quotation,
  ProductRecord,
  TechPack,
  InvoiceRecord,
  PaymentRecord,
  ShipmentRecord,
  MessageThread,
  NotificationItem,
  SupportTicket,
  CompanyProfile,
  QuickAction,
} from "../types/clientPortal";

export const dashboardStats: DashboardStat[] = [
  { title: "Total Orders", value: "1,248", change: "+8.2% from last month", icon: "Package" },
  { title: "Active Orders", value: "67", change: "+4 Active projects", icon: "Box" },
  { title: "Pending Payments", value: "$34,800", change: "3 invoices overdue", icon: "CreditCard" },
  { title: "Production Alerts", value: "12", change: "2 high-priority items", icon: "Bell" },
];

export const quickActions: QuickAction[] = [
  { title: "Create RFQ", description: "Submit a new quotation request.", href: "/client-area/quotations" },
  { title: "Upload Tech Pack", description: "Add a new production tech pack.", href: "/client-area/tech-packs" },
  { title: "Track Shipment", description: "View the latest shipping status.", href: "/client-area/shipment-tracking" },
  { title: "Review Invoices", description: "Download invoice PDFs quickly.", href: "/client-area/invoices" },
];



  export const orders: OrderItem[] = [
    {
      id: "1001",
      product: "Custom Hoodie",
      quantity: 50,
      status: "In Production",
      date: "2026-06-01",
      total: "$6,150",
      eta: "2026-06-18",
    },
    {
      id: "1002",
      product: "Basketball Jersey",
      quantity: 120,
      status: "Completed",
      date: "2026-05-28",
      total: "$9,840",
      eta: "2026-06-10",
    },
  ];


export const productionStages: ProductionStage[] = [
  { title: "Order Received", completed: true, active: false, date: "2026-06-01" },
  { title: "Quotation Approved", completed: true, active: false, date: "2026-06-02" },
  { title: "Payment Received", completed: true, active: false, date: "2026-06-03" },
  { title: "Fabric Sourcing", completed: true, active: false, date: "2026-06-04" },
  { title: "Cutting", completed: true, active: false, date: "2026-06-06" },
  { title: "Stitching", completed: true, active: true, date: "2026-06-08" },
  { title: "Printing / Embroidery", completed: false, active: false, date: "Pending" },
  { title: "Quality Control", completed: false, active: false, date: "Pending" },
  { title: "Packing", completed: false, active: false, date: "Pending" },
  { title: "Shipping", completed: false, active: false, date: "Pending" },
  { title: "Delivered", completed: false, active: false, date: "Pending" },
];

export const quotations: Quotation[] = [
  { id: "RFQ-2201", product: "Performance Hoodie", amount: "$6,150", status: "Approved", date: "2026-06-01" },
  { id: "RFQ-2202", product: "Training T-Shirt", amount: "$4,320", status: "Pending", date: "2026-06-05" },
  { id: "RFQ-2203", product: "School Uniform", amount: "$8,900", status: "Rejected", date: "2026-05-25" },
];

export const productLibrary: ProductRecord[] = [
  { id: "P-100", name: "Mesh Training Jersey", description: "Lightweight fabric, custom branding options.", image: "/products/jersey.jpg", status: "Stored" },
  { id: "P-101", name: "Softshell Jacket", description: "Weatherproof outerwear with embroidery options.", image: "/products/jacket.jpg", status: "Saved" },
  { id: "P-102", name: "Athletic Shorts", description: "Breathable, moisture-wicking, full customization.", image: "/products/shorts.jpg", status: "Stored" },
];

export const techPacks: TechPack[] = [
  { id: "TP-2101", title: "Hoodie Tech Pack", uploaded: "2026-05-30", status: "Approved", file: "hoodie-techpack.pdf" },
  { id: "TP-2102", title: "Jacket Tech Pack", uploaded: "2026-06-04", status: "Review", file: "jacket-techpack.pdf" },
];

 export const invoices: InvoiceRecord[] = [
  {
    id: "INV-1001",
    date: "2026-05-28",
    amount: "$18,900",
    status: "Paid",
    customer: "John Doe",
    orderId: "1001",
    pdfUrl: "/invoices/INV-1001.pdf",
  },
  {
    id: "INV-1002",
    date: "2026-06-03",
    amount: "$9,120",
    status: "Pending",
    customer: "John Doe",
    orderId: "1004",
    pdfUrl: "/invoices/INV-1002.pdf",
  },
];


export const payments: PaymentRecord[] = [
  { id: "PAY-2021", invoice: "INV-1001", date: "2026-05-29", amount: "$18,900", status: "Completed", method: "Wire Transfer" },
  { id: "PAY-2022", invoice: "INV-1003", date: "2026-06-09", amount: "$4,320", status: "Completed", method: "Credit Card" },
  { id: "PAY-2023", invoice: "INV-1002", date: "2026-06-10", amount: "$9,120", status: "Pending", method: "Bank Transfer" },
];

export const shipments: ShipmentRecord[] = [
  { courier: "DHL Express", tracking: "DX123456789", status: "In Transit", eta: "2026-06-15", origin: "Shanghai", destination: "Los Angeles" },
  { courier: "FedEx", tracking: "FD987654321", status: "Delivered", eta: "2026-06-12", origin: "Ho Chi Minh City", destination: "London" },
];

export const messages: MessageThread[] = [
  { id: "MSG-01", title: "Artwork approval", lastMessage: "Design updated, please confirm.", date: "2h ago", unread: 1 },
  { id: "MSG-02", title: "Fabric lab dip", lastMessage: "Lab dip report attached.", date: "Yesterday", unread: 0 },
];

export const notifications: NotificationItem[] = [
  { id: "NTF-01", title: "Stitching completed", description: "Order #1002 has moved to printing stage.", date: "1h ago", category: "Production" },
  { id: "NTF-02", title: "Invoice due", description: "Invoice INV-1002 is due in 3 days.", date: "Today", category: "Finance" },
  { id: "NTF-03", title: "Shipment update", description: "DHL package DX123456789 is expected on Jun 15.", date: "Today", category: "Logistics" },
];

export const tickets: SupportTicket[] = [
  { id: "TCK-100", subject: "Artwork mismatch", status: "Open", priority: "High", updated: "2h ago" },
  { id: "TCK-101", subject: "Delivery schedule", status: "Pending", priority: "Medium", updated: "Yesterday" },
];

export const companyProfile: CompanyProfile = {
  companyName: "Global Apparel Imports Ltd.",
  industry: "Sportswear & Promotional Apparel",
  contactName: "John Doe",
  email: "john.doe@globalapparel.com",
  phone: "+1 555 987 6543",
  shippingAddress: "12 International Logistics Ave, Los Angeles, CA 90017",
  billingAddress: "8 Commerce Street, New York, NY 10005",
};

export const settingsOptions = [
  { title: "Email notifications", description: "Receive production and invoice updates by email.", enabled: true },
  { title: "SMS alerts", description: "Get shipment and payment alerts via SMS.", enabled: false },
  { title: "Two-factor authentication", description: "Protect account with 2FA.", enabled: true },
];
