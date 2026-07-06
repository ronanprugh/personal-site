export interface Profile {
  name: string;
  tagline: string;
  about: string;
  githubUrl: string;
  linkedinUrl: string;
}

export const profile: Profile = {
  name: "Ronan Prugh",
  tagline:
    "Cloud systems, AI-powered developer tools, and full-stack products. Michigan CS, now building at Fiserv.",
  about:
    "I'm a software engineer at Fiserv building cloud billing systems, CI/CD infrastructure, and full-stack financial applications. I graduated from the University of Michigan with a B.S.E. in Computer Science (Magna Cum Laude, 2023). I have a particular interest in how AI can reshape software development — at Fiserv I championed Agentic Spec-Driven Development across the engineering org, building custom Claude-powered tooling that cut feature development time by ~40% and reduced QA bug escape rate by ~30%.",
  githubUrl: "https://github.com/ronanprugh",
  linkedinUrl: "https://www.linkedin.com/in/ronanprugh",
};
