import { Button } from "../ui/button";
import { User, Calendar, IdCard, MapPin, Flag, Plane, ChevronDown, ChevronUp, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { content } from "./content";

export const MobileHero = () => {
  const { language } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);
  const [expandedMobility, setExpandedMobility] = useState(false);

  const renderPersonalDetail = (icon: React.ReactNode, text: string, key: string) => (
    <div 
      className={`flex items-center space-x-3 p-3 rounded-xl ${
        key === 'mobility' ? 'cursor-pointer' : ''
      }`}
      style={{
        background: 'linear-gradient(135deg, hsl(220 40% 13%) 0%, hsl(220 35% 22%) 100%)',
        color: 'white',
      }}
      onClick={() => {
        if (key === 'mobility') {
          setExpandedMobility(!expandedMobility);
        }
      }}
    >
      <span className="opacity-80">{icon}</span>
      <span className={`text-sm font-medium ${key === 'mobility' && !expandedMobility ? 'truncate max-w-[140px]' : ''}`}>
        {text}
      </span>
      {key === 'mobility' && (
        <span className="ml-auto opacity-60">
          {expandedMobility ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      )}
    </div>
  );

  return (
    <div className="md:hidden space-y-8 px-4">
      <div className="max-w-[320px] mx-auto space-y-4 text-center">
        <h1 className="text-4xl font-display font-bold tracking-tight text-foreground">
          Kikia Dia
        </h1>
        <p className="text-lg font-medium text-primary">
          {content[language].role}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {content[language].description}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[280px] mx-auto"
      >
        <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl blur-xl" />
        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-elegant border-4 border-card">
          <img 
            src="/lovable-uploads/2e7c3ea0-3746-4917-ade5-e611f01f6fe0.png" 
            alt="Kikia Dia"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          {content[language].personalDetails}
          {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 gap-2 max-w-[320px] mx-auto"
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
                transition={{ delay: 0.05 * index }}
              >
                {renderPersonalDetail(icons[key as keyof typeof icons], value, key)}
              </motion.div>
            );
          })}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-3 max-w-[320px] mx-auto"
      >
        <Button
          className="w-full btn-primary"
          onClick={() => {
            const projectsSection = document.getElementById("projects");
            projectsSection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {content[language].viewProjects}
        </Button>
        <Button
          variant="outline"
          className="w-full border-2 border-border hover:bg-card hover:border-primary/30"
          onClick={() => {
            const contactSection = document.getElementById("contact");
            contactSection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {content[language].contactMe}
        </Button>
        <Button
          variant="outline"
          className="w-full border-2 border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
          asChild
        >
          <a href="/CV_Kikia_Dia.pdf" download className="flex items-center justify-center gap-2">
            <Download className="h-4 w-4" />
            {content[language].downloadCV}
          </a>
        </Button>
      </motion.div>
    </div>
  );
};
