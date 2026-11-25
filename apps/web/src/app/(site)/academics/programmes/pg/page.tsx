import { pageMetadata } from "@/lib/seo";
import { ProgrammeHeader } from "@/components/academics/programmes/programme-header";
import { CheckCircle2, GraduationCap, Building2, Wallet, Microscope, type LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import Link from "@/components/link";

export const metadata = pageMetadata({
  title: "M.Tech Postgraduate Programmes",
  description:
    "BEC Bagalkote (College Code T810) offers M.Tech in Structural, Geo-Technical, Environmental and Machine Design, each with 18 seats, admitted via PGCET or GATE.",
  path: "/academics/programmes/pg",
});

const pgData = {
  title: "Post Graduate (M.Tech)",
  description: "Advance your engineering expertise with our specialized M.Tech programmes focusing on research and innovation.",
  highlights: [
      "Research-Oriented Curriculum",
      "Advanced Laboratory Facilities",
      "Industry Collaboration & MoUs",
      "Publication Opportunities",
      "Thesis-Based Programme",
      "Expert Faculty Mentorship",
  ],
  // M.Tech specializations with sanctioned intake per becbgk.edu Admissions (College Code T810).
  disciplines: [
      {
        name: "Structural Engineering",
        parent: "Civil Engineering",
        href: "/departments/pg/structural-engg",
      },
      // {
      //   name: "Geo-Technical Engineering",
      //   parent: "Civil Engineering",
      //   href: "/departments/pg/geo-technical-engg",
      // },
      // {
      //   name: "Environmental Engineering",
      //   parent: "Civil Engineering",
      //   href: "/departments/pg/environmental-engg",
      // },
      // {
      //   name: "Machine Design",
      //   parent: "Mechanical Engineering",
      //   href: "/departments/pg/machine-design",
      // },
  ],
  admission: {
    eligibility: [
        "B.E./B.Tech degree in relevant discipline from a recognized university",
        "Minimum 50% aggregate marks in all semesters/years (45% for SC/ST/Category-I candidates from Karnataka)",
        "Valid GATE/PGCET score as per VTU guidelines",
    ],
    exams: [
        { name: "PGCET", description: "Post Graduate Common Entrance Test" },
        { name: "GATE", description: "Graduate Aptitude Test in Engineering (Preferred)" },
        { name: "Institute Entrance", description: "For Management Quota" },
    ]
  },
  fees: [
      { quota: "Government Quota", type: "Un-Aided", desc: "KEA + VTU + College Fees" },
      { quota: "Management Quota", type: "Unaided", desc: "Mgmt Fees + VTU + College Fees" },
  ]
};

function SectionHeader({ icon: Icon, title }: { icon: LucideIcon, title: string }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
        </div>
    )
}

export default function PGProgrammePage() {
  return (
    <div className="space-y-16">
      <BreadcrumbsJsonLd
        items={[
          { name: "Academics", path: "/academics/programmes/pg" },
          { name: "PG Programmes", path: "/academics/programmes/pg" },
        ]}
      />
      <ProgrammeHeader
        title={pgData.title}
        description={pgData.description}
      />

      {/* Overview & Highlights */}
      <section className="space-y-8">
        <div className="prose prose-lg prose-orange max-w-none text-gray-600">
            <p className="text-justify">
                Our M.Tech programmes offer advanced specialization across Civil and Mechanical Engineering, with a strong emphasis on research, laboratory work and a thesis. The college has also introduced an M.Tech in Defence Technology in association with DRDO.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
            {pgData.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium text-gray-700">{item}</span>
                </div>
            ))}
        </div>
      </section>

      {/* Disciplines Grid */}
      <section>
          <SectionHeader icon={GraduationCap} title="Specializations Offered" />
          <div className="grid md:grid-cols-2 gap-4">
              {pgData.disciplines.map((dept, idx) => (
                  <FadeIn key={idx} delay={idx * 0.05}>
                    <Link
                      href={dept.href}
                      className="p-5 rounded-lg bg-orange-50/50 border border-orange-100 text-gray-800 font-medium hover:bg-white hover:shadow-md transition-all duration-300 flex items-center gap-3"
                    >
                        <Microscope className="w-5 h-5 text-primary/60 shrink-0" />
                        <span className="flex flex-col">
                          <span>{dept.name}</span>
                          <span className="text-xs font-normal text-gray-500">{dept.parent} · 18 seats</span>
                        </span>
                    </Link>
                  </FadeIn>
              ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
              College Code — T810 (Un-Aided). Each M.Tech specialization has a sanctioned intake of 18 seats, admitted via PGCET / GATE or the college entrance test.
          </p>
      </section>

      {/* Admission */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <SectionHeader icon={Building2} title="Admission Process" />
          
          <div className="space-y-8">
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Eligibility Criteria</h3>
                <ul className="space-y-3">
                    {pgData.admission.eligibility.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Entrance Examinations</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                    {pgData.admission.exams.map((exam, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                            <div className="font-bold text-primary mb-1">{exam.name}</div>
                            <div className="text-xs text-gray-500">{exam.description}</div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
      </section>

      {/* Fees */}
      <section>
          <SectionHeader icon={Wallet} title="Fee Structure Overview" />
          <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm text-left">
                  <thead className="bg-primary/5 text-primary font-semibold border-b border-gray-200">
                      <tr>
                          <th className="px-6 py-4">Quota</th>
                          <th className="px-6 py-4">Type</th>
                          <th className="px-6 py-4">Details</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                      {pgData.fees.map((fee, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/50">
                              <td className="px-6 py-4 font-medium text-gray-900">{fee.quota}</td>
                              <td className="px-6 py-4 text-gray-600">{fee.type}</td>
                              <td className="px-6 py-4 text-gray-600">{fee.desc}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </section>
    </div>
  );
}
