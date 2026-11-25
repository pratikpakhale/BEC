"use client";

import * as React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "@/components/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { aboutContent } from "@/content/home";

const aboutSlides = aboutContent.slides.map((paragraphs, index) => ({
  id: index + 1,
  paragraphs,
}));

export function AboutSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-20 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left: Image (Stays static) */}
          <motion.div
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[400px] lg:min-h-full group"
          >
            <Image
              src={aboutContent.image}
              alt="BEC Campus"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white max-w-sm">
              <div className="text-4xl font-bold mb-2">{aboutContent.established}</div>
              <p className="text-white/80 font-medium tracking-wide border-l-4 border-primary pl-4">
                {aboutContent.establishedLabel}
              </p>
            </div>
          </motion.div>

          {/* Right: Content Carousel */}
          <div className="flex flex-col justify-center space-y-8 py-4 min-w-0 w-full">
            <div>
              <motion.h2
                className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-2"
              >
                About BEC
              </motion.h2>
              <motion.div
                className="h-1.5 w-[60px] bg-primary/20 rounded-full"
              />
            </div>

            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {aboutSlides.map((slide) => (
                  <CarouselItem key={slide.id}>
                    <div className="pr-4 md:pr-12">
                      <div className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        {slide.paragraphs.map((paragraph, index) => (
                          <p key={index} className={index > 0 ? "mt-4 text-justify" : "text-justify"}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Custom Navigation */}
              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-border/50">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => api?.scrollPrev()}
                    disabled={current === 0}
                    className="h-10 w-10 rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous slide</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => api?.scrollNext()}
                    disabled={current === aboutSlides.length - 1}
                    className="h-10 w-10 rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next slide</span>
                  </Button>
                </div>

                <div className="flex gap-2 ml-auto lg:ml-4">
                  {aboutSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        current === index
                          ? "w-8 bg-primary"
                          : "w-2 bg-primary/20 hover:bg-primary/40"
                      )}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </Carousel>

            <motion.div
              transition={{ delay: 0.4 }}
            >
              <Button
                asChild
                className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                <Link href="/institute/history">
                  Explore History & Milestones
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
