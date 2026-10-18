"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { departmentSectionHref } from "@/data/departments-catalog";
import {
  Home,
  GraduationCap,
  Users,
  UsersRound,
  Calendar,
  FileText,
  Building2,
  Clipboard,
  Book,
  Target,
  Eye,
  Briefcase,
  Handshake,
  Award,
  Image as ImageIcon,
  ExternalLink,
  ChevronDown,
  LucideIcon,
} from "lucide-react";

// Map string identifiers to icon components
const iconMap: Record<string, LucideIcon> = {
  "home": Home,
  "graduation-cap": GraduationCap,
  "users": Users,
  "users-round": UsersRound,
  "calendar": Calendar,
  "file-text": FileText,
  "building-2": Building2,
  "clipboard": Clipboard,
  "book": Book,
  "target": Target,
  "eye": Eye,
  "briefcase": Briefcase,
  "handshake": Handshake,
  "award": Award,
  "image": ImageIcon,
};

interface SidebarItem {
    id: string;
    label: string;
    icon: string;
    externalUrl?: string;
    subItems?: { label: string; externalUrl: string }[];
}

interface DepartmentSidebarProps {
    items?: SidebarItem[];
    activeId: string;
    /** Department root, e.g. /departments/ug/civil-engg. */
    basePath: string;
    /** The section served at basePath itself, which therefore has no URL segment. */
    defaultId: string;
}

const defaultItems: SidebarItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "about", label: "About Department", icon: "graduation-cap" },
  { id: "faculty", label: "Teaching Faculty", icon: "users" },
  { id: "staff", label: "Supporting Staff", icon: "users-round" },
  { id: "timetable", label: "Time Table", icon: "calendar" },
  { id: "syllabus", label: "Scheme & Syllabus", icon: "file-text" },
  { id: "infrastructure", label: "Infrastructure", icon: "building-2" },
  { id: "board", label: "Board of Studies", icon: "clipboard" },
];

/** Each section is its own URL, so this is a set of links rather than an ARIA
 *  tablist: they are natively focusable and `aria-current` marks the one you're on.
 *  Only one of the two variants is ever visible, so both may carry the same label. */
