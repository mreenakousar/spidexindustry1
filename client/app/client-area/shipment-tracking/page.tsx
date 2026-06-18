"use client";

import { shipments } from "../../../data/clientPortal";

export default function ShipmentTrackingPage() {
  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "receipt.jpg";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Receipt download failed. Please try again.");
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
          Shipment Receipt
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          Your Delivery Receipts
        </h1>
        <p className="mt-2 text-slate-600">
          Admin uploaded receipts will appear here for download
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {shipments.map((shipment) => {
          const receiptImage = shipment.receiptImage;
          const hasReceipt = Boolean(receiptImage);

          return (
            <div
              key={shipment.tracking}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                    {shipment.courier}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl">
                    {shipment.tracking}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {shipment.origin} → {shipment.destination}
                  </p>
                </div>

                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                  Receipt
                </span>
              </div>

              {/* Image */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                {hasReceipt ? (
                  <img
                      src={receiptImage}
                    alt="Shipment Receipt"
                    className="h-56 w-full object-cover sm:h-64"
                  />
                ) : (
                  <div className="flex h-64 items-center justify-center text-slate-400">
                    No receipt uploaded yet
                  </div>
                )}
              </div>

              {/* ETA */}
              <p className="mt-4 text-sm text-slate-500">
                ETA: {shipment.eta}
              </p>

              {/* Download Button */}
              <button
                onClick={() => {
                  if (!receiptImage) {
                    alert("No receipt available");
                    return;
                  }

                  handleDownload(receiptImage, `${shipment.tracking}-receipt.jpg`);
                }}
                disabled={!hasReceipt}
                className={`mt-4 w-full rounded-xl px-4 py-2 text-sm font-semibold text-white
                  ${
                    hasReceipt
                      ? "bg-sky-600 hover:bg-sky-700"
                      : "bg-slate-300 cursor-not-allowed"
                  }`}
              >
                Download Receipt
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}