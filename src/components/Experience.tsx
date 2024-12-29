import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ExperienceCard } from "./experience/ExperienceCard";

const experiences = {
  en: [
    {
      title: "Final Year Project Internship - Orange Sonatel",
      period: "September 2023 – June 2024",
      location: "Dakar, Senegal",
      description: "Improving Customer Experience through AI and Data",
      logo: "/lovable-uploads/44a8ec3d-64f0-4af0-af25-90b3e3d6bb62.png",
      companyUrl: "https://www.orange.sn/",
      projectUrl: "https://github.com/yourusername/orange-sonatel-project",
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
      projectUrl: "https://github.com/yourusername/orange-sonatel-project",
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
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      duration: 30,
      dragFree: true
    },
    [autoplayPlugin]
  );

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      };

      emblaApi.on('select', onSelect);
      
      if (showResponsibilities !== null) {
        autoplayPlugin.stop();
      } else {
        autoplayPlugin.play();
      }

      return () => {
        emblaApi.off('select', onSelect);
      };
    }
  }, [emblaApi, showResponsibilities, autoplayPlugin]);

  const handleToggleResponsibilities = (index: number) => {
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
      <h2 className="section-title">
        {language === 'en' ? 'Professional Experience' : 'Expérience Professionnelle'}
      </h2>
      <div className="max-w-4xl mx-auto">
        <Carousel 
          ref={emblaRef}
          className="w-full"
          opts={{
            loop: true,
            align: "center",
            duration: 30,
            dragFree: true
          }}
        >
          <CarouselContent>
            {experiences[language].map((exp, index) => (
              <CarouselItem key={index} className="w-full">
                <ExperienceCard
                  exp={exp}
                  showResponsibilities={showResponsibilities === index}
                  onToggleResponsibilities={() => handleToggleResponsibilities(index)}
                  language={language}
                  index={index}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]" />
          <CarouselNext className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]" />
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
                    onClick={() => {
                      emblaApi?.scrollTo(index);
                      if (autoplayPlugin) {
                        autoplayPlugin.stop();
                      }
                    }}
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
