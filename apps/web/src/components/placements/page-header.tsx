"use client";

import { cn } from "@/lib/utils";

import Link from "@/components/link";
import { ChevronRight, Home } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  breadcrumb?: {
    label: string;
    href: string;
    active?: boolean;
  }[];
}

export function PageHeader({ title, description, className, breadcrumb }: PageHeaderProps) {
  return (
    <div className={cn("relative mb-8 md:mb-16 py-12 md:py-16 bg-stone-50 border-b border-stone-100", className)}>
       {/* Background Pattern */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
            }} 
       />
       
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {breadcrumb && (
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
            {breadcrumb.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
                <Link
                    href={item.href}
                    className={cn(
                    "hover:text-primary transition-colors flex items-center gap-1.5",
                    item.active && "text-primary font-semibold pointer-events-none",
                    index === 0 && "hover:text-primary"
                    )}
                >
                    {index === 0 && <Home className="w-3.5 h-3.5 mb-0.5" />}
                    {item.label}
                </Link>
                </div>
            ))}
            </nav>
        )}
        <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
                {title}
            </h1>
            {description && (
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed font-medium">
                {description}
                </p>
            )}
        </div>
      </div>
    </div>
  );
}
