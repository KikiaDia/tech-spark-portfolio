
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLanguage } from "@/contexts/LanguageContext";
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
import { experiences } from "@/data/experiences";

export const Experience = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showResponsibilities, setShowResponsibilities] = useState<number | null>(null);
  
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
      if (!emblaApi || showResponsibilities !== null) return;
      
      const timeoutId = setTimeout(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollTo(0);
        }
        autoplay();
      }, 3000);
      
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
  }, [emblaApi, showResponsibilities]);

  const handleToggleResponsibilities = (index: number) => {
    setShowResponsibilities(showResponsibilities === index ? null : index);
  };

  return (
    <section id="experience" className="py-20 px-4 bg-secondary/50">
      <h2 className="section-title">
        {language === 'en' ? 'Professional Experience' : 'Expériences Professionnelles'}
      </h2>
      <div className="max-w-4xl mx-auto">
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
          <div className="carousel-navigation">
            <CarouselPrevious className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]"/>
            <CarouselNext className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]"/>
          </div>
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
