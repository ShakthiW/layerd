import { getAllProducts, getAllCategories } from "@/lib/db-helpers";
import ExploreClient from "./client";

export default async function ExplorePage() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  
  const serializedProducts = JSON.parse(JSON.stringify(products));
  const serializedCategories = JSON.parse(JSON.stringify(categories));

  return <ExploreClient products={serializedProducts} categories={serializedCategories} />;
}
