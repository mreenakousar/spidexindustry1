import { companyProfile } from "../../../data/clientPortal";

export default function CompanyProfilePage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
          Company Profile
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          Corporate details
        </h1>
        <p className="mt-2 text-slate-600">
          Update company contact, shipping and billing information in one place.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Company information
            </p>
            <p className="text-sm text-slate-600">
              {companyProfile.companyName}
            </p>
            <p className="text-sm text-slate-600">
              Industry: {companyProfile.industry}
            </p>
          </div>
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Primary contact
            </p>
            <p className="text-sm text-slate-600">
              {companyProfile.contactName}
            </p>
            <p className="text-sm text-slate-600">{companyProfile.email}</p>
            <p className="text-sm text-slate-600">{companyProfile.phone}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Shipping address
            </p>
            <p className="mt-3 text-sm text-slate-600">
              {companyProfile.shippingAddress}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Billing address
            </p>
            <p className="mt-3 text-sm text-slate-600">
              {companyProfile.billingAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
