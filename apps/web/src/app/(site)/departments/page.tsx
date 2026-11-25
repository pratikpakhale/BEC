import { GraduationCap, ArrowRight } from "lucide-react";
import Link from "@/components/link";

import {
  departmentCategories,
  departmentHref,
  totalDepartments,
  type DepartmentCategory,
  type DepartmentEntry,
  type DepartmentType,
} from "@/data/departments-catalog";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Departments",
  description:
    "Explore the academic departments at Basaveshwar Engineering College, Bagalkote — undergraduate, postgraduate and science & humanities programmes spanning engineering, sciences and management.",
  path: "/departments",
});

function DepartmentCard({
  department,
  type,
}: {
  department: DepartmentEntry;
  type: DepartmentType;
}) {
  return (
    <Link
      href={departmentHref(type, department.slug)}
      className="group block h-full bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          <GraduationCap className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 pr-4 group-hover:text-primary transition-colors">
          {department.name}
        </h3>

        <div className="flex items-center text-sm text-gray-500 font-medium group-hover:text-primary transition-colors mt-4">
          View Details{" "}
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
        {children}
      </h2>
      <div className="h-px flex-1 bg-gray-100"></div>
    </div>
  );
}

function CategorySection({ category }: { category: DepartmentCategory }) {
  return (
    <section className="mb-16">
      <SectionTitle>{category.title}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.departments.map((dept) => (
          <DepartmentCard
            key={`${category.key}-${dept.slug}`}
            department={dept}
            type={category.key}
          />
        ))}
      </div>
    </section>
  );
}

export default function DepartmentsPage() {
  const ugCount =
    departmentCategories.find((c) => c.key === "ug")?.departments.length ?? 0;
  const pgCount =
    departmentCategories.find((c) => c.key === "pg")?.departments.length ?? 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative">
      <BreadcrumbsJsonLd items={[{ name: "Departments", path: "/departments" }]} />
      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50 py-14 md:py-18">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
        </div>

        <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Departments
          </p>
          <div className="mt-4 space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
              Explore Our Departments
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Discover diverse programs in engineering, sciences, and management
              – each designed to empower future innovators and leaders.{" "}
            </p>
          </div>
        </div>
      </section>
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
        {departmentCategories.map((category) => (
          <CategorySection key={category.key} category={category} />
        ))}

        {/* Stats */}
        <section className="bg-white rounded-3xl p-12 border border-orange-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 text-center gap-10 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div>
              <p className="text-5xl font-bold text-primary mb-2">{totalDepartments}</p>
              <p className="text-gray-600 font-medium">Total Departments</p>
            </div>
            <div className="pt-8 md:pt-0">
              <p className="text-5xl font-bold text-primary mb-2">{ugCount}</p>
              <p className="text-gray-600 font-medium">UG Programs</p>
            </div>
            <div className="pt-8 md:pt-0">
              <p className="text-5xl font-bold text-primary mb-2">{pgCount}</p>
              <p className="text-gray-600 font-medium">PG Programs</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
