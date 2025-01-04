import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ContactForm = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Début de la soumission du formulaire");
    
    if (!email || !subject || !message) {
      toast({
        variant: "destructive",
        title: language === 'en' ? "Error" : "Erreur",
        description: language === 'en' 
          ? "Please fill in all fields" 
          : "Veuillez remplir tous les champs"
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast({
        variant: "destructive",
        title: language === 'en' ? "Error" : "Erreur",
        description: language === 'en' 
          ? "Please enter a valid email address" 
          : "Veuillez entrer une adresse email valide"
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("Tentative d'envoi d'email via Supabase Edge Function");
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          from: email,
          subject: subject,
          message: message
        }
      });

      console.log("Réponse de la fonction Edge:", { data, error });

      if (error) {
        console.error("Erreur Supabase:", error);
        throw error;
      }
      
      console.log("Email envoyé avec succès");
      toast({
        title: language === 'en' ? "Success" : "Succès",
        description: language === 'en' 
          ? "Message sent successfully" 
          : "Message envoyé avec succès"
      });
      
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error: any) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      toast({
        variant: "destructive",
        title: language === 'en' ? "Error" : "Erreur",
        description: language === 'en' 
          ? "Failed to send message. Please try again later." 
          : "Échec de l'envoi du message. Veuillez réessayer plus tard."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form 
      className="space-y-4 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={language === 'en' ? 'Your email' : 'Votre email'}
          className="w-full p-3 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-0 focus:border-[#e5e7eb] text-black placeholder:text-black/50"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <input
          type="text"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={language === 'en' ? 'Subject' : 'Objet'}
          className="w-full p-3 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-0 focus:border-[#e5e7eb] text-black placeholder:text-black/50"
          required
          disabled={isLoading}
        />
      </div>
      
      <div>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={language === 'en' ? 'Your message' : 'Votre message'}
          rows={6}
          className="w-full p-3 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-0 focus:border-[#e5e7eb] resize-none text-black placeholder:text-black/50"
          required
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-black hover:bg-black/80 text-white flex items-center justify-center gap-2 rounded-lg"
        disabled={isLoading}
      >
        <span>
          {isLoading 
            ? (language === 'en' ? 'Sending...' : 'Envoi...') 
            : (language === 'en' ? 'Send Message' : 'Envoyer')}
        </span>
      </Button>
    </motion.form>
  );
};