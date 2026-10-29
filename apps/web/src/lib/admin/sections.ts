import {
  Building2,
  FileText,
  GraduationCap,
  HardDrive,
  Home,
  Images,
  Landmark,
  Megaphone,
  Users,
  type LucideIcon,
} from "lucide-react";

export type AdminSection = {
  href: string;
  label: string;
  /** One line an Editor can act on — what this screen changes on the site. */
  description: string;
  icon: LucideIcon;
  /** "planned" sections show in the nav but are not linkable yet. */
  status: "ready" | "planned";
};

/**
 * Single source of truth for the Admin's navigation and dashboard. Sections
 * appear here from the start — greyed out — so Editors can see the shape of the
 * finished tool, and each slice flips its own entry to "ready".
 */
export const ADMIN_SECTIONS: AdminSection[] = [
  {
    href: "/admin/news",
    label: "News & Announcements",
    description: "Post achievements, events and administrative notices.",
    icon: Megaphone,
    status: "ready",
  },
  {
    href: "/admin/home",
    label: "Home page",
    description: "Hero slides, the about section and campus life.",
    icon: Home,
    status: "ready",
  },
  {
    href: "/admin/governance",
    label: "Governance",
    description: "Principal, deans, officers, HoDs, Sangha and the Board.",
    icon: Landmark,
    status: "ready",
  },
  {
    href: "/admin/faculty",
    label: "Faculty",
    description: "Faculty profiles and photos, department by department.",
    icon: Users,
    status: "ready",
  },
  {
    href: "/admin/placements",
    label: "Placements",
    description: "Placement figures and recruiter lists per department.",
    icon: GraduationCap,
    status: "ready",
  },
  {
    href: "/admin/departments",
    label: "Departments",
    description: "Everything on a department's own pages.",
    icon: Building2,
    status: "ready",
  },
  {
    href: "/admin/documents",
    label: "Page documents",
    description: "The PDFs listed on NBA, NAAC, NIRF, calendars, cells and more.",
    icon: FileText,
    status: "ready",
  },
  {
    href: "/admin/gallery",
    label: "Photo galleries",
    description: "Add and remove photos from the galleries on the site.",
    icon: Images,
    status: "ready",
  },
  {
    href: "/admin/cleanup",
    label: "Storage",
    description: "Space used, and photos no page uses any more.",
    icon: HardDrive,
    status: "ready",
  },
];
