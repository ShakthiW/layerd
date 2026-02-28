import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getAllSlugs } from "@/lib/products";
import { ProductPage } from "./product-page";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found — LAYERD" };
  }
  return {
    title: `${product.name} — LAYERD`,
    description: product.tagline,
  };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function ProductPageRoute({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
