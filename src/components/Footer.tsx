import { Contact } from "./Contact";

export const Footer = () => {
  return (
    <footer className="footer-gradient text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Contact />
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} Kikia Dia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
