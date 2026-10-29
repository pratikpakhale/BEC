import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PersonCard, PersonGrid } from "@/components/common/person-card";
import { DocumentDirectory } from "@/components/common/document-directory";
import { documentGroups } from "@/content/documents";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Institution Industry Cell (IIC)",
  description:
    "BEC Bagalkote's Institution Industry Cell (IIC) bridges academia and industry through guest lectures, internships, live projects, consultancy and MoU-driven training programmes.",
  path: "/institute/cells/iipc",
});

const objectives = [
  "Strengthen linkages and expertise between industry and the institution",
  "Align students with current industry expectations",
  "Extend faculty consultancy services in both directions — institute-to-industry and industry-to-institute",
  "Identify collaborative research opportunities",
  "Improve UG and PG placement prospects",
  "Develop MoUs between industry and the institute",
];

const activities = [
  "Industrial guest lectures and workshops",
  "Internships and industrial live projects",
  "Joint research and consultancy",
  "Curriculum framing by industry experts",
  "Industrial visits",
];

const mouActivities = [
  {
    event: "Infosys Springboard & AWS Skill Builder Program Launch Event (Virtual)",
    date: "25 Jul 2025",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "Infosys Springboard: Faculty Enablement Program (FEP) on Python Programming & Machine Learning",
    date: "14–16 Apr 2025",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "Infosys Springboard Certification Drive (Student Enablement): Machine Learning Foundation Certification",
    date: "7–11 Apr 2025",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "Infosys Springboard Certification Drive (Student Enablement): Front End Web Technologies",
    date: "17–21 Mar 2025",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "Interaction with Final Year Students — Internship at Tech Fortune Pvt. Ltd. and Ongoing Project Scenarios",
    date: "3 Feb 2025",
    company: "Tech Fortune Pvt. Ltd., Bangalore",
    location: "Online",
  },
  {
    event: "Interaction with Final Year Students — Internship Opportunities and Cutting-Edge Technologies",
    date: "3 Feb 2025",
    company: "Arilig Technologies, Bangalore",
    location: "Online",
  },
  {
    event: "SDP on Sales Force Technologies",
    date: "3–5 Dec 2024",
    company: "Arilig Technologies, Bangalore",
    location: "Multimedia Seminar Hall, BEC Bagalkote",
  },
  {
    event: "FDP on Generative AI",
    date: "18–22 Nov 2024",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "FDP on Python Foundation",
    date: "28 Aug – 3 Sep 2024",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "SDP on Infosys Springboard AI Foundation",
    date: "22–26 Jul 2024",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "FDP on DevOps",
    date: "15–18 Jul 2024",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "FDP on AI Foundation",
    date: "24–28 Jun 2024",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "Seminar on Career Opportunities in Cybersecurity (Mr. Nikil Inginal)",
    date: "23 May 2024",
    company: "Threat Hunters Club LLP",
    location: "CSE Seminar Hall, BEC Bagalkote",
  },
  {
    event: "Workshop on Sales Force Technologies",
    date: "3–5 Dec 2023",
    company: "Arilig Technologies, Bangalore",
    location: "Multimedia Seminar Hall, BEC Bagalkote",
  },
  {
    event: "Seminar on Wireshark Tool (Mr. Nikil Inginal)",
    date: "2 Dec 2023",
    company: "Threat Hunters Club LLP",
    location: "Multimedia Seminar Hall, BEC Bagalkote",
  },
];

