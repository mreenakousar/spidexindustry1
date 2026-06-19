import { productLibrary } from "../../../data/clientPortal";

export default function ProductLibraryPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
          Product Library
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          Saved product specifications
        </h1>
        <p className="mt-2 text-slate-600">
          Review previously manufactured products and reorder with the same
          specifications.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {productLibrary.map((product) => (
          <div
            key={product.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="h-44 w-full overflow-hidden rounded-3xl bg-slate-100">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                {product.status}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">
                {product.name}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {product.description}
              </p>
            </div>
            <button className="mt-6 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
              Reorder product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
