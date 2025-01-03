import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { education } from "@/data/education";
import { EducationCarousel } from "./education/EducationCarousel";

export const Education = () => {
  const { language } = useLanguage();
  const [showCourses, setShowCourses] = useState<number | null>(null);
  const [autoplayPlugin] = useState(() => 
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const handleShowCourses = (index: number) => {
    setShowCourses(showCourses === index ? null : index);
    if (autoplayPlugin) {
      if (showCourses === index) {
        autoplayPlugin.play();
      } else {
        autoplayPlugin.stop();
      }
    }
  };

  return (
    <section id="education" className="py-20 px-4 bg-secondary/50">
      <h2 className="section-title">
        {language === 'en' ? 'Education' : 'Formation'}
      </h2>
      <EducationCarousel
        education={education[language]}
        language={language}
        showCourses={showCourses}
        onToggleCourses={handleShowCourses}
        autoplayPlugin={autoplayPlugin}
      />
    </section>
  );
};