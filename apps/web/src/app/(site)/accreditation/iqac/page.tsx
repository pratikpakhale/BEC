import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";
import { SectionHeading } from "@/components/common/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pageMetadata } from "@/lib/seo";
import { Target, Award, ShieldCheck, ListChecks, Users, CheckCircle2, Mail } from "lucide-react";

export const metadata = pageMetadata({
  title: "Internal Quality Assurance Cell (IQAC)",
  description:
    "IQAC at BEC Bagalkote drives quality enhancement: Annual Quality Assurance Reports (AQAR), action-taken reports, academic calendars, meeting records and member lists.",
  path: "/accreditation/iqac",
});

const roles = [
  "Evaluates the attainment of vision and mission of the various departments and processes necessary changes for continuous improvement",
  "Monitors the attainment of Vision and Mission of the Institute",
];

const responsibilities = [
  "Development and application of quality benchmarks/parameters for the various academic and administrative activities of the Institute",
  "Monitoring and arrangement of feedback responses from students, parents and other stakeholders on quality-related institutional processes",
  "Generating good academic ideas and practices to work for planning, implementing and measuring the outcome of academic and administrative performance of the institution and developing good quality culture",
  "To guide, facilitate and encourage quality-related programs/activities of the Institute leading to quality improvement",
  "Dissemination of information on the various quality parameters of higher education",
  "Preparation of the Annual Quality Assurance Report (AQAR) based on the quality parameters/assessment criteria developed by the relevant quality assurance body in the prescribed format",
  "Acting as a nodal agency of the Institute for coordinating quality-related activities, including adoption and dissemination of good practices",
];

const compositionGuidelines = [
  "Chairperson: Head of the Institution",
  "Teachers to represent all level (Three to eight)",
  "One member from the Management",
  "Few senior administrative officers",
  "One nominee each from local society, Students and Alumni",
  "One nominee each from Employers/Industrialists/Stakeholders",
  "One of the senior teachers as the coordinator/Director of the IQAC",
];

const iqacCommittee = [
  { slNo: "1", designation: "Principal (Chairperson)", name: "Dr. B. R. Hiremath", affiliation: "Principal, BEC" },
  { slNo: "2", designation: "Five Professors (Faculty nominee)", name: "Dr. S. G. Kambalimath", affiliation: "Dean (CG&P)" },
  { slNo: "", designation: "Five Professors (Faculty nominee)", name: "Dr. V. V. Kuppast", affiliation: "Professor (CAS)" },
  { slNo: "", designation: "Five Professors (Faculty nominee)", name: "Sri. V. P. Girisagar", affiliation: "Associate Professor (CAS)" },
  { slNo: "", designation: "Five Professors (Faculty nominee)", name: "Sri. S. M. Kalagudi", affiliation: "Associate Professor (CAS)" },
  { slNo: "", designation: "Five Professors (Faculty nominee)", name: "Dr. S. M. Jigajinni", affiliation: "Asst. Professor" },
  { slNo: "3", designation: "Member from the Management", name: "Shri. Rajendra M. Tapashetti", affiliation: "B.V.V. Sangha" },
  { slNo: "4", designation: "Administrative Officer", name: "Shri. A. S. Omkar", affiliation: "Administrative Officer, BEC" },
  { slNo: "5", designation: "Nominee — Local Society/Trust", name: "Shri. Rudrappa S. Akkimaradi", affiliation: "Local Society/Trust Nominee" },
  { slNo: "", designation: "Nominee — Students", name: "Miss. Aarati Suryavanshi", affiliation: "2nd Year CSE Student, BEC" },
  { slNo: "", designation: "Nominee — Alumni", name: "Shri. Mahantesh Dodamani", affiliation: "Alumni Nominee" },
  { slNo: "6", designation: "Nominee — Employers", name: "Shri. Samarth Jagali", affiliation: "Viraj Constructions, Vidyagiri, Bagalkote" },
  { slNo: "", designation: "Nominee — Industrialist", name: "Shri. Sachin Sedamkar", affiliation: "MD, Amogh Readymix Concrete, Bagalkote" },
  { slNo: "", designation: "Nominee — Stakeholders", name: "Shri. P. S. Kumbar", affiliation: "Parent (Stakeholder Nominee)" },
  { slNo: "7", designation: "Coordinator", name: "Dr. C. M. Javalagi", affiliation: "Coordinator, IQAC" }
];

