"use client";

import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";

import { SlideTabs } from "./slide-tabs";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-3 md:px-8 bg-black/60 backdrop-blur-xl border-b border-white/4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo — Left */}
        <Link href="/" className="flex shrink-0 items-center">
          <span className="font-display text-lg font-bold uppercase tracking-widest text-white">
            Layerd
          </span>
        </Link>

        {/* Slide Tabs — Center */}
        <div className="hidden md:block">
          <SlideTabs />
        </div>

        {/* Actions — Right */}
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-sm md:gap-2">
          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full"
            aria-label="Shopping cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {/* Badge — static count for now */}
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white dark:bg-white dark:text-black">
              2
            </span>
          </Button>

          {/* Theme Toggle */}
          <ModeToggle />

          {/* User Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="User menu"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black/20 bg-linear-to-br from-cyan-400 to-purple-500 dark:border-white/20">
                  <User className="h-4 w-4 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