const mechMous = [
  {
    partner: "CNC India Tools Pvt. Ltd., Bengaluru",
    signed: "Signed on Jan 12, 2024",
    narrative: [
      "The Department of Mechanical Engineering, Basaveshwar Engineering College (BEC), Bagalkote, has signed a Memorandum of Understanding (MoU) with CNC India Tools Pvt. Ltd., Bengaluru, on Jan 12, 2024, marking a significant step towards strengthening industry–academia collaboration.",
      "The MoU aims to bridge the gap between academic learning and industrial practices by facilitating joint initiatives such as student internships, industrial training, expert lectures, hands-on workshops, collaborative projects, and skill development programs in the field of manufacturing and machine tools. This collaboration will help students gain practical exposure to real-world engineering challenges and emerging industrial technologies.",
      "Representatives from CNC India Tools Pvt. Ltd. expressed their commitment to supporting academic institutions by sharing industry expertise, infrastructure exposure, and mentoring students to meet current and future industry requirements.",
    ],
    activities: [
      {
        year: "2024-25",
        activity:
          "A group of 03 final-year Mechanical Engineering students successfully completed a four-month industrial internship at CNC India Pvt. Ltd., Bengaluru, as part of the curriculum to enhance practical exposure and industry readiness.",
        date: "10-02-2025 to 30-06-2025",
      },
      {
        year: "2025-26",
        activity:
          "A group of 05 final-year Mechanical Engineering students are undergoing a four-month industrial internship at CNC India Pvt. Ltd., Bengaluru, as part of the curriculum to enhance practical exposure and industry readiness.",
        date: "05-02-2026 to 05-06-2026",
      },
    ],
  },
  {
    partner: "Sphoorti Machine Tools Pvt. Ltd., Bengaluru",
    signed: "Signed on Feb 02, 2026",
    narrative: [
      "The Department of Mechanical Engineering, Basaveshwar Engineering College (BEC), Bagalkote, has signed a Memorandum of Understanding (MoU) with Sphoorti Machine Tools Pvt. Ltd., Bengaluru, on Feb 02, 2026, marking a significant step towards strengthening industry–academia collaboration.",
      "The MoU aims to bridge the gap between academic learning and industrial practices by facilitating joint initiatives such as student internships, industrial training, expert lectures, hands-on workshops, collaborative projects, and skill development programs in the field of manufacturing and machine tools. This collaboration will help students gain practical exposure to real-world engineering challenges and emerging industrial technologies.",
      "Representatives from Sphoorti Machine Tools Pvt. Ltd. expressed their commitment to supporting academic institutions by sharing industry expertise, infrastructure exposure, and mentoring students to meet current and future industry requirements.",
    ],
    activities: [
      {
        year: "2024-25",
        activity:
          "A group of 06 final-year Mechanical Engineering students successfully completed a four-month industrial internship at Sphoorti Machine Tools Pvt. Ltd., Bengaluru, as part of the curriculum to enhance practical exposure and industry readiness.",
        date: "10-02-2025 to 30-06-2025",
      },
      {
        year: "2025-26",
        activity:
          "A group of 06 final-year Mechanical Engineering students are undergoing a four-month industrial internship at Sphoorti Machine Tools Pvt. Ltd., Bengaluru, as part of the curriculum to enhance practical exposure and industry readiness.",
        date: "05-02-2026 to 05-06-2026",
      },
    ],
  },
  {
    partner: "Unnati CNC Technologies Pvt. Ltd., Bengaluru",
    signed: "Signed on Feb 02, 2026",
    narrative: [
      "The Department of Mechanical Engineering, Basaveshwar Engineering College (BEC), Bagalkote, has signed a Memorandum of Understanding (MoU) with Unnati CNC Technologies Pvt. Ltd., Bengaluru, on Feb 02, 2026, marking a significant step towards strengthening industry–academia collaboration.",
      "The MoU aims to bridge the gap between academic learning and industrial practices by facilitating joint initiatives such as student internships, industrial training, expert lectures, hands-on workshops, collaborative projects, and skill development programs in the field of manufacturing and machine tools. This collaboration will help students gain practical exposure to real-world engineering challenges and emerging industrial technologies.",
      "Representatives from Unnati CNC Technologies Pvt. Ltd. expressed their commitment to supporting academic institutions by sharing industry expertise, infrastructure exposure, and mentoring students to meet current and future industry requirements.",
    ],
    activities: [
      {
        year: "2024-25",
        activity:
          "A group of 03 final-year Mechanical Engineering students successfully completed a four-month industrial internship at Unnathi CNC Technologies Pvt. Ltd., Bengaluru, as part of the curriculum to enhance practical exposure and industry readiness.",
        date: "10-02-2025 to 30-06-2025",
      },
      {
        year: "2025-26",
        activity:
          "A group of 04 final-year Mechanical Engineering students are undergoing a four-month industrial internship at Unnathi CNC Technologies Pvt. Ltd., Bengaluru, as part of the curriculum to enhance practical exposure and industry readiness.",
        date: "05-02-2026 to 05-06-2026",
      },
    ],
  },
];