const departmentCoordinators = [
  { slNo: "1", name: "Dr. Vilas Naik", department: "Computer Science and Engineering" },
  { slNo: "2", name: "Prof. M. M. Ganganallimath", department: "Mechanical Engineering" },
  { slNo: "3", name: "Prof. Jayasheela Kallaganiger", department: "Artificial Intelligence and Machine Learning" },
  { slNo: "4", name: "Dr. S. M. Parshiyavar", department: "Industrial and Production Engineering" },
  { slNo: "5", name: "Dr. Ajay C. Katageri", department: "Electronics and Communication Engineering" },
  { slNo: "6", name: "Dr. Sharada Patwari", department: "Biotechnology" },
  { slNo: "7", name: "Dr. S. B. Heggonda", department: "Civil Engineering" },
  { slNo: "8", name: "Dr. Sangamesh Goudappanavar", department: "Electrical and Electronics Engineering" },
  { slNo: "9", name: "Prof. S. N. Kugali", department: "Information Science and Engineering" },
  { slNo: "10", name: "Dr. Manjula A. Sutagundar", department: "Electronics and Computer Engineering" },
  { slNo: "11", name: "Dr. R. B. Tapashetti", department: "MBA" },
  { slNo: "12", name: "Prof. Sudha K. S.", department: "MCA" }
];

function initials(name: string): string {
  const cleaned = name.replace(/\b(Prof|Dr|Sri|Smt|Mr|Mrs|Ms)\b\.?/gi, "").trim();
  const parts = cleaned.split(/\s+/).filter((p) => /[a-z]/i.test(p));
  const letters = parts.slice(0, 2).map((p) => p[0]).join("");
  return (letters || name.slice(0, 2)).toUpperCase();
}

