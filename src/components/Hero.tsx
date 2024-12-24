import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20">
      <div className="text-center max-w-3xl mx-auto space-y-8 fade-in">
        <Avatar className="w-32 h-32 mx-auto border-2 border-primary/20">
          <AvatarImage src="/lovable-uploads/1af50d24-c56b-46d5-9807-1e29ab841b75.png" alt="Kikia Dia" />
          <AvatarFallback>KD</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Kikia Dia
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Machine Learning Engineer & NLP Specialist
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Ingénieure en informatique, spécialisée en Machine Learning et NLP, je recherche un stage de 6 mois à partir de février 2025 dans le domaine 
          de l'Intelligence Artificielle. Passionnée par l'innovation technologique, j'ai une maîtrise des grands modèles de langues (LLM), de machine 
          learning, deep learning et des techniques avancées de traitement du langage naturel.
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