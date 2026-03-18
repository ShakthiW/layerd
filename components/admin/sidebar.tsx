"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Calculator,
  Settings,
} from "lucide-react";

interface AdminSidebarProps {
  role: string;
}

export function AdminSidebar({ role }: AdminSidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/subscribers", label: "Subscribers", icon: Users },
    { href: "/admin/content", label: "Site Content", icon: FileText },
    { href: "/admin/pricing", label: "Pricing Config", icon: Calculator },
  ];

  if (role === "super_admin") {
    links.push({ href: "/admin/settings", label: "Settings", icon: Settings });
  }

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-zinc-100 flex items-center justify-center">
            <span className="text-zinc-900 font-bold text-xl leading-none">L</span>
          </div>
          <span className="font-semibold tracking-wide text-lg">LAYERD Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              )}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <div className="px-3 py-2 bg-zinc-900 rounded-md">
          <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">
            Status
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-sm font-medium text-emerald-400">All systems operational</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