function Avatar({ name }: { name: string }) {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

export default function IqacPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Quality Assurance"
        title="Internal Quality Assurance Cell (IQAC)"
        description="The IQAC drives continuous quality enhancement at Basaveshwar Engineering College. Annual Quality Assurance Reports (AQAR), action-taken reports, academic calendars, meeting records and the cell's composition are published below."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <Tabs defaultValue="about" className="w-full space-y-10">
          <TabsList className="bg-stone-100 p-[3px] rounded-lg mb-4 grid grid-cols-3 w-full h-auto md:inline-flex md:h-9 md:w-fit md:items-center md:justify-center overflow-hidden">
            <TabsTrigger value="about" className="px-2 py-2 md:px-6 md:py-1.5 text-xs md:text-sm whitespace-normal md:whitespace-nowrap text-center h-full min-h-9 md:min-h-0 leading-tight md:leading-normal rounded-md data-[state=active]:bg-white data-[state=active]:shadow-xs flex items-center justify-center">
              About IQAC
            </TabsTrigger>
            <TabsTrigger value="members" className="px-2 py-2 md:px-6 md:py-1.5 text-xs md:text-sm whitespace-normal md:whitespace-nowrap text-center h-full min-h-9 md:min-h-0 leading-tight md:leading-normal rounded-md data-[state=active]:bg-white data-[state=active]:shadow-xs flex items-center justify-center">
              Committee & Coordinators
            </TabsTrigger>
            <TabsTrigger value="documents" className="px-2 py-2 md:px-6 md:py-1.5 text-xs md:text-sm whitespace-normal md:whitespace-nowrap text-center h-full min-h-9 md:min-h-0 leading-tight md:leading-normal rounded-md data-[state=active]:bg-white data-[state=active]:shadow-xs flex items-center justify-center">
              Reports & Documents
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: ABOUT IQAC */}
          <TabsContent value="about" className="space-y-12">
            <div className="prose max-w-none space-y-6">
              <SectionHeading
                eyebrow="Quality Sustenance"
                title="Introduction to IQAC"
                description="In pursuance of the action plan to monitor the attainment of Vision and Mission of the Institute, the National Assessment & Accreditation Council proposes that every Institution establish an Internal Quality Assurance Cell (IQAC) as a quality sustenance measure. Recognizing that quality enhancement is an ongoing process, the IQAC is designed to integrate into the institution's system, focusing on achieving continuous improvement in quality. The primary responsibility of the IQAC at Basaveshwar Engineering College (BEC) is to create a system that fosters conscious, consistent, and catalytic advancements in the performance of various departments. The IQAC will play a crucial role in streamlining and guiding BEC's efforts toward academic excellence."
              />
            </div>

            {/* Objectives */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Objectives of the IQAC Committee
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="rounded-sm border-stone-200 bg-white shadow-xs">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-primary">
                      <Target className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base font-semibold text-gray-900">Performance Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-gray-600 text-justify">
                      To develop a quality system for conscious, consistent and catalytic programmed action to improve the academic and administrative performance of BEC Bagalkote.
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-sm border-stone-200 bg-white shadow-xs">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-primary">
                      <Award className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base font-semibold text-gray-900">Quality Enhancement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-gray-600 text-justify">
                      To promote BEC measures for functioning towards quality enhancement through internationalization of quality culture and institutionalization of best practices.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Roles and Responsibilities */}
            <div className="space-y-8 pt-4">
              <SectionHeading title="Roles & Responsibilities" />
              
              <div className="space-y-8">
                {/* Roles */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-stone-100">
                    <ShieldCheck className="h-5 w-5 text-primary" /> Roles
                  </h4>
                  <div className="grid gap-6 md:grid-cols-2">
                    {roles.map((r, i) => (
                      <div key={i} className="flex items-start gap-3 bg-stone-50/50 p-4 rounded-sm border border-stone-200/60">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 leading-relaxed text-justify">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-2 border-b border-stone-100">
                    <ListChecks className="h-5 w-5 text-primary" /> Responsibilities
                  </h4>
                  <ul className="grid gap-4 md:grid-cols-2">
                    {responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 leading-relaxed text-justify">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* NAAC Composition Guidelines */}
            <div className="rounded-sm border border-stone-200 bg-stone-50/50 p-6 space-y-4 mt-6">
              <div className="flex items-center gap-2 text-primary">
                <Users className="h-5 w-5" />
                <h4 className="font-semibold text-gray-900">NAAC Composition Guidelines</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed text-justify">
                As per the National Assessment & Accreditation Council (NAAC) guidelines, the IQAC may be constituted under the Chairmanship of the Head of the Institution, along with heads of key academic and administrative units, senior teachers, representatives of the local management, and external stakeholders.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2 text-sm text-gray-700 pt-2 border-t border-stone-200/60">
                {compositionGuidelines.map((g, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-justify">{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="rounded-sm border border-stone-200 bg-white p-6 shadow-xs">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Contact IQAC</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      For quality-assurance queries, feedback and AQAR-related correspondence.
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:iqacbecbgk23@gmail.com"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                >
                  <Mail className="h-4 w-4" />
                  iqacbecbgk23@gmail.com
                </a>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: MEMBERS */}
          <TabsContent value="members" className="space-y-12">
            {/* Committee Members Table */}
            <div className="space-y-6">
              <SectionHeading
                title="IQAC Committee Members (2025–2027)"
                description="Governing committee constituted for monitoring and guidance of academic and administrative quality systems at BEC."
              />
              <div className="overflow-hidden rounded-sm border border-stone-200 bg-white shadow-xs">
                {/* Desktop view */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-stone-200 bg-primary/5 hover:bg-primary/5">
                        <TableHead className="w-16 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary">Sl. No.</TableHead>
                        <TableHead className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary">Designation / Category</TableHead>
                        <TableHead className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary">Name of the Member</TableHead>
                        <TableHead className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary">Affiliation / Organization</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {iqacCommittee.map((member, i) => (
                        <TableRow key={i} className="border-stone-100 transition-colors hover:bg-stone-50/60">
                          <TableCell className="px-5 py-4 font-medium text-gray-500">{member.slNo}</TableCell>
                          <TableCell className="px-5 py-4 text-sm font-medium text-gray-700">{member.designation}</TableCell>
                          <TableCell className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <Avatar name={member.name} />
                              <span className="font-semibold text-gray-900">{member.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="px-5 py-4 text-sm text-gray-600">{member.affiliation}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile / Tablet view */}
                <ul className="divide-y divide-stone-100 md:hidden">
                  {iqacCommittee.map((member, i) => (
                    <li key={i} className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Sl No Column */}
                        <div className="w-5 flex justify-center shrink-0 pt-2">
                          {member.slNo ? (
                            <span className="text-xs font-semibold text-stone-400 font-mono">
                              {member.slNo.padStart(2, "0")}
                            </span>
                          ) : (
                            <span className="text-xs text-stone-300 select-none">•</span>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-3">
                            <Avatar name={member.name} />
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 leading-snug">{member.name}</p>
                              <p className="text-xs text-gray-500 font-medium leading-normal">{member.designation}</p>
                            </div>
                          </div>
                          
                          <div className="pl-11">
                            <span className="text-stone-400 font-medium text-[10px] uppercase tracking-wider block mb-0.5">Affiliation</span>
                            <p className="text-sm text-gray-600 leading-normal">{member.affiliation}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Department Coordinators Table */}
            <div className="space-y-6">
              <SectionHeading
                title="Department Level IQAC Coordinators"
                description="Coordinators driving academic audits and quality culture implementation across individual engineering, management, and application departments."
              />
              <div className="overflow-hidden rounded-sm border border-stone-200 bg-white shadow-xs">
                {/* Desktop view */}
                <div className="hidden sm:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-stone-200 bg-primary/5 hover:bg-primary/5">
                        <TableHead className="w-20 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary">Sl. No.</TableHead>
                        <TableHead className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary">Name of the Faculty</TableHead>
                        <TableHead className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary">Department</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departmentCoordinators.map((coord, i) => (
                        <TableRow key={i} className="border-stone-100 transition-colors hover:bg-stone-50/60">
                          <TableCell className="px-5 py-4 font-medium text-gray-500">{coord.slNo}</TableCell>
                          <TableCell className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <Avatar name={coord.name} />
                              <span className="font-semibold text-gray-900">{coord.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="px-5 py-4 text-sm font-medium text-gray-700">{coord.department}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile view */}
                <ul className="divide-y divide-stone-100 sm:hidden">
                  {departmentCoordinators.map((coord, i) => (
                    <li key={i} className="p-4">
                      <div className="flex items-center gap-3">
                        {/* Sl No Column */}
                        <div className="w-5 flex justify-center shrink-0">
                          <span className="text-xs font-semibold text-stone-400 font-mono">
                            {coord.slNo.padStart(2, "0")}
                          </span>
                        </div>
                        
                        <Avatar name={coord.name} />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 truncate leading-snug">{coord.name}</p>
                          <p className="text-xs text-stone-500 font-medium leading-normal">{coord.department}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: DOCUMENTS */}
          <TabsContent value="documents" className="space-y-6 mt-0">
            <DocumentDirectory
              groups={documentGroups("iqac", "documents")}
            />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