const mbaActivities = [
  {
    activity:
      "Mentoring Event — Demo Day: Poster Presentation of Business Plans and Mentor Linkages, organised under Institution's Innovation Council (IIC) 8.0 and the Entrepreneurship Development Cell in association with the Department of MBA. Mr. Pavan Simikeri, Proprietor, Pakwan Group of Hotels, was the Guest and Judge.",
    date: "30.05.2026",
    coordinator: "Prof. Vaibhav Deshpande",
  },
  {
    activity:
      "Pre-Placement Training Module 3 for MBA IV Semester students, conducted by Universal Education firm, Bangalore.",
    date: "27.04.2026 to 01.05.2026",
    coordinator: "Dr. Brijmohan A. Vyas",
  },
  {
    activity:
      "Student Development Programme (SDP) on “Workplace 2.0: Where Gen Z Meets Reality”, delivered by Mr. Sridhar Kubasad, Former Vice President – Business Management at ANZ Support Services India Pvt. Ltd. and an alumnus of IIM Ahmedabad.",
    date: "18.04.2026",
    coordinator: "Dr. Brijmohan A. Vyas",
  },
  {
    activity:
      "National Level Management Fest Kurukshetra 2k26 for UG students. Judges were invited from industries such as Wipro, BMW, Varda, HDFC, etc.",
    date: "24.03.2026",
    coordinator: "Dr. Rashmi Hunnur",
  },
  {
    activity:
      "Session on Entrepreneurship as a Career Opportunity for MBA I Semester students. Dr. Shivaleela V. B., Founder, POMLA Naturals LLP, was the resource person.",
    date: "26.02.2026",
    coordinator: "Dr. B. A. Vyas",
  },
  {
    activity:
      "“Review of Union Budget 2026” competition conducted for MBA students as a Club Activity.",
    date: "6.2.2026",
    coordinator: "Prof. V. C. Patil",
  },
  {
    activity:
      "Five-Day Student Development Programme on Marketing Tools and Techniques for MBA II Year students. Mr. Shankarlinga B. S. from Koherent Technologies, Bangalore, was the resource person.",
    date: "24.1.2026 to 28.1.2026",
    coordinator: "Dr. Rashmi Hunnur",
  },
  {
    activity:
      "Informational seminar on “Industry Readiness Course and Career in SAP” for second-year MBA students. Mr. Santosh Habib, Trainer at LCC Dharwad, and Dr. K. R. Mahesh, Director at LCC Dharwad, were the resource persons.",
    date: "21.1.2026",
    coordinator: "Prof. V. R. Deshpande",
  },
  {
    activity:
      "Workshop on “Business Etiquette” for first-year MBA students. Shri Narendra Bellare, (Rtd) Head Corporate Sustainability, L&T, was the resource person.",
    date: "5.1.2026 to 5.2.2026",
    coordinator: "Dr. Rashmi Hunnur",
  },
  {
    activity:
      "Workshop on “Entrepreneurship – Achieving Problem-Solution Fit” for MBA students. Mr. Shyamsundar Sedamkar, CEO and Co-founder of Springevening, was the resource person.",
    date: "2.1.2026",
    coordinator: "Dr. B. A. Vyas",
  },
  {
    activity:
      "Student Development Programme on “From Campus to Corporate: Do's and Don'ts for Professional Success” for first-year MBA students. Mr. Umesh M. Avvannavar, Patient Care Manager at Aski Super Specialty Hospital, was the resource person.",
    date: "30.12.2025",
    coordinator: "Dr. Rashmi Hunnur",
  },
  {
    activity:
      "Five-Day Pre-Placement Training Module II for second-year MBA students, conducted by Universal Education Firm.",
    date: "26.12.2025 to 30.12.2025",
    coordinator: "Dr. B. A. Vyas",
  },
  {
    activity:
      "Student Development Programme on “Profile Building through LinkedIn” for second-year MBA students. Mr. Suhas Rajput from Proficient Minds was the resource person.",
    date: "15.12.2025",
    coordinator: "Dr. B. A. Vyas",
  },
  {
    activity:
      "“Orientation Program” for first-year MBA students. Mr. Mahantesh Goudar, Alumnus of BEC and IIM Ranchi, Head of HR at Uni Cards, and Founder of Campus Champ, was the guest speaker.",
    date: "3.12.2025",
    coordinator: "Dr. Rashmi Hunnur",
  },
  {
    activity:
      "Workshop on Advanced Excel, conducted by Universal Education Firm, Bangalore.",
    date: "22.11.2025 to 25.11.2025",
    coordinator: "Dr. B. A. Vyas",
  },
  {
    activity:
      "SDP on Digital Marketing for MBA students. Mr. Shankarlinga B. S. from Koherent Technologies, Bangalore, was the resource person.",
    date: "26.09.2025 to 30.09.2025",
    coordinator: "Dr. Rashmi Hunnur",
  },
  {
    activity:
      "17th Board of Studies (BoS) meeting for the academic year 2025–26 conducted in the department. The VTU nominee, subject experts, industry expert and student alumni participated.",
    date: "6.9.2025",
    coordinator: "Dr. R. B. Tapashetti",
  },
  {
    activity:
      "SDP on Career Orientation from Industry Expert for MBA 1st year students. Mr. Mohankumar, Head – HR Practices, Wipro Bangalore.",
    date: "02.08.2025",
    coordinator: "Dr. Rashmi Hunnur",
  },
  {
    activity:
      "SDP on Placement Readiness from Industry Expert for MBA 2nd year students. Mr. Mohankumar, Head – HR Practices, Wipro Bangalore.",
    date: "01.08.2025",
    coordinator: "Dr. Rashmi Hunnur",
  },
  {
    activity:
      "Pre-Placement Training Module – III, conducted by Universal Education firm, Bangalore.",
    date: "22.7.2025 to 26.7.2025",
    coordinator: "Dr. B. A. Vyas",
  },
  {
    activity:
      "Soft Skill Training Module – I (24-25 A. B.), conducted by Universal Education firm, Bangalore.",
    date: "25.06.2025 to 29.6.2025",
    coordinator: "Dr. B. A. Vyas",
  },
  {
    activity:
      "One-day session on “Equity Investments” for MBA students. Mr. Vishal Nagur, Professional Equity Investor, was the resource person.",
    date: "10.3.2025",
    coordinator: "Dr. Rashmi Hunnur",
  },
  {
    activity:
      "One-day workshop on “Executive Meet Session on Industry Expectations from MBA Graduates”. Mr. Prashant Kabbur, HR – ESAF Small Finance Bank, was the resource person.",
    date: "6.3.2025",
    coordinator: "Dr. B. A. Vyas",
  },
  {
    activity:
      "Soft Skill Training Module – II (23-24 A. B.), conducted by Universal Education firm, Bangalore.",
    date: "3.3.2025 to 7.3.2025",
    coordinator: "Dr. B. A. Vyas",
  },
  {
    activity:
      "One-day workshop on “Executive Meet Session on Financial Literacy”. Mr. Lohit N. Somayaji, Regional Manager, HDFC, was the resource person.",
    date: "3.3.2025",
    coordinator: "Dr. B. A. Vyas",
  },
  {
    activity:
      "One-day workshop on “From Idea to Impact – Motivational Session by Successful Entrepreneurs/Start-up Founder”. Dr. Shivaleela V. B., Founder, POMLA Naturals LLP, was the resource person.",
    date: "25.2.2025",
    coordinator: "Dr. Rashmi Hunnur",
  },
  {
    activity:
      "One-day workshop on “Entrepreneurship and Innovation as a Career Opportunity” under the auspices of the MBA Department and IQAC. Mr. Shyamsunder Sedamkar, Founder, Spring Evening & Bitbites, was the resource person.",
    date: "24.1.2025",
    coordinator: "Dr. B. A. Vyas",
  },
  {
    activity:
      "Two-day Orientation Program for first-year MBA students. Mr. Ramani Venkat, NLP Trainer, Bangalore, conducted the sessions.",
    date: "16.1.2025 to 17.1.2025",
    coordinator: "Prof. V. R. Deshpande",
  },
  {
    activity:
      "One-day guest lecture on “Venture Capital” for first-year students. Mr. Vishal Nagur, Professional Equity Investor, was the resource person.",
    date: "14.10.2024",
    coordinator: "Dr. Rashmi Hunnur",
  },
  {
    activity:
      "One-day SDP on “Placement Readiness Program from Industry Expert” for final-year students. Mr. Mohan Kumar, HR Practice Head at Wipro, Bangalore, was the resource person.",
    date: "17.8.2024",
    coordinator: "Dr. Rashmi Hunnur",
  },
  {
    activity:
      "One-day SDP on “Career Orientation from Industry Expert” for first-year students. Mr. Mohan Kumar, HR Practice Head at Wipro, Bangalore, was the resource person.",
    date: "16.8.2024",
    coordinator: "Dr. Rashmi Hunnur",
  },
  {
    activity:
      "Soft Skill Training Module – I (23-24 A. B.), conducted by Universal Education firm, Bangalore.",
    date: "6.8.2024 to 10.8.2024",
    coordinator: "Dr. B. A. Vyas",
  },
  {
    activity:
      "Pre-Placement Training (22-23 A. B.), conducted by Universal Education firm, Bangalore.",
    date: "5.6.2024 to 9.6.2024",
    coordinator: "Dr. B. A. Vyas",
  },
];

