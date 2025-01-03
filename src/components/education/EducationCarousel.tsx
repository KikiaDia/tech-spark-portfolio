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
import { EducationCard } from "./EducationCard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";

interface EducationCarouselProps {
  education: any[];
  language: string;
  showCourses: number | null;
  onToggleCourses: (index: number) => void;
  autoplayPlugin: any;
}

export const EducationCarousel = ({
  education,
  language,
  showCourses,
  onToggleCourses,
  autoplayPlugin,
}: EducationCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
      skipSnaps: false
    },
    [autoplayPlugin]
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
  }, [emblaApi, showCourses]);

  return (
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
          {education.map((edu, index) => (
            <CarouselItem key={index} className="w-full">
              <EducationCard
                edu={edu}
                showCourses={showCourses === index}
                onToggleResponsibilities={() => onToggleCourses(index)}
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
            {education.map((_, index) => (
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
  );
};