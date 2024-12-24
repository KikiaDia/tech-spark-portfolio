import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20">
      <div className="text-center max-w-3xl mx-auto space-y-6 fade-in">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Kikia Dia
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Machine Learning Engineer & NLP Specialist
        </p>
        <p className="text-lg text-muted-foreground">
          Passionate about AI innovation and developing cutting-edge solutions in Machine Learning and Natural Language Processing
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Button
            className="hover-scale"
            onClick={() => {
              const projectsSection = document.getElementById("projects");
              projectsSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Projects
          </Button>
          <Button
            variant="outline"
            className="hover-scale"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              contactSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact Me
          </Button>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};