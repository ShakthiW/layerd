"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LogOut, Menu, UserCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdminSidebar } from "./sidebar";

export function AdminTopBar({ user }: { user: any }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Simple breadcrumbs based on pathname
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => {
    const isLast = index === segments.length - 1;
    let label = segment.charAt(0).toUpperCase() + segment.slice(1);
    
    // Handle dynamic segments for display
    if (label.length > 20 || label.includes("-")) {
      label = "Detail";
    }

    return (
      <span key={segment} className="flex items-center">
        {index > 0 && <span className="mx-2 text-zinc-600">/</span>}
        <span className={isLast ? "text-zinc-100 font-medium" : "text-zinc-500"}>
          {label}
        </span>
      </span>
    );
  });

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-800 bg-zinc-950">
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Toggle */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden text-zinc-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r-zinc-800 bg-zinc-950 w-64">
            <AdminSidebar role={user.role} />
          </SheetContent>
        </Sheet>

        {/* Breadcrumbs */}
        <div className="hidden sm:flex text-sm">
          {breadcrumbs}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs text-zinc-500 capitalize">{user.role.replace("_", " ")}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
          <UserCircle className="w-5 h-5" />
        </div>
        <div className="w-px h-6 bg-zinc-800 mx-1" />
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-md transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
