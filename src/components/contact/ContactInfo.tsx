import { Github, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const ContactInfo = () => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <MapPin className="h-5 w-5 text-black" />
        <span className="text-black">Nantes, France</span>
      </div>
      
      <div className="flex items-center gap-3">
        <Mail className="h-5 w-5 text-black" />
        <a 
          href="mailto:dkikia@ept.sn" 
          className="text-black hover:underline"
        >
          dkikia@ept.sn
        </a>
      </div>
      
      <div className="flex items-center gap-3">
        <Phone className="h-5 w-5 text-black" />
        <a 
          href="tel:+33766523097" 
          className="text-black hover:underline"
        >
          +33 7 60 76 19 31
        </a>
      </div>
      
      <div className="flex items-center gap-4 mt-6">
        <a 
          href="https://github.com/KikiaDia" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 bg-black rounded-lg hover:bg-black/80 transition-colors"
        >
          <Github className="h-5 w-5 text-white" />
        </a>
        
        <a 
          href="https://www.linkedin.com/in/kikiadia/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 bg-black rounded-lg hover:bg-black/80 transition-colors"
        >
          <Linkedin className="h-5 w-5 text-white" />
        </a>
      </div>
    </motion.div>
  );
};