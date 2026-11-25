import type { Metadata } from "next";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "@/components/link";

import { Card, CardContent } from "@/components/ui/card";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About B.V.V. Sangha",
  description:
    "B.V.V. Sangha, Bagalkote — founded 1906, the century-old parent body of BEC Bagalkote runs 190+ institutes, serving 53,000+ students on the philosophy of Work is Worship.",
  path: "/institute/about-sangha",
});

export default function AboutSanghaPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50 py-14 md:py-18">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
        </div>
        <div className="relative container mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                 Institute
              </p>
              <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                About B.V.V. Sangha
              </h1>
              <p className="mt-4 text-lg text-gray-700 max-w-2xl leading-relaxed text-justify">
                A century of selfless service and educational excellence, upholding social values and the philosophy of “Work is Worship”.
              </p>
            </div>
            
            {/* Photo-1: Biluru Swamiji in Hero Banner */}
            <div className="flex flex-col items-center lg:items-end">
              <div className="bg-white rounded-lg border border-stone-200 p-4 shadow-xs flex flex-col items-center w-56">
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md border border-stone-100 bg-stone-50">
                  <Image
                    src={asset("governance/biluru-swamiji.jpg")}
                    alt="His Holiness Gurubasav Swamiji of Bilur"
                    fill
                    priority
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-3 font-bold text-gray-900 text-xs text-center">
                  Shri Gurubasava Mahaswamiji of Bilur
                </h3>
                <p className="text-[10px] text-primary font-semibold text-center mt-0.5 uppercase tracking-wider">
                  Founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6">
        
        {/* Chairman — portrait with a pull-quote from the Chairman's Message */}
        <div className="grid gap-8 mb-8 items-stretch lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.65fr)]">
          {/* Photo-2: Dr. Veeranna C. Charantimath */}
          <div className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs p-5 flex flex-col items-center">
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md border border-stone-100 bg-stone-50">
              <Image
                src={asset("governance/chairman.jpg")}
                alt="Dr. Veeranna C. Charantimath"
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover object-top"
              />
            </div>
            <h4 className="font-bold text-gray-900 text-base mt-4 text-center">Dr. Veeranna C. Charantimath</h4>
            <p className="text-sm text-primary font-semibold mt-0.5 text-center">Chairman, B.V.V. Sangha</p>
          </div>

          {/* Pull-quote sourced from /institute/chairperson */}
          <figure className="relative flex flex-col justify-center rounded-lg border border-stone-200 bg-linear-to-br from-orange-50/60 via-white to-stone-50 p-7 md:p-10 shadow-xs">
            <span aria-hidden className="pointer-events-none absolute left-5 top-1 select-none font-serif text-7xl leading-none text-primary/20">“</span>
            <blockquote className="relative text-lg md:text-xl font-medium leading-relaxed text-gray-800">
              We at BVVS strongly believe in the philosophy of Lord Basaveshwar of the 12<sup>th</sup> century — <span className="italic text-primary">“Work is Worship”</span> — and inculcate a concrete value system amongst the faculty and students. The B.V.V. Sangha has an everlasting commitment for developing professionals with a humane and pragmatic approach to bring about change in the society.
            </blockquote>
            <figcaption className="mt-6">
              <p className="font-bold text-gray-900">Dr. Veeranna C. Charantimath</p>
              <p className="text-sm text-gray-600">Chairman, B.V.V. Sangha, Bagalkote</p>
              <Link
                href="/institute/chairperson"
                className="group mt-3 inline-flex w-fit items-center gap-1 text-sm font-medium text-primary hover:underline hover:underline-offset-4"
              >
                Read the full message
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </figcaption>
          </figure>
        </div>

        {/* Secretary + B.V.V. Sangha Committee */}
        <div className="grid gap-8 mb-12 sm:grid-cols-2 items-start">
          {/* Photo-3: Sri Mahesh N. Athani — Secretary */}
          <div className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs p-5 flex flex-col items-center">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md border border-stone-100 bg-stone-50">
              <Image
                src={asset("governance/sangha/sri-mahesh-n-athani.webp")}
                alt="Sri Mahesh N. Athani"
                fill
                sizes="(max-width: 640px) 100vw, 488px"
                className="object-cover object-top"
              />
            </div>
            <h4 className="font-bold text-gray-900 text-base mt-4 text-center">Sri Mahesh N. Athani</h4>
            <p className="text-sm text-primary font-semibold mt-0.5 text-center">Secretary, B.V.V. Sangha</p>
          </div>

          {/* Photo-4: Group Photo */}
          <div className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-xs p-5 flex flex-col items-center">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md border border-stone-100 bg-stone-50">
              <Image
                src={asset("governance/sangha/group-photo.webp")}
                alt="Office-bearers and members of B.V.V. Sangha"
                fill
                sizes="(max-width: 640px) 100vw, 488px"
                className="object-cover"
              />
            </div>
            <h4 className="font-bold text-gray-900 text-base mt-4 text-center">B.V.V. Sangha Committee</h4>
            <p className="text-sm text-primary font-semibold mt-0.5 text-center">Office-Bearers & Members</p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6 text-base text-gray-700 leading-relaxed text-justify">
            <p>
              <span className="font-semibold text-gray-900">Basaveshwar Veerashaiva Vidyavardhak Sangha (B. V. V. Sangha)</span>,
              Bagalkote is situated in the northern part of Karnataka was a part of the Bombay province. The merchants of Bagalkote
              with the blessings of his Holiness <span className="font-semibold text-gray-900">Shri Gurubasava Mahaswamiji of Bilur</span> and
              his holiness <span className="font-semibold text-gray-900">Shri Revanasiddeshwara Mahaswamiji of Teekinamatha Bagalkote</span> established
              BVV Sangha on 18-10-1906. The Sangha started with a Sanskrit pathashala and is now a leading educational organization running
              more than <span className="font-semibold text-gray-900">190 institutes</span> and various campuses spread over more than 600 acres
              in Karnataka and Southern part of Maharashtra.
            </p>
            <p>
              The Sangha has been serving the poor, the underprivileged, and needy people of this area for more than a century,
              upholding social, human, and ethical values with emphasis on <span className="italic font-medium text-primary">“WORK IS WORSHIP”</span> — the basic philosophy of Lord Basaveshwar.
              It stands distinct in Southern India for its high-order selfless service and efforts to provide quality modern education to all sections of society.
            </p>
            <p>
              Prominent colleges cover domains such as Arts, Science, Commerce, Law, Engineering & Technology, Dental, Medicine, Management, Education, HR Training, Sports, and Vocational trades.
              Most institutions are recognized and accredited by organizations of national and international repute.
            </p>

             <h3 className="text-xl font-semibold text-gray-900 mt-8">Growth & Expansion</h3>
            <p>
              Around <span className="font-semibold text-gray-900">53,000 students</span> are learning under the supervision and support of nearly
              <span className="font-semibold text-gray-900"> 7,300 well-qualified dedicated staff members</span>.
              There are 24 boys and girls hostels accommodating thousands of students with state-of-the-art facilities.
            </p>
            <p>
              A new phase of growth began two decades ago with the launch of job-oriented Diploma, paramedical courses, and community colleges.
              The Sangha has since forged ahead, opening new institutes annually. Courses range from vocational trades like vehicle driving and tailoring
              to professional courses like medical and engineering, research centers, management studies, and Open University study centers.
            </p>
             <div className="rounded-sm bg-stone-50 border border-stone-200 p-5 my-6">
                <p className="mb-2 font-medium text-gray-900">International Collaboration</p>
                <p className="text-sm">
                  The Sangha has activities including a Memorandum of Understanding (MoU) with Sagina Valley State University (SVSU), USA for faculty and student exchange programs.
                </p>
            </div>
             <p>
              Besides education, the Sangha serves society through cultural Melas, literary conferences (Kannada Sahitya Sammelana, Sharana Sahitya Sammelana), and sports events.
              Underprivileged sections are served through the Science and Technology Entrepreneurship Park (STEP), and rural development initiatives like RDF and SETI.
            </p>
            <p>
               In recognition of the services rendered by BEC-STEP, Former President of India <span className="font-semibold text-gray-900">Sri A. P. J. Abdul Kalam</span> awarded it the BEST STEP in the country.
            </p>
          </div>

          <div className="space-y-6">
             <Card className="rounded-sm border-stone-200 shadow-sm">
              <CardContent className="pt-6 space-y-4">
                 <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">1906</p>
                    <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">Year Established</p>
                 </div>
                 <div className="w-full h-px bg-stone-100"/>
                 <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">190+</p>
                    <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">Institutes</p>
                 </div>
                 <div className="w-full h-px bg-stone-100"/>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">53k+</p>
                    <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">Students</p>
                 </div>
                 <div className="w-full h-px bg-stone-100"/>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">600+</p>
                    <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">Acres Campus</p>
                 </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm border-stone-200 shadow-sm bg-stone-50/50">
                <CardContent className="pt-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Institutions List</h4>
                    <p className="text-sm text-gray-600 mb-4 text-justify">
                        Download the full list of institutions run by Shri Basaveshwar Vidya Vardhak Sangha.
                    </p>
                     <a
                        href={asset("documents/institute/institute-list.pdf")}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline hover:underline-offset-4"
                      >
                        Download PDF ↗
                      </a>
                </CardContent>
            </Card>

            <Card className="rounded-sm border-stone-200 shadow-sm">
                <CardContent className="pt-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Contact B.V.V. Sangha</h4>
                    <p className="text-sm text-gray-600 mb-4 text-justify">
                        For queries addressed to the Sangha office and the Chairman.
                    </p>
                    <div className="space-y-2.5">
                        <a
                            href="mailto:bvvschairman@gmail.com"
                            className="flex items-center gap-2.5 text-sm text-gray-700 transition-colors hover:text-primary"
                        >
                            <Mail className="size-4 shrink-0 text-primary" />
                            <span className="break-all">bvvschairman@gmail.com</span>
                        </a>
                        <a
                            href="tel:+918354220659"
                            className="flex items-center gap-2.5 text-sm text-gray-700 transition-colors hover:text-primary"
                        >
                            <Phone className="size-4 shrink-0 text-primary" />
                            08354-220659
                        </a>
                        <a
                            href="tel:+918884452964"
                            className="flex items-center gap-2.5 text-sm text-gray-700 transition-colors hover:text-primary"
                        >
                            <Phone className="size-4 shrink-0 text-primary" />
                            +91 88844 52964
                        </a>
                        <a
                            href="tel:+918884452965"
                            className="flex items-center gap-2.5 text-sm text-gray-700 transition-colors hover:text-primary"
                        >
                            <Phone className="size-4 shrink-0 text-primary" />
                            +91 88844 52965
                        </a>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
