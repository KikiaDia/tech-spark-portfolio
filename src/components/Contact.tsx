import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Github, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

export const Contact = () => {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center text-[#18181b]">
        {language === 'en' ? 'Get in Touch' : 'Me Contacter'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
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
              +33 7 66 52 30 97
            </a>
          </div>
          
          <div className="flex items-center gap-4 mt-6">
            <a 
              href="https://github.com/kikiadoc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-black rounded-lg hover:bg-black/80 transition-colors"
            >
              <Github className="h-5 w-5 text-white" />
            </a>
            
            <a 
              href="https://www.linkedin.com/in/kikia-dia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-black rounded-lg hover:bg-black/80 transition-colors"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = `mailto:dkikia@ept.sn?subject=Contact from Portfolio&body=${e.currentTarget.message.value}`;
          }}
        >
          <div>
            <input
              type="email"
              name="email"
              placeholder={language === 'en' ? 'Your email' : 'Votre email'}
              className="w-full p-3 rounded-lg border border-black focus:outline-none focus:ring-0 focus:border-black text-black"
              required
            />
          </div>
          
          <div>
            <textarea
              name="message"
              placeholder={language === 'en' ? 'Your message' : 'Votre message'}
              rows={6}
              className="w-full p-3 rounded-lg border border-black focus:outline-none focus:ring-0 focus:border-black resize-none text-black"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-black hover:bg-black/80 text-white flex items-center justify-center gap-2 rounded-lg"
          >
            <span>{language === 'en' ? 'Send Message' : 'Envoyer'}</span>
          </Button>
        </motion.form>
      </div>
    </div>
  );
};