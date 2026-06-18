import Link from "next/link";
import { productCategories } from "../../../../data/site";

export default function SubcategoryPage({ params }: any) {
  const cat = productCategories.find(
    (c) => c.id === params.category || c.href.endsWith(params.category),
  );
  const sub = cat?.sub?.find(
    (s) =>
      s.href.endsWith(params.subcategory) ||
      s.label.toLowerCase().replace(/\s+/g, "-") === params.subcategory,
  );

  if (!cat || !sub) {
    return (
      <section className="container py-16">
        <h1 className="section-heading">Not found</h1>
      </section>
    );
  }

  return (
    <section className="container py-16">
      <h1 className="section-heading">{sub.label}</h1>
      <p className="muted mt-2">Available items and details for {sub.label}.</p>

      <div className="mt-6">
        <ul className="list-disc pl-6 text-slate-700">
          {(sub.sub ?? []).map((item) => (
            <li key={item.href} className="py-1">
              <Link href={item.href} className="text-primary hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {!(sub.sub && sub.sub.length) && (
          <p className="text-sm text-slate-500 mt-3">
            No further subdivisions.
          </p>
        )}
      </div>
    </section>
  );
}
