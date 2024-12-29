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
              className="absolute top-4 right-4 z-10 text-gray-700 hover:bg-white hover:text-[#18181b]"
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

      <DesktopHero />
      <MobileHero />
    </section>
  );
};