function SectionLinks({
  items,
  activeId,
  basePath,
  defaultId,
  variant,
  className,
}: DepartmentSidebarProps & {
  items: SidebarItem[];
  variant: "sidebar" | "chip";
  className?: string;
}) {
  const router = useRouter();

  return (
    <nav aria-label="Department sections" className={className}>
      {items.map((item) => {
        const Icon = iconMap[item.icon] || Home; // Fallback to Home if icon not found
        const isActive = activeId === item.id;
        const href = departmentSectionHref(basePath, item.id, defaultId);
        const hasSubItems = Boolean(item.subItems?.length);

        const linkClassName = cn(
          "group flex shrink-0 items-center text-sm font-medium transition-all duration-200",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          variant === "sidebar"
            ? "w-full justify-between rounded-lg px-4 py-3 text-left"
            : "gap-2 rounded-full border px-3.5 py-2",
          isActive
            ? variant === "sidebar"
              ? "bg-primary text-white shadow-md shadow-orange-200"
              : "border-primary bg-primary text-white"
            : variant === "sidebar"
              ? "text-gray-600 hover:bg-orange-50 hover:text-primary"
              : "border-stone-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary",
        );

        const innerContent = (
          <>
            <div className={cn("flex min-w-0 items-center", variant === "sidebar" ? "gap-3" : "gap-2")}>
                <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-gray-400 group-hover:text-primary")} />
                <span className={variant === "sidebar" ? "truncate" : "whitespace-nowrap"}>
                  {item.label}
                </span>
                {item.externalUrl && (
                  <ExternalLink className={cn("w-3 h-3 shrink-0", isActive ? "text-white/70" : "text-gray-400 group-hover:text-primary")} />
                )}
            </div>
            {variant === "sidebar" && (hasSubItems || isActive) && (
              <div className="ml-2 flex shrink-0 items-center gap-1.5">
                {hasSubItems && (
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200 group-hover/item:rotate-180 group-focus-within/item:rotate-180",
                      isActive ? "text-white/80" : "text-gray-400 group-hover:text-primary",
                    )}
                  />
                )}
                {isActive && !hasSubItems && (
                  <motion.div
                    layoutId="dept-nav-indicator"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                  />
                )}
              </div>
            )}
          </>
        );

        // External URLs open in a new tab
        const linkElement = item.externalUrl ? (
          <a
            key={item.id}
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            {innerContent}
          </a>
        ) : (
          <Link
            key={item.id}
            href={href}
            aria-current={isActive ? "page" : undefined}
            // Every section carries the whole department payload, so prefetching a
            // full menu on sight would cost ~1MB on a connection least able to
            // afford it. Fetch on intent instead — router.prefetch dedupes.
            prefetch={false}
            onMouseEnter={() => router.prefetch(href)}
            onFocus={() => router.prefetch(href)}
            // Switching section keeps your place on the page; the layout pulls the
            // view back only when the section start has scrolled out of reach.
            scroll={false}
            className={linkClassName}
          >
            {innerContent}
          </Link>
        );

        if (!hasSubItems) {
          return linkElement;
        }

        if (variant === "chip") {
          return (
            <div key={item.id} className="contents">
              {linkElement}
              {item.subItems!.map((sub) => (
                <a
                  key={sub.label}
                  href={sub.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex shrink-0 items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <FileText className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-primary" />
                  <span className="whitespace-nowrap">{sub.label}</span>
                  <ExternalLink className="h-3 w-3 shrink-0 text-gray-400 group-hover:text-primary" />
                </a>
              ))}
            </div>
          );
        }

        return (
          <div key={item.id} className="group/item flex flex-col">
            {linkElement}
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out group-hover/item:grid-rows-[1fr] group-focus-within/item:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <div className="mt-1 ml-6 flex flex-col space-y-1 border-l-2 border-primary/25 pl-3">
                  {item.subItems!.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/sub flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-150 hover:bg-orange-50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <FileText className="h-3.5 w-3.5 shrink-0 text-gray-400 group-hover/sub:text-primary" />
                        <span className="truncate">{sub.label}</span>
                      </span>
                      <ExternalLink className="h-3 w-3 shrink-0 text-gray-400 group-hover/sub:text-primary" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

export default function DepartmentSidebar({
  items = defaultItems,
  activeId,
  basePath,
  defaultId,
}: DepartmentSidebarProps) {
  return (
    <>
      {/* Mobile / tablet: every section visible at once, wrapped instead of stacked */}
      <SectionLinks
        items={items}
        activeId={activeId}
        basePath={basePath}
        defaultId={defaultId}
        variant="chip"
        className="flex flex-wrap gap-2 lg:hidden"
      />

      {/* Desktop: vertical menu, capped to the viewport so long menus stay reachable */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-[calc(var(--header-h)+1rem)] flex max-h-[calc(100svh-var(--header-h)-2rem)] flex-col">
          <h2 className="mb-4 shrink-0 px-2 text-sm font-bold uppercase tracking-wider text-primary">
            Department Menu
          </h2>

          <SectionLinks
            items={items}
            activeId={activeId}
            basePath={basePath}
            defaultId={defaultId}
            variant="sidebar"
            className={cn(
              "flex min-h-0 flex-1 flex-col space-y-1 overflow-y-auto overscroll-contain pr-2",
              // Force a persistent scrollbar: macOS overlay scrollbars fade out, which
              // leaves a capped menu looking like it simply ends.
              "[scrollbar-width:thin] [scrollbar-color:#d6d3d1_transparent]",
              "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent",
              "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300",
            )}
          />
        </div>
      </aside>
    </>
  );
}
