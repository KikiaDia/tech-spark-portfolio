import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Languages, Theater, Run, Utensils } from "lucide-react";

const languageSkills = {
  en: [
    { language: "English", level: 90 },
    { language: "French", level: 95 }
  ],
  fr: [
    { language: "Anglais", level: 90 },
    { language: "Français", level: 95 }
  ]
};

const hobbies = {
  en: [
    { name: "Theater", icon: Theater },
    { name: "Jogging", icon: Run },
    { name: "Cooking", icon: Utensils }
  ],
  fr: [
    { name: "Théâtre", icon: Theater },
    { name: "Jogging", icon: Run },
    { name: "Cuisine", icon: Utensils }
  ]
};

export const LanguagesAndHobbies = () => {
  const { language } = useLanguage();

  return (
    <section className="py-20 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Languages Section */}
        <div>
          <h2 className="section-title">
            <Languages className="inline-block mr-2 mb-1" />
            {language === 'en' ? 'Languages' : 'Langues'}
          </h2>
          <div className="space-y-6">
            {languageSkills[language].map((lang, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card">
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{lang.language}</span>
                        <span>{lang.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${lang.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-[#18181b] rounded-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hobbies Section */}
        <div>
          <h2 className="section-title">
            {language === 'en' ? 'Hobbies' : 'Loisirs'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {hobbies[language].map((hobby, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card hover-scale">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <hobby.icon className="w-12 h-12 mb-4" />
                    <p className="text-center font-medium">{hobby.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};