// src/components/programmes/programme-nav.tsx
"use client";

import Link from "@/components/link";
import { cn } from "@/lib/utils";

interface ProgrammeNavProps {
  currentProgramme: "ug" | "pg" | "mba" | "mca" | "phd";
}

const programmes = [
  { id: "ug", label: "Under Graduate/BE", href: "/academics/programmes/ug" },
  { id: "pg", label: "Post Graduate/M.Tech", href: "/academics/programmes/pg" },
  { id: "mba", label: "MBA", href: "/academics/programmes/mba" },
  { id: "mca", label: "MCA", href: "/academics/programmes/mca" },
  { id: "phd", label: "M.Sc.(Engg.)/Ph.D", href: "/academics/programmes/phd" },
];

export function ProgrammeNav({ currentProgramme }: ProgrammeNavProps) {
  return (
    <nav className="sticky top-20 z-40 bg-white border-b border-stone-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {programmes.map((programme) => (
            <Link
              key={programme.id}
              href={programme.href}
              className={cn(
                "px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 hover:text-primary hover:border-primary",
                currentProgramme === programme.id
                  ? "text-primary border-primary"
                  : "text-gray-600 border-transparent"
              )}
            >
              {programme.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}