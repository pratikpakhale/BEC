// File: src/components/library/library-breadcrumb.tsx
"use client";

import Link from "@/components/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface LibraryBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function LibraryBreadcrumb({ items }: LibraryBreadcrumbProps) {
  return (
    <nav className="bg-stone-50 border-b border-stone-200">
      <div className="container mx-auto px-4 py-4">
        <ol className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <li>
            <Link 
              href="/" 
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-primary font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}