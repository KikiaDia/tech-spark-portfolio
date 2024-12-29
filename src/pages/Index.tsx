import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Navbar } from "@/components/Navbar";
import { Certifications } from "@/components/Certifications";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";

const Index = () => {
  console.log("Rendering Index component");
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <section id="home">
          <Hero />
        </section>
        <section id="education">
          <Education />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="certifications">
          <Certifications />
        </section>
        <section id="contact">
          <Footer />
        </section>
      </div>
    </main>
  );
};

export default Index;