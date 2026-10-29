export type BosMember = {
  role: string;
  designation: string;
};

export const bosComposition: BosMember[] = [
  { role: "Head of the Department", designation: "Chairman" },
  { role: "All faculty members of the Department", designation: "Members" },
  { role: "Nominees from VTU", designation: "Member" },
  { role: "Academicians from HEIs (1-2)", designation: "Members" },
  { role: "Industry professionals (1-2)", designation: "Members" },
  { role: "Illustrious Alumni", designation: "Member" },
  { role: "Student representatives (3-4)", designation: "Invited members" },
];

export const bosFunctions: string[] = [
  "Prepare scheme and syllabi for various courses keeping in view the objectives of the college, interest of the stakeholders and national requirement for consideration and approval of the Academic Council.",
  "Review and incorporate suggestions made by stakeholders in framing syllabus and including new courses.",
  "Review and approve scheme of teaching and evaluation of various courses.",
  "Review and approve Course Objectives (COs), Program Specific Objectives (PSOs) and Program Educational Objectives (PEOs) in line with OBE requirements.",
  "Review the CO-PO mappings to address all defined POs and PSOs.",
  "Suggest methodologies for innovative teaching and evaluation techniques.",
  "Suggest list of MOOCs courses.",
];
