"use client";

import { motion } from "motion/react";
import { 
  Calendar, 
  Award, 
  BookOpen, 
  Users, 
  History, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Compass,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { asset } from "@/lib/assets";
import Link from "@/components/link";

const legacyMetrics = [
  {
    value: "1963",
    label: "Year of Inception",
    icon: Calendar,
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  {
    value: "93 Acres",
    label: "Lush Green Campus",
    icon: Building2,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    value: "Autonomous",
    label: "Granted in 2007",
    icon: ShieldCheck,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    value: "Global",
    label: "Alumni Network",
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-50"
  }
];

const timelinePhases = [
  {
    phase: "Phase I (1963 – 1983)",
    title: "Foundation & Consolidation",
    subtitle: "Carving the Path for Rural Technical Education",
    icon: Compass,
    color: "from-orange-500 to-amber-500",
    description: 
      "Basaveshwar Engineering College was established in 1963 by the philanthropic Basaveshwar Veerashaiva Vidyavardhak Sangha (B. V. V. S.), fueled by a vision to bring quality technical education to the rural masses of Northern Karnataka.",
    milestones: [
      {
        year: "1963",
        text: "Inception of the college with three core engineering streams: Civil, Mechanical, and Electrical Engineering."
      },
      {
        year: "1968",
        text: "Brought under the Government grant-in-aid code, establishing administrative stability and enabling resource growth."
      },
      {
        year: "1970s",
        text: "Expansion of foundational lab infrastructures, drawing highly qualified faculty and establishing rigorous academic standards."
      }
    ]
  },
  {
    phase: "Phase II (1983 – 2003)",
    title: "Expansion & Research Genesis",
    subtitle: "Diversifying Academics and Fostering Innovation",
    icon: BookOpen,
    color: "from-blue-600 to-indigo-600",
    description: 
      "This era was marked by a rapid expansion in educational offerings. Recognizing emerging industrial demands, the college diversified into cutting-edge disciplines, setting the foundation for specialized PG programs and scientific research.",
    milestones: [
      {
        year: "1980s-90s",
        text: "Expansion into newer disciplines including computer science, electronics, biotechnology and allied engineering programmes to meet emerging industrial demand."
      },
      {
        year: "Phase II Growth",
        text: "Added seven additional undergraduate and four new postgraduate programmes, including the Master of Computer Applications (MCA), broadening the academic portfolio."
      },
      {
        year: "Research Genesis",
        text: "Departments progressively recognised as approved research centres, beginning the transition toward a research-intensive institution."
      }
    ]
  },
  {
    phase: "Phase III (2004 – Present)",
    title: "Autonomy & Modernization Hub",
    subtitle: "Shaping the Future of Autonomous Excellence",
    icon: GraduationCap,
    color: "from-emerald-600 to-teal-600",
    description: 
      "At the turn of the century, BEC accelerated into a modern center of excellence. Backed by federal funding and international programs, the college adopted autonomy, leading to revolutionary curriculum reforms and world-class R&D setups.",
    milestones: [
      {
        year: "2004",
        text: "Selection for the World Bank-assisted Technical Education Quality Improvement Program (TEQIP-I), subsequently followed by selection in TEQIP-II and TEQIP-III."
      },
      {
        year: "2007",
        text: "Granted Academic Autonomy by the UGC and Visvesvaraya Technological University (VTU), enabling industry-aligned custom curricula."
      },
      {
        year: "2010s",
        text: "Achieved NAAC accreditation by the UGC and 100% NBA accreditation of all UG courses, with departments recognised as VTU-approved research and development centres."
      },
      {
        year: "Present",
        text: "Thriving 93-acre autonomous campus offering 10 UG and 8 PG programmes, with 10 departments recognised as VTU-approved R&D centres and state-of-the-art industry-collaborative facilities."
      }
    ]
  }
];

const heritageGallery = [
  {
    src: asset("institute/group-photos/faculty-group-photo.webp"),
    alt: "Faculty of Basaveshwar Engineering College assembled before the main building",
  },
  {
    src: asset("institute/group-photos/cine1583.webp"),
    alt: "College community gathered on the campus grounds",
  },
  {
    src: asset("institute/group-photos/cine1590.webp"),
    alt: "Group photograph of staff and faculty at the BEC campus",
  },
  {
    src: asset("institute/group-photos/cine1604.webp"),
    alt: "Faculty and staff group photograph at the campus portico",
  },
  {
    src: asset("institute/group-photos/cine1614.webp"),
    alt: "Members of the college community at Basaveshwar Engineering College",
  },
  {
    src: asset("institute/group-photos/faculty-group-photo-2.webp"),
    alt: "Faculty group photograph at Basaveshwar Engineering College",
  },
];

export default function HistoryContent() {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative pb-20">
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-blue-100/20 rounded-full blur-3xl -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50 py-16 md:py-24">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
          </div>

          <div className="container mx-auto max-w-6xl px-4 lg:px-6 relative text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 border border-orange-100/80 text-xs font-semibold uppercase tracking-wider mb-2">
              <History className="w-3.5 h-3.5" />
              Our Legacy
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              63 Years of <span className="bg-linear-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Academic Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium">
              From our humble foundation in 1963 to a premier autonomous technology institution.
              Explore the milestone journey that defines Basaveshwar Engineering College.
            </p>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="relative mt-10 aspect-16/9 w-full overflow-hidden rounded-2xl border border-stone-200 shadow-xl"
            >
              <Image
                src={asset("institute/group-photos/cine1579.webp")}
                alt="Faculty and staff of Basaveshwar Engineering College gathered before the main academic building"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Quick Legacy Metrics */}
        <section className="container mx-auto max-w-6xl px-4 lg:px-6 -mt-8 relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {legacyMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                >
                  <Card className="bg-white/80 backdrop-blur-md border border-stone-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${metric.bg} ${metric.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xl md:text-2xl font-bold text-gray-900 leading-none mb-1">
                          {metric.value}
                        </div>
                        <div className="text-xs md:text-sm font-semibold text-gray-500">
                          {metric.label}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Narrative Legacy Statement */}
        <section className="container mx-auto max-w-4xl px-4 lg:px-6 py-20 text-center space-y-6">
          <motion.div
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">
              Building Leaders Since 1963
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
              Established under the patronage of the Basaveshwar Veerashaiva Vidyavardhak Sangha (B. V. V. S.), 
              BEC was born out of an urgent need to empower students in Northern Karnataka with state-of-the-art 
              technical skills. Today, our 93-acre sprawling campus is a major educational nerve center 
              fostering holistic technical competence, path-breaking research, and strong global connections.
            </p>
          </motion.div>
        </section>

        {/* Heritage Gallery */}
        <section className="container mx-auto max-w-5xl px-4 lg:px-6 pb-20">
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 border border-orange-100/80 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              Through the Years
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              A Campus, A Community
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-medium max-w-2xl mx-auto">
              Generations of faculty, staff and students gathered before the
              landmark facade of Basaveshwar Engineering College.
            </p>
          </div>
          <PhotoGallery images={heritageGallery} />
        </section>

        {/* Phases Timeline */}
        <section className="container mx-auto max-w-5xl px-4 lg:px-6 space-y-16">
          <div className="relative">
            {/* Center Timeline Line (Desktop Only) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-stone-200 -translate-x-1/2 hidden lg:block" />

            {timelinePhases.map((phase, index) => {
              const Icon = phase.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 items-start">
                  {/* Timeline Badge/Dot */}
                  <div className="absolute left-1/2 top-4 w-10 h-10 rounded-full bg-white border-2 border-stone-200 shadow-md flex items-center justify-center -translate-x-1/2 z-20 hidden lg:flex">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>

                  <div className={`space-y-4 lg:pr-10 ${isEven ? "lg:order-1 lg:text-right" : "lg:order-2 lg:col-start-2 lg:pl-10"}`}>
                    <div className="inline-flex items-center gap-1.5">
                      <Badge className="bg-stone-100 hover:bg-stone-200 text-stone-700 border-none font-semibold text-xs py-1 px-3">
                        {phase.phase}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {phase.title}
                    </h3>
                    <p className="text-sm font-semibold text-primary/90">
                      {phase.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      {phase.description}
                    </p>
                  </div>

                  {/* Milestones Card */}
                  <motion.div 
                    transition={{ duration: 0.6 }}
                    className={`space-y-4 ${isEven ? "lg:order-2 lg:pl-10" : "lg:order-1 lg:col-start-1 lg:pr-10"}`}
                  >
                    <Card className="border border-stone-200 bg-white/60 backdrop-blur-xs p-6 shadow-md hover:shadow-lg transition-shadow rounded-2xl">
                      <CardContent className="p-0 space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
                          Key Milestones
                        </h4>
                        <div className="space-y-4 divide-y divide-stone-100">
                          {phase.milestones.map((milestone, mIdx) => (
                            <div key={mIdx} className={`pt-4 first:pt-0 flex gap-4 ${isEven ? "" : "lg:flex-row-reverse lg:text-right"}`}>
                              <span className="text-sm font-bold text-primary shrink-0 bg-primary/5 rounded-lg px-2.5 py-1 h-fit">
                                {milestone.year}
                              </span>
                              <p className="text-sm text-gray-700 font-medium leading-relaxed">
                                {milestone.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Leadership Heritage Tribute */}
        <section className="container mx-auto max-w-5xl px-4 lg:px-6 py-24">
          <motion.div
            transition={{ duration: 0.6 }}
            className="bg-slate-900 rounded-3xl p-8 md:p-14 text-white overflow-hidden relative border border-slate-800"
          >
            {/* Background blur rings */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

            <div className="relative z-10 space-y-6 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400">
                <Award className="w-4 h-4" />
                Leadership Heritage
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Honoring the Visionaries Who Shaped BEC
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium text-justify">
                The progressive journey of Basaveshwar Engineering College has been sculpted by generations of visionary leaders, former Principals, and former Directors. Under the benevolent patronage of the Basaveshwar Veerashaiva Vidyavardhak Sangha (B. V. V. S.), their proactive governance, academic foresight, and administrative grit transformed a regional engineering college into a nationally acclaimed, autonomous center of technological excellence.
              </p>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium text-justify">
                Their contribution laid the cornerstone of our comprehensive laboratories, state-of-the-art campus infrastructure, robust placement platforms, and rich research culture. Today, we celebrate their enduring legacy by continuing to pioneer advanced, industry-aligned engineering education.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/administration/governance">
                  <span className="inline-flex items-center text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer gap-1.5 group">
                    View Present Governance
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
