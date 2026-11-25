import Link from "@/components/link";
import { Phone, Mail, MapPin, Plane, Train, ArrowUpRight, ExternalLink } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { AdmissionsHeader } from "@/components/admissions/admissions-header";
import { CollegeCodes, ManagementQuotaContact, SectionHeader } from "@/components/admissions/sections";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { ADMISSION_INQUIRY_URL } from "@/data/admissions";

export const metadata = pageMetadata({
  title: "Admissions Contact",
  description:
    "Contact the BEC Bagalkote Admission Section and B.V.V. Sangha Central Office for admission enquiries and management-quota seats — phone, email and how to reach the campus.",
  path: "/admissions/contact",
});

const officials = [
  { name: "Dr. B. R. Hiremath", role: "Principal", phone: "94489 39700", email: "becprincipal@yahoo.com" },
  { name: "Dr. P. N. Kulkarni", role: "Dean, Academic", email: "pnk_bewoor@yahoo.com" },
  { name: "Prof. B. S. Haravi", role: "Development Officer", email: "" }, // do@becbgk.edu — TODO: restore official email
];

const reachUs = {
  flight: [
    "122 km — Hubballi Airport (HBX), Hubballi, Karnataka",
    "130 km — Sambra Airport (IXG), Belagavi, Karnataka",
    "267 km — Goa International Airport (GOI), Dabolim, Goa",
  ],
  train: ["5 km — Bagalkot (BGK) Railway Station"],
};

export default function AdmissionsContactPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Admissions", path: "/admissions" },
          { name: "Contact", path: "/admissions/contact" },
        ]}
      />
      <AdmissionsHeader
        eyebrow="Admissions"
        title="Admission Enquiries"
        description="Reach the Admission Section, the B.V.V. Sangha Central Office, or submit an inquiry online. For the complete institute directory, visit our Contact page."
      />

      <div className="space-y-16">
        {/* College codes — top-of-page quick reference */}
        <CollegeCodes />

        {/* Online inquiry + primary line */}
        <section className="rounded-2xl bg-linear-to-br from-primary to-orange-600 p-8 text-white shadow-lg shadow-orange-200/50">
          <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Online Admission Inquiry</h2>
              <p className="mt-2 text-white/90 max-w-xl leading-relaxed">
                Submit your details through the BEC Admission Inquiry portal and the Admission
                Section will get in touch with you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={ADMISSION_INQUIRY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-primary hover:bg-orange-50 transition-colors"
              >
                Open Inquiry Portal
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="tel:9902684833"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                9902684833
              </a>
            </div>
          </div>
        </section>

        {/* Central Office + Admission Section */}
        <ManagementQuotaContact />

        {/* Key officials */}
        <section>
          <SectionHeader icon={Mail} title="Admission Office Contacts" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {officials.map((person) => (
              <div key={person.name} className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
                <p className="font-bold text-gray-900">{person.name}</p>
                <p className="text-sm text-primary font-medium">{person.role}</p>
                <div className="mt-3 space-y-1.5">
                  {person.phone && (
                    <a
                      href={`tel:${person.phone.replace(/[^+\d]/g, "")}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      {person.phone}
                    </a>
                  )}
                  {person.email && (
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors break-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    {person.email}
                  </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reach us */}
        <section>
          <SectionHeader icon={MapPin} title="Reach the Campus" />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Plane className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-gray-900">By Flight</h3>
              </div>
              <ul className="space-y-2.5">
                {reachUs.flight.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Train className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-gray-900">By Train</h3>
              </div>
              <ul className="space-y-2.5">
                {reachUs.train.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href="/institute/contact"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            View full institute contact directory & campus map
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </section>
      </div>
    </>
  );
}
