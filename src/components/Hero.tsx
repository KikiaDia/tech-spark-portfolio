import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
            <p className="text-lg">
              I am a passionate developer with experience in various technologies.
            </p>
            <Button variant="outline" className="bg-[#222222] text-white hover:bg-white hover:text-[#222222]">
              View My Work
            </Button>
          </div>
          
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              <motion.img
                src="/path/to/your/image.jpg"
                alt="Hero Image"
                className="object-cover rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