const members = [
  {
    name: "Dr. Basavaraj R. Hiremath",
    role: "Chairman",
    tone: "primary" as const,
    email: "becprincipal@yahoo.com",
    phone: "+91 94489 39700",
  },
  {
    name: "Dr. Govindraj B. Chittapur",
    role: "Coordinator",
    tone: "primary" as const,
    email: "gbchittapur@gmail.com",
    phone: "+91 97392 65167",
  },
  {
    name: "Dr. Ashok V. Sutagundar",
    role: "Member",
    tone: "muted" as const,
    photo: asset("departments/ece/faculty/ashok-v-sutagundar.webp"),
    email: "sutagunder@gmail.com",
    phone: "+91 97422 98371",
  },
  {
    name: "Prof. Basavaraj R. Endigeri",
    role: "Member",
    tone: "muted" as const,
    email: "endigeribasavaraj@gmail.com",
    phone: "+91 98456 57310",
  },
  {
    name: "Dr. Rashmi R. Hunnur",
    role: "Member",
    tone: "muted" as const,
    email: "hunnurmba@gmail.com",
    phone: "+91 94491 59015",
  },
  {
    name: "Dr. Shrinivas F. Chitragar",
    role: "Member",
    tone: "muted" as const,
    email: "fc.shrinivas@gmail.com",
    phone: "+91 94499 44399",
  },
  {
    name: "Prof. Sanjay S. J.",
    role: "Member",
    tone: "muted" as const,
    email: "Sanjuyadavbec1@gmail.com",
    phone: "+91 95384 66455",
  },
  {
    name: "Prof. Jangin C. M.",
    role: "Member",
    tone: "muted" as const,
    email: "Chandru.jangin@gmail.com",
    phone: "+91 98455 43101",
  },
  {
    name: "Dr. S. G. Kambalimath",
    role: "Mentor",
    tone: "outline" as const,
    email: "Kambalimath15@gmail.com",
    phone: "+91 98807 35779",
  },
];

