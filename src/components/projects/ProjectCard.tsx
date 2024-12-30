import { motion } from "framer-motion";
import { Github, Video } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    banner?: string;
    tags: string[];
    github: string;
    videoUrl?: string;
  };
  index: number;
  language: 'en' | 'fr';
}

export const ProjectCard = ({ project, index, language }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="p-1"
    >
      <Card className="glass-card hover:bg-white hover:text-[#18181b] overflow-hidden h-full">
        {project.banner && (
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={project.banner}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">{project.title}</CardTitle>
          <CardDescription className="text-sm md:text-base">{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b] text-xs md:text-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b] w-full sm:w-auto"
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                {language === 'en' ? 'View Code' : 'Voir le Code'}
              </a>
            </Button>
            {project.videoUrl && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b] w-full sm:w-auto"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Watch Demo' : 'Voir la Démo'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-[95vw] sm:w-full">
                  <DialogHeader>
                    <DialogTitle>{project.title}</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={project.videoUrl}
                      title={project.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};