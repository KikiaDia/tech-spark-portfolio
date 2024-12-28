import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
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

const education = {
  en: [
    {
      period: "2024 – 2025",
      degree: "Master's Degree in Machine Learning and Natural Language Processing (NLP)",
      school: "Nantes University - Faculty of Sciences and Technology",
      location: "Nantes, France",
      courses: [
        "Large Language Models (Transformer architecture)",
        "Static semantic representation",
        "Prompt engineering (Langchain Ollama)",
        "Retrieval Augmented Generation (RAG)",
        "Recurrent Neural Network (RNN)",
        "Convolutional Neural Network (CNN)",
        "Multilayer Perceptron (MLP)",
        "Spark (Dataframe, RDD, Spark streaming)",
        "Google Cloud Platform (GCP)",
        "Automatic summarization",
        "Topic Modeling (LDA)",
        "Agile (Scrum)"
      ]
    },
    {
      period: "2019 – 2024",
      degree: "Engineering Degree in Computer Science",
      school: "Polytechnic School of Thiès",
      location: "Thiès, Senegal",
      courses: [
        "Data Analysis",
        "Software Architecture",
        "Data Modeling",
        "Mathematics",
        "Algorithms",
        "Programming (C, Python, R, Java)",
        "Web Development (HTML/CSS, Bootstrap, Django, JEE)",
        "Database Security and Administration (Relational/Non-relational)",
        "Cryptography",
        "DevOps",
        "Big Data",
        "Cloud Technologies (GCP, AWS, Microsoft Azure)",
        "Machine Learning",
        "Deep Learning",
        "MLOps (MLFlow)"
      ]
    },
    {
      period: "2018 – 2019",
      degree: "Baccalaureate in Experimental Sciences (S2) - With Highest Honors",
      school: "High School",
      location: "Dakar, Senegal"
    }
  ],
  fr: [
    {
      period: "2024 – 2025",
      degree: "Master 2 Machine Learning et Traitement Automatique de la Langue (NLP)",
      school: "Nantes Université - UFR Sciences et Techniques",
      location: "Nantes, France",
      courses: [
        "Large Language Models (Architecture Transformer)",
        "Représentation sémantique statique",
        "Prompt engineering (Langchain Ollama)",
        "Retrieval Augmented Generation (RAG)",
        "Réseau de neurones récurrents (RNN)",
        "Réseau de neurones convolutifs (CNN)",
        "Perceptron multicouche (MLP)",
        "Spark (Dataframe, RDD, Spark streaming)",
        "Google Cloud Platform (GCP)",
        "Résumé automatique",
        "Topic Modeling (LDA)",
        "Agilité (Scrum)"
      ]
    },
    {
      period: "2019 – 2024",
      degree: "Diplôme d'ingénieur de Conception en Informatique",
      school: "École Polytechnique de Thiès",
      location: "Thiès, Sénégal",
      courses: [
        "Analyse de données",
        "Architecture Logicielle",
        "Modélisation de données",
        "Mathématiques",
        "Algorithmique",
        "Programmation (C, Python, R, Java)",
        "Développement Web (HTML/CSS, Bootstrap, Django, JEE)",
        "Sécurité et administration de bases de données (relationnelles/non relationnelles)",
        "Cryptographie",
        "DevOps",
        "Big Data",
        "Technologies Cloud (GCP, AWS, Microsoft Azure)",
        "Machine Learning",
        "Deep Learning",
        "MLOps (MLFlow)"
      ]
    },
    {
      period: "2018 – 2019",
      degree: "Baccalauréat Sciences Expérimentales (S2) - Mention Très Bien",
      school: "Lycée",
      location: "Dakar, Sénégal"
    }
  ]
};

export const Education = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
      slidesToScroll: 1,
      skipSnaps: false
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false, playOnInit: true })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      });
      
      emblaApi.reInit();
    }
    
    return () => {
      if (emblaApi) {
        emblaApi.destroy();
      }
    };
  }, [emblaApi]);

  return (
    <section id="education" className="py-20 px-4 bg-secondary/50">
      <h2 className="section-title">
        {language === 'en' ? 'Education' : 'Formation'}
      </h2>
      <div className="max-w-6xl mx-auto">
        <Carousel ref={emblaRef} className="w-full">
          <CarouselContent>
            {education[language].map((edu, index) => (
              <CarouselItem key={index} className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-card hover:bg-white hover:text-[#18181b]">
                    <CardHeader>
                      <CardTitle className="text-xl">{edu.degree}</CardTitle>
                      <p className="text-muted-foreground">{edu.school}</p>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{edu.period}</span>
                        <span>{edu.location}</span>
                      </div>
                    </CardHeader>
                    {edu.courses && (
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {edu.courses.map((course, idx) => (
                            <div 
                              key={idx}
                              className="text-sm text-muted-foreground flex items-center gap-2"
                            >
                              <span className="w-2 h-2 bg-[#18181b] rounded-full"></span>
                              {course}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b] hidden md:flex" />
          <CarouselNext className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b] hidden md:flex" />
        </Carousel>
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              {education[language].map((_, index) => (
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