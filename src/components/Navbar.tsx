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
  
  const scrollToSection = (sectionId: string) => {
    console.log("Attempting to scroll to section:", sectionId);
    const section = document.getElementById(sectionId);
    
    if (section) {
      console.log("Found section element:", section);
      const navbarHeight = 64;
      
      setIsOpen(false);
      
      setTimeout(() => {
        const sectionRect = section.getBoundingClientRect();
        const absoluteTop = sectionRect.top + window.pageYOffset;
        const scrollPosition = absoluteTop - navbarHeight;
        
        console.log("Calculated scroll position:", scrollPosition);
        
        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth"
        });
        
        setActiveSection(sectionId);
        console.log("Scrolling complete, new active section:", sectionId);
      }, 300);
    } else {
      console.warn("Section not found:", sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#18181b] backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-xl font-bold text-white cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            Kikia Dia
          </motion.h1>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white hover:bg-white hover:text-[#18181b]"
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
                className={`relative text-white hover:bg-white hover:text-[#18181b] transition-colors ${
                  activeSection === key ? "text-white" : "text-gray-300"
                }`}
              >
                {value}
                {activeSection === key && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
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
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#18181b]/95 border-b"
          >
            <div className="flex flex-col p-4 space-y-2">
              {Object.entries(content[language]).map(([key, value]) => (
                <Button
                  key={key}
                  variant="ghost"
                  onClick={() => scrollToSection(key)}
                  className={`w-full text-left justify-start text-white hover:bg-white hover:text-[#18181b] ${
                    activeSection === key ? "text-white" : "text-gray-300"
                  }`}
                >
                  {value}
                  {activeSection === key && (
                    <motion.div
                      layoutId="activeSectionMobile"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};