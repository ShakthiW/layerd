import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminUsersClient from "./client";

export default async function AdminSettingsPage() {
  const session = await auth();

  // Extra layer of protection: only super_admins can view settings
  if (session?.user?.role !== "super_admin") {
    redirect("/admin");
  }

  return <AdminUsersClient currentUserEmail={session.user.email as string} />;
}
