"use client";

import Link from "@/components/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  ScrollText,
  Sparkles,
  Building2,
  Users,
  FileDown,
  Phone,
  type LucideIcon,
} from "lucide-react";

const tabs: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Overview & Stats", href: "/placements", icon: BarChart3 },
  { label: "Placement Policy", href: "/placements/policy", icon: ScrollText },
  { label: "Why Recruit Us", href: "/placements/why-recruit", icon: Sparkles },
  { label: "Facilities", href: "/placements/facilities", icon: Building2 },
  { label: "2027 Eligible Students", href: "/placements/eligible-2027", icon: Users },
  { label: "Brochure", href: "/placements/brochure", icon: FileDown },
  { label: "Contact Us", href: "/placements/contact", icon: Phone },
];

export function PlacementsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="lg:sticky lg:top-24">
        <h2 className="mb-4 px-2 text-sm font-bold uppercase tracking-wider text-primary">
          Placements
        </h2>
        <nav className="flex gap-1.5 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
          {tabs.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group flex shrink-0 items-center gap-3 whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-white shadow-md shadow-orange-200"
                    : "text-gray-600 hover:bg-orange-50 hover:text-primary",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-white" : "text-gray-400 group-hover:text-primary",
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
