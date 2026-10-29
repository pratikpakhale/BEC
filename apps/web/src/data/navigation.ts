import { NavigationItem } from "@/types/navigation";
import { departmentCategories, departmentHref } from "@/data/departments-catalog";

export const navigationData: NavigationItem[] = [
  // 1. Institute (About Us)
  {
    title: "Institute",
    items: [
      { title: "About Sangha", href: "/institute/about-sangha" },
      { title: "About Us", href: "/institute/about" },
      { title: "History & Milestones", href: "/institute/history" },
      { title: "Chairperson", href: "/institute/chairperson" },
      {
        title: "Accreditation & Quality",
        items: [
          { title: "Overview", href: "/accreditation" },
          { title: "NAAC", href: "/accreditation/naac" },
          { title: "NBA", href: "/accreditation/nba" },
          { title: "NIRF Rankings", href: "/accreditation/nirf" },
          { title: "IQAC", href: "/accreditation/iqac" },
          { title: "VTU Affiliation", href: "/accreditation/vtu" },
          { title: "TEQIP", href: "/accreditation/teqip" },
        ],
      },
      {
        title: "Cells & Centres",
        items: [
          { title: "Overview", href: "/institute/cells" },
          { title: "Institution's Innovation Council (IIC)", href: "/institute/cells/iic" },
          { title: "Innovation & Entrepreneurship Policy", href: "/institute/cells/iep" },
          { title: "Industry Partnership (IIPC)", href: "/institute/cells/iipc" },
          { title: "NAIN Incubation", href: "/institute/cells/nain" },
          { title: "BEC-STEP", href: "/institute/cells/step" },
          { title: "BEC-CED", href: "/institute/cells/ced" },
          { title: "Universal Human Values (UHV) Cell", href: "/institute/cells/uhv" },
        ],
      },
      {
        title: "Campus",
        items: [
          { title: "Infrastructure", href: "/institute/campus/infrastructure" },
          { title: "Campus Amenities", href: "/institute/campus/amenities" },
          { title: "Library", href: "/library" },
        ],
      },
      { title: "Institute Brochure", href: "/institute/brochure" },
      { title: "Gallery", href: "/institute/gallery" },
      { title: "Contact Us", href: "/institute/contact" },
      { title: "How to Reach", href: "/institute/contact#how-to-reach" },
    ],
  },

  // 2. Administration (Governance)
  {
    title: "Administration",
    items: [
      { title: "Governance Overview", href: "/administration/governance" },
      { title: "Organizational Chart", href: "/administration/governance#org-chart" },
      {
        title: "Governing Bodies",
        items: [
          {
            title: "Board of Governors",
            href: "/administration/governance#bog",
          },
        ],
      },
      { title: "Director", href: "/administration/director" },
      { title: "Principal", href: "/administration/principal" },
      { title: "Deans", href: "/administration/governance#deans" },
      { title: "Heads of Departments", href: "/administration/governance#hods" },
      { title: "Service Rules", href: "/administration/rules" },
      {
        title: "Public Disclosures",
        items: [{ title: "RTI", href: "/administration/disclosures/rti" }],
      },
    ],
  },

  // 3. Academics
  {
    title: "Academics",
    groupsFirst: true,
    items: [
      // { title: "Research", href: "/research" },
      {
        title: "Programmes",
        items: [
          { title: "Under Graduate/BE", href: "/academics/programmes/ug" },
          { title: "Post Graduate/M.Tech", href: "/academics/programmes/pg" },
          { title: "MBA", href: "/academics/programmes/mba" },
          { title: "MCA", href: "/academics/programmes/mca" },
          { title: "M.Sc.(Engg.)/Ph.D", href: "/academics/programmes/phd" },
          { title: "First-Year Syllabus", href: "/academics/first-year" },
        ],
      },
      { title: "Academic Calendar", href: "/academics/calendar" },
      { title: "College Students List", href: "/academics/students-list" },
    ],
  },

  // 4. Departments (top-level — UG, PG and Science & Humanities)
  {
    title: "Departments",
    items: departmentCategories.map((category) => ({
      title: category.navLabel,
      items: category.departments.map((dept) => ({
        title: dept.name,
        href: departmentHref(category.key, dept.slug),
      })),
    })),
  },

  // 5. Admissions
  {
    title: "Admissions",
    items: [
      { title: "Overview", href: "/admissions" },
      { title: "Under Graduate/BE", href: "/admissions/ug" },
      { title: "Post Graduate/M.Tech", href: "/admissions/pg" },
      { title: "Ph.D / M.Sc.(Engg.)", href: "/admissions/phd" },
      { title: "MBA", href: "/admissions/mba" },
      { title: "MCA", href: "/admissions/mca" },
      { title: "Documents to Submit", href: "/academics/documents" },
      { title: "Scholarships", href: "/academics/scholarships" },
      { title: "Contact", href: "/admissions/contact" },
    ],
  },

  // 6. Examinations
  {
    title: "Examinations",
    href: "/academics/examinations",
  },

  // 7. Research

  { title: "Research", href: "/research" },

  // 8. Placements
  {
    title: "Placements",
    href: "/placements",
  },

  // 9. Hostels
  {
    title: "Hostels",
    href: "/hostel",
  },

  // 10. Student Life
  {
    title: "Student Life",
    items: [
      { title: "Overview", href: "/student-life/overview" },
      { title: "BEC Creative Spectrum", href: "/student-life/bec-creative-spectrum" },
      { title: "Activities", href: "/student-life/activities" },
      { title: "Sports & Gymkhana", href: "/student-life/gymkhana" },
      { title: "IEEE", href: "/student-life/ieee" },
      { title: "NSS", href: "/student-life/nss" },
      {
        title: "Anti Ragging",
        items: [
          { title: "Info", href: "/student-life/anti-ragging/info" },
          { title: "Contact", href: "/student-life/anti-ragging/contact" },
        ],
      },
      { title: "Alumni", href: "/student-life/alumni" },
      { title: "BEC-FM Radio", href: "/student-life/bec-fm" },
      { title: "Achievements", href: "/student-life/achievements" },
    ],
  },

  // 11. NBA — top-level tab mandated by NBA for the Data Capturing Summary link
  {
    title: "NBA",
    href: "/accreditation/nba",
  },
];
