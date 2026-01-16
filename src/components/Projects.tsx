import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { projects } from "@/data/projects";
import { ProjectCard } from "./projects/ProjectCard";
import { ProjectsPagination } from "./projects/ProjectsPagination";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

export const Projects = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
      skipSnaps: false,
      duration: 20,
      slidesToScroll: isMobile ? 1 : 2,
    }
  );

  useEffect(() => {
    const autoplay = () => {
      if (!emblaApi) return;
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
  }, [emblaApi]);

  return (
    <section id="projects" className="section-container section-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">
          {language === 'en' ? 'Featured Projects' : 'Projets'}
        </h2>
      </motion.div>
      
      <div className="max-w-6xl mx-auto relative">
        <Carousel 
          ref={emblaRef}
          className="w-full"
          opts={{
            loop: true,
            align: "center",
            duration: 20,
            slidesToScroll: isMobile ? 1 : 2,
          }}
        >
          <CarouselContent>
            {projects[language].map((project, index) => (
              <CarouselItem key={index} className={`${isMobile ? 'basis-full' : 'basis-1/2'} p-2`}>
                <ProjectCard 
                  project={project}
                  index={index}
                  language={language}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="carousel-navigation">
            <CarouselPrevious className="CarouselPrevious" />
            <CarouselNext className="CarouselNext"/>
          </div>
        </Carousel>
        <ProjectsPagination 
          currentSlide={currentSlide}
          totalProjects={projects[language].length}
          emblaApi={emblaApi}
        />
      </div>
    </section>
  );
};
