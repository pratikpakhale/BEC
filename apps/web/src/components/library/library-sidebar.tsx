// File: src/components/library/library-sidebar.tsx
"use client";

import Link from "@/components/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Users,
  Building2,
  Globe,
  Link as LinkIcon,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const libraryLinks = [
  {
    href: "/library",
    label: "Library Home",
    icon: BookOpen,
  },
  {
    href: "/library/about",
    label: "About Library",
    icon: BookOpen,
  },
  {
    href: "/library/staff",
    label: "Staff Profile",
    icon: Users,
  },
  {
    href: "/library/supporting-staff",
    label: "Supporting Staff",
    icon: Users,
  },
  {
    href: "/library/infrastructure",
    label: "Infrastructure",
    icon: Building2,
  },
  {
    href: "/library/e-resources-paid",
    label: "E-Resources (Paid)",
    icon: Globe,
  },
  {
    href: "/library/e-resources-free",
    label: "E-Resources (Free)",
    icon: Globe,
  },
  {
    href: "http://119.161.97.235/",
    label: "Web OPAC",
    icon: LinkIcon,
    external: true,
  },
  {
    href: "/library/useful-links",
    label: "Useful Links",
    icon: LinkIcon,
  },
  {
    href: "/library/contact",
    label: "Contact",
    icon: Phone,
  },
];

export function LibrarySidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-white border border-stone-200 rounded-lg overflow-hidden sticky top-24">
      <div className="bg-linear-to-r from-primary to-accent p-4">
        <h3 className="text-lg font-bold text-white">Library Navigation</h3>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {libraryLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-700 hover:bg-stone-50 hover:text-primary"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
