import { AdminProductForm } from "../new/form";

export default async function EditProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <AdminProductForm slug={slug} />;
}
