import {
  CheckCircle2,
  Wallet,
  Building2,
  FileText,
  ExternalLink,
  ArrowUpRight,
  ClipboardList,
  Phone,
  Hash,
  type LucideIcon,
} from "lucide-react";
import Link from "@/components/link";
import { asset } from "@/lib/assets";
import {
  ADMISSION_INQUIRY_URL,
  ADMISSION_RELATED_LINKS,
  COLLEGE_CODES,
  MANAGEMENT_QUOTA_CONTACT,
  type AdmissionProgramme,
  type EntranceExam,
  type FeeLine,
  type FeeDocument,
  type IntakeTable,
} from "@/data/admissions";

export function SectionHeader({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
    </div>
  );
}

export function CollegeCodes() {
  const pills = [
    ...COLLEGE_CODES.cet.map((item) => ({ label: `CET · ${item.label}`, code: item.code })),
    ...COLLEGE_CODES.other.map((item) => ({ label: item.label, code: item.code })),
  ];

  return (
    <section className="rounded-2xl border border-orange-100 bg-linear-to-br from-orange-50 to-white p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Hash className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 leading-tight">College Codes</p>
            <p className="text-xs text-gray-500">CET · COMED-K · Programme</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {pills.map((pill) => (
            <span
              key={pill.code}
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-orange-100 px-3 py-1.5 text-xs shadow-xs"
            >
              <span className="text-gray-500">{pill.label}</span>
              <span className="font-mono font-bold text-gray-900">{pill.code}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EligibilityList({ items, note }: { items: string[]; note?: string }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Eligibility Criteria</h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      {note && <p className="text-xs text-gray-500 mt-4">{note}</p>}
    </div>
  );
}

export function EntranceExams({ exams, note }: { exams: EntranceExam[]; note?: string }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Entrance Examinations</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {exams.map((exam) => (
          <div key={exam.name} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
            <div className="font-bold text-primary mb-1">{exam.name}</div>
            <div className="text-xs text-gray-500">{exam.description}</div>
          </div>
        ))}
      </div>
      {note && <p className="text-xs text-gray-500 mt-4">{note}</p>}
    </div>
  );
}

export function FeeStructure({
  year,
  lines,
  note,
  documents,
}: {
  year?: string;
  lines: FeeLine[];
  note?: string;
  documents?: FeeDocument[];
}) {
  return (
    <section>
      <SectionHeader icon={Wallet} title={`Fee Structure${year ? ` — ${year}` : ""}`} />
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-primary/5 text-primary font-semibold border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Quota</th>
              <th className="px-6 py-4">Courses</th>
              <th className="px-6 py-4">Payable</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 align-top">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{line.quota}</td>
                <td className="px-6 py-4 text-gray-600">{line.courses}</td>
                <td className="px-6 py-4 text-gray-600">{line.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="text-xs text-gray-500 mt-4">{note}</p>}

      {documents && documents.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {documents.map((doc) => (
            <a
              key={doc.title}
              href={asset(doc.key)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl shadow-xs hover:border-primary/40 hover:shadow-sm transition-all group"
            >
              <div className="p-2.5 bg-primary/10 text-primary rounded-lg shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm group-hover:text-primary transition-colors">
                  {doc.title}
                </p>
                <p className="text-xs text-gray-500">{doc.desc}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 ml-auto shrink-0" />
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export function IntakeTables({ tables }: { tables: IntakeTable[] }) {
  return (
    <section>
      <SectionHeader icon={Building2} title="Sanctioned Intake" />
      <div className="space-y-8">
        {tables.map((table) => (
          <div key={table.title}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <h3 className="text-base font-bold text-gray-900">{table.title}</h3>
              {table.code && (
                <span className="text-xs font-semibold text-primary bg-primary/5 border border-primary/10 rounded-full px-3 py-1">
                  {table.code}
                </span>
              )}
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 w-16">Sl. No.</th>
                    <th className="px-6 py-3">Branch</th>
                    <th className="px-6 py-3 text-right w-24">Intake</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {table.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="px-6 py-3 text-gray-500">{idx + 1}</td>
                      <td className="px-6 py-3">
                        <span className="font-medium text-gray-900">{row.branch}</span>
                        {row.department && (
                          <span className="block text-xs text-gray-500">{row.department}</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-right font-semibold text-gray-900">{row.intake}</td>
                    </tr>
                  ))}
                  <tr className="bg-primary/5 border-t border-gray-200">
                    <td className="px-6 py-3" />
                    <td className="px-6 py-3 font-bold text-primary">Total</td>
                    <td className="px-6 py-3 text-right font-bold text-primary">{table.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DocumentChecklist({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
        <ClipboardList className="w-4 h-4 text-primary" />
        {title}
      </h3>
      <ul className="space-y-2.5">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ManagementQuotaContact() {
  const offices = [MANAGEMENT_QUOTA_CONTACT.centralOffice, MANAGEMENT_QUOTA_CONTACT.admissionSection];
  return (
    <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <SectionHeader icon={Phone} title="Contact for Management Quota Seats" />
      <div className="grid sm:grid-cols-2 gap-4">
        {offices.map((office) => {
          const contacts =
            "contacts" in office
              ? office.contacts
              : office.phones.map((phone) => ({ name: null, phone }));
          return (
            <div key={office.name} className="rounded-xl border border-gray-200 bg-gray-50/60 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                {office.name}
              </p>
              <p className="font-semibold text-gray-900">{office.org}</p>
              <p className="text-sm text-gray-600 mt-1">{office.address}</p>
              <div className="mt-3 space-y-1">
                {contacts.map((contact) => (
                  <a
                    key={contact.phone}
                    href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    {contact.name ? (
                      <span>
                        <span className="font-semibold text-gray-900">{contact.name}</span>
                        <span className="text-gray-500"> · {contact.phone}</span>
                      </span>
                    ) : (
                      contact.phone
                    )}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ApplyCallout() {
  return (
    <section className="rounded-2xl bg-linear-to-br from-primary to-orange-600 p-8 text-white shadow-lg shadow-orange-200/50">
      <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Ready to apply?</h2>
          <p className="mt-2 text-white/90 max-w-xl leading-relaxed">
            Submit an admission inquiry online, or reach the Admission Section directly for
            counselling and management-quota seats.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href={ADMISSION_INQUIRY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-primary hover:bg-orange-50 transition-colors"
          >
            Admission Inquiry
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
  );
}

export function RelatedLinks() {
  return (
    <section>
      <SectionHeader icon={FileText} title="Related Admission Information" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ADMISSION_RELATED_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-start gap-3 p-5 bg-white border border-gray-200 rounded-xl shadow-xs hover:border-primary/40 hover:shadow-sm transition-all group"
          >
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors flex items-center gap-1.5">
                {link.title}
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary" />
              </p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{link.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Full admission-detail body shared by every programme page. */
export function AdmissionDetail({ programme }: { programme: AdmissionProgramme }) {
  const isResearch = programme.slug === "phd";

  return (
    <div className="space-y-16">
      {/* College codes — top-of-page quick reference */}
      <CollegeCodes />

      {/* Overview */}
      <section className="space-y-8">
        <div className="prose prose-lg prose-orange max-w-none text-gray-600">
          <p className="text-justify">{programme.intro}</p>
        </div>
      </section>

      {/* Research centres (PhD only) */}
      {isResearch && programme.researchDepartments && (
        <section>
          <SectionHeader icon={Building2} title="Recognized Research Centres" />
          <div className="grid sm:grid-cols-2 gap-4">
            {programme.researchDepartments.map((dept) => (
              <div
                key={dept}
                className="p-4 rounded-lg bg-orange-50/50 border border-orange-100 text-gray-800 font-medium flex items-center gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                {dept}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Eligibility + entrance */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <SectionHeader icon={Building2} title="Admission Details" />
        <div className="space-y-8">
          <EligibilityList items={programme.eligibility} />
          {programme.entranceExams && (
            <EntranceExams exams={programme.entranceExams} note={programme.entranceNote} />
          )}
        </div>
      </section>

      {/* Fee structure */}
      {programme.feeLines && (
        <FeeStructure
          year={programme.feeYear}
          lines={programme.feeLines}
          note={programme.feeNote}
          documents={programme.feeDocuments}
        />
      )}

      {/* Intake */}
      {programme.intakeTables && <IntakeTables tables={programme.intakeTables} />}

      {/* Application procedure (PhD) */}
      {programme.applicationProcess && (
        <section>
          <SectionHeader icon={FileText} title="Application Procedure" />
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-sm text-gray-700 mb-6">
            <p className="text-justify">
              <strong>How to Apply:</strong> {programme.applicationProcess}
            </p>
          </div>
          {(programme.registrationDocs || programme.admissionDocs) && (
            <div className="grid md:grid-cols-2 gap-4">
              {programme.registrationDocs && (
                <DocumentChecklist title="Documents for Registration" items={programme.registrationDocs} />
              )}
              {programme.admissionDocs && (
                <DocumentChecklist title="Documents for Admission" items={programme.admissionDocs} />
              )}
            </div>
          )}
        </section>
      )}

      {/* Management-quota contact — not applicable to VTU-administered research */}
      {!isResearch && <ManagementQuotaContact />}

      <ApplyCallout />
      <RelatedLinks />
    </div>
  );
}
