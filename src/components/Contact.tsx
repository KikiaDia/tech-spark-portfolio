import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

export const Contact = () => {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto contact-container">
      <h2 className="text-2xl font-bold mb-8 text-center text-[#18181b]">
        {language === 'en' ? 'Contact Me' : 'Me Contacter'}
      </h2>
      
      <div className="grid grid-cols-1 gap-8">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="contact-item"
            whileHover={{ scale: 1.02 }}
          >
            <div className="contact-icon-container">
              <Mail className="contact-icon" />
            </div>
            <a 
              href="mailto:kikia.dia@gmail.com" 
              className="contact-link"
            >
              kikia.dia@gmail.com
            </a>
          </motion.div>
          
          <motion.div 
            className="contact-item"
            whileHover={{ scale: 1.02 }}
          >
            <div className="contact-icon-container">
              <Phone className="contact-icon" />
            </div>
            <a 
              href="tel:+33749457812" 
              className="contact-link"
            >
              +33 7 49 45 78 12
            </a>
          </motion.div>
          
          <motion.div 
            className="contact-item"
            whileHover={{ scale: 1.02 }}
          >
            <div className="contact-icon-container">
              <Github className="contact-icon" />
            </div>
            <a 
              href="https://github.com/kikiadoc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              github.com/kikiadoc
            </a>
          </motion.div>
          
          <motion.div 
            className="contact-item"
            whileHover={{ scale: 1.02 }}
          >
            <div className="contact-icon-container">
              <Linkedin className="contact-icon" />
            </div>
            <a 
              href="https://www.linkedin.com/in/kikia-dia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              linkedin.com/in/kikia-dia
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};