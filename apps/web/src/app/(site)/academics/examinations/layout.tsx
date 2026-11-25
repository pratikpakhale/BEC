"use client";

import Link from "@/components/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Building2,
  Users,
  FileText,
  Clock,
  GraduationCap,
  CheckCircle2,
  Phone,
} from "lucide-react";

// Define navigation items for the sidebar
const examNav = [
  {
    title: "About Examination Section",
    href: "/academics/examinations",
    icon: Building2,
  },
  {
    title: "Examination Staff",
    href: "/academics/examinations/staff",
    icon: Users,
  },
  {
    title: "BEC Rules and Regulations",
    href: "/academics/examinations/rules",
    icon: FileText,
  },
  {
    title: "SEE Time Table",
    href: "/academics/examinations/timetable",
    icon: Clock,
  },
  {
    title: "Results",
    href: "/academics/examinations/results",
    icon: GraduationCap,
  },
  {
    title: "Academic Verification",
    href: "/academics/examinations/verification",
    icon: CheckCircle2,
  },
  {
    title: "Contact Information",
    href: "/academics/examinations/contact",
    icon: Phone,
  },
];

export default function ExaminationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 px-2">
                  Examinations
                </h2>
                <nav className="flex flex-col space-y-1">
                  {examNav.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-primary text-white shadow-md shadow-orange-200"
                            : "text-gray-600 hover:bg-orange-50 hover:text-primary",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon
                            className={cn(
                              "w-4 h-4",
                              isActive
                                ? "text-orange-100"
                                : "text-gray-400 group-hover:text-primary",
                            )}
                          />
                          {item.title}
                        </div>
                        {isActive && (
                          <motion.div
                            layoutId="exam-nav-indicator"
                            className="w-1.5 h-1.5 rounded-full bg-white"
                          />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Contact Card */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 opacity-50" />
                <h3 className="text-sm font-bold text-gray-900 mb-2 relative z-10">
                  Contact Exam Section
                </h3>
                <p className="text-sm text-gray-600 mb-4 relative z-10">
                  For queries related to exams, results, and documents.
                </p>
                <Link
                  href="/academics/examinations/contact"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors relative z-10"
                >
                  Contact Details &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-sm border border-orange-50/50 min-h-[600px]"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
