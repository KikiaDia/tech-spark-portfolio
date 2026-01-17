import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const content = {
  en: {
    education: "Education",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    certifications: "Certifications",
    contact: "Contact"
  },
  fr: {
    education: "Formation",
    experience: "Expériences",
    projects: "Projets",
    skills: "Compétences",
    certifications: "Certifications",
    contact: "Contact"
  }
};

export const Navbar = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    
    if (section) {
      const navbarHeight = 64;
      setIsOpen(false);
      
      setTimeout(() => {
        const sectionRect = section.getBoundingClientRect();
        const absoluteTop = sectionRect.top + window.pageYOffset;
        const scrollPosition = absoluteTop - navbarHeight;
        
        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth"
        });
        
        setActiveSection(sectionId);
      }, 300);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = Object.keys(content[language]).map(key => 
        document.getElementById(key)
      );
      
      const current = sections.reduce((acc, section) => {
        if (!section) return acc;
        const rect = section.getBoundingClientRect();
        const navbarHeight = 64;
        if (rect.top <= navbarHeight + 100 && rect.bottom >= navbarHeight) {
          return section.id;
        }
        return acc;
      }, "home");
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [language]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-navy/95 backdrop-blur-xl shadow-elegant border-b border-primary/20' 
        : 'bg-navy/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-xl font-display font-bold cursor-pointer text-white transition-colors duration-300"
            onClick={() => scrollToSection('home')}
          >
            Kikia Dia
          </motion.h1>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white hover:bg-white/20 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="hidden md:flex items-center space-x-1">
            {Object.entries(content[language]).map(([key, value]) => (
              <Button 
                key={key}
                variant="ghost" 
                onClick={() => scrollToSection(key)}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === key 
                    ? 'text-white bg-white/20' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {value}
                {activeSection === key && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-navy/95 backdrop-blur-xl border-b border-primary/20 shadow-lg"
          >
            <div className="flex flex-col p-4 space-y-1">
              {Object.entries(content[language]).map(([key, value]) => (
                <Button
                  key={key}
                  variant="ghost"
                  onClick={() => scrollToSection(key)}
                  className={`w-full text-left justify-start rounded-lg font-medium transition-all ${
                    activeSection === key 
                      ? 'text-white bg-white/20' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
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
