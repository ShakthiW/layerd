"use client";

import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

const footerLinks = {
  collections: [
    { label: "Desk & Organization", href: "/category/desk-organization" },
    { label: "Anime Inspired", href: "/category/anime" },
    { label: "F1 Designs", href: "/category/f1" },
    { label: "Interior & Lifestyle", href: "/category/interior-lifestyle" },
    { label: "Trending Now", href: "/category/trending" },
    { label: "Customizable Prints", href: "/category/custom" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Process", href: "/process" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/6 bg-black pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Top section */}
        <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-bold tracking-wider text-white">
                LAYERD
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              Sri Lanka&apos;s first premium 3D printed lifestyle brand.
              Transforming imagination into tangible art, one layer at a time.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <MapPin className="h-3.5 w-3.5 text-warm-gold/50" />
                <span>Colombo, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <Mail className="h-3.5 w-3.5 text-warm-gold/50" />
                <span>hello@layerd.lk</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <Phone className="h-3.5 w-3.5 text-warm-gold/50" />
                <span>+94 77 123 4567</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/6 bg-white/2 text-zinc-500 transition-all duration-300 hover:border-warm-gold/30 hover:text-warm-gold"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
              Collections
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.collections.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-warm-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-warm-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
              Support
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-warm-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-700">
            &copy; {new Date().getFullYear()} LAYERD. All rights reserved.
          </p>
          <p className="text-xs text-zinc-700">
            Crafted with precision in 🇱🇰 Sri Lanka by{" "}
            <span className="underline">
              <Link target="_blank" href="https://standord.com">
                Standord
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
