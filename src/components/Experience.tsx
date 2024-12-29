import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronDown } from "lucide-react";

const experiences = {
  en: [
    {
      title: "Final Year Project Internship - Orange Sonatel",
      period: "September 2023 – June 2024",
      location: "Dakar, Senegal",
      description: "Improving Customer Experience through AI and Data",
      logo: "/lovable-uploads/44a8ec3d-64f0-4af0-af25-90b3e3d6bb62.png",
      companyUrl: "https://www.orange.sn/",
      projectUrl: "https://github.com/yourusername/orange-sonatel-project", // Add your actual project URL here
      responsibilities: [
        "Development of sentiment analysis model to detect vulnerable customers during phone interactions",
        "Development of Topic Modeling to detect customer call patterns",
        "Development of forecasting model for predicting phone call flows",
        "Deployment of Machine Learning Models in REST APIs",
        "Transcription of phone audio conversations with OpenAI's Whisper model",
        "Automation of KPI calculations",
        "Implementation of dashboards",
        "Close collaboration with technical team for model integration"
      ],
      tools: ["Python", "LDA", "Whisper OpenAi", "distilcamembert-base-sentiment", "Hugging Face", "SARIMA", "Flask", "SVM", "Angular", "Scrum"]
    },
    {
      title: "Backend Developer Intern - Team X Group",
      period: "September 2022 – December 2022",
      location: "Dakar, Senegal",
      description: "Web and Mobile Platform Development",
      logo: "/lovable-uploads/69f3ee3d-7d45-4d59-bc70-6700666fc4e5.png",
      companyUrl: "https://teamxgroup.com/",
      responsibilities: [
        "Development of business logic for mobile and web backend platforms with NestJS",
        "Structuring and managing data flows with MongoDB",
        "Using request testing tools (Postman)"
      ],
      tools: ["Javascript", "Node.js", "MongoDB", "Postman", "Mongoose", "REST API", "CRUD"]
    }
  ],
  fr: [
    {
      title: "Alternance Projet Fin d'étude - Orange Sonatel",
      period: "Septembre 2023 – Juin 2024",
      location: "Dakar, Sénégal",
      description: "Amélioration de l'expérience client par l'IA et la Data",
      logo: "/lovable-uploads/44a8ec3d-64f0-4af0-af25-90b3e3d6bb62.png",
      companyUrl: "https://www.orange.sn/",
      projectUrl: "https://github.com/yourusername/orange-sonatel-project", // Add your actual project URL here
      responsibilities: [
        "Développement de modèle d'analyse de sentiment pour détecter les clients fragiles lors des interactions téléphoniques",
        "Développement de Topic Modeling pour détecter les motifs d'appels des clients",
        "Développement de modèle de forecasting pour la prédiction de flux d'appels téléphoniques",
        "Déploiement de Modèles de machine learning dans des API REST",
        "Transcription de conversations audio téléphoniques avec le modèle Whisper d'OpenAI",
        "Automatisation du calcul de KPIs",
        "Mise en place de dashboards",
        "Collaboration étroite avec l'équipe technique pour l'intégration des modèles"
      ],
      tools: ["Python", "LDA", "Whisper OpenAi", "distilcamembert-base-sentiment", "Hugging Face", "SARIMA", "Flask", "SVM", "Angular", "Scrum"]
    },
    {
      title: "Stage Développeur Backend - Team X Group",
      period: "Septembre 2022 – Décembre 2022",
      location: "Dakar, Sénégal",
      description: "Développement de plateformes Web et Mobiles",
      logo: "/lovable-uploads/69f3ee3d-7d45-4d59-bc70-6700666fc4e5.png",
      companyUrl: "https://teamxgroup.com/",
      responsibilities: [
        "Développer la logique métier de plateformes mobiles et web backend avec NestJS",
        "Structurer et gérer le flux de données avec MongoDB",
        "Utiliser des outils de test de requêtes (Postman)"
      ],
      tools: ["Javascript", "Node.js", "MongoDB", "Postman", "Mongoose", "API Rest", "CRUD"]
    }
  ]
};

export const Experience = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showResponsibilities, setShowResponsibilities] = useState<number | null>(null);
  const [autoplayPlugin] = useState(() => 
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
      slidesToScroll: 1,
      skipSnaps: false
    },
    [autoplayPlugin]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      });
      
      // Pause autoplay when showing responsibilities
      if (showResponsibilities !== null) {
        autoplayPlugin.stop();
      } else {
        autoplayPlugin.play();
      }
      
      emblaApi.reInit();
    }
    
    return () => {
      if (emblaApi) {
        emblaApi.destroy();
      }
    };
  }, [emblaApi, showResponsibilities, autoplayPlugin]);

  const handleShowResponsibilities = (index: number) => {
    setShowResponsibilities(showResponsibilities === index ? null : index);
    if (autoplayPlugin) {
      if (showResponsibilities === index) {
        autoplayPlugin.play();
      } else {
        autoplayPlugin.stop();
      }
    }
  };

  return (
    <section id="experience" className="py-20 px-4 bg-secondary/50">
      <h2 className="section-title">{language === 'en' ? 'Professional Experience' : 'Expérience Professionnelle'}</h2>
      <div className="max-w-4xl mx-auto">
        <Carousel 
          ref={emblaRef}
          className="w-full"
        >
          <CarouselContent>
            {experiences[language].map((exp, index) => (
              <CarouselItem key={index} className="w-full">
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
                        onClick={() => handleShowResponsibilities(index)}
                      >
                        <ChevronDown 
                          className={`w-5 h-5 transition-transform ${
                            showResponsibilities === index ? 'rotate-180' : ''
                          }`}
                        />
                        <span className="font-medium">
                          {language === 'en' ? 'View Responsibilities' : 'Voir les Responsabilités'}
                        </span>
                      </div>
                      
                      {showResponsibilities === index && (
                        <motion.ul 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="list-disc list-inside space-y-2 mb-4 text-sm"
                        >
                          {exp.responsibilities.map((resp, idx) => (
                            <li key={idx} className="text-muted-foreground">{resp}</li>
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              {experiences[language].map((_, index) => (
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
