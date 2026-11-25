import type { MetadataRoute } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { SITE_URL } from "@/lib/seo";
import {
  DEFAULT_DEPARTMENT_SECTION,
  departmentCategories,
  departmentHref,
  departmentSectionHref,
} from "@/data/departments-catalog";
import { getDepartmentData } from "@/data/department/department";

// Required by the static export: a metadata route has to say it is built once.
export const dynamic = "force-static";

const APP_DIR = join(process.cwd(), "src", "app");

/**
 * Walk src/app collecting every static route (a directory containing page.tsx),
 * skipping dynamic segments, route groups and private folders. Keeps the sitemap
 * in sync with the route tree automatically.
 */
function staticRoutes(dir = APP_DIR, base = ""): string[] {
  const routes: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name.startsWith("[") || name.startsWith("_")) continue;
    const full = join(dir, name);
    // Route groups — `(site)` — organise files without adding a URL segment.
    if (name.startsWith("(")) {
      routes.push(...staticRoutes(full, base));
      continue;
    }
    const path = `${base}/${name}`;
    if (readdirSync(full).includes("page.tsx")) routes.push(path);
    routes.push(...staticRoutes(full, path));
  }
  return routes;
}

function priorityFor(path: string): number {
  if (path === "/") return 1;
  const depth = path.split("/").filter(Boolean).length;
  return depth <= 1 ? 0.8 : 0.6;
}

// No `lastModified`: the only date known at build time is the build itself, and
// stamping all ~390 URLs with it told crawlers the whole site had changed on
// every deploy, so they re-fetched all of it.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = ["/", ...staticRoutes()].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: priorityFor(path),
    }),
  );

  // Every department section is its own prerendered URL, so list them all —
  // the base entry already covers the section served at the department root.
  const departmentEntries: MetadataRoute.Sitemap = departmentCategories.flatMap(
    (category) =>
      category.departments.flatMap((entry) => {
        const { sidebar } = getDepartmentData(category.key, entry.slug);
        const base = departmentHref(category.key, entry.slug);
        const defaultId = sidebar[0]?.id ?? DEFAULT_DEPARTMENT_SECTION;
        return sidebar.map((item, index) => ({
          url: `${SITE_URL}${departmentSectionHref(base, item.id, defaultId)}`,
          changeFrequency: "monthly" as const,
          priority: index === 0 ? 0.7 : 0.6,
        }));
      }),
  );

  return [...staticEntries, ...departmentEntries];
}
