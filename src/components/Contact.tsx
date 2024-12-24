import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Mail, Linkedin, MapPin, Phone } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4">
      <h2 className="section-title">Get In Touch</h2>
      <Card className="max-w-2xl mx-auto glass-card">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Feel free to reach out for opportunities or collaborations</CardDescription>
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
          <Button className="w-full mt-4 hover-scale" asChild>
            <a href="mailto:dkikia@ept.sn">Send Email</a>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};