import Categories from "@/components/categories";
import { getCategories } from "./actions";

export default async function Home() {
  const initialCategories = await getCategories();
  return (
    <main>
      <h1 className="text-2xl font-bold">
        The New York Times Best Seller Explorer
      </h1>
      <Categories initialCategories={initialCategories} />
    </main>
  );
}
