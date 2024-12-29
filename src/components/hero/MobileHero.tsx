import { Button } from "../ui/button";
import { Languages, User, Calendar, IdCard, MapPin, Flag, Plane, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { content } from "./content";

export const MobileHero = () => {
  const { language } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);

  const renderPersonalDetail = (icon: React.ReactNode, text: string) => (
    <div className="flex items-center space-x-2 bg-[#18181b] text-white p-2 rounded-xl">
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );

  return (
    <div className="md:hidden space-y-6 px-4">
      <div className="max-w-[280px] mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-left">
          Kikia Dia
        </h1>
        <p className="text-xl text-[#18181b] whitespace-pre-line text-left">
          {content[language].role}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[250px] mx-auto aspect-square"
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

      <div className="max-w-[280px] mx-auto">
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line text-left">
          {content[language].description}
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 text-gray-700"
        >
          {content[language].personalDetails}
          {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 gap-2 max-w-[280px] mx-auto"
        >
          {Object.entries(content[language].details).map(([key, value], index) => {
            const icons = {
              age: <Calendar className="h-4 w-4" />,
              status: <User className="h-4 w-4" />,
              license: <IdCard className="h-4 w-4" />,
              address: <MapPin className="h-4 w-4" />,
              origin: <Flag className="h-4 w-4" />,
              mobility: <Plane className="h-4 w-4" />
            };
            
            return (
              <motion.div 
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {renderPersonalDetail(icons[key as keyof typeof icons], value)}
              </motion.div>
            );
          })}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-4 max-w-[280px] mx-auto"
      >
        <Button
          className="w-full hover:bg-white hover:text-[#18181b] bg-[#18181b] text-white transition-colors"
          onClick={() => {
            const projectsSection = document.getElementById("projects");
            projectsSection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {content[language].viewProjects}
        </Button>
        <Button
          variant="outline"
          className="w-full border-gray-600 text-gray-700 hover:bg-white hover:text-[#18181b] transition-colors"
          onClick={() => {
            const contactSection = document.getElementById("contact");
            contactSection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {content[language].contactMe}
        </Button>
      </motion.div>
    </div>
  );
};