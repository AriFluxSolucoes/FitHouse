"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, slugify } from "@/lib/data";

export default function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-paper text-ink text-[13px] border-b border-hair">
      <div className="rail flex items-center justify-center gap-7 px-4 sm:px-6 py-3 overflow-x-auto whitespace-nowrap">
        {navLinks.map((link) => {
          const slug = slugify(link);
          const href = `/categoria/${slug}`;
          const active = pathname === href;

          return (
            <Link
              key={link}
              href={href}
              className={`shrink-0 pb-0.5 border-b-2 transition-colors ${
                active ? "border-ink font-semibold" : "border-transparent hover:border-ink"
              }`}
            >
              {link}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
