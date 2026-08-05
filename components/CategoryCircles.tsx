"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shirt, Zap, Layers, Move, PersonStanding, Watch, Footprints, Scale, Waves, Snowflake } from "lucide-react";
import { circleCategories, slugify } from "@/lib/data";
import SwatchTile from "./SwatchTile";

const icons = [Move, Shirt, Layers, Zap, PersonStanding, Watch, Footprints, Scale, Waves, Snowflake];

export default function CategoryCircles() {
  const pathname = usePathname();

  return (
    <section className="px-4 sm:px-6 py-6 border-b border-hair">
      <div className="flex gap-6 sm:gap-14 overflow-x-auto sm:overflow-visible sm:justify-center sm:flex-wrap">
        {circleCategories.map((name, i) => {
          const slug = slugify(name);
          const href = `/categoria/${slug}`;
          const active = pathname === href;

          return (
            <Link
              key={name}
              href={href}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <SwatchTile
                icon={icons[i % icons.length]}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-colors ${
                  active ? "border-ink border-2" : "group-hover:border-ink"
                }`}
              />
              <span
                className={`text-xs sm:text-sm transition-colors ${
                  active ? "text-ink font-semibold" : "text-ink-soft group-hover:text-ink"
                }`}
              >
                {name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
