"use client";

import { motion } from "motion/react";
import Link from "@/components/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  Code2, 
  Microscope 
} from "lucide-react";

const programmes = [
  { 
    id: "ug", 
    label: "Under Graduate (B.E.)", 
    href: "/academics/programmes/ug",
    icon: GraduationCap 
  },
  { 
    id: "pg", 
    label: "Post Graduate (M.Tech)", 
    href: "/academics/programmes/pg",
    icon: BookOpen
  },
  { 
    id: "mba", 
    label: "MBA", 
    href: "/academics/programmes/mba",
    icon: Briefcase
  },
  { 
    id: "mca", 
    label: "MCA", 
    href: "/academics/programmes/mca",
    icon: Code2
  },
  { 
    id: "phd", 
    label: "M.Sc. (Engg.) / Ph.D", 
    href: "/academics/programmes/phd",
    icon: Microscope
  },
];

export default function ProgrammesSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24">
        <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 px-2">
            Academic Programmes
        </h2>
        
        <nav className="flex flex-col space-y-1">
          {programmes.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden",
                  isActive
                    ? "bg-primary text-white shadow-md shadow-orange-200"
                    : "text-gray-600 hover:bg-orange-50 hover:text-primary"
                )}
              >
                <div className="flex items-center gap-3 relative z-10">
                    <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-gray-400 group-hover:text-primary")} />
                    <span>{item.label}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="prog-nav-indicator"
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
