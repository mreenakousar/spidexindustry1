import CategorySections from "@/components/sections/CategorySections";

export const metadata = { title: "Product Categories" };

export default function ProductCategoriesPage() {
  return (
    <div className="bg-white min-h-screen">
      <CategorySections />
    </div>
  );
}

