"use client";

import * as React from "react";
import Link from "@/components/link";
import { Pin, ChevronLeft, ChevronRight, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { newsItems, announcementItems, type NewsListItem } from "@/content/news";
import { FadeIn } from "../animations/fade-in";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const UNPINNED_ITEMS_PER_PAGE = 5;

const slideVariants = {
  enter: (direction: "forward" | "backward") => ({
    x: direction === "forward" ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: "forward" | "backward") => ({
    x: direction === "forward" ? -100 : 100,
    opacity: 0,
  }),
};

/**
 * An item with no link is plain text, not a link to "#" — that was how the old
 * hardcoded data spelled "no link", and it shipped dead links to screen readers.
 */
function ItemTitle({ item }: { item: NewsListItem }) {
  const className =
    "text-[15px] font-semibold text-gray-800 leading-snug line-clamp-2";
  if (!item.href) return <span className={className}>{item.title}</span>;
  return (
    <Link
      href={item.href}
      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(className, "transition-colors hover:text-primary")}
    >
      {item.title}
      {item.attachment ? (
        <FileText className="ml-1.5 inline h-3.5 w-3.5 -translate-y-px text-primary" />
      ) : null}
    </Link>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex min-h-[380px] lg:h-[420px] flex-col items-center justify-center text-center">
      <p className="text-sm font-medium text-muted-foreground">
        No {label} at the moment. Please check back soon.
      </p>
    </div>
  );
}

export function NewsAnnouncementsSection() {
  const [newsPage, setNewsPage] = React.useState(0);
  const [annPage, setAnnPage] = React.useState(0);
  
  // Track animation direction for each section ("forward" = right-to-left, "backward" = left-to-right)
  const [newsDirection, setNewsDirection] = React.useState<"forward" | "backward">("forward");
  const [annDirection, setAnnDirection] = React.useState<"forward" | "backward">("forward");

  // Split Pinned and Unpinned items
  const pinnedNews = React.useMemo(() => newsItems.filter((item) => item.pinned), []);
  const unpinnedNews = React.useMemo(() => newsItems.filter((item) => !item.pinned), []);

  const pinnedAnn = React.useMemo(() => announcementItems.filter((item) => item.pinned), []);
  const unpinnedAnn = React.useMemo(() => announcementItems.filter((item) => !item.pinned), []);

  // Calculate pages based on unpinned items
  const totalNewsPages = Math.ceil(unpinnedNews.length / UNPINNED_ITEMS_PER_PAGE);
  const totalAnnPages = Math.ceil(unpinnedAnn.length / UNPINNED_ITEMS_PER_PAGE);

  const currentUnpinnedNews = unpinnedNews.slice(
    newsPage * UNPINNED_ITEMS_PER_PAGE,
    (newsPage + 1) * UNPINNED_ITEMS_PER_PAGE
  );
  const currentUnpinnedAnn = unpinnedAnn.slice(
    annPage * UNPINNED_ITEMS_PER_PAGE,
    (annPage + 1) * UNPINNED_ITEMS_PER_PAGE
  );

  // Auto-play interval: 10 seconds (slides right-to-left)
  // Re-creates on page change to reset the timer when manual pagination happens.
  React.useEffect(() => {
    if (totalNewsPages <= 1 && totalAnnPages <= 1) return;

    const timer = setInterval(() => {
      if (totalNewsPages > 1) {
        setNewsDirection("forward");
        setNewsPage((prev) => (prev + 1) % totalNewsPages);
      }
      if (totalAnnPages > 1) {
        setAnnDirection("forward");
        setAnnPage((prev) => (prev + 1) % totalAnnPages);
      }
    }, 10000);

    return () => clearInterval(timer);
  }, [newsPage, annPage, totalNewsPages, totalAnnPages]);

  return (
    <section className="py-16 md:py-20 bg-white border-b border-muted/50">
      <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: News and Updates */}
          <FadeIn direction="up" delay={0.1} className="h-full">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-4 flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-secondary">
                      News and Updates
                    </h2>
                    <div className="flex-1 h-[2px] bg-primary/20 rounded-full hidden sm:block" />
                  </div>
                </div>

                <div className="space-y-6 min-h-[380px]">
                  {newsItems.length === 0 && <EmptyState label="news" />}
                  {/* Pinned News (Static) */}
                  <div className="space-y-6">
                    {pinnedNews.map((item) => (
                      <div
                        key={`${item.date}-${item.title}`}
                        className="border-b border-gray-100 pb-5 lg:h-[86px]"
                      >
                        <div className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase mb-1.5">
                          {item.date}
                        </div>
                        <div className="flex gap-2.5 items-start">
                          <Pin className="h-4 w-4 text-green-600 fill-green-600 rotate-[45deg] shrink-0 mt-1" />
                          <ItemTitle item={item} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Unpinned News (Sliding / Snappy Directional Transitions) */}
                  <div className="relative overflow-hidden">
                    <AnimatePresence mode="wait" custom={newsDirection}>
                      <motion.div
                        key={newsPage}
                        custom={newsDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 220, damping: 26 }}
                        className="space-y-6"
                      >
                        {currentUnpinnedNews.map((item, index) => (
                          <div
                            key={`${item.date}-${item.title}`}
                            className={cn(
                              "border-b border-gray-100 pb-5 lg:h-[86px]",
                              index === currentUnpinnedNews.length - 1 && "border-b-0 pb-0"
                            )}
                          >
                            <div className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase mb-1.5">
                              {item.date}
                            </div>
                            <div className="flex gap-2.5 items-start">
                              <ItemTitle item={item} />
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
                <Link
                  href="/news"
                  className="text-sm font-bold text-secondary hover:text-primary flex items-center gap-1.5 transition-colors group"
                >
                  View all News
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                {totalNewsPages > 1 && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setNewsDirection("backward");
                        setNewsPage((p) => (p - 1 + totalNewsPages) % totalNewsPages);
                      }}
                      className="h-8 w-8 rounded-full border-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous page</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setNewsDirection("forward");
                        setNewsPage((p) => (p + 1) % totalNewsPages);
                      }}
                      className="h-8 w-8 rounded-full border-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next page</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Right Column: Announcements */}
          <FadeIn direction="up" delay={0.2} className="h-full">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-4 flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-secondary">
                      Announcements
                    </h2>
                    <div className="flex-1 h-[2px] bg-primary/20 rounded-full hidden sm:block" />
                  </div>
                </div>

                <div className="space-y-6 min-h-[380px]">
                  {announcementItems.length === 0 && (
                    <EmptyState label="announcements" />
                  )}
                  {/* Pinned Announcements (Static) */}
                  <div className="space-y-6">
                    {pinnedAnn.map((item) => (
                      <div
                        key={`${item.date}-${item.title}`}
                        className="border-b border-gray-100 pb-5 lg:h-[86px]"
                      >
                        <div className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase mb-1.5">
                          {item.date}
                        </div>
                        <div className="flex gap-2.5 items-start">
                          <Pin className="h-4 w-4 text-green-600 fill-green-600 rotate-[45deg] shrink-0 mt-1" />
                          <ItemTitle item={item} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Unpinned Announcements (Sliding / Snappy Directional Transitions) */}
                  <div className="relative overflow-hidden">
                    <AnimatePresence mode="wait" custom={annDirection}>
                      <motion.div
                        key={annPage}
                        custom={annDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 220, damping: 26 }}
                        className="space-y-6"
                      >
                        {currentUnpinnedAnn.map((item, index) => (
                          <div
                            key={`${item.date}-${item.title}`}
                            className={cn(
                              "border-b border-gray-100 pb-5 lg:h-[86px]",
                              index === currentUnpinnedAnn.length - 1 && "border-b-0 pb-0"
                            )}
                          >
                            <div className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase mb-1.5">
                              {item.date}
                            </div>
                            <div className="flex gap-2.5 items-start">
                              <ItemTitle item={item} />
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
                <Link
                  href="/announcements"
                  className="text-sm font-bold text-secondary hover:text-primary flex items-center gap-1.5 transition-colors group"
                >
                  View all Announcements
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                {totalAnnPages > 1 && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setAnnDirection("backward");
                        setAnnPage((p) => (p - 1 + totalAnnPages) % totalAnnPages);
                      }}
                      className="h-8 w-8 rounded-full border-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous page</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setAnnDirection("forward");
                        setAnnPage((p) => (p + 1) % totalAnnPages);
                      }}
                      className="h-8 w-8 rounded-full border-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next page</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
