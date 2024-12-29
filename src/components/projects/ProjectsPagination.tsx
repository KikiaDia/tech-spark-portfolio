import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "../ui/pagination";
import { UseEmblaCarouselType } from "embla-carousel-react";

interface ProjectsPaginationProps {
  currentSlide: number;
  totalProjects: number;
  emblaApi: UseEmblaCarouselType[1] | undefined;
}

export const ProjectsPagination = ({ currentSlide, totalProjects, emblaApi }: ProjectsPaginationProps) => {
  return (
    <div className="mt-4 flex justify-center">
      <Pagination>
        <PaginationContent>
          {Array.from({ length: Math.ceil(totalProjects / 2) }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={Math.floor(currentSlide / 2) === index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  Math.floor(currentSlide / 2) === index ? 'bg-[#18181b]' : 'bg-gray-300'
                }`}
                onClick={() => emblaApi?.scrollTo(index * 2)}
              />
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
};