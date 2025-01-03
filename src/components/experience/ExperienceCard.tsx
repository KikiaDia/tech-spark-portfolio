import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChevronDown } from "lucide-react";

interface ExperienceCardProps {
  exp: {
    title: string;
    period: string;
    location: string;
    description: string;
    logo: string;
    companyUrl: string;
    projectUrl?: string;
    responsibilities: string[];
    tools: string[];
  };
  showResponsibilities: boolean;
  onToggleResponsibilities: () => void;
  language: string;
  index: number;
}

export const ExperienceCard = ({
  exp,
  showResponsibilities,
  onToggleResponsibilities,
  language,
  index,
}: ExperienceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <Card className="glass-card hover:bg-white hover:text-[#18181b] transition-all duration-300">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="flex items-center gap-4">
              <a 
                href={exp.companyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src={exp.logo} 
                  alt={exp.title}
                  className="w-16 h-16 object-contain rounded-lg"
                />
              </a>
              <div>
                <CardTitle className="text-xl">{exp.title}</CardTitle>
                <p className="text-muted-foreground">{exp.description}</p>
                {exp.projectUrl && (
                  <a
                    href={exp.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link mt-2 inline-block"
                  >
                    {language === 'en' ? 'View Final Year Project' : 'Voir le Projet de Fin d\'Études'}
                  </a>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{exp.period}</p>
              <p className="text-sm text-muted-foreground">{exp.location}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div 
            className="flex items-center gap-2 mb-4 cursor-pointer hover:text-[#18181b]"
            onClick={onToggleResponsibilities}
          >
            <ChevronDown 
              className={`w-5 h-5 transition-transform ${
                showResponsibilities ? 'rotate-180' : ''
              }`}
            />
            <span className="font-medium">
              {language === 'en' ? 'View Responsibilities' : 'Voir les Responsabilités'}
            </span>
          </div>
          
          {showResponsibilities && (
            <motion.ul 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="list-disc list-inside space-y-2 mb-4 text-sm"
            >
              {exp.responsibilities.map((resp, idx) => (
                <li key={idx} className="bg-[#18181b] rounded-full mr-1">{resp}</li>
              ))}
            </motion.ul>
          )}
          
          <div className="flex flex-wrap gap-2 mt-4">
            {exp.tools.map((tool) => (
              <Badge 
                key={tool} 
                variant="secondary" 
                className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b] transition-colors duration-300"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};