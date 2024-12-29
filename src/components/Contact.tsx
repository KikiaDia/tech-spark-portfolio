import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

export const Contact = () => {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto p-8 rounded-lg bg-white shadow-lg">
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
            className="flex items-center gap-4 hover:translate-x-2 transition-transform bg-gray-50/80 p-4 rounded-lg shadow-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-2 bg-[#18181b] rounded-full">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <a 
              href="mailto:kikia.dia@gmail.com" 
              className="text-[#18181b] hover:underline font-medium"
            >
              kikia.dia@gmail.com
            </a>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4 hover:translate-x-2 transition-transform bg-gray-50/80 p-4 rounded-lg shadow-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-2 bg-[#18181b] rounded-full">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <a 
              href="tel:+33749457812" 
              className="text-[#18181b] hover:underline font-medium"
            >
              +33 7 49 45 78 12
            </a>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4 hover:translate-x-2 transition-transform bg-gray-50/80 p-4 rounded-lg shadow-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-2 bg-[#18181b] rounded-full">
              <Github className="h-6 w-6 text-white" />
            </div>
            <a 
              href="https://github.com/kikiadoc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#18181b] hover:underline font-medium"
            >
              github.com/kikiadoc
            </a>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4 hover:translate-x-2 transition-transform bg-gray-50/80 p-4 rounded-lg shadow-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-2 bg-[#18181b] rounded-full">
              <Linkedin className="h-6 w-6 text-white" />
            </div>
            <a 
              href="https://www.linkedin.com/in/kikia-dia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#18181b] hover:underline font-medium"
            >
              linkedin.com/in/kikia-dia
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};