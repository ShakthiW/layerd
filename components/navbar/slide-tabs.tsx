"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Labs", href: "/labs" },
  { label: "Custom", href: "/custom" },
  { label: "Stories", href: "/stories" },
  { label: "About", href: "/about" },
];

export const SlideTabs = () => {
  const pathname = usePathname();

  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Refs for each tab element so we can measure the active one
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Find the active tab index based on pathname
  const activeIndex = tabs.findIndex(
    (tab) =>
      tab.href === pathname ||
      (tab.href !== "/" && pathname.startsWith(tab.href)),
  );

  // Snap cursor to the active tab
  const snapToActiveTab = useCallback(() => {
    if (activeIndex === -1) {
      setPosition((pv) => ({ ...pv, opacity: 0 }));
      return;
    }
    const el = tabRefs.current[activeIndex];
    if (!el) return;
    const { width } = el.getBoundingClientRect();
    setPosition({ left: el.offsetLeft, width, opacity: 1 });
  }, [activeIndex]);

  // Set active tab cursor on mount and when pathname changes
  useEffect(() => {
    snapToActiveTab();
  }, [snapToActiveTab]);

  return (
    <ul
      onMouseLeave={snapToActiveTab}
      className="relative mx-auto flex w-fit overflow-hidden rounded-full border-2 border-black bg-white p-1 dark:border-white dark:bg-black"
    >
      {tabs.map((tab, i) => (
        <SlideTab
          key={tab.label}
          href={tab.href}
          isActive={i === activeIndex}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          setPosition={setPosition}
        >
          {tab.label}
        </SlideTab>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

import { forwardRef } from "react";

interface SlideTabProps {
  children: React.ReactNode;
  href: string;
  isActive: boolean;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
}

const SlideTab = forwardRef<HTMLLIElement, SlideTabProps>(
  ({ children, href, isActive, setPosition }, ref) => {
    const internalRef = useRef<HTMLLIElement>(null);

    // Merge the forwarded ref with the internal ref
    const setRefs = useCallback(
      (el: HTMLLIElement | null) => {
        internalRef.current = el;
        if (typeof ref === "function") {
          ref(el);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLLIElement | null>).current = el;
        }
      },
      [ref],
    );

    return (
      <li
        ref={setRefs}
        onMouseEnter={() => {
          if (!internalRef.current) return;
          const { width } = internalRef.current.getBoundingClientRect();
          setPosition({
            width,
            opacity: 1,
            left: internalRef.current.offsetLeft,
          });
        }}
        className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
      >
        <Link href={href}>{children}</Link>
      </li>
    );
  },
);

SlideTab.displayName = "SlideTab";

const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number };
}) => {
  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute z-0 h-7 rounded-full bg-black dark:bg-white md:h-12"
    />
  );
};
