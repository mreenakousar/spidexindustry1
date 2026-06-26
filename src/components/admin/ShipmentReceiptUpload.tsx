"use client";

import { useState } from "react";
import { Upload, Truck, FileText, X, Download, AlertCircle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { updateOrderAdminFieldsAction } from "@/actions/orders";

interface ShipmentReceiptUploadProps {
  orderId: string;
  initialReceiptUrl?: string;
}

export function ShipmentReceiptUpload({ orderId, initialReceiptUrl = "" }: ShipmentReceiptUploadProps) {
  const [receiptUrl, setReceiptUrl] = useState<string>(initialReceiptUrl);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit file size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Upload to Cloudinary API
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const data = await response.json();
      if (!data.url) {
        throw new Error("No URL returned from upload api");
      }

      // Save to Order in Postgres via Server Action
      const result = await updateOrderAdminFieldsAction(orderId, {
        shipmentReceipt: data.url,
      });

      if (result.ok) {
        setReceiptUrl(data.url);
        setSuccess(true);
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error(result.error || "Failed to update order database fields");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong during upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveReceipt = async () => {
    if (!confirm("Are you sure you want to remove this shipment receipt?")) return;

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updateOrderAdminFieldsAction(orderId, {
        shipmentReceipt: "",
      });

      if (result.ok) {
        setReceiptUrl("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error(result.error || "Failed to remove receipt from order");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to remove receipt.");
    } finally {
      setUploading(false);
    }
  };

  const isPdf = receiptUrl.toLowerCase().includes(".pdf");

  return (
    <Card className="border border-slate-100 p-[clamp(1rem,1.5vw,1.5rem)] bg-white space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-[clamp(15px,1.3vw,17px)] font-semibold text-slate-900 flex items-center gap-2">
          <Truck className="h-5 w-5 text-sky-600" />
          Shipment Receipt
        </h2>
        {receiptUrl && (
          <button
            onClick={handleRemoveReceipt}
            disabled={uploading}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 disabled:opacity-50 flex items-center gap-1 transition"
          >
            <X className="h-3.5 w-3.5" /> Remove
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-xl bg-rose-50 border border-rose-100 p-3 text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-xs text-emerald-700 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 shrink-0" />
          <span>Shipment receipt updated successfully!</span>
        </div>
      )}

      {receiptUrl ? (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 relative group">
            {isPdf ? (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                <FileText className="h-12 w-12 text-red-500 mb-2" />
                <span className="text-xs font-semibold text-slate-700 truncate max-w-full">
                  Shipment_Receipt_{orderId}.pdf
                </span>
              </div>
            ) : (
              <img
                src={receiptUrl}
                alt="Uploaded Shipment Receipt"
                className="w-full object-cover rounded-xl transition hover:scale-[1.02] duration-300"
                style={{ maxHeight: "220px" }}
              />
            )}
          </div>

          <div className="flex gap-2">
            <a
              href={receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              View Document
            </a>
            <a
              href={receiptUrl}
              download={`shipment-receipt-${orderId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-sky-700 transition"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs text-slate-400">
            Upload shipment receipt / transport documents (bill of lading, delivery receipt, air waybill) to notify client and allow downloads.
          </p>

          <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center cursor-pointer hover:bg-slate-100/50 hover:border-sky-500/50 transition">
            <Upload className="h-8 w-8 text-slate-400 mb-2" />
            <span className="text-xs font-bold text-slate-700">
              {uploading ? "Uploading receipt..." : "Choose shipping receipt file"}
            </span>
            <span className="text-[10px] text-slate-400 mt-1">
              Supports JPEG, PNG, or PDF up to 10MB
            </span>
            <input
              type="file"
              accept="image/*,.pdf"
              disabled={uploading}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}
    </Card>
  );
}
