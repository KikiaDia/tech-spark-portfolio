import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Navbar } from "@/components/Navbar";
import { Certifications } from "@/components/Certifications";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { LanguagesAndHobbies } from "@/components/LanguagesAndHobbies";

const Index = () => {
  console.log("Rendering Index component");
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <section id="home" className="scroll-mt-16">
          <Hero />
        </section>
        <section id="education" className="scroll-mt-16">
          <Education />
        </section>
        <section id="experience" className="scroll-mt-16">
          <Experience />
        </section>
        <section id="projects" className="scroll-mt-16">
          <Projects />
        </section>
        <section id="skills" className="scroll-mt-16">
          <Skills />
        </section>
        <section id="certifications" className="scroll-mt-16">
          <Certifications />
        </section>
        <LanguagesAndHobbies />
        <section id="contact" className="scroll-mt-16">
          <Footer />
        </section>
      </div>
    </main>
  );
};

export default Index;