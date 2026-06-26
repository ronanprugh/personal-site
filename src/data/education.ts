export interface Education {
  institution: string;
  location: string;
  degree: string;
  field: string;
  honors?: string;
  graduationDate: string;
}

export const education: Education[] = [
  {
    institution: "University of Michigan",
    location: "Ann Arbor, MI",
    degree: "B.S.E.",
    field: "Computer Science Engineering",
    honors: "Magna Cum Laude",
    graduationDate: "May 2023",
  },
];
