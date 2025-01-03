import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Languages, Theater, Activity, Utensils } from "lucide-react";

const languageSkills = {
  en: [
    { language: "French", level: 100, isNative: true },
    { language: "English", level: 90, isNative: false }
  ],
  fr: [
    { language: "Français", level: 100, isNative: true },
    { language: "Anglais", level: 90, isNative: false }
  ]
};

const hobbies = {
  en: [
    { name: "Theater", icon: Theater, description: "Passionate about performing arts" },
    { name: "Cooking", icon: Utensils, description: "Love experimenting with recipes" },
    { name: "Sports", icon: Activity, description: "Regular physical activities" }
  ],
  fr: [
    { name: "Théâtre", icon: Theater, description: "Passionnée par les arts de la scène" },
    { name: "Cuisine", icon: Utensils, description: "J'aime expérimenter de nouvelles recettes" },
    { name: "Sport", icon: Activity, description: "Activités physiques régulières" }
  ]
};

export const LanguagesAndHobbies = () => {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
      {/* Languages Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          {language === 'en' ? 'Languages' : 'Langues'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {languageSkills[language].map((lang, index) => (
            <motion.div
              key={lang.language}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <Languages className="h-6 w-6 text-gray-700" />
                <h3 className="text-lg font-semibold">{lang.language}</h3>
                {lang.isNative && (
                  <span className="text-sm text-gray-500">
                    ({language === 'en' ? 'Native' : 'Langue maternelle'})
                  </span>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-[#18181b] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${lang.level}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hobbies Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          {language === 'en' ? 'Hobbies' : 'Loisirs'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {hobbies[language].map((hobby, index) => (
            <motion.div
              key={hobby.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="flex flex-col items-center gap-3">
                <hobby.icon className="h-8 w-8 text-gray-700" />
                <h3 className="text-lg font-semibold">{hobby.name}</h3>
                <p className="text-sm text-gray-600">{hobby.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};