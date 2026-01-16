import { Github, Linkedin, MapPin, Mail, Phone, Link } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ContactInfo = () => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-white/90">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-white/70" />
          <span>Châtillon, 92320, France</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-white/70" />
          <a href="mailto:dkikia@ept.sn" className="hover:text-white transition-colors">
            dkikia@ept.sn
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-white/70" />
          <a href="tel:+33766523097" className="hover:text-white transition-colors">
            +33 7 60 76 19 31
          </a>
        </div>
      </div>
      
      <div className="flex items-center gap-4 justify-center pt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href="https://github.com/KikiaDia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <Github className="h-5 w-5 text-white" />
              </a>
            </TooltipTrigger>
            <TooltipContent><p>GitHub</p></TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href="https://www.linkedin.com/in/kikiadia/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <Linkedin className="h-5 w-5 text-white" />
              </a>
            </TooltipTrigger>
            <TooltipContent><p>LinkedIn</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href="https://huggingface.co/Kikia26" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <Link className="h-5 w-5 text-white" />
              </a>
            </TooltipTrigger>
            <TooltipContent><p>Hugging Face</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};
