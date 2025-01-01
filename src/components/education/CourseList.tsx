import { motion } from "framer-motion";

interface CourseListProps {
  courses: string[];
  isVisible: boolean;
}

export const CourseList = ({ courses, isVisible }: CourseListProps) => {
  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4"
    >
      {courses.map((course, idx) => (
        <div 
          key={idx} 
          className="flex items-center gap-2 p-2 bg-white/30 backdrop-blur-md rounded-lg hover:bg-white/40 transition-colors"
        >
          <span className="w-2 h-2 bg-[#18181b] rounded-full"></span>
          <span className="text-sm">{course}</span>
        </div>
      ))}
    </motion.div>
  );
};