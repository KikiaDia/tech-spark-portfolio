import { Button } from "./ui/button";
import { Languages } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const content = {
  en: {
    quote: "Turning Data into Insights, Code into Innovation",
    role: "Machine Learning Engineer & NLP Specialist",
    description: "Computer engineering graduate specializing in Machine Learning and NLP, seeking a 6-month internship starting February 2025 in Artificial Intelligence.",
    details: {
      age: "24 years old",
      status: "Single",
      license: "Driving License (A1, B)",
      address: "Nantes, France",
      origin: "Senegalese",
      mobility: "Île-de-France, Pays de la Loire"
    },
    viewProjects: "View Projects",
    contactMe: "Contact Me"
  },
  fr: {
    quote: "Transformer les Données en Insights, le Code en Innovation",
    role: "Ingénieure en Machine Learning & NLP",
    description: "Ingénieure en informatique, spécialisée en Machine Learning et NLP, je recherche un stage de 6 mois à partir de février 2025 dans le domaine de l'Intelligence Artificielle.",
    details: {
      age: "24 ans",
      status: "Célibataire",
      license: "Permis (A1, B)",
      address: "Nantes, France",
      origin: "Sénégalaise",
      mobility: "Île-de-France, Pays de la Loire"
    },
    viewProjects: "Voir les Projets",
    contactMe: "Me Contacter"
  }
};

export const Hero = () => {
  const { language, setLanguage } = useLanguage();
  console.log("Hero component rendering");
  console.log("Current language:", language);

  return (
    <section id="hero" className="min-h-screen flex items-center px-4 py-20 relative bg-gradient-to-br from-background via-purple-50/10 to-background/80">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10"
        onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
      >
        <Languages className="h-5 w-5" />
      </Button>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
              className="overflow-hidden whitespace-nowrap text-lg italic text-muted-foreground"
            >
              "{content[language].quote}"
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Kikia Dia
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {content[language].role}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content[language].description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-4 text-sm text-muted-foreground"
          >
            {Object.entries(content[language].details).map(([key, value]) => (
              <div key={key} className="p-2 rounded-lg bg-purple-50/20 backdrop-blur-sm border border-purple-100/20">
                <p>{value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex gap-4 pt-4"
          >
            <Button
              className="hover-scale bg-purple-600 hover:bg-purple-700"
              onClick={() => {
                const projectsSection = document.getElementById("projects");
                projectsSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {content[language].viewProjects}
            </Button>
            <Button
              variant="outline"
              className="hover-scale border-purple-200 hover:border-purple-300"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                contactSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {content[language].contactMe}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md mx-auto aspect-square"
        >
          <div className="absolute inset-0 rounded-lg border-2 border-purple-200/50 animate-pulse" />
          <div className="relative w-full h-full rounded-lg overflow-hidden border-4 border-purple-100/20 shadow-xl bg-gradient-to-br from-purple-50/30 via-white/50 to-purple-50/30 backdrop-blur-sm">
            <img 
              src="/lovable-uploads/1af50d24-c56b-46d5-9807-1e29ab841b75.png" 
              alt="Kikia Dia"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};