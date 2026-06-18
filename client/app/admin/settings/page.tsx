"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [companyInfo, setCompanyInfo] = useState({
    name: "SpeedX Manufacturing",
    email: "contact@speedxindustry.com",
    phone: "+880 1712 345678",
    address: "45 Textile Drive, Dhaka, Bangladesh",
  });

  const [factoryInfo, setFactoryInfo] = useState({
    location: "Dhaka Facility",
    timezone: "UTC+6",
    shippingPort: "Chittagong",
    bank: "Standard Chartered",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    whatsapp: true,
  });
  const [financeSettings, setFinanceSettings] = useState({
    currency: "USD",
    taxRate: 15,
    invoicePrefix: "SX-INV",
  });

  const handleCompanySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Configure company details, factory preferences, notifications, and
          financial settings.
        </p>
      </div>

      <form
        onSubmit={handleCompanySubmit}
        className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Company Information
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Basic contact details for invoices and client communications.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            Company name
            <input
              value={companyInfo.name}
              onChange={(e) =>
                setCompanyInfo((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            Email address
            <input
              value={companyInfo.email}
              onChange={(e) =>
                setCompanyInfo((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            Phone number
            <input
              value={companyInfo.phone}
              onChange={(e) =>
                setCompanyInfo((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            Address
            <input
              value={companyInfo.address}
              onChange={(e) =>
                setCompanyInfo((prev) => ({ ...prev, address: e.target.value }))
              }
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
        >
          Save company info
        </button>
      </form>

      <div className="grid gap-8 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Factory & Logistics
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Factory settings, timezone, and logistics preferences.
          </p>
          <div className="mt-6 grid gap-6">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              Default factory
              <input
                value={factoryInfo.location}
                onChange={(e) =>
                  setFactoryInfo((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              Time zone
              <input
                value={factoryInfo.timezone}
                onChange={(e) =>
                  setFactoryInfo((prev) => ({
                    ...prev,
                    timezone: e.target.value,
                  }))
                }
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              Shipping port
              <input
                value={factoryInfo.shippingPort}
                onChange={(e) =>
                  setFactoryInfo((prev) => ({
                    ...prev,
                    shippingPort: e.target.value,
                  }))
                }
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              Banking partner
              <input
                value={factoryInfo.bank}
                onChange={(e) =>
                  setFactoryInfo((prev) => ({ ...prev, bank: e.target.value }))
                }
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Notification Preferences
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Choose the channels used for order, shipment, and system alerts.
            </p>
            <div className="mt-6 space-y-4">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                >
                  <span>
                    {key.charAt(0).toUpperCase() + key.slice(1)} notifications
                  </span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        [key]: !prev[key as keyof typeof prev],
                      }))
                    }
                    className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Financial Defaults
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Set base currency, tax rate, and invoice numbering format.
            </p>
            <div className="mt-6 grid gap-6">
              <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
                Currency
                <select
                  value={financeSettings.currency}
                  onChange={(e) =>
                    setFinanceSettings((prev) => ({
                      ...prev,
                      currency: e.target.value,
                    }))
                  }
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
                Tax rate (%)
                <input
                  type="number"
                  value={financeSettings.taxRate}
                  onChange={(e) =>
                    setFinanceSettings((prev) => ({
                      ...prev,
                      taxRate: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
                Invoice prefix
                <input
                  value={financeSettings.invoicePrefix}
                  onChange={(e) =>
                    setFinanceSettings((prev) => ({
                      ...prev,
                      invoicePrefix: e.target.value,
                    }))
                  }
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
