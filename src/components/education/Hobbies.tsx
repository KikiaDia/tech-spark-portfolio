import { Theater, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export const Hobbies = () => {
  const hobbies = [
    { name: "Theater", icon: Theater },
    { name: "Reading", icon: BookOpen },
    { name: "Jogging", icon: BookOpen } // Using BookOpen as temporary replacement since Running/Run isn't available
  ];

  return (
    <div className="mt-4">
      <h3 className="font-medium mb-4">Hobbies</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hobbies.map((hobby, index) => {
          const Icon = hobby.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-2 p-3 bg-white/30 backdrop-blur-md rounded-lg hover:bg-white/40 transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span>{hobby.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};