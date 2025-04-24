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
      title: "Agents Fundamentals",
      issuer: "Hugging Face",
      date: "Mars 2025",
      link: "https://cdn-lfs-us-1.hf.co/repos/f2/34/f2344151f60f6027c436821dc61cf3f27a46435de57df8df50ad02b5acca7c07/b16cae66499bdb9f7406e8aaf5de651d5fd1056eaf85c53074c1dc3aeceec3ed?response-content-disposition=inline%3B+filename*%3DUTF-8%27%272025-03-25.png%3B+filename%3D%222025-03-25.png%22%3B&response-content-type=image%2Fpng&Expires=1745497189&Policy=eyJTdGF0ZW1lbnQiOlt7IkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NTQ5NzE4OX19LCJSZXNvdXJjZSI6Imh0dHBzOi8vY2RuLWxmcy11cy0xLmhmLmNvL3JlcG9zL2YyLzM0L2YyMzQ0MTUxZjYwZjYwMjdjNDM2ODIxZGM2MWNmM2YyN2E0NjQzNWRlNTdkZjhkZjUwYWQwMmI1YWNjYTdjMDcvYjE2Y2FlNjY0OTliZGI5Zjc0MDZlOGFhZjVkZTY1MWQ1ZmQxMDU2ZWFmODVjNTMwNzRjMWRjM2FlY2VlYzNlZD9yZXNwb25zZS1jb250ZW50LWRpc3Bvc2l0aW9uPSomcmVzcG9uc2UtY29udGVudC10eXBlPSoifV19&Signature=mj8pfjvraIWAAoMfAz4uVJtk4oFlfh9B69JN-N83shkdBGgPvOSg1vo1Gs3y6K%7ETKvqZWXvquPapAHUaHip02CuW-akE7qje%7E%7EXm16H3us74cNcOPHYQf8h6FFooOZmy8IqIJGs5fHkD61I7BCKEwF%7EKmZC4lDmYYzFWQnR8ylTlU0hCLksdFBnyzjdkCD8IBC3FeknkG2kZOAgLFn8%7EGjdMteyBunM3eXiSLwkaXgUtHDfs6MokPbzc5uLYZsgAhqqmZdU1-Lm8PEsE1SgfJlMUnL28-FjREm6yR0KOUVpVIfwBmAwSrqQdkj-LwfVSDe78UfLrgTYXq1MXclLWpw__&Key-Pair-Id=K24J24Z295AEI9",
      image: "/lovable-uploads/hugg.png"
    },
    {
      title: "Introduction to Natural Language Processing",
      issuer: "OpenClassroom",
      date: "November 2024",
      link: "https://openclassrooms.com/fr/course-certificates/9035733336",
      image: "/lovable-uploads/d8de39c0-d361-40f5-a7fc-2c5273b6ab9c.png"
    },
    {
      title: "Power BI Essential Training",
      issuer: "LinkedIn Learning",
      date: "March 2024",
      link: "https://www.linkedin.com/learning/certificates/55e01c83986c7ca3775455c5bb76f988f4a33ce0535ed0b2d3644c2b8f12e425",
      image: "/lovable-uploads/71781e48-9fec-4b63-b347-852570c1ec41.png"
    }
  ],
  fr: [
    {
      title: "Agents Fundamentals",
      issuer: "Hugging Face",
      date: "Mars 2025",
      link: "https://cdn-lfs-us-1.hf.co/repos/f2/34/f2344151f60f6027c436821dc61cf3f27a46435de57df8df50ad02b5acca7c07/b16cae66499bdb9f7406e8aaf5de651d5fd1056eaf85c53074c1dc3aeceec3ed?response-content-disposition=inline%3B+filename*%3DUTF-8%27%272025-03-25.png%3B+filename%3D%222025-03-25.png%22%3B&response-content-type=image%2Fpng&Expires=1745497189&Policy=eyJTdGF0ZW1lbnQiOlt7IkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0NTQ5NzE4OX19LCJSZXNvdXJjZSI6Imh0dHBzOi8vY2RuLWxmcy11cy0xLmhmLmNvL3JlcG9zL2YyLzM0L2YyMzQ0MTUxZjYwZjYwMjdjNDM2ODIxZGM2MWNmM2YyN2E0NjQzNWRlNTdkZjhkZjUwYWQwMmI1YWNjYTdjMDcvYjE2Y2FlNjY0OTliZGI5Zjc0MDZlOGFhZjVkZTY1MWQ1ZmQxMDU2ZWFmODVjNTMwNzRjMWRjM2FlY2VlYzNlZD9yZXNwb25zZS1jb250ZW50LWRpc3Bvc2l0aW9uPSomcmVzcG9uc2UtY29udGVudC10eXBlPSoifV19&Signature=mj8pfjvraIWAAoMfAz4uVJtk4oFlfh9B69JN-N83shkdBGgPvOSg1vo1Gs3y6K%7ETKvqZWXvquPapAHUaHip02CuW-akE7qje%7E%7EXm16H3us74cNcOPHYQf8h6FFooOZmy8IqIJGs5fHkD61I7BCKEwF%7EKmZC4lDmYYzFWQnR8ylTlU0hCLksdFBnyzjdkCD8IBC3FeknkG2kZOAgLFn8%7EGjdMteyBunM3eXiSLwkaXgUtHDfs6MokPbzc5uLYZsgAhqqmZdU1-Lm8PEsE1SgfJlMUnL28-FjREm6yR0KOUVpVIfwBmAwSrqQdkj-LwfVSDe78UfLrgTYXq1MXclLWpw__&Key-Pair-Id=K24J24Z295AEI9",
      image: "/lovable-uploads/hugg.png"
    },
    {
      title: "Introduction au Traitement du Langage Naturel",
      issuer: "OpenClassroom",
      date: "Novembre 2024",
      link: "https://openclassrooms.com/fr/course-certificates/9035733336",
      image: "/lovable-uploads/d8de39c0-d361-40f5-a7fc-2c5273b6ab9c.png"
    },
    {
      title: "Formation Essentielle Power BI",
      issuer: "LinkedIn Learning",
      date: "Mars 2024",
      link: "https://www.linkedin.com/learning/certificates/55e01c83986c7ca3775455c5bb76f988f4a33ce0535ed0b2d3644c2b8f12e425",
      image: "/lovable-uploads/71781e48-9fec-4b63-b347-852570c1ec41.png"
    }
  ]
};

export const Certifications = () => {
  const { language } = useLanguage();
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
        stopOnInteraction: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      })
    ]
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
    <section id="certifications" className="py-20 px-4 bg-secondary/50">
      <h2 className="section-title">
        {language === 'en' ? 'Certifications' : 'Certifications'}
      </h2>
      <div className="max-w-4xl mx-auto">
        <Carousel 
          ref={emblaRef}
          className="w-full"
        >
          <CarouselContent>
            {certifications[language].map((cert, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-card hover:bg-white hover-scale">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 relative w-24 h-24 rounded-full overflow-hidden">
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
          <div className="carousel-navigation">
            <CarouselPrevious className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]" />
            <CarouselNext className="bg-[#18181b] text-white hover:bg-white hover:text-[#18181b]"/>
          </div>
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