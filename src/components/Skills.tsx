import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronDown } from "lucide-react";
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
import { useLanguage } from "@/contexts/LanguageContext";

const skillCategories = [
  {
    title: "NLP",
    skills: [
      { name: "Data preprocessing", level: 85 },
      { name: "LLM", level: 85 },
      { name: "RAG", level: 80 },
      { name: "Langchain", level: 85 },
      { name: "Ollama", level: 75 },
      { name: "Transformers", level: 85 },
      { name: "Streamlit", level: 85 }
    ],
  },
  {
    title: "Programming",
    skills: [
      { name: "Python", level: 95 },
      { name: "SQL", level: 90 },
      { name: "Pyspark", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "PLSQL", level: 70 },
      { name: "NOSQL", level: 70 },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 85 },
      { name: "Oracle", level: 80 },
    ],
  },
  {
    title: "Libraries & Frameworks",
    skills: [
      { name: "NumPy", level: 90 },
      { name: "Pandas", level: 90 },
      { name: "Matplotlib", level: 85 },
      { name: "Scikit-Learn", level: 85 },
      { name: "PyTorch", level: 85 },
      { name: "TensorFlow", level: 80 },
      { name: "NLTK", level: 85 },
      { name: "Spacy", level: 85 },
      { name: "Flask", level: 80 },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Hugging Face", level: 90 },
      { name: "Git", level: 90 },
      { name: "Power BI", level: 85 },
      { name: "Docker", level: 85 },
      { name: "Jupyter", level: 90 },
      { name: "VSCode", level: 90 },
      { name: "Postman", level: 85 },
      { name: "Notion", level: 85 },
      { name: "Azure", level: 80 },
      { name: "GCP", level: 75 },
      { name: "MLFlow", level: 85 }
    ],
  },
  {
    title: "Data Science",
    skills: [
      { name: "Machine Learning", level: 80 },
      { name: "Deep Learning", level: 80 },
      { name: "NLP", level: 90 },
      { name: "MLOps", level: 70 },
    ],
  },
  {
    title: "Data Analysis",
    skills: [
      { name: "Python", level: 95 },
      { name: "SQL", level: 90 },
      { name: "Pyspark", level: 90 },
      { name: "EDA", level: 90 },
      { name: "Statistics", level: 80 },
      { name: "Power BI", level: 70 },
      { name: "Excel", level: 80 },
    ],
  },
  {
    title: "Big Data",
    skills: [
      { name: "ETL Pipelines", level: 85 },
      { name: "PySpark", level: 90 },
      { name: "MapReduce", level: 80 },
      { name: "Cloud", level: 85 },
    ],
  },
];

export const Skills = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
      skipSnaps: false,
      duration: 20,
    }
  );

  useEffect(() => {
    const autoplay = () => {
      if (!emblaApi || selectedCategory !== null) return;
      
      const timeoutId = setTimeout(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollTo(0);
        }
        autoplay();
      }, 4000);
      
      return () => clearTimeout(timeoutId);
    };
    
    const autoplayInstance = autoplay();
    
    if (emblaApi) {
      const onSelect = () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      };

      emblaApi.on('select', onSelect);
      emblaApi.reInit();

      return () => {
        emblaApi.off('select', onSelect);
        if (autoplayInstance) {
          clearTimeout(autoplayInstance as unknown as number);
        }
      };
    }
  }, [emblaApi, selectedCategory]);

  return (
    <section id="skills" className="section-container section-subtle">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">
          {language === 'en' ? 'Skills & Expertise' : 'Compétences'}
        </h2>
      </motion.div>
      
      <div className="max-w-6xl mx-auto">
        <Carousel 
          ref={emblaRef}
          className="w-full"
          opts={{
            loop: true,
            align: "center",
            duration: 20,
          }}
        >
          <CarouselContent>
            {skillCategories.map((category, index) => (
              <CarouselItem key={index} className="md:basis-1/3 p-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className={`glass-card cursor-pointer h-full ${
                      selectedCategory === index ? 'ring-2 ring-primary shadow-card-hover' : ''
                    }`}
                    onClick={() => setSelectedCategory(selectedCategory === index ? null : index)}
                  >
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <div className="card-accent" />
                        <CardTitle className="text-lg font-display">{category.title}</CardTitle>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                          selectedCategory === index ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </CardHeader>
                    {selectedCategory === index && (
                      <CardContent className="space-y-4 pt-2">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                            className="space-y-2"
                          >
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-muted-foreground">{skill.level}%</span>
                            </div>
                            <div className="progress-bar">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.8, delay: skillIndex * 0.05 }}
                                className="progress-bar-fill"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="carousel-navigation">
            <CarouselPrevious className="CarouselPrevious" />
            <CarouselNext className="CarouselNext" />
          </div>
        </Carousel>
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              {skillCategories.map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentSlide === index}
                    className={`pagination-dot ${
                      currentSlide === index ? 'pagination-dot-active' : 'pagination-dot-inactive'
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
