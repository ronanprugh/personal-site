export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: ["Java", "C#", "Python", "JavaScript", "TypeScript", "SQL", "HTML/CSS", "R"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["Spring Boot", ".NET Framework", "React", "Next.js", "Maven", "FastAPI"],
  },
  {
    category: "Tools & Platforms",
    items: [
      "Microsoft Azure",
      "Oracle SQL",
      "Git",
      "GitLab CI/CD",
      "GitHub Actions",
      "Harness",
      "Docker",
      "Vercel",
      "IntelliJ",
      "VSCode",
    ],
  },
  {
    category: "Practices",
    items: [
      "CI/CD",
      "Agile / Scrum",
      "Microservices",
      "REST API Integration",
      "Database Design",
      "Spec-Driven Development",
      "Security Remediation",
    ],
  },
];
