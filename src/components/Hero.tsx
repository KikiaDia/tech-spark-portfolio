import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { DesktopHero } from "./hero/DesktopHero";
import { MobileHero } from "./hero/MobileHero";
import { content } from "./hero/content";

export const Hero = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <section id="hero" className="min-h-screen flex items-center px-4 md:px-8 py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      
      {/* Subtle decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed top-20 right-4 z-50 bg-card/80 backdrop-blur-sm border-border hover:bg-card shadow-card transition-all duration-300 hover:shadow-card-hover"
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            >
              <Languages className="h-5 w-5 text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{content[language].changeLanguage}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="relative z-10 w-full">
        <DesktopHero />
        <MobileHero />
      </div>
    </section>
  );
};
