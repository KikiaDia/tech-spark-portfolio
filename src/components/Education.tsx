import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronDown, Languages, Theater, Running, BookOpen } from "lucide-react";
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
import { Progress } from "./ui/progress";

const education = {
  en: [
    {
      period: "2024 – 2025",
      degree: "Master's Degree in Machine Learning and Natural Language Processing (NLP)",
      school: "Nantes University - Faculty of Sciences and Technology",
      location: "Nantes, France",
      logo: "/lovable-uploads/universite_de_nantes_logo.jpeg",
      schoolUrl: "https://sciences-techniques.univ-nantes.fr/",
      courses: [
        "Large Language Models (Transformer architecture)",
        "Static semantic representation",
        "Prompt engineering (Langchain, Ollama)",
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
      logo: "/lovable-uploads/1630601408996_ept.jpeg",
      schoolUrl: "https://ept.sn/",
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
      school: "High School - Groupe Scolaire David Diop Mendes",
      location: "Dakar, Senegal",
      logo: "/lovable-uploads/cropped-logo-gsddm.jpg",
      schoolUrl: "https://www.ecoledaviddiopmendes.com/"
    }
  ],
  fr: [
    {
      period: "2024 – 2025",
      degree: "Master 2 Machine Learning et Traitement Automatique de la Langue (NLP)",
      school: "Nantes Université - UFR Sciences et Techniques",
      location: "Nantes, France",
      logo: "/lovable-uploads/universite_de_nantes_logo.jpeg",
      schoolUrl: "https://sciences-techniques.univ-nantes.fr/",
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
      logo: "/lovable-uploads/1630601408996_ept.jpeg",
      schoolUrl: "https://ept.sn/",
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
      school: "Lycée - Groupe Scolaire David Diop Mendes",
      location: "Dakar, Sénégal",
      logo: "/lovable-uploads/cropped-logo-gsddm.jpg",
      schoolUrl: "https://www.ecoledaviddiopmendes.com/"
    }
  ]
};

const languages = {
  en: [
    { language: "French", level: "Native", progress: 100 },
    { language: "English", level: "Professional", progress: 90 }
  ],
  fr: [
    { language: "Français", level: "Natif", progress: 100 },
    { language: "Anglais", level: "Professionnel", progress: 90 }
  ]
};

const hobbies = {
  en: [
    { name: "Theater", icon: Theater, description: "Amateur theater enthusiast" },
    { name: "Jogging", icon: Running, description: "Regular runner" },
    { name: "Reading", icon: BookOpen, description: "Book lover" }
  ],
  fr: [
    { name: "Théâtre", icon: Theater, description: "Passionné de théâtre amateur" },
    { name: "Jogging", icon: Running, description: "Coureur régulier" },
    { name: "Lecture", icon: BookOpen, description: "Amateur de lecture" }
  ]
};

export const Education = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCourses, setShowCourses] = useState<number | null>(null);
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
      
      if (showCourses !== null) {
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
  }, [emblaApi, showCourses, autoplayPlugin]);

  const handleShowCourses = (index: number) => {
    setShowCourses(showCourses === index ? null : index);
    if (autoplayPlugin) {
      if (showCourses === index) {
        autoplayPlugin.play();
      } else {
        autoplayPlugin.stop();
      }
    }
  };

  return (
    <section id="education" className="py-16 px-4 bg-secondary/50">
      <h2 className="section-title">
        {language === 'en' ? 'Education' : 'Formation'}
      </h2>
      <div className="max-w-6xl mx-auto">
        <Carousel 
          ref={emblaRef} 
          className="w-full"
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[autoplayPlugin]}
        >
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
                          onClick={() => handleShowCourses(index)}
                        >
                          <ChevronDown 
                            className={`w-5 h-5 transition-transform ${
                              showCourses === index ? 'rotate-180' : ''
                            }`}
                          />
                          <span className="font-medium">
                            {language === 'en' ? 'View Courses' : 'Voir les Cours'}
                          </span>
                        </div>
                        
                        {showCourses === index && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-3"
                          >
                            {edu.courses.map((course, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="bg-[#18181b] text-white p-3 rounded-lg hover:bg-[#18181b]/90 transition-colors"
                              >
                                {course}
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]" />
          <CarouselNext className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]" />
        </Carousel>
        
        {/* Languages Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 justify-center">
            <Languages className="w-6 h-6" />
            {language === 'en' ? 'Languages' : 'Langues'}
          </h3>
          <div className="max-w-2xl mx-auto space-y-4">
            {languages[language].map((lang, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{lang.language}</span>
                  <span className="text-sm text-muted-foreground">{lang.level}</span>
                </div>
                <Progress value={lang.progress} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center">
            {language === 'en' ? 'Hobbies' : 'Loisirs'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {hobbies[language].map((hobby, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/30 backdrop-blur-md p-4 rounded-lg flex flex-col items-center gap-2 hover:bg-white/40 transition-colors"
              >
                <hobby.icon className="w-8 h-8 text-[#18181b]" />
                <h4 className="font-medium">{hobby.name}</h4>
                <p className="text-sm text-muted-foreground text-center">{hobby.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

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
