import { productionStages } from "../../../data/clientPortal";

export default function ProductionTrackerPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
          Production Tracker
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          Manufacturing progress
        </h1>
        <p className="mt-2 text-slate-600">
          Visual timeline for every stage of your current orders.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="space-y-6">
          {productionStages.map((stage, index) => (
            <div key={stage.title} className="flex items-start gap-6">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${stage.completed ? "bg-emerald-500 text-white" : stage.active ? "bg-amber-500 text-white" : "bg-slate-200 text-slate-700"}`}
                >
                  {index + 1}
                </div>
                {index < productionStages.length - 1 ? (
                  <div className="mt-2 h-12 w-px bg-slate-200" />
                ) : null}
              </div>
              <div className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-lg font-semibold text-slate-900">
                    {stage.title}
                  </p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${stage.completed ? "bg-emerald-100 text-emerald-700" : stage.active ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}
                  >
                    {stage.completed
                      ? "Completed"
                      : stage.active
                        ? "In progress"
                        : "Pending"}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{stage.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
