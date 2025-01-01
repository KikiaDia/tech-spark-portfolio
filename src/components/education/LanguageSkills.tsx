import { Languages } from "lucide-react";
import { motion } from "framer-motion";

export const LanguageSkills = () => {
  const languages = [
    { name: "French", level: 100 },
    { name: "English", level: 90 }
  ];

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Languages className="w-5 h-5" />
        <span className="font-medium">Languages</span>
      </div>
      {languages.map((lang, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <div className="flex justify-between text-sm">
            <span>{lang.name}</span>
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
        </motion.div>
      ))}
    </div>
  );
};