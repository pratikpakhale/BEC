import { pageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { asset } from "@/lib/assets";
import {
  Download,
  Mail,
  IndianRupee,
  FileCheck2,
  Landmark,
} from "lucide-react";
import Link from "@/components/link";

export const metadata = pageMetadata({
  title: "Academic Document Verification",
  description:
    "Academic document verification at BEC Bagalkote for Autonomous-scheme students (2007-08 onwards) — required details, fee, bank details and verification form for agencies.",
  path: "/academics/examinations/verification",
});

const requiredInfo = [
  "Name of the agency",
  "Agency address",
  "Email",
  "Contact number",
  "Name of the student",
  "University Seat Number (USN)",
  "Programme (BE / M.Tech / MCA / MBA)",
  "Month & year of passing",
];

const documentsToAttach = [
  "PDC or Degree Certificate or final-semester Grade Card",
  "E-payment details — transaction number and payment date",
];

const bankDetails = [
  { label: "Bank Name", value: "Bank of Baroda" },
  { label: "Branch", value: "Bagalkote" },
  { label: "Account Holder", value: "Principal, BEC, Bagalkote" },
  { label: "Account Number", value: "37550100011552" },
  { label: "IFSC Code", value: "BARB0BAGALK (5th character is zero)" },
];

export default function VerificationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">
          Academic Verification
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed text-justify">
          Academic document verification for Autonomous-scheme students, for
          Government departments, verification agencies and academic
          institutions.
        </p>
      </div>

      <div className="rounded-xl bg-amber-50 border border-amber-200 px-5 py-4 text-sm text-amber-900">
        Verification is available only for students admitted to 1<sup>st</sup>{" "}
        year (BE / M.Tech / MCA / MBA) from the academic year{" "}
        <strong>2007-08</strong> onwards.
      </div>

      <section className="grid md:grid-cols-2 gap-6">
        <FadeIn>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Information to Provide
              </h2>
            </div>
            <ul className="space-y-2.5">
              {requiredInfo.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-gray-600"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Download className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Documents to Attach
              </h2>
            </div>
            <ul className="space-y-2.5 mb-6">
              {documentsToAttach.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-gray-600"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={asset("documents/exam/academic-verification-n.docx")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-4 py-3 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all font-medium text-sm"
            >
              <Download className="w-4 h-4" />
              Download Verification Form
            </Link>
          </div>
        </FadeIn>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <FadeIn>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Fee & Submission
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-semibold text-gray-900">Rs. 500/-</span> per
              student, payable via NEFT / RTGS.
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Send the completed information and document copies to:
            </p>
            <div className="space-y-2">
              {["becprincipal@yahoo.com", "beccoe2007@gmail.com"].map(
                (email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:underline break-all"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    {email}
                  </a>
                ),
              )}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Landmark className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Bank Details (NEFT / RTGS)
              </h2>
            </div>
            <dl className="space-y-2.5">
              {bankDetails.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col sm:flex-row sm:justify-between gap-0.5 text-sm"
                >
                  <dt className="text-gray-500">{row.label}</dt>
                  <dd className="font-medium text-gray-900 sm:text-right">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
