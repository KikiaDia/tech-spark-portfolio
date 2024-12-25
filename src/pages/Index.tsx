import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Navbar } from "@/components/Navbar";
import { Certifications } from "@/components/Certifications";

const Index = () => {
  console.log("Rendering Index component");
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </div>
    </main>
  );
};

export default Index;