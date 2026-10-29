import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PersonCard, PersonGrid } from "@/components/common/person-card";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";
import { asset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { Trees, Warehouse, Medal } from "lucide-react";

export const metadata = pageMetadata({
  title: "Sports & College Gymkhana",
  description:
    "The BEC College Gymkhana — a 5-acre playground and indoor stadium under a full-time Physical Director. Two VTU state titles in 2024-25 (women's handball, men's cricket), 14 VTU Blues across 2024-27, and year-round sports and cultural activities.",
  path: "/student-life/gymkhana",
});

const facilities = [
  {
    icon: Trees,
    title: "5-Acre Outdoor Playground",
    description:
      "Grounds for Athletics, Cricket, Hockey, Football, Tennis, Volleyball and Basketball.",
  },
  {
    icon: Warehouse,
    title: "Indoor Stadium",
    description:
      "Three shuttle-badminton courts plus table tennis, chess and carrom for indoor games.",
  },
];

const officeBearers = [
  {
    name: "Dr. Kirankumar B. Balavalad",
    photo: asset("student-life/gymkhana/kbb.webp"),
    description: "Assistant Professor, Electronics & Communication Engg.",
    badges: [{ label: "Gymkhana Secretary", tone: "primary" as const }],
  },
  {
    name: "Dr. Manjula A. Sutagundar",
    photo: asset("student-life/gymkhana/ms.webp"),
    description: "Assistant Professor, Electronics & Computer Science Engg.",
    badges: [{ label: "Cultural Secretary", tone: "primary" as const }],
  },
  {
    name: "Shri. Ganesh Kori",
    photo: asset("student-life/gymkhana/ganesh.webp"),
    description: "Physical Director, Basaveshwar Engineering College",
    badges: [{ label: "Sports In-charge", tone: "primary" as const }],
  },
];

const summaryStats = [
  { value: "2", label: "VTU State titles", sub: "2024-25 · Handball & Cricket" },
  { value: "9", label: "VTU zone titles", sub: "Across 2024–26 seasons" },
  { value: "14", label: "VTU Blues selections", sub: "2024-25 to 2026-27" },
];

type SportsResult = {
  sport: string;
  team: "Men" | "Women";
  result: string;
  host?: string;
  date?: string;
};

const sportsSeasons: { year: string; results: SportsResult[] }[] = [
  {
    year: "2024-25",
    results: [
      { sport: "Kho-Kho", team: "Men", result: "Kalburgi Division Winners", host: "BKIT, Bellary", date: "5 Oct 2024" },
      { sport: "Cricket", team: "Men", result: "Zonal Runners-up", host: "Kalburgi Division" },
      { sport: "Handball", team: "Women", result: "VTU Zonal Champions", host: "BEC, Bagalkote", date: "5 Dec 2024" },
      { sport: "Handball", team: "Women", result: "VTU State Champions", host: "BEC, Bagalkote", date: "5 Dec 2024" },
      { sport: "Cricket", team: "Men", result: "VTU State Champions", host: "RYMCE, Bellary" },
      { sport: "Volleyball", team: "Men", result: "VTU Zonal Champions", host: "BKIT, Basavakalyana", date: "22–24 Apr 2025" },
      { sport: "Kho-Kho", team: "Men", result: "VTU Zonal Champions", host: "RYMCE, Bellary", date: "28–29 Apr 2025" },
      { sport: "Hockey", team: "Men", result: "Kalburgi Zone Winners", host: "BITM, Bellary", date: "13 May 2025" },
      { sport: "Hockey", team: "Men", result: "VTU State Runners-up", host: "BITM, Bellary", date: "14–16 May 2025" },
      { sport: "Handball", team: "Men", result: "Kalburgi Zone Winners", host: "BITM, Bellary", date: "21–22 May 2025" },
    ],
  },
  {
    year: "2025-26 & 2026-27",
    results: [
      { sport: "Shuttle Badminton", team: "Men", result: "Kalburgi Zone Runners-up", host: "BLECET, Vijayapura", date: "8–9 Sep 2025" },
      { sport: "Shuttle Badminton", team: "Women", result: "Participated", host: "BLECET, Vijayapura", date: "8–9 Sep 2025" },
      { sport: "Table Tennis", team: "Men", result: "Kalburgi Zone Winners", host: "Basavakalyana Engg. College", date: "15–16 Sep 2025" },
      { sport: "Table Tennis", team: "Women", result: "Kalburgi Zone Winners", host: "Basavakalyana Engg. College", date: "15–16 Sep 2025" },
      { sport: "Basketball", team: "Men", result: "Kalburgi Zone Winners", host: "BEC, Bagalkote", date: "14–15 Dec 2025" },
      { sport: "Basketball", team: "Men", result: "Participated", host: "BEC, Bagalkote", date: "16–17 Dec 2025" },
      { sport: "Handball", team: "Women", result: "VTU State Runners-up", host: "SIT, Mysore", date: "20–23 Dec 2025" },
      { sport: "Cricket", team: "Men", result: "VTU Zonal Runners-up", host: "RYMCE, Bellary", date: "Apr 2026" },
      { sport: "Hockey", team: "Men", result: "VTU Zonal Runners-up", host: "BITM, Bellary", date: "5–6 Apr 2026" },
    ],
  },
];

function resultTone(result: string): string {
  const r = result.toLowerCase();
  if (r.includes("state champ")) return "bg-emerald-600 text-white";
  if (r.includes("champ") || r.includes("winner")) return "bg-primary text-white";
  if (r.includes("runner")) return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  return "bg-stone-100 text-gray-500";
}

const earlierHonours = [
  "National Bronze — Wushu Championship, Mohali (2020-21)",
  "State-Level Champions — Men's Hockey, VTU Inter-Zonal (2021-22 & 2022-23)",
  "State Silver — Taekwondo, Men, SIT Tumkur (2023-24)",
  "7 medals & 5 trophies — VTU Zonal inter-collegiate tournament (2018-19)",
];

type BluePlayer = { name: string; dept: string; sport: string };

const vtuBlues: { year: string; players: BluePlayer[] }[] = [
  {
    year: "2024-25",
    players: [
      { name: "Ms. Sahana Mungarwadi", dept: "CSE", sport: "Handball" },
      { name: "Ms. Snehal Bagade", dept: "CSE", sport: "Handball" },
      { name: "Ms. Madhu Jainar", dept: "CSE", sport: "Handball" },
      { name: "Ms. Priya Badagi", dept: "ECE", sport: "Handball" },
      { name: "Ms. Aishwarya Patil", dept: "EEE", sport: "Handball" },
      { name: "Ms. Ganga Bilagi", dept: "MCA", sport: "Handball" },
    ],
  },
  {
    year: "2025-26",
    players: [
      { name: "Mr. Harish Kuri", dept: "EEE", sport: "Hockey" },
      { name: "Mr. Dharshan Shinde", dept: "ME", sport: "Hockey" },
      { name: "Mr. Prajwal Siggavi", dept: "EEE", sport: "Hockey" },
      { name: "Ms. Priya", dept: "ECE", sport: "Handball" },
      { name: "Ms. Aishwini", dept: "ECS", sport: "Handball" },
    ],
  },
  {
    year: "2026-27",
    players: [
      { name: "Mr. Huchesh Bugati", dept: "ME", sport: "Hockey" },
      { name: "Mr. Dharshan Shinde", dept: "ME", sport: "Hockey" },
      { name: "Mr. Prateek Biradar", dept: "ME", sport: "Hockey" },
    ],
  },
];

const culturalActivities: {
  year: string;
  items: { date: string; title: string; detail: string }[];
}[] = [
  {
    year: "2024-25",
    items: [
      { date: "15 Aug 2024", title: "Independence Day", detail: "Flag hoisting led by then-Principal Dr. Veena S. Soragavi." },
      { date: "5 Sep 2024", title: "Teachers' Day", detail: "Function in the college Boardroom, presided over by Principal Dr. B. R. Hiremath." },
      { date: "21 Sep 2024", title: "Cultural Events — NCON-2024", detail: "Cultural programmes on the eve of the IEEE conference NCON-2024." },
      { date: "2 Oct 2024", title: "Gandhi & Shastri Jayanti", detail: "Floral tribute function in the MBA Seminar Hall." },
      { date: "2 Oct 2024", title: "Bio-Diesel Day", detail: "Bio-diesel filled to college vehicles to promote its use." },
      { date: "17 Oct 2024", title: "Maharshi Valmiki Jayanti", detail: "Floral tribute in the College Gallery Hall." },
      { date: "1 Nov 2024", title: "Kannada Rajyotsava", detail: "Floral offering ceremony in the Principal's chamber." },
      { date: "11–15 Nov 2024", title: "Rajyotsava Competitions", detail: "Pencil sketch, folk dance, Janapada Geete, quiz and essay-writing contests." },
      { date: "18 Nov 2024", title: "Kanakadasa Jayanti", detail: "Floral tribute in the Principal's chamber." },
      { date: "12 Dec 2024", title: "Faculty Sports Week", detail: "A week of carrom, badminton, chess and table-tennis for faculty." },
      { date: "26 Jan 2025", title: "Republic Day", detail: "Flag hoisting and address by Principal Dr. B. R. Hiremath." },
      { date: "21 Jun 2025", title: "International Yoga Day", detail: "Yoga session by Vivekananda Yoga Vignyana Kendra, Bagalkote — around 2,500 participants." },
    ],
  },
  {
    year: "2025-26 & 2026-27",
    items: [
      { date: "11–12 Oct 2025", title: "Badminton Tournament", detail: "Held for students and staff across all departments of the college." },
      { date: "27–31 Oct 2025", title: "Kalarav 2025", detail: "Karnataka Rajyotsava festival — drawing, essay-writing, quiz, poetry, skit, group & solo dance and singing." },
    ],
  },
];

const galleryImages = [
  {
    src: asset("student-life/sports/cine0043.webp"),
    alt: "A BEC player leaps for an overhead smash during badminton in the indoor stadium",
  },
  {
    src: asset("student-life/sports/cine0118.webp"),
    alt: "A BEC student plays a forehand return during a table tennis rally",
  },
  {
    src: asset("gallery/gymkhana/1.webp"),
    alt: "Cricket teams gather for the opening ceremony of an inter-collegiate tournament at BEC",
  },
  {
    src: asset("student-life/sports/cine0146.webp"),
    alt: "BEC basketball players drive the ball on the outdoor court",
  },
  {
    src: asset("student-life/sports/cine0053.webp"),
    alt: "A doubles badminton rally at the net in the BEC indoor stadium",
  },
  {
    src: asset("gallery/gymkhana/4.webp"),
    alt: "The BEC women's volleyball team celebrates a win on the court",
  },
  {
    src: asset("student-life/sports/cine0122.webp"),
    alt: "A BEC student serves during a table tennis match",
  },
  {
    src: asset("student-life/sports/cine0074.webp"),
    alt: "A BEC student executes a jump smash during badminton practice",
  },
  {
    src: asset("gallery/gymkhana/8.webp"),
    alt: "Students perform Surya Namaskar at an outdoor yoga session on campus",
  },
  {
    src: asset("gallery/gymkhana/6.webp"),
    alt: "The BEC archery team with their target and championship trophy",
  },
  {
    src: asset("gallery/gymkhana/5.webp"),
    alt: "A BEC badminton team with their winners' trophy in the indoor court",
  },
  {
    src: asset("student-life/sports/cine0139.webp"),
    alt: "BEC sports teams and coaches with their trophies outside the gymkhana",
  },
  {
    src: asset("gallery/gymkhana/7.webp"),
    alt: "Students at a sports orientation session in the BEC indoor stadium",
  },
  {
    src: asset("student-life/sports/cine0090.webp"),
    alt: "VTU inter-collegiate trophies won by Basaveshwar Engineering College",
  },
  {
    src: asset("gallery/gymkhana/3.webp"),
    alt: "A display of sports trophies and shields won by BEC teams in the college foyer",
  },
];

export default function GymkhanaPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Sports & Games"
        title="Sports & College Gymkhana"
        description="The Gymkhana is the college's student sports and cultural body, working for the overall development of students through sport — instilling discipline, team spirit and sportsmanship under a full-time Physical Director."
        badges={[
          { label: "5-Acre Playground" },
          { label: "Indoor Stadium", tone: "outline" },
        ]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="space-y-4">
          <SectionHeading eyebrow="About" title="Sport for overall development" />
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-gray-700">
            <p className="text-justify">
              Sports play an integral part in moulding and refining the character of
              a student. The college has excellent infrastructure for developing
              sporting skills — a 5-acre outdoor playground and an indoor stadium —
              and a full-time Physical Director who works for the physical fitness of
              students and the conduct of sports activities.
            </p>
            <p className="text-justify">
              The Gymkhana aims at the overall development of students through its
              various sports and cultural programmes, inculcating discipline, team
              spirit, teamwork, co-operation, sportsmanship and tolerance, while
              offering recreational activities to help students refresh and relax.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {facilities.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="flex h-full flex-col rounded-md border border-stone-200 bg-white p-6 shadow-sm"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-orange-50 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.description}</p>
              </div>
            );
          })}
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="The Gymkhana" title="Office-Bearers" />
          <PersonGrid>
            {officeBearers.map((o) => (
              <PersonCard
                key={o.name}
                name={o.name}
                photo={o.photo}
                description={o.description}
                badges={o.badges}
              />
            ))}
          </PersonGrid>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {summaryStats.map((s) => (
            <div
              key={s.label}
              className="rounded-md border border-stone-200 bg-white p-6 text-center shadow-sm"
            >
              <div className="text-4xl font-bold text-primary">{s.value}</div>
              <div className="mt-2 text-sm font-semibold text-gray-900">{s.label}</div>
              <div className="mt-1 text-xs text-gray-500">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="space-y-10">
          <SectionHeading
            eyebrow="On the Podium"
            title="VTU Tournament Results"
            description="BEC teams compete at the VTU Kalburgi zone, division and state levels across a wide range of sports each season."
          />
          {sportsSeasons.map((season) => (
            <div key={season.year} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Season {season.year}
              </h3>
              <div className="overflow-x-auto rounded-md border border-stone-200 shadow-sm">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="border-b border-stone-200 bg-stone-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="px-5 py-3">Sport</th>
                      <th className="px-5 py-3">Team</th>
                      <th className="px-5 py-3">Result</th>
                      <th className="px-5 py-3">Host &amp; Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 bg-white">
                    {season.results.map((r, i) => (
                      <tr key={`${r.sport}-${r.result}-${i}`} className="hover:bg-stone-50/60">
                        <td className="px-5 py-3 font-medium text-gray-900">{r.sport}</td>
                        <td className="px-5 py-3 text-gray-600">{r.team}</td>
                        <td className="px-5 py-3">
                          <span
                            className={cn(
                              "inline-flex rounded-sm px-2 py-0.5 text-xs font-medium",
                              resultTone(r.result),
                            )}
                          >
                            {r.result}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-gray-600">
                          {r.host ? <span className="text-gray-800">{r.host}</span> : null}
                          {r.date ? (
                            <span className="block text-xs text-gray-400">{r.date}</span>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="Selections" title="VTU Blues" />
          <p className="max-w-3xl text-sm leading-relaxed text-gray-600 text-justify">
            The VTU Blues honour recognises students selected to represent
            Visvesvaraya Technological University at the inter-university level.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {vtuBlues.map((group) => (
              <div
                key={group.year}
                className="rounded-md border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-semibold text-gray-900">{group.year}</h3>
                  <span className="text-xs font-semibold text-secondary">
                    {group.players.length} selected
                  </span>
                </div>
                <ul className="mt-4 space-y-3">
                  {group.players.map((p) => (
                    <li key={`${group.year}-${p.name}`} className="text-sm leading-snug">
                      <span className="font-medium text-gray-900">{p.name}</span>
                      <span className="block text-xs text-gray-500">
                        {p.dept} · {p.sport}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-stone-200 bg-orange-50/60 p-6 md:p-8">
          <div className="flex items-center gap-2">
            <Medal className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">Earlier Honours</h3>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {earlierHonours.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Beyond the Field"
            title="Cultural & Campus Activities"
            description="Under its Cultural Secretary, the Gymkhana organises national days, jayanti celebrations, festivals and inter-department competitions through the year."
          />
          <div className="space-y-8">
            {culturalActivities.map((group) => (
              <div key={group.year} className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                  {group.year}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={`${group.year}-${item.title}-${item.date}`}
                      className="flex flex-col gap-1 rounded-md border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-baseline sm:gap-4"
                    >
                      <span className="shrink-0 text-xs font-semibold text-primary sm:w-32">
                        {item.date}
                      </span>
                      <span className="min-w-0">
                        <span className="text-sm font-semibold text-gray-900">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-gray-600">
                          {item.detail}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {galleryImages.length > 0 && (
          <div className="space-y-8">
            <SectionHeading eyebrow="Gallery" title="On the Field" />
            <PhotoGallery images={galleryImages} />
          </div>
        )}

        <div className="space-y-8">
          <SectionHeading eyebrow="Records" title="Annual Reports" />
          <DocumentDirectory
            groups={documentGroups("gymkhana", "documents")}
          />
        </div>
      </section>
    </main>
  );
}
