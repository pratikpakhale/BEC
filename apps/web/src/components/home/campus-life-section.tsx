"use client";

import Image from "next/image";
import { FadeIn } from "../animations/fade-in";
import { Instagram, Twitter, Linkedin, Facebook, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { campusHighlights as lifeHighlights } from "@/content/home";
import Link from "@/components/link";

export function CampusLifeSection() {
  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 mb-16">
          <FadeIn>
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm mb-4">
              <MapPin className="w-4 h-4" />
              Student Life
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
              More than just <br />{" "}
              <span className="text-primary">academics</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-xl font-medium leading-relaxed text-justify">
              Beyond the classrooms, BEC offers a vibrant campus life powered by
              student-led clubs, massive cultural fests, and a tight-knit
              community on our 93-acre green campus.
            </p>
          </FadeIn>

          <div className="hidden lg:flex items-end justify-end">
            <Button
              asChild
              variant="outline"
              className="h-12 px-8 rounded-full font-bold border-gray-200"
            >
              <Link href="/student-life/overview">Explore Campus Life</Link>
            </Button>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px] mb-20">
          {lifeHighlights.map((item, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-3xl ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-white text-2xl font-bold mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-white/80 font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
