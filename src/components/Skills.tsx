import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronDown, Theater, BookOpen } from "lucide-react";
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
    title: "Data Science & ML",
    skills: [
      { name: "Machine Learning", level: 90 },
      { name: "Deep Learning", level: 85 },
      { name: "NLP", level: 90 },
      { name: "MLOps", level: 80 },
      { name: "Data Analysis", level: 85 }
    ],
  },
  {
    title: "NLP Technologies",
    skills: [
      { name: "LLM", level: 85 },
      { name: "RAG", level: 80 },
      { name: "Langchain", level: 85 },
      { name: "Ollama", level: 75 },
      { name: "Transformers", level: 85 }
    ],
  },
  {
    title: "Programming",
    skills: [
      { name: "Python", level: 95 },
      { name: "SQL", level: 85 },
      { name: "PLSQL", level: 80 },
      { name: "NoSQL", level: 85 },
      { name: "JavaScript", level: 80 }
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "PyTorch", level: 85 },
      { name: "TensorFlow", level: 80 },
      { name: "Scikit-Learn", level: 90 },
      { name: "NLTK", level: 85 },
      { name: "Spacy", level: 80 }
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 85 },
      { name: "Azure", level: 80 },
      { name: "GCP", level: 75 },
      { name: "MLFlow", level: 85 }
    ],
  },
];

const languageSkills = [
  { name: "Français", level: 95 },
  { name: "English", level: 90 },
];

const hobbies = [
  { name: "Théâtre", icon: Theater },
  { name: "Jogging", icon: Theater }, // Using Theater as Running is not available
  { name: "Lecture", icon: BookOpen },
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
    <section id="skills" className="py-12 px-4 bg-secondary/50">
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
                        className={`w-5 h-5 transition-transform ${
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
          <div className="carousel-navigation">
            <CarouselPrevious className="bg-black text-white hover:bg-black/80" />
            <CarouselNext className="bg-black text-white hover:bg-black/80" />
          </div>
        </Carousel>

        {/* Language Skills */}
        <div className="mt-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Language Proficiency</h3>
          <div className="space-y-6">
            {languageSkills.map((language, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{language.name}</span>
                  <span>{language.level}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${language.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-[#18181b] rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div className="mt-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Hobbies</h3>
          <div className="grid grid-cols-3 gap-4">
            {hobbies.map((hobby, index) => (
              <Card key={index} className="glass-card p-4 flex flex-col items-center justify-center">
                <hobby.icon className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">{hobby.name}</span>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
