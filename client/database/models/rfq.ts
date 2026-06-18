export interface RFQSubmission {
  _id?: string;
  fullName: string;
  brandName: string;
  email: string;
  whatsapp?: string;
  productType: string;
  quantity: number;
  fabricType?: string;
  printingMethod?: string;
  sizeChart?: string;
  deliveryCountry: string;
  techPackFileName?: string;
  notes?: string;
  status: "new" | "reviewed" | "quoted";
  createdAt: Date;
}
