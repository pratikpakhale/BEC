"use client";

import { useState } from "react";
import Link from "@/components/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { navigationData } from "@/data/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";

// Extract student life navigation items
const studentLifeNav =
    navigationData.find((item) => item.title === "Student Life")?.items || [];

function SidebarNavItem({ item, pathname }: { item: any; pathname: string }) {
    const hasChildren = "items" in item && item.items && item.items.length > 0;

    // Check if any child is active to initialize open state
    const isChildActive = hasChildren && item.items.some((child: any) => pathname === child.href);
    const [isOpen, setIsOpen] = useState(isChildActive);

    if ("href" in item) {
        const isActive = pathname === item.href;
        return (
            <div key={item.href}>
                <Link
                    href={item.href}
                    className={cn(
                        "group flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                            ? "bg-primary text-white shadow-md shadow-orange-200"
                            : "text-gray-600 hover:bg-orange-50 hover:text-primary"
                    )}
                >
                    {item.title}
                    {isActive && (
                        <motion.div
                            layoutId="student-nav-indicator"
                            className="w-1.5 h-1.5 rounded-full bg-white"
                        />
                    )}
                </Link>
            </div>
        );
    } else {
        // Section Header (Group) with Dropdown
        return (
            <div key={item.title} className="mt-4 first:mt-0">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between px-4 py-2 group cursor-pointer"
                >
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500 group-hover:text-primary transition-colors">
                        {item.title}
                    </div>
                    {hasChildren && (
                        <ChevronDown
                            className={cn(
                                "w-4 h-4 text-gray-400 transition-transform duration-200",
                                !isOpen && "-rotate-90"
                            )}
                        />
                    )}
                </button>

                <AnimatePresence>
                    {hasChildren && isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="flex flex-col space-y-1 mt-1 mb-2">
                                {item.items.map((subItem: any) => {
                                    const isSubActive = pathname === subItem.href;
                                    return (
                                        <Link
                                            key={subItem.href}
                                            href={subItem.href}
                                            className={cn(
                                                "group flex items-center justify-between px-4 py-2.5 mx-2 rounded-md text-sm transition-all duration-200 pl-6",
                                                isSubActive
                                                    ? "bg-orange-50 text-primary font-medium"
                                                    : "text-gray-600 hover:bg-orange-50/50 hover:text-primary"
                                            )}
                                        >
                                            <span className="truncate">{subItem.title}</span>
                                            {isSubActive && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    }
}

export default function StudentLifeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative">
            {/* Background Decorations Removed to prevent footer overlay */}

            <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Sidebar Navigation */}
                    <div className="w-full lg:w-64 shrink-0">
                        <div className="sticky top-24">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 px-2">
                                Student Life
                            </h2>
                            <nav className="flex flex-col space-y-1">
                                {studentLifeNav.map((item, index) => (
                                    <SidebarNavItem key={index} item={item} pathname={pathname} />
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-sm border border-orange-50/50"
                        >
                            {children}
                        </motion.div>
                    </main>
                </div>
            </div>
        </div>
    );
}
