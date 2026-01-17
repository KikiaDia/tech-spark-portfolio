import { Button } from "../ui/button";
import { User, Calendar, IdCard, MapPin, Flag, Plane, ChevronDown, ChevronUp, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { content } from "./content";
import { useState } from "react";

export const DesktopHero = () => {
  const { language } = useLanguage();
  const [expandedMobility, setExpandedMobility] = useState(false);

  const renderPersonalDetail = (icon: React.ReactNode, text: string, key: string) => (
    <div 
      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
        key === 'mobility' ? 'cursor-pointer' : ''
      }`}
      style={{
        background: 'linear-gradient(135deg, hsl(220 40% 13%) 0%, hsl(220 35% 22%) 100%)',
        color: 'white',
        boxShadow: '0 4px 15px -3px hsla(220, 40%, 13%, 0.3)',
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
    <div className="hidden md:grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground">
            Kikia Dia
          </h1>
          <p className="text-xl lg:text-2xl font-medium text-primary whitespace-pre-line max-w-xl">
            {content[language].role}
          </p>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed whitespace-pre-line max-w-xl">
            {content[language].description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 gap-3"
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (0.1 * index), duration: 0.4 }}
              >
                {renderPersonalDetail(icons[key as keyof typeof icons], value, key)}
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex gap-4 pt-2"
        >
          <Button
            className="btn-primary px-8 py-3 text-base"
            onClick={() => {
              const projectsSection = document.getElementById("projects");
              projectsSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {content[language].viewProjects}
          </Button>
          <Button
            variant="outline"
            className="px-8 py-3 text-base border-2 border-border hover:bg-card hover:border-primary/30 transition-all duration-300"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              contactSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {content[language].contactMe}
          </Button>
          <Button
            variant="outline"
            className="px-8 py-3 text-base border-2 border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
            asChild
          >
            <a href="/CV_Kikia_Dia.pdf" download className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              {content[language].downloadCV}
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-8"
      >
        <div className="relative w-full max-w-md mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl blur-2xl" />
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-elegant border-4 border-card">
            <img 
              src="/lovable-uploads/2e7c3ea0-3746-4917-ade5-e611f01f6fe0.png" 
              alt="Kikia Dia"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-lg italic text-muted-foreground font-display">
            "{content[language].quote}"
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
