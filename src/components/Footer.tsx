
import { Contact } from "./Contact";

export const Footer = () => {
  return (
    <footer className="bg-[#18181b] text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <Contact />
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Kikia Dia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
