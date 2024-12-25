import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Mail, Linkedin, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

const content = {
  en: {
    title: "Get In Touch",
    description: "Feel free to reach out for opportunities or collaborations",
    sendEmail: "Send Email",
    subject: "Subject",
    message: "Message",
    send: "Send",
    emailSent: "Email sent successfully!",
    emailError: "Error sending email. Please try again."
  },
  fr: {
    title: "Contact",
    description: "N'hésitez pas à me contacter pour des opportunités ou des collaborations",
    sendEmail: "Envoyer un Email",
    subject: "Sujet",
    message: "Message",
    send: "Envoyer",
    emailSent: "Email envoyé avec succès !",
    emailError: "Erreur lors de l'envoi de l'email. Veuillez réessayer."
  }
};

export const Contact = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = () => {
    const mailtoLink = `mailto:dkikia@ept.sn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
    toast({
      title: content[language].emailSent,
      duration: 3000,
    });
    setSubject("");
    setMessage("");
  };

  return (
    <section id="contact" className="py-20 px-4">
      <h2 className="section-title">{content[language].title}</h2>
      <Card className="max-w-2xl mx-auto glass-card">
        <CardHeader>
          <CardTitle>{content[language].title}</CardTitle>
          <CardDescription>{content[language].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <a href="mailto:dkikia@ept.sn" className="hover:text-primary">
              dkikia@ept.sn
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <span>+33 07 60 76 19 31</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <span>Nantes, France</span>
          </div>
          <div className="flex items-center gap-3">
            <Linkedin className="w-5 h-5 text-muted-foreground" />
            <a
              href="https://www.linkedin.com/in/kikiadia/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              linkedin.com/in/kikiadia
            </a>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full mt-4 hover-scale">
                {content[language].sendEmail}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{content[language].sendEmail}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder={content[language].subject}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <Textarea
                  placeholder={content[language].message}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                />
                <Button onClick={handleSendEmail} className="w-full">
                  {content[language].send}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </section>
  );
};