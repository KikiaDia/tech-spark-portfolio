import { Button } from "../ui/button";
import { Languages, User, Calendar, IdCard, MapPin, Flag, Plane, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { content } from "./content";
import { useState } from "react";

export const DesktopHero = () => {
  const { language, setLanguage } = useLanguage();
  const [expandedMobility, setExpandedMobility] = useState(false);

  const renderPersonalDetail = (icon: React.ReactNode, text: string, key: string) => (
    <div 
      className={`flex items-center space-x-2 bg-[#18181b] text-white p-2 rounded-xl w-full md:w-auto group ${
        key === 'mobility' ? 'cursor-pointer hover:bg-[#18181b]/90 relative' : ''
      }`}
      onClick={() => {
        if (key === 'mobility') {
          setExpandedMobility(!expandedMobility);
        }
      }}
    >
      {icon}
      <span className={`text-sm ${key === 'mobility' && !expandedMobility ? 'truncate max-w-[120px]' : ''}`}>
        {text}
      </span>
      {key === 'mobility' && (
        <span className="ml-1">
          {expandedMobility ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </span>
      )}
      {key === 'mobility' && !expandedMobility && (
        <span className="absolute -bottom-5 left-0 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
          Click to expand
        </span>
      )}
    </div>
  );

  return (
    <div className="hidden md:grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto w-full">
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
          <h1 className="text-6xl font-bold tracking-tight text-gray-900">
            Kikia Dia
          </h1>
          <p className="text-2xl text-[#18181b] whitespace-pre-line">
            {content[language].role}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
            {content[language].description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-2"
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                {renderPersonalDetail(icons[key as keyof typeof icons], value, key)}
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-4 pt-4"
        >
          <Button
            className="hover:bg-white hover:text-[#18181b] bg-[#18181b] text-white transition-colors"
            onClick={() => {
              const projectsSection = document.getElementById("projects");
              projectsSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {content[language].viewProjects}
          </Button>
          <Button
            variant="outline"
            className="border-gray-600 text-gray-700 hover:bg-white hover:text-[#18181b] transition-colors"
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
          className="overflow-hidden whitespace-nowrap text-lg italic text-[#18181b] text-center animate-typing"
        >
          "{content[language].quote}"
        </motion.div>
      </div>
    </div>
  );
};