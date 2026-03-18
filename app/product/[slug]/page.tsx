import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getAllProducts, getRelatedProducts } from "@/lib/db-helpers";
import { ProductPage } from "./product-page";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || !product.isActive) {
    return { title: "Product Not Found — LAYERD" };
  }
  return {
    title: `${product.name} — LAYERD`,
    description: product.tagline,
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts(true);
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPageRoute({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.isActive) {
    notFound();
  }

  const related = await getRelatedProducts(product.relatedSlugs || []);

  const serializedProduct = JSON.parse(JSON.stringify(product));
  const serializedRelated = JSON.parse(JSON.stringify(related));

  return <ProductPage product={serializedProduct} relatedProducts={serializedRelated} />;
}
