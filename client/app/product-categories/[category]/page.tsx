import Link from "next/link";
import { productCategories } from "../../../data/site";
import * as CategoryIcons from "../../../components/ui/CategoryIcons";

export default function CategoryPage({ params }: any) {
  const cat = productCategories.find(
    (c) => c.id === params.category || c.href.endsWith(params.category),
  );
  if (!cat) {
    return (
      <section className="container py-16">
        <h1 className="section-heading">Category not found</h1>
      </section>
    );
  }

  const Icon = (CategoryIcons as any)[cat.icon];

  return (
    <section className="container py-16">
      <div className="flex items-center gap-4">
        {Icon ? <Icon className="h-10 w-10 text-primary" /> : null}
        <h1 className="section-heading">{cat.label}</h1>
      </div>

      <p className="muted mt-4">Subcategories</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(cat.sub ?? []).map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block rounded border p-4 hover:bg-slate-50"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{s.label}</h4>
              </div>
              <div className="text-slate-400">›</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
