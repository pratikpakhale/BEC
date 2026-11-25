"use client";

import { motion } from "motion/react";
import Link from "@/components/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  GraduationCap,
  BookOpen,
  Microscope,
  Briefcase,
  Code2,
  Phone,
  type LucideIcon,
} from "lucide-react";

const tabs: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Overview", href: "/admissions", icon: LayoutGrid },
  { label: "Under Graduate (B.E.)", href: "/admissions/ug", icon: GraduationCap },
  { label: "Post Graduate (M.Tech)", href: "/admissions/pg", icon: BookOpen },
  { label: "Ph.D / M.Sc. (Engg.)", href: "/admissions/phd", icon: Microscope },
  { label: "MBA", href: "/admissions/mba", icon: Briefcase },
  { label: "MCA", href: "/admissions/mca", icon: Code2 },
  { label: "Contact", href: "/admissions/contact", icon: Phone },
];

export default function AdmissionsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24">
        <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 px-2">
          Admissions
        </h2>

        <nav className="flex flex-col space-y-1">
          {tabs.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden",
                  isActive
                    ? "bg-primary text-white shadow-md shadow-orange-200"
                    : "text-gray-600 hover:bg-orange-50 hover:text-primary"
                )}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-primary"
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="admissions-nav-indicator"
                    className="absolute inset-y-0 right-0 w-1 bg-white/20"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
