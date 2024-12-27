import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, Video } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const projects = {
  en: [
    {
      title: "Agricultural Chatbot Advisor",
      description: "Built an intelligent chatbot for agricultural yield prediction and weather forecasting using RAG and LLMs.",
      banner: "/lovable-uploads/44a8ec3d-64f0-4af0-af25-90b3e3d6bb62.png",
      tags: ["ChatBot", "RAG", "Streamlit", "Docker"],
      github: "https://github.com/KikiaDia/chatbot_agricole",
      videoUrl: "https://youtu.be/your-video-id-1"
    },
    {
      title: "Disaster Detection in Tweets",
      description: "Development, optimization, and deployment of machine learning models to classify tweets into 'disaster' and 'non-disaster' categories.",
      banner: "/lovable-uploads/69f3ee3d-7d45-4d59-bc70-6700666fc4e5.png",
      tags: ["Machine Learning", "Deep Learning", "MLFlow", "EDA"],
      github: "#",
      videoUrl: "https://youtu.be/your-video-id-2"
    },
    {
      title: "Real-time Weather Pipeline",
      description: "Implemented an ETL pipeline using Microsoft Azure for processing and visualizing weather data with forecasting capabilities.",
      tags: ["Azure", "Databricks", "Power BI", "Machine Learning"],
      github: "https://github.com/KikiaDia/Real-time-Weather-Pipeline/tree/main",
    },
    {
      title: "Fintech Fraud Detection",
      description: "Developed ML models to detect suspicious transactions in Fintech, focusing on various transaction types.",
      tags: ["Machine Learning", "Deep Learning", "MLFlow", "EDA"],
      github: "https://github.com/KikiaDia/Fintech_Fraude_Detection",
    },
    {
      title: "PageRank Comparison with PySpark on GCP",
      description: "Compared PageRank with PySpark DataFrame and RDD, analyzing partitioning and cluster performance on Google Cloud Dataproc.",
      tags: ["Big Data", "PySpark", "Google Cloud Dataproc", "Distributed Computing", "PageRank", "Cluster Performance", "Data Partitioning"],
      github: "https://github.com/KikiaDia/PageRank_Project",
    }
  ],
  fr: [
    {
      title: "Chatbot Conseiller Agricole",
      description: "Développement de modèles de prédiction du rendement, de forecasting de prix, de la température et Chatbot agricole.",
      banner: "/lovable-uploads/44a8ec3d-64f0-4af0-af25-90b3e3d6bb62.png",
      tags: ["ChatBot", "RAG", "Streamlit", "Docker"],
      github: "https://github.com/KikiaDia/chatbot_agricole",
      videoUrl: "https://youtu.be/your-video-id-1"
    },
    {
      title: "Détection de Catastrophes dans les Tweets",
      description: "Développement, optimisation et déploiement de modèle de machine learning pour classifier les tweets en catégories 'catastrophe' et 'non-catastrophe'.",
      banner: "/lovable-uploads/69f3ee3d-7d45-4d59-bc70-6700666fc4e5.png",
      tags: ["Machine Learning", "Deep Learning", "MLFlow", "EDA"],
      github: "#",
      videoUrl: "https://youtu.be/your-video-id-2"
    },
    {
      title: "Pipeline en temps réel de données météo",
      description: "Mise en place d'un pipeline ETL basé sur Microsoft Azure pour traiter et visualiser les données météorologiques avec prévisions climatiques.",
      tags: ["Azure", "Databricks", "Power BI", "Machine Learning"],
      github: "https://github.com/KikiaDia/Real-time-Weather-Pipeline/tree/main",
    },
    {
      title: "Détection de Fraude Fintech",
      description: "Développement de modèles ML pour détecter les transactions suspectes dans le secteur Fintech.",
      tags: ["Machine Learning", "Deep Learning", "MLFlow", "EDA"],
      github: "https://github.com/KikiaDia/Fintech_Fraude_Detection",
    },
    {
      title: "Comparaison de PageRank avec PySpark sur GCP",
      description: "Comparaison de PageRank avec PySpark DataFrame et RDD, en analysant le partitionnement et les performances des clusters sur Google Cloud Dataproc.",
      tags: ["Big Data", "PySpark", "Google Cloud Dataproc", "Calcul Distribué", "PageRank", "Performance Cluster", "Partitionnement des Données"],
      github: "https://github.com/KikiaDia/PageRank_Project",
    }
  ]
};

export const Projects = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <h2 className="section-title">{language === 'en' ? 'Featured Projects' : 'Projets'}</h2>
      <div className="max-w-6xl mx-auto">
        <Carousel 
          ref={emblaRef}
          className="w-full"
        >
          <CarouselContent>
            {projects[language].map((project, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-1"
                >
                  <Card className="glass-card hover:bg-white hover:text-[#18181b] overflow-hidden">
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
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <Button variant="outline" size="sm" asChild className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            {language === 'en' ? 'View Code' : 'Voir le Code'}
                          </a>
                        </Button>
                        {project.videoUrl && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]">
                                <Video className="w-4 h-4 mr-2" />
                                {language === 'en' ? 'Watch Demo' : 'Voir la Démo'}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>{project.title}</DialogTitle>
                              </DialogHeader>
                              <div className="aspect-video">
                                <iframe
                                  width="100%"
                                  height="100%"
                                  src={project.videoUrl.replace('youtu.be/', 'youtube.com/embed/')}
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]" />
          <CarouselNext className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]" />
        </Carousel>
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              {projects[language].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentSlide === index}
                    className={`w-2 h-2 rounded-full mx-1 ${
                      currentSlide === index ? 'bg-[#18181b]' : 'bg-gray-300'
                    }`}
                    onClick={() => emblaApi?.scrollTo(index)}
                  />
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
};