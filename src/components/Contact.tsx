import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Contact = () => {
  const { language } = useLanguage();
  
  return (
    <section id="contact" className="max-w-4xl mx-auto">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {language === 'en' ? 'Get in Touch' : 'Me Contacter'}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-[#18181b]" />
            <span>Nantes, France</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="text-[#18181b]" />
            <a href="mailto:kikia.dia@gmail.com" className="hover:underline">
              kikia.dia@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="text-[#18181b]" />
            <a href="tel:+33766523097" className="hover:underline">
              +33 7 66 52 30 97
            </a>
          </div>
          <div className="flex gap-4 justify-center mt-4">
            <Button
              variant="outline"
              size="icon"
              className="bg-[#18181b] text-white hover:bg-[#18181b]/80"
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
              className="bg-[#18181b] text-white hover:bg-[#18181b]/80"
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
        </CardContent>
      </Card>
    </section>
  );
};