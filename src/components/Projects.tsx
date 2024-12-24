import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const projects = {
  en: [
    {
      title: "Agricultural Chatbot Advisor",
      description: "Built an intelligent chatbot for agricultural yield prediction and weather forecasting using RAG and LLMs.",
      tags: ["ChatBot", "RAG", "Streamlit", "Docker"],
      github: "https://github.com/KikiaDia/chatbot_agricole",
    },
    {
      title: "Disaster Detection in Tweets",
      description: "Development, optimization, and deployment of machine learning models to classify tweets into 'disaster' and 'non-disaster' categories.",
      tags: ["Machine Learning", "Deep Learning", "MLFlow", "EDA"],
      github: "#",
    },
    {
      title: "Real-time Weather Pipeline",
      description: "Implemented an ETL pipeline using Microsoft Azure for processing and visualizing weather data with forecasting capabilities.",
      tags: ["Azure", "Databricks", "Power BI", "Machine Learning"],
      github: "https://github.com/KikiaDia/Real-time-Weather-Pipeline/tree/main",
    },
    {
      title: "Fintech Fraud Detection",
      description: "Developed ML models to detect suspicious transactions in Fintech, focusing on various transaction types.",
      tags: ["Machine Learning", "Deep Learning", "MLFlow", "EDA"],
      github: "https://github.com/KikiaDia/Fintech_Fraude_Detection",
    }
  ],
  fr: [
    {
      title: "Chatbot Conseiller Agricole",
      description: "Développement de modèles de prédiction du rendement, de forecasting de prix, de la température et Chatbot agricole.",
      tags: ["ChatBot", "RAG", "Streamlit", "Docker"],
      github: "https://github.com/KikiaDia/chatbot_agricole",
    },
    {
      title: "Détection de Catastrophes dans les Tweets",
      description: "Développement, optimisation et déploiement de modèle de machine learning pour classifier les tweets en catégories 'catastrophe' et 'non-catastrophe'.",
      tags: ["Machine Learning", "Deep Learning", "MLFlow", "EDA"],
      github: "#",
    },
    {
      title: "Pipeline en temps réel de données météo",
      description: "Mise en place d'un pipeline ETL basé sur Microsoft Azure pour traiter et visualiser les données météorologiques avec prévisions climatiques.",
      tags: ["Azure", "Databricks", "Power BI", "Machine Learning"],
      github: "https://github.com/KikiaDia/Real-time-Weather-Pipeline/tree/main",
    },
    {
      title: "Détection de Fraude Fintech",
      description: "Développement de modèles ML pour détecter les transactions suspectes dans le secteur Fintech.",
      tags: ["Machine Learning", "Deep Learning", "MLFlow", "EDA"],
      github: "https://github.com/KikiaDia/Fintech_Fraude_Detection",
    }
  ]
};

export const Projects = () => {
  const { language } = useLanguage();

  return (
    <section id="projects" className="py-20 px-4">
      <h2 className="section-title">{language === 'en' ? 'Featured Projects' : 'Projets'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {projects[language].map((project, index) => (
          <Card key={index} className="glass-card hover-scale">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'View Code' : 'Voir le Code'}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};