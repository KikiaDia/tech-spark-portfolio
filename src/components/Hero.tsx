import { Button } from "./ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    contactMe: "Contact Me",
    changeLanguage: "Change Language"
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
    contactMe: "Me Contacter",
    changeLanguage: "Changer de Langue"
  }
};

export const Hero = () => {
  const { language, setLanguage } = useLanguage();
  console.log("Hero component rendering");
  console.log("Current language:", language);

  return (
    <section id="hero" className="min-h-screen flex items-center px-4 py-20 relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-gray-700 hover:bg-gray-200"
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            >
              <Languages className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{content[language].changeLanguage}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

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
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
              Kikia Dia
            </h1>
            <p className="text-xl md:text-2xl text-[#18181b]">
              {content[language].role}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {content[language].description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-2"
          >
            {Object.entries(content[language].details).map(([key, value]) => (
              <div key={key} className="p-2 rounded-lg bg-[#18181b] text-white border border-gray-700 shadow-md hover:bg-gray-800 transition-colors">
                <p className="px-3 whitespace-nowrap">{value}</p>
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
              className="hover-scale bg-[#F97316] hover:bg-[#F97316]/90 text-white"
              onClick={() => {
                const projectsSection = document.getElementById("projects");
                projectsSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {content[language].viewProjects}
            </Button>
            <Button
              variant="outline"
              className="hover-scale border-gray-600 text-gray-700 hover:bg-gray-200"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                contactSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {content[language].contactMe}
            </Button>
          </motion.div>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md mx-auto aspect-square"
          >
            <div className="absolute inset-0 rounded-lg border-2 border-gray-300 animate-pulse" />
            <div className="relative w-full h-full rounded-lg overflow-hidden border-4 border-gray-200 shadow-xl">
              <img 
                src="/lovable-uploads/2e7c3ea0-3746-4917-ade5-e611f01f6fe0.png" 
                alt="Kikia Dia"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "linear" }}
            className="overflow-hidden whitespace-nowrap text-lg italic text-[#18181b] text-center"
          >
            "{content[language].quote}"
          </motion.div>
        </div>
      </div>
    </section>
  );
};