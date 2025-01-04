import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
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
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
      skipSnaps: false,
      duration: 20,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      })
    ]
  );

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      };

      emblaApi.on('select', onSelect);
      emblaApi.reInit();

      return () => {
        emblaApi.off('select', onSelect);
      };
    }
  }, [emblaApi]);

  return (
    <section id="skills" className="py-20 px-4 bg-secondary/50">
      <h2 className="section-title">Skills & Expertise</h2>
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
              <CarouselItem key={index} className="md:basis-1/3 p-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className={`glass-card hover:bg-white hover:text-[#18181b] cursor-pointer transition-all duration-300 ${
                      selectedCategory === index ? 'ring-2 ring-[#18181b]' : ''
                    }`}
                    onClick={() => setSelectedCategory(selectedCategory === index ? null : index)}
                  >
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform animate-bounce ${
                          selectedCategory === index ? 'rotate-180' : ''
                        }`}
                      />
                    </CardHeader>
                    {selectedCategory === index && (
                      <CardContent className="space-y-4">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-2"
                          >
                            <div className="flex justify-between text-sm">
                              <span>{skill.name}</span>
                              <span>{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: skillIndex * 0.1 }}
                                className="h-full bg-[#18181b] rounded-full"
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
          <CarouselPrevious className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]" />
          <CarouselNext className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]" />
        </Carousel>
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              {skillCategories.map((_, index) => (
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