const galleryImages = Array.from({ length: 11 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: asset(`cells/iipc/gallery/iipc-activities-${n}.webp`),
    alt: `Industry interaction with students of Basaveshwar Engineering College, Bagalkote — activity ${i + 1}`,
  };
});

export default function IipcPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Industry Connect"
        title="Institution Industry Cell (IIC)"
        description="The Institution Industry Cell is the college's interface with industry — facilitating close industry-institute interaction and bridging the gap between academia and the corporate sector."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <SectionHeading eyebrow="About" title="Bridging academia and industry" />
            <p className="text-base leading-relaxed text-gray-700 text-justify">
              The Institution Industry Cell facilitates close interaction between
              the college and industry, bridging gaps between academia and the
              corporate sector. It promotes industry-institute linkages through
              guest lectures, training, internships, industrial visits and
              collaborative research.
            </p>
          </div>
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-100">
            <Image
              src={asset("cells/iipc/bec-iipc-cell-photo.webp")}
              alt="The Institution Industry Cell at Basaveshwar Engineering College"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Objectives</h3>
            <ul className="mt-4 space-y-3">
              {objectives.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Activities</h3>
            <ul className="mt-4 space-y-3">
              {activities.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Engagement"
            title="MoU Activities (2023–25)"
            description="Training programmes, faculty and student enablement drives, seminars and workshops delivered through the cell's industry MoUs."
          />
          <div className="overflow-x-auto rounded-md border border-stone-200 shadow-sm">
            <table className="w-full min-w-[44rem] border-collapse bg-white text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-primary/5 text-primary">
                  <th className="px-4 py-3 font-semibold">Event</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Date / Year</th>
                  <th className="px-4 py-3 font-semibold">MoU Company</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                </tr>
              </thead>
              <tbody>
                {mouActivities.map((a) => (
                  <tr key={a.event} className="border-b border-stone-100 last:border-0 align-top">
                    <td className="px-4 py-3 font-medium text-gray-900">{a.event}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{a.date}</td>
                    <td className="px-4 py-3 text-gray-700">{a.company}</td>
                    <td className="px-4 py-3 text-gray-700">{a.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Records"
            title="MoU Documents"
            description="Signed Memorandums of Understanding between the college and partner industries."
          />
          <DocumentDirectory
            groups={documentGroups("iipc", "documents")}
          />
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Mechanical Engineering"
            title="Industry MoUs & Internships"
            description="Memorandums of Understanding signed by the Department of Mechanical Engineering with leading manufacturing and machine-tool industries, driving student internships and industry-oriented training."
          />
          <div className="grid gap-6">
            {mechMous.map((mou) => (
              <div
                key={mou.partner}
                className="rounded-md border border-stone-200 bg-white p-6 shadow-sm space-y-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{mou.partner}</h3>
                  <p className="mt-1 text-sm font-medium text-secondary">{mou.signed}</p>
                </div>
                <div className="space-y-3">
                  {mou.narrative.map((para) => (
                    <p key={para} className="text-sm leading-relaxed text-gray-700 text-justify">
                      {para}
                    </p>
                  ))}
                </div>
                <div className="overflow-x-auto rounded-md border border-stone-200">
                  <table className="w-full min-w-[40rem] border-collapse bg-white text-left text-sm">
                    <thead>
                      <tr className="border-b border-stone-200 bg-primary/5 text-primary">
                        <th className="px-4 py-3 font-semibold whitespace-nowrap">Academic Year</th>
                        <th className="px-4 py-3 font-semibold">Activity</th>
                        <th className="px-4 py-3 font-semibold whitespace-nowrap">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mou.activities.map((a) => (
                        <tr
                          key={a.year}
                          className="border-b border-stone-100 last:border-0 align-top"
                        >
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                            {a.year}
                          </td>
                          <td className="px-4 py-3 text-gray-700">{a.activity}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{a.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Management Studies (MBA)"
            title="Industry-Cell Activities (Jun 2024 – May 2026)"
            description="Guest lectures, student development programmes, pre-placement training, workshops and industry interactions organised by the Department of Management Studies."
          />
          <div className="overflow-x-auto rounded-md border border-stone-200 shadow-sm">
            <table className="w-full min-w-[48rem] border-collapse bg-white text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-primary/5 text-primary">
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Sl. No.</th>
                  <th className="px-4 py-3 font-semibold">Activity</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Date</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Coordinator</th>
                </tr>
              </thead>
              <tbody>
                {mbaActivities.map((a, index) => (
                  <tr
                    key={`${a.date}-${index}`}
                    className="border-b border-stone-100 last:border-0 align-top"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">{index + 1}</td>
                    <td className="px-4 py-3 text-gray-700">{a.activity}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{a.date}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{a.coordinator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="The Cell" title="Members" />
          <PersonGrid>
            {members.map((m) => (
              <PersonCard
                key={m.name}
                name={m.name}
                photo={m.photo}
                description={`Mobile: ${m.phone}`}
                email={m.email}
                badges={[{ label: m.role, tone: m.tone }]}
              />
            ))}
          </PersonGrid>
          <div className="rounded-md border border-stone-200 bg-orange-50/60 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
              Coordinator
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-900">Dr. Govindraj B. Chittapur</p>
            <p className="text-sm text-gray-700">Coordinator, Institution Industry Cell</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
              <span>
                Mobile:{" "}
                <a href="tel:+919739265167" className="font-medium text-primary hover:underline">
                  +91 97392 65167
                </a>
              </span>
              <span>
                Email:{" "}
                <a
                  href="mailto:gbchittapur@gmail.com"
                  className="font-medium text-primary hover:underline"
                >
                  gbchittapur@gmail.com
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Records"
            title="Cell Gallery"
            description="Glimpses of industry interaction with students from Basaveshwar Engineering College, Bagalkote."
          />
          <PhotoGallery images={galleryImages} />
        </div>
      </section>
    </main>
  );
}
