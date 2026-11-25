import Link from "@/components/link";
import Image from "next/image";

import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { asset, assetsUnder } from "@/lib/assets";
import { 
  Sparkles, Music, Drama, Radio, Code, Cpu, Lightbulb, Camera, BookOpen, Leaf,
  CheckCircle2, Users, Award, Target, Eye, ShieldCheck, HeartHandshake, User, GraduationCap, ChevronRight, ArrowRight
} from "lucide-react";

export const metadata = pageMetadata({
  title: "BEC Creative Spectrum",
  description:
    "BEC Creative Spectrum is a unified student club initiative comprising ten distinct clubs under Cultural, Technical, and Holistic wings at Basaveshwar Engineering College.",
  path: "/student-life/bec-creative-spectrum",
});

const wings = [
  {
    title: "Cultural Wing",
    description: "Nurturing creative expression, performing arts, and media communication.",
    icon: Music,
    bgClass: "bg-rose-50/40 border-rose-100/60 dark:bg-rose-950/10 dark:border-rose-900/30",
    iconClass: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
    clubs: [
      { name: "BEC SWARA", role: "Music Club", desc: "Vocal & instrumental music, jam sessions, and competitions.", icon: Music, slug: "bec-swara" },
      { name: "BEC NATARAJ", role: "Dance Club", desc: "Classical, folk, hip-hop, choreography, and showcases.", icon: Sparkles, slug: "bec-nataraj" },
      { name: "BEC ABHINAYA", role: "Drama & Acting Club", desc: "Skits, mono acts, mime, and stage performances.", icon: Drama, slug: "bec-abhinaya" },
      { name: "BEC DHWANI", role: "Radio Club", desc: "Podcasting, audio production, and campus broadcasts.", icon: Radio, slug: "bec-dhwani" }
    ]
  },
  {
    title: "Technical Wing",
    description: "Fostering software engineering, hardware innovation, and startup culture.",
    icon: Cpu,
    bgClass: "bg-blue-50/40 border-blue-100/60 dark:bg-blue-950/10 dark:border-blue-900/30",
    iconClass: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    clubs: [
      { name: "DEVELOPERS", role: "Coding Club", desc: "Programming, software projects, hackathons, and tech events.", icon: Code, slug: "developers" },
      { name: "ROBOTICS & DRONE CLUB", role: "Robotics Club", desc: "Hardware development, Arduino, drone technology, and demo days.", icon: Cpu, slug: "robotics-and-drone-club" },
      { name: "AVISHKAAR", role: "Innovation & Entrepreneurs Club", desc: "Design thinking, ideation, pitching, and startup incubation.", icon: Lightbulb, slug: "bec-avishkaar" }
    ]
  },
  {
    title: "Holistic Development Wing",
    description: "Developing visual storytelling, literary skills, and environmental responsibility.",
    icon: Leaf,
    bgClass: "bg-emerald-50/40 border-emerald-100/60 dark:bg-emerald-950/10 dark:border-emerald-900/30",
    iconClass: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    clubs: [
      { name: "CINELAB", role: "Photography & Videography Club", desc: "Visual storytelling, photography workshops, and videography portfolios.", icon: Camera, slug: "cinelab" },
      { name: "LITERARY CLUB", role: "Reading, Writing & Debate Club", desc: "Debating, creative writing, elocution, and literary festivals.", icon: BookOpen, slug: "spectrum-literary-club" },
      { name: "ECO CLUB", role: "Environment Club", desc: "Sustainability drives, green initiatives, and campus environmental action.", icon: Leaf, slug: "eco-club" }
    ]
  }
];

