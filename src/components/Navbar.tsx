import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const content = {
  en: {
    home: "Home",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact"
  },
  fr: {
    home: "Accueil",
    experience: "Expérience",
    projects: "Projets",
    skills: "Compétences",
    contact: "Contact"
  }
};

export const Navbar = () => {
  const { language } = useLanguage();
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" onClick={() => scrollToSection("hero")}>
              {content[language].home}
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("experience")}>
              {content[language].experience}
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("projects")}>
              {content[language].projects}
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("skills")}>
              {content[language].skills}
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("contact")}>
              {content[language].contact}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};