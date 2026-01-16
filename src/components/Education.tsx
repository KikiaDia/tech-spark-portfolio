import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { education } from "@/data/education";
import { EducationCarousel } from "./education/EducationCarousel";
import { motion } from "framer-motion";

export const Education = () => {
  const { language } = useLanguage();
  const [showCourses, setShowCourses] = useState<number | null>(null);

  const handleShowCourses = (index: number) => {
    setShowCourses(showCourses === index ? null : index);
  };

  return (
    <section id="education" className="section-container section-subtle">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">
          {language === 'en' ? 'Education' : 'Formation'}
        </h2>
      </motion.div>
      
      <EducationCarousel
        education={education[language]}
        language={language}
        showCourses={showCourses}
        onToggleCourses={handleShowCourses}
      />
    </section>
  );
};
