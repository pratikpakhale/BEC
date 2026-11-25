"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { FadeIn } from "../animations/fade-in";
import { Button } from "@/components/ui/button";
import {
  batch2025,
  batch2026,
  offersPerYear,
  SERIES,
  type BatchStats,
} from "@/data/home/placement-charts";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "@/components/link";

const PRIMARY = "#EA6A0A";

function ChartCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={`flex flex-col rounded-3xl border border-gray-100 bg-white p-5 shadow-xl shadow-gray-100/60 sm:p-6 ${
        className ?? ""
      }`}
    >
      <figcaption className="mb-4">
        <h3 className="text-base font-bold text-gray-900 sm:text-lg">{title}</h3>
        {subtitle ? (
          <p className="mt-0.5 text-sm font-medium text-gray-500">{subtitle}</p>
        ) : null}
      </figcaption>
      {children}
    </figure>
  );
}

function DeptTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number; color?: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gray-100 bg-white px-3 py-2 text-sm shadow-lg">
      <p className="mb-1 font-bold text-gray-900">{label}</p>
      <ul className="space-y-0.5">
        {payload.map((entry) => (
          <li key={entry.name} className="flex items-center gap-2 text-gray-600">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-medium">{entry.name}</span>
            <span className="ml-auto pl-3 font-bold text-gray-900">
              {entry.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OffersPerYearChart() {
  return (
    <ChartCard
      title="Placement Offers by Year"
      subtitle="Total offers received, 2016–2026"
      className="flex-none"
    >
      <div className="h-[220px] w-full sm:h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={offersPerYear}
            margin={{ top: 24, right: 8, bottom: 4, left: -12 }}
            barCategoryGap="22%"
          >
            <defs>
              <linearGradient id="year-bar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F79A46" />
                <stop offset="100%" stopColor={PRIMARY} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f0efed" strokeDasharray="4 4" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: "#e7e5e4" }}
              interval={0}
              tick={{ fill: "#78716c", fontSize: 11, fontWeight: 600 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={44}
              tick={{ fill: "#a8a29e", fontSize: 11, fontWeight: 600 }}
            />
            <Tooltip
              cursor={{ fill: "rgba(234,106,10,0.06)" }}
              content={<DeptTooltip />}
            />
            <Bar
              dataKey="offers"
              name="Placement Offers"
              radius={[4, 4, 0, 0]}
              fill="url(#year-bar)"
              maxBarSize={44}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="offers"
                position="top"
                fill="#57534e"
                fontSize={11}
                fontWeight={700}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

function BatchDeptChart({
  batch,
  chartHeight,
}: {
  batch: BatchStats;
  chartHeight: string;
}) {
  const series = [SERIES.eligible, SERIES.placed, SERIES.offers];
  return (
    <ChartCard
      title={`${batch.batch} Batch — Department Breakdown`}
      subtitle="Eligible students, students placed and offers received, per department"
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {series.map((s) => (
          <div
            key={s.key}
            className="flex items-baseline gap-1.5 rounded-full bg-gray-50 px-3 py-1"
          >
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-lg font-bold text-gray-900">
              {batch.totals[s.key]}
            </span>
            <span className="text-xs font-medium text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>
      <div className={`w-full ${chartHeight}`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={batch.rows}
            margin={{ top: 4, right: 28, bottom: 4, left: 4 }}
            barCategoryGap="24%"
            barGap={2}
          >
            <CartesianGrid horizontal={false} stroke="#f0efed" strokeDasharray="4 4" />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#a8a29e", fontSize: 11, fontWeight: 600 }}
            />
            <YAxis
              type="category"
              dataKey="department"
              tickLine={false}
              axisLine={{ stroke: "#e7e5e4" }}
              width={44}
              tick={{ fill: "#57534e", fontSize: 12, fontWeight: 700 }}
            />
            <Tooltip
              cursor={{ fill: "rgba(120,113,108,0.06)" }}
              content={<DeptTooltip />}
            />
            <Legend
              verticalAlign="top"
              align="left"
              height={28}
              iconType="circle"
              iconSize={9}
              wrapperStyle={{ fontSize: 12, fontWeight: 600, paddingBottom: 8 }}
            />
            {series.map((s) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label}
                fill={s.color}
                radius={[0, 3, 3, 0]}
                maxBarSize={13}
                isAnimationActive={false}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function PlacementsSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-orange-50/50 via-white to-stone-50 py-20 lg:py-24">
      <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full bg-orange-100/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-[1400px] px-4 lg:px-6">
        <FadeIn className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <Briefcase className="h-3.5 w-3.5" />
            Career & Placements
          </div>
          <h2 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-5xl">
            Placements at a glance
          </h2>
          <p className="text-lg font-medium leading-relaxed text-gray-600">
            A decade of placement offers and the latest batch-wise outcomes from
            our Training &amp; Placement Cell.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <FadeIn className="flex flex-col gap-6 lg:gap-8">
            <OffersPerYearChart />
            <BatchDeptChart batch={batch2025} chartHeight="h-[360px] sm:h-[400px]" />
          </FadeIn>

          <FadeIn
            delay={0.15}
            direction="left"
            className="flex flex-col gap-6 lg:gap-8"
          >
            <BatchDeptChart batch={batch2026} chartHeight="h-[440px] sm:h-[520px]" />

            <div className="flex flex-col items-start gap-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-100/60 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Explore our placement record
                </h3>
                <p className="mt-1 text-sm font-medium text-gray-500">
                  Recruiters, packages, MoUs and department-wise reports.
                </p>
              </div>
              <Button
                asChild
                className="h-12 shrink-0 rounded-full px-8 text-base font-bold shadow-lg shadow-orange-200 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Link
                  href="/placements"
                  className="inline-flex items-center gap-2"
                >
                  Explore Placements <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
