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
        <Hero />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Footer />
      </div>
    </main>
  );
};

export default Index;