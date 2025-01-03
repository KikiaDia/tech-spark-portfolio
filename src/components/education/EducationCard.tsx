import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface EducationCardProps {
  edu: {
    period: string;
    degree: string;
    school: string;
    location: string;
    logo: string;
    schoolUrl: string;
    courses?: string[];
  };
  showCourses: boolean;
  onToggleResponsibilities: () => void;
  language: string;
  index: number;
}

export const EducationCard = ({
  edu,
  showCourses,
  onToggleResponsibilities,
  language,
  index,
}: EducationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="glass-card hover:bg-white hover:text-[#18181b]">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="flex items-center gap-4">
              <a 
                href={edu.schoolUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src={edu.logo} 
                  alt={edu.school}
                  className="w-16 h-16 object-contain rounded-lg"
                />
              </a>
              <div>
                <CardTitle className="text-xl">{edu.degree}</CardTitle>
                <p className="text-muted-foreground">{edu.school}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{edu.period}</p>
              <p className="text-sm text-muted-foreground">{edu.location}</p>
            </div>
          </div>
        </CardHeader>
        {edu.courses && (
          <CardContent>
            <div 
              className="flex items-center gap-2 mb-4 cursor-pointer hover:text-[#18181b]"
              onClick={onToggleResponsibilities}
            >
              <ChevronDown 
                className={`w-5 h-5 transition-transform ${
                  showCourses ? 'rotate-180' : ''
                }`}
              />
              <span className="font-medium">
                {language === 'en' ? 'View Courses' : 'Voir les Cours'}
              </span>
            </div>
            
            {showCourses && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-2"
              >
                {edu.courses.map((course, idx) => (
                  <div 
                    key={idx} 
                    className="text-sm text-muted-foreground hover:text-[#18181b] transition-colors duration-300 p-2 rounded-lg bg-[#18181b]/5"
                  >
                    <span className="inline-block w-1 h-1 bg-[#18181b] rounded-full mr-2"></span>
                    {course}
                  </div>
                ))}
              </motion.div>
            )}
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};