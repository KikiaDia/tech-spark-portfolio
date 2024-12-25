import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const content = {
  en: {
    home: "Home",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    certifications: "Certifications",
    contact: "Contact"
  },
  fr: {
    home: "Accueil",
    experience: "Expérience",
    projects: "Projets",
    skills: "Compétences",
    certifications: "Certifications",
    contact: "Contact"
  }
};

export const Navbar = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-xl font-bold"
          >
            Kikia Dia
          </motion.h1>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="hidden md:flex items-center space-x-8">
            {Object.entries(content[language]).map(([key, value]) => (
              <Button 
                key={key}
                variant="ghost" 
                onClick={() => scrollToSection(key)}
                className="hover:text-primary transition-colors"
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 border-b"
          >
            <div className="flex flex-col p-4 space-y-2">
              {Object.entries(content[language]).map(([key, value]) => (
                <Button
                  key={key}
                  variant="ghost"
                  onClick={() => scrollToSection(key)}
                  className="w-full text-left justify-start"
                >
                  {value}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};