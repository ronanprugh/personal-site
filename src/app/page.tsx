import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <div className="border-t border-[var(--border)]">
          <About />
        </div>
        <div className="border-t border-[var(--border)]">
          <Experience />
        </div>
        <div className="border-t border-[var(--border)]">
          <Education />
        </div>
        <div className="border-t border-[var(--border)]">
          <Skills />
        </div>
        <div className="border-t border-[var(--border)]">
          <Projects />
        </div>
      </main>
    </>
  );
}
