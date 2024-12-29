import { useLanguage } from "@/contexts/LanguageContext";
import { ContactInfo } from "./contact/ContactInfo";
import { ContactForm } from "./contact/ContactForm";

export const Contact = () => {
  const { language } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center text-[#18181b]">
        {language === 'en' ? 'Get in Touch' : 'Me Contacter'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
};