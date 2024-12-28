import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export const Contact = () => {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto glass-card p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">
        {language === 'en' ? 'Contact Me' : 'Me Contacter'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4 hover:translate-x-2 transition-transform">
            <Mail className="h-6 w-6 text-[#18181b]" />
            <a 
              href="mailto:kikia.dia@gmail.com" 
              className="text-[#18181b] hover:underline"
            >
              kikia.dia@gmail.com
            </a>
          </div>
          
          <div className="flex items-center gap-4 hover:translate-x-2 transition-transform">
            <Phone className="h-6 w-6 text-[#18181b]" />
            <a 
              href="tel:+33749457812" 
              className="text-[#18181b] hover:underline"
            >
              +33 7 49 45 78 12
            </a>
          </div>
          
          <div className="flex items-center gap-4 hover:translate-x-2 transition-transform">
            <Github className="h-6 w-6 text-[#18181b]" />
            <a 
              href="https://github.com/kikiadoc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#18181b] hover:underline"
            >
              github.com/kikiadoc
            </a>
          </div>
          
          <div className="flex items-center gap-4 hover:translate-x-2 transition-transform">
            <Linkedin className="h-6 w-6 text-[#18181b]" />
            <a 
              href="https://www.linkedin.com/in/kikia-dia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#18181b] hover:underline"
            >
              linkedin.com/in/kikia-dia
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};