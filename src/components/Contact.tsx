import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export const Contact = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:dkikia@ept.sn?subject=Portfolio Contact&body=${encodeURIComponent(message)}`;
    toast.success(language === 'en' ? 'Email client opened!' : 'Client email ouvert !');
    setEmail("");
    setMessage("");
  };
  
  return (
    <section id="contact" className="max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {language === 'en' ? 'Get in Touch' : 'Me Contacter'}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="text-[#18181b]" />
                <span>Nantes, France</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-[#18181b]" />
                <a href="mailto:dkikia@ept.sn" className="hover:underline">
                  dkikia@ept.sn
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-[#18181b]" />
                <a href="tel:+33766523097" className="hover:underline">
                  +33 7 66 52 30 97
                </a>
              </div>
              <div className="flex gap-4 justify-start mt-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]"
                  asChild
                >
                  <a
                    href="https://github.com/KikiaDia"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/kikia-dia/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder={language === 'en' ? 'Your email' : 'Votre email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Textarea
                placeholder={language === 'en' ? 'Your message' : 'Votre message'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="min-h-[100px]"
              />
              <Button 
                type="submit"
                className="w-full bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]"
              >
                <Send className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Send Message' : 'Envoyer'}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};