const clubList = [
  { id: 1, name: "BEC SWARA", wing: "Cultural", focus: "Music — singing, vocal training, jam sessions, competitions", slug: "bec-swara" },
  { id: 2, name: "BEC NATARAJ", wing: "Cultural", focus: "Dance — classical, folk, hip-hop, choreography & showcases", slug: "bec-nataraj" },
  { id: 3, name: "BEC ABHINAYA", wing: "Cultural", focus: "Drama — skits, mono acts, mime & stage performances", slug: "bec-abhinaya" },
  { id: 4, name: "BEC DHWANI", wing: "Cultural", focus: "Radio — podcasting, audio production & campus broadcast", slug: "bec-dhwani" },
  { id: 5, name: "DEVELOPERS", wing: "Technical", focus: "Coding — programming, projects, hackathons & tech events", slug: "developers" },
  { id: 6, name: "ROBOTICS & DRONE", wing: "Technical", focus: "Robotics — hardware, Arduino, drone tech & demo days", slug: "robotics-and-drone-club" },
  { id: 7, name: "AVISHKAAR", wing: "Technical", focus: "Innovation — design thinking, ideation, pitching & startups", slug: "bec-avishkaar" },
  { id: 8, name: "CINELAB", wing: "Holistic Development", focus: "Photography & videography — visual storytelling & portfolio", slug: "cinelab" },
  { id: 9, name: "LITERARY CLUB", wing: "Holistic Development", focus: "Reading, writing, debate, elocution & literary festivals", slug: "spectrum-literary-club" },
  { id: 10, name: "ECO CLUB", wing: "Holistic Development", focus: "Environment — sustainability, green drives & campus action", slug: "eco-club" }
];

const galleryImages = assetsUnder("student-life/bec-creative-spectrum/")
  .filter((src) => !src.endsWith("/") && !src.includes("bec-creative-spectrum.webp"))
  .map((src, index) => {
    const filename = src.split("/").pop() || "";
    const match = filename.match(/BEC_Creative_Spectrum_(\d+)/i);
    const num = match ? parseInt(match[1], 10) : index;
    return {
      src,
      alt: `BEC Creative Spectrum activity showcase photo ${num}`,
      order: num,
    };
  })
  .sort((a, b) => a.order - b.order);

const objectives = [
  "Establish and sustain ten functioning clubs with dedicated memberships, structured plans, and measurable outcomes.",
  "Organize at least two major events per club per semester, contributing to campus vibrancy.",
  "Develop student leaders who demonstrate initiative, coordination, and the ability to inspire peers.",
  "Ensure cross-wing collaboration through joint events, showcases, and shared resources.",
  "Create a visible and proud identity for BEC's creative community — on campus and externally.",
  "Maintain institutional credibility through faculty oversight, transparent governance, and principal-level reporting."
];

const missionPoints = [
  "To create a structured, sustained, and institutionally supported platform for cultural, technical, and personal development of students.",
  "To foster collaboration, creativity, and leadership among students through well-organized club activities and events.",
  "To provide every student an accessible pathway to discover and develop their talent — in music, drama, robotics, writing, filmmaking, or environmental action.",
  "To build a culture of ownership and responsibility where student leaders manage their clubs with professionalism and accountability.",
  "To represent BEC's creative and technical talent at inter-college platforms, cultural festivals, and competitions.",
  "To strengthen the bond between students and faculty through collaborative mentorship and shared vision."
];

const execRoles = [
  { role: "President", level: "Executive Committee", description: "Overall leadership of BEC Creative Spectrum. Chairs EC meetings, represents the Spectrum in all official capacities, coordinates inter-club activities, and is the primary student liaison with faculty and administration." },
  { role: "Vice President", level: "Executive Committee", description: "Supports the President in all functions, oversees the functioning of the three wings, ensures inter-club coordination, and leads in the President's absence." },
  { role: "Treasurer", level: "Executive Committee", description: "Manages financial records, tracks budgets for all clubs and events, processes reimbursements, and presents periodic financial reports to the Dean." },
  { role: "Content Head", level: "Executive Committee", description: "Leads Spectrum's content strategy — oversees all written communications, social media, newsletters, event documentation, and official correspondence." },
  { role: "Content Co-Head", level: "Executive Committee", description: "Assists the Content Head in content creation, scheduling, and platform management. Manages specific content verticals as assigned." },
  { role: "Creative Head", level: "Executive Committee", description: "Leads the visual identity of BEC Spectrum — responsible for all posters, brand assets, event branding, and visual communication materials." },
  { role: "Creative Co-Head", level: "Executive Committee", description: "Supports the Creative Head in design execution, manages design workflows, and independently handles assigned creative projects." }
];

const clubRoles = [
  { role: "Club Lead", level: "Club Level", description: "Primary in-charge of the club. Conducts regular sessions, plans monthly activities, manages member engagement, coordinates with the EC, and is responsible for the club's outcomes and representation at events." },
  { role: "Club Co-Lead", level: "Club Level", description: "Supports the Club Lead in all functions, manages specific sessions or activities, fills in for the Lead when needed, and assists in documentation and feedback collection." },
  { role: "Faculty Coordinator", level: "Faculty Level", description: "Each club has a dedicated Faculty Coordinator who provides academic and professional guidance, approves event plans, ensures institutional compliance, mentors the club leads, and liaises with the Dean on club-level matters." }
];

