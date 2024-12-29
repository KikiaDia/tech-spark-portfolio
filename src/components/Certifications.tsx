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

const certifications = {
  en: [
    {
      title: "Introduction to Natural Language Processing",
      issuer: "OpenClassroom",
      date: "November 2024",
      link: "#",
      image: "/lovable-uploads/44a8ec3d-64f0-4af0-af25-90b3e3d6bb62.png"
    }
  ],
  fr: [
    {
      title: "Introduction au Traitement du Langage Naturel",
      issuer: "OpenClassroom",
      date: "Novembre 2024",
      link: "#",
      image: "/lovable-uploads/44a8ec3d-64f0-4af0-af25-90b3e3d6bb62.png"
    }
  ]
};

export const Certifications = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  return (
    <section id="certifications" className="py-20 px-4 bg-secondary/50">
      <h2 className="section-title">
        {language === 'en' ? 'Certifications' : 'Certifications'}
      </h2>
      <div className="max-w-4xl mx-auto">
        <Carousel ref={emblaRef} className="w-full">
          <CarouselContent>
            {certifications[language].map((cert, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-card hover-scale">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#18181b]">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-xl">
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#18181b] transition-colors"
                        >
                          {cert.title}
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-center">{cert.issuer}</p>
                      <p className="text-sm text-muted-foreground text-center">{cert.date}</p>
                    </CardContent>
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
              {certifications[language].map((_, index) => (
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