import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

export const Contact = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const mailtoLink = `mailto:kikia.dia@gmail.com?subject=Contact from Portfolio - ${formData.name}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      window.location.href = mailtoLink;
      
      toast({
        title: language === 'en' ? "Email client opened" : "Client email ouvert",
        description: language === 'en' 
          ? "Please send the email from your email client" 
          : "Veuillez envoyer l'email depuis votre client email",
      });
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: language === 'en' ? "Error" : "Erreur",
        description: language === 'en' 
          ? "Failed to open email client" 
          : "Impossible d'ouvrir le client email",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto glass-card p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {language === 'en' ? 'Contact Me' : 'Me Contacter'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder={language === 'en' ? 'Your Name' : 'Votre Nom'}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-white/50"
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder={language === 'en' ? 'Your Email' : 'Votre Email'}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="bg-white/50"
          />
        </div>
        <div>
          <Textarea
            placeholder={language === 'en' ? 'Your Message' : 'Votre Message'}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="min-h-[150px] bg-white/50"
          />
        </div>
        <Button 
          type="submit"
          className="w-full bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]"
        >
          {language === 'en' ? 'Send Message' : 'Envoyer le Message'}
        </Button>
      </form>
    </div>
  );
};