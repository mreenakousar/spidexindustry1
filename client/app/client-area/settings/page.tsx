import { settingsOptions } from "../../../data/clientPortal";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
          Settings
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          Account preferences
        </h1>
        <p className="mt-2 text-slate-600">
          Configure notifications, security, and account options.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="space-y-4">
          {settingsOptions.map((setting) => (
            <div
              key={setting.title}
              className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-900">{setting.title}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {setting.description}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex h-8 items-center rounded-full px-4 text-sm font-semibold ${setting.enabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}
                >
                  {setting.enabled ? "Enabled" : "Disabled"}
                </span>
                <button className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
