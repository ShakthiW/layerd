import { getAllProducts } from "@/lib/db-helpers";
import ExploreClient from "./client";

export default async function ExplorePage() {
  const products = await getAllProducts();
  const serializedProducts = JSON.parse(JSON.stringify(products));

  return <ExploreClient products={serializedProducts} />;
}
