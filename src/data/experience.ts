export interface WorkExperience {
  company: string;
  location: string;
  title: string;
  startDate: string;
  endDate: string | "Present";
  responsibilities: string[];
}

export const experience: WorkExperience[] = [
  {
    company: "Fiserv, Inc.",
    location: "Berkeley Heights, NJ",
    title: "Software Engineer",
    startDate: "June 2023",
    endDate: "Present",
    responsibilities: [
      "Designed and implemented database and middleware architecture for a new Azure Cloud billing application, processing ~1,000 invoices monthly for services, hardware, and licensed software.",
      "Championed Agentic Spec-Driven Development (SDD) across the engineering organization — designed and led workshops to train teammates on a Claude-powered workflow that formalized requirements before any code was written, reducing ambiguity-driven rework and aligning development with business intent.",
      "Built custom Claude prompts and tool-augmented agents to automate spec generation, code review, and test scaffolding, cutting average feature development time by ~40% and reducing bug escape rate to QA by ~30%.",
      "Contributed to design and full-stack development of Global Settlement Application used by Settlement and Accounting teams to reconcile transactions, track balances, and execute inter-bank transfers.",
      "Built and maintained CI/CD pipelines for 20+ legacy microservices using GitLab and Harness, reducing deployment friction and improving release reliability.",
      "Delivered back-end features for myFiserv internal platform supporting 1,000+ executive and manager-level employees for project, people, and incident management.",
    ],
  },
  {
    company: "U of M Transportation Research Institute",
    location: "Ann Arbor, MI",
    title: "Software Developer",
    startDate: "June 2022",
    endDate: "March 2023",
    responsibilities: [
      "Built and enhanced Vanilla JS and React front-end tools for querying and visualizing Michigan crash data from 2004 to present.",
      "Remediated production defects across both front-end JavaScript and back-end Python codebases.",
      "Automated researcher workflows by building a scheduled PDF reporting system using Python.",
    ],
  },
  {
    company: "CSG International",
    location: "Chicago, IL",
    title: "Software Engineering Intern",
    startDate: "June 2020",
    endDate: "August 2021",
    responsibilities: [
      "Designed and implemented stub endpoints for third-party payment platforms to improve integration test coverage and effectiveness.",
      "Authored unit and component tests in xUnit, increasing code coverage from 60% to above 80%.",
      "Participated in full agile development cycle including daily stand-ups, story point estimation, design reviews, and code reviews.",
      "Performed regression testing and built defect reporting tools for back-end API endpoints and front-end UI.",
    ],
  },
];
