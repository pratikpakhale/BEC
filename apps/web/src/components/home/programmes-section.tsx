"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn } from "../animations/fade-in";
import { programmes } from "@/data/home/programme";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap } from "lucide-react";
import Link from "@/components/link";

export function ProgrammesSection() {
  return (
    <section className="py-20 lg:py-24 bg-white border-t border-stone-50">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6">
            <GraduationCap className="w-6 h-6" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            World-Class Academic Programmes
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            Choose from a wide range of industry-aligned programmes designed to
            shape future leaders and innovators.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {programmes.map((programme, index) => {
            const Icon = programme.icon;
            return (
              <Link key={index} href={programme.href} className="block h-full">
                <Card className="h-full border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-stone-50/30">
                  <CardHeader className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide">
                        {programme.count}
                      </span>
                    </div>

                    <div>
                      <CardTitle className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-primary transition-colors">
                        {programme.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-medium text-gray-500 mt-2 leading-relaxed">
                        {programme.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                      View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            className="h-12 px-8 rounded-full font-bold shadow-lg shadow-orange-100 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <Link href="/departments">View All Departments</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
