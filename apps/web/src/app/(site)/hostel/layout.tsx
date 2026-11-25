"use client";

import Link from "@/components/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Home, Building2, Phone } from "lucide-react";

const hostelNav = [
    { title: "About Hostel", href: "/hostel", icon: Home },
    { title: "Sir M. Visvesavaraya Block", href: "/hostel/v-block", icon: Building2 },
    { title: "Netaji Block", href: "/hostel/netaji-block", icon: Building2 },
    { title: "Malaprabha Ladies Hostel", href: "/hostel/malaprabha-block", icon: Building2 },
    { title: "PG Boys Hostel", href: "/hostel/pg-block", icon: Building2 },
    { title: "Contact Information", href: "/hostel/contact", icon: Phone },
];

export default function HostelLayout({
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
                                    Hostels
                                </h2>
                                <nav className="flex flex-col space-y-1">
                                    {hostelNav.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={cn(
                                                    "group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                                    isActive
                                                        ? "bg-primary text-white shadow-md shadow-orange-200"
                                                        : "text-gray-600 hover:bg-orange-50 hover:text-primary"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <item.icon className={cn("w-4 h-4", isActive ? "text-orange-100" : "text-gray-400 group-hover:text-primary")} />
                                                    {item.title}
                                                </div>
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="hostel-nav-indicator"
                                                        className="w-1.5 h-1.5 rounded-full bg-white"
                                                    />
                                                )}
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>

                            {/* Quick Info Card */}
                            <div className="p-6 rounded-2xl bg-white border border-orange-100 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 opacity-50" />
                                <h3 className="text-sm font-bold text-gray-900 mb-2 relative z-10">
                                    Warden&apos;s Office
                                </h3>
                                <p className="text-xs text-gray-600 mb-4 leading-relaxed relative z-10">
                                    For inquiries regarding hostel admissions and facilities.
                                </p>
                                <div className="space-y-3 text-xs relative z-10">
                                    <div className="flex items-start gap-2 text-gray-700">
                                        <span className="font-semibold text-primary shrink-0">Chief Warden:</span>
                                        <span>Dr. B. R. Hiremath<br />Principal</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-gray-700">
                                        <Phone className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                                        <a href="tel:+919448693600" className="hover:text-primary transition-colors">
                                            +91 94486 93600<br />(Dr. P. L. Timmanagoudar — Boys Hostel)
                                        </a>
                                    </div>
                                    <div className="flex items-start gap-2 text-gray-700">
                                        <Phone className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                                        <a href="tel:+919449534202" className="hover:text-primary transition-colors">
                                            +91 94495 34202<br />(Dr. Shobha R. Patil — Girls Hostel)
                                        </a>
                                    </div>
                                </div>
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
