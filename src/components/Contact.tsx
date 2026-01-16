import { useLanguage } from "@/contexts/LanguageContext";
import { ContactInfo } from "./contact/ContactInfo";
import { motion } from "framer-motion";

export const Contact = () => {
  const { language } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto text-center"
    >
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-white">
        {language === 'en' ? 'Get in Touch' : 'Me Contacter'}
      </h2>
      
      <ContactInfo />
    </motion.div>
  );
};
