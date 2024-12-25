import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const certifications = {
  en: [
    {
      title: "Introduction to Natural Language Processing",
      issuer: "OpenClassroom",
      date: "November 2024",
      link: "#"
    }
  ],
  fr: [
    {
      title: "Introduction au Traitement du Langage Naturel",
      issuer: "OpenClassroom",
      date: "Novembre 2024",
      link: "#"
    }
  ]
};

export const Certifications = () => {
  const { language } = useLanguage();

  return (
    <section id="certifications" className="py-20 px-4 bg-secondary/50">
      <h2 className="section-title">
        {language === 'en' ? 'Certifications' : 'Certifications'}
      </h2>
      <div className="max-w-4xl mx-auto grid gap-6">
        {certifications[language].map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card hover-scale">
              <CardHeader>
                <CardTitle className="text-xl">{cert.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{cert.issuer}</p>
                <p className="text-sm text-muted-foreground">{cert.date}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};