export default function BECCreativeSpectrumPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <PageHero
        eyebrow="Unified Student Club Initiative"
        title="BEC Creative Spectrum"
        description={
          <>
            <p>
              BEC carries a 60-year legacy of academic excellence. To complement this, students need a formal, sustained platform for creative and personal growth. <strong className="font-semibold text-gray-900 dark:text-white">BEC Creative Spectrum</strong> fulfils this need — with structured action plans, trained student leaders, and a dedicated faculty coordinator for each club.
            </p>
            <p>
              The initiative will be governed by a Student Executive Committee under the <strong className="font-semibold text-gray-900 dark:text-white">Dean of Student Welfare</strong>, ensuring institutional accountability and disciplined execution. It is an unified, structured student club initiative comprising ten clubs under three wings: Cultural, Technical, and Holistic Development.
            </p>
          </>
        }
        badges={[{ label: "10 Clubs" }, { label: "3 Wings" }, { label: "Student Governed", tone: "outline" }]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-12 md:py-16 space-y-16">
        
        {/* About & Graphic Section */}
        <div className="space-y-10">
          <div>
            <div className="relative mx-auto w-full max-w-3xl aspect-square">
              <Image
                src={asset("student-life/bec-creative-spectrum/bec-creative-spectrum.webp")}
                alt="BEC Creative Spectrum Student Club Initiative Chart"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
              />
            </div>
            <div className="mt-2 text-center text-xs text-stone-500">
              BEC Creative Spectrum Club Structure
            </div>
          </div>

          <div className="space-y-6">
            <SectionHeading
              eyebrow="About the Initiative"
              title="A platform for creative & personal growth"
            />
            <div className="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
              <p className="text-justify">
                <strong className="font-semibold text-gray-900 dark:text-white">BEC Creative Spectrum</strong> is an integrated, institutionally governed student club framework designed to nurture talent, build character, and cultivate a vibrant campus culture at Basaveshwar Engineering College. It operates as an umbrella organization bringing together ten distinct clubs under three focused wings — Cultural, Technical, and Holistic Development.
              </p>
              <p className="text-justify">
                Unlike individual clubs that function in isolation, BEC Creative Spectrum creates a cohesive ecosystem where clubs collaborate, share resources, co-organize events, and collectively represent the creative and intellectual identity of BEC. Every club follows a structured <strong className="font-semibold text-gray-900 dark:text-white">3-month action plan</strong>, is led by trained student leaders, and is supported by a dedicated faculty coordinator.
              </p>
            </div>
            <div className="pt-2">
              <Link href="/student-life/activities">
                <Button className="group gap-2">
                  View Activities
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* The Three Wings of Creative Spectrum */}
        <div className="space-y-12">
          <SectionHeading
            eyebrow="Structure"
            title="The Three Wings of Creative Spectrum"
            description="Our ecosystem brings together ten distinct clubs organized under three specialized wings."
          />
          
          <div className="space-y-10">
            {wings.map((wing) => {
              const WingIcon = wing.icon;
              return (
                <div key={wing.title} className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-stone-200/60 dark:border-stone-800/80 pb-3">
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${wing.iconClass}`}>
                      <WingIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{wing.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{wing.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
                    {wing.clubs.map((club) => {
                      const ClubIcon = club.icon;
                      return (
                        <Link 
                          key={club.name} 
                          href={`/student-life/bec-creative-spectrum/${club.slug}`}
                          className="group relative flex flex-col justify-between bg-white dark:bg-stone-900/40 p-5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs hover:border-primary/30 hover:scale-[1.01] transition-all hover:shadow-sm h-full"
                        >
                          <div className="space-y-3.5">
                            {/* Icon Badge */}
                            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${wing.iconClass} border border-stone-200/50 dark:border-stone-800/40 group-hover:scale-105 transition-transform`}>
                              <ClubIcon className="h-5 w-5" />
                            </span>
                            
                            {/* Title & Role */}
                            <div className="space-y-1">
                              <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight group-hover:text-primary transition-colors">
                                {club.name}
                              </h4>
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${wing.iconClass}`}>
                                {club.role}
                              </span>
                            </div>
                            
                            {/* Description */}
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                              {club.desc}
                            </p>
                          </div>
                          
                          {/* Footer Action */}
                          <div className="pt-3 mt-4 border-t border-stone-150/40 dark:border-stone-800/40 flex items-center justify-between">
                            <span className="text-xs font-bold text-primary inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                              View Profile
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Club Directory Table */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Directory"
            title="Club Overview & Focus Areas"
          />
          <Card className="bg-white border-stone-200 dark:border-stone-800 dark:bg-stone-900/30 overflow-hidden shadow-xs">
            <Table>
              <TableHeader className="bg-primary/5 dark:bg-stone-900/50">
                <TableRow>
                  <TableHead className="w-[80px] font-semibold text-primary">#</TableHead>
                  <TableHead className="font-semibold w-[220px] text-primary">Club Name</TableHead>
                  <TableHead className="font-semibold w-[180px] text-primary">Wing</TableHead>
                  <TableHead className="font-semibold text-primary">Focus Area</TableHead>
                  <TableHead className="w-[100px] font-semibold text-right pr-4 text-primary">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clubList.map((club) => (
                  <TableRow key={club.id}>
                    <TableCell className="w-[80px] font-medium text-stone-500">{club.id}</TableCell>
                    <TableCell className="w-[220px] font-semibold text-stone-950 dark:text-white">{club.name}</TableCell>
                    <TableCell className="w-[180px]">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold
                        ${club.wing === "Cultural" ? "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400" : 
                          club.wing === "Technical" ? "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400" : 
                          "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"}`}>
                        {club.wing}
                      </span>
                    </TableCell>
                    <TableCell className="text-stone-600 dark:text-stone-400 text-sm">{club.focus}</TableCell>
                    <TableCell className="w-[100px] text-right pr-4">
                      <Link 
                        href={`/student-life/bec-creative-spectrum/${club.slug}`}
                        className="inline-flex items-center justify-end h-8 text-xs font-bold text-primary group gap-1 hover:text-primary"
                      >
                        View
                        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Vision, Mission & Objectives */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Vision & Mission */}
          <div className="space-y-6">
            <Card className="border-stone-200 dark:border-stone-800 dark:bg-stone-900/30 shadow-xs">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <span className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Eye className="w-5 h-5" />
                </span>
                <div>
                  <CardTitle className="text-xl font-bold">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "To establish BEC Creative Spectrum as the definitive platform for holistic student development at Basaveshwar Engineering College — an ecosystem where every student, regardless of branch or year, finds a space to explore their passions, build real skills, express their identity, and grow into confident, well-rounded individuals who carry the spirit of BEC beyond the campus."
                </p>
              </CardContent>
            </Card>

            <Card className="border-stone-200 dark:border-stone-800 dark:bg-stone-900/30 shadow-xs">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <span className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Target className="w-5 h-5" />
                </span>
                <div>
                  <CardTitle className="text-xl font-bold">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {missionPoints.map((point, idx) => (
                    <li key={idx} className="flex gap-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Objectives */}
          <Card className="border-stone-200 dark:border-stone-800 dark:bg-stone-900/30 shadow-xs h-full">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <span className="p-2 bg-primary/10 text-primary rounded-lg">
                <Award className="w-5 h-5" />
              </span>
              <div>
                <CardTitle className="text-xl font-bold">Core Objectives</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {objectives.map((obj, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-stone-50/50 dark:bg-stone-900/50 p-3 rounded-lg border border-stone-100 dark:border-stone-800 shadow-xs">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    {obj}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Governance & Organizational Structure */}
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Governance"
            title="Organizational Structure & Leadership"
            description="BEC Creative Spectrum operates under a structured governance model that guarantees guidance, leadership development, and operational excellence."
          />

          {/* Faculty Oversight */}
          <div className="bg-orange-50/40 border border-orange-100 dark:bg-orange-950/10 dark:border-orange-900/20 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-4 shadow-xs">
            <div className="p-3.5 bg-primary/10 text-primary rounded-xl shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">Faculty Oversight & Guidance</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary mt-1">Faculty Patron & Dean of Student Welfare (DSW)</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed text-justify">
                The Dean of Student Welfare serves as the institutional backbone of BEC Creative Spectrum. Providing strategic direction, ensuring alignment with college policies, approving major events and budgets, she acts as the vital bridge between student leadership and college administration to ensure the initiative remains responsible, focused, and productive.
              </p>
            </div>
          </div>

          {/* Tables for Student Executive Committee and Club-Level Leadership */}
          <div className="space-y-12">
            {/* Student Executive Committee */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-primary dark:text-white">Student Executive Committee</h3>
              </div>
              <p className="text-sm text-stone-500 leading-relaxed mb-4 text-justify">
                The central governing body responsible for overall coordination, planning, and execution of Spectrum-wide activities, selected annually based on merit and leadership ability.
              </p>
              
              <Card className="bg-white border-stone-200 dark:border-stone-800 dark:bg-stone-900/30 overflow-hidden shadow-xs">
                <Table className="w-full">
                  <TableHeader className="bg-primary/5 dark:bg-stone-900/50 border-b border-stone-200 dark:border-stone-800">
                    <TableRow>
                      <TableHead className="w-[180px] font-semibold text-primary dark:text-white px-4 py-3">Role</TableHead>
                      <TableHead className="w-[180px] font-semibold text-primary dark:text-white px-4 py-3">Level</TableHead>
                      <TableHead className="font-semibold text-primary dark:text-white px-4 py-3 whitespace-normal">Responsibilities</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {execRoles.map((role) => (
                      <TableRow key={role.role} className="border-b border-stone-100 dark:border-stone-800/80 hover:bg-stone-50/30 dark:hover:bg-stone-900/20">
                        <TableCell className="w-[180px] font-semibold text-stone-900 dark:text-white px-4 py-3.5 align-top whitespace-normal">
                          {role.role}
                        </TableCell>
                        <TableCell className="w-[180px] px-4 py-3.5 align-top whitespace-normal">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                            {role.level}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3.5 align-top whitespace-normal text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                          {role.description}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Club-Level Leadership */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <HeartHandshake className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-primary dark:text-white">Club-Level Leadership</h3>
              </div>
              <p className="text-sm text-stone-500 leading-relaxed mb-4 text-justify">
                Each of the ten clubs is led by a dedicated student leadership team and backed by a faculty mentor to drive day-to-day operations with excellence.
              </p>

              <Card className="bg-white border-stone-200 dark:border-stone-800 dark:bg-stone-900/30 overflow-hidden shadow-xs">
                <Table className="w-full">
                  <TableHeader className="bg-primary/5 dark:bg-stone-900/50 border-b border-stone-200 dark:border-stone-800">
                    <TableRow>
                      <TableHead className="w-[180px] font-semibold text-primary dark:text-white px-4 py-3">Role</TableHead>
                      <TableHead className="w-[180px] font-semibold text-primary dark:text-white px-4 py-3">Level</TableHead>
                      <TableHead className="font-semibold text-primary dark:text-white px-4 py-3 whitespace-normal">Responsibilities</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clubRoles.map((role) => (
                      <TableRow key={role.role} className="border-b border-stone-100 dark:border-stone-800/80 hover:bg-stone-50/30 dark:hover:bg-stone-900/20">
                        <TableCell className="w-[180px] font-semibold text-stone-900 dark:text-white px-4 py-3.5 align-top whitespace-normal">
                          {role.role}
                        </TableCell>
                        <TableCell className="w-[180px] px-4 py-3.5 align-top whitespace-normal">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold
                            ${role.level === "Faculty Level" ? "bg-primary/10 text-primary" : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300"}`}>
                            {role.level}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3.5 align-top whitespace-normal text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                          {role.description}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Extra Summary Note */}
              <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/20 p-5 mt-6 max-w-3xl">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  <GraduationCap className="h-4.5 w-4.5 text-primary" />
                  Accountability & Structure
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed text-justify">
                  Every single club operates on a rolling <strong className="font-semibold text-gray-900 dark:text-white">3-month action plan</strong> with clearly defined deliverables. Student leaders take full ownership, mentored closely by their designated Faculty Coordinators and reporting up to the Student Executive Committee and DSW.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {galleryImages.length > 0 && (
          <div className="space-y-6 pt-4">
            <SectionHeading
              eyebrow="Gallery"
              title="Creative Spectrum in Action"
              description="Moments from various workshops, club activities, and student performances across Cultural, Technical, and Holistic wings."
            />
            <PhotoGallery images={galleryImages} />
          </div>
        )}

      </section>
    </main>
  );
}
