import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, Video } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const projects = {
  en: [
    {
      title: "Agricultural Chatbot Advisor",
      description: "Built an intelligent chatbot for agricultural yield prediction and weather forecasting using RAG and LLMs.",
      tags: ["ChatBot", "RAG", "Streamlit", "Docker"],
      github: "https://github.com/KikiaDia/chatbot_agricole",
      videoUrl: "https://youtu.be/your-video-id-1"
    },
    {
      title: "Disaster Detection in Tweets",
      description: "Development, optimization, and deployment of machine learning models to classify tweets into 'disaster' and 'non-disaster' categories.",
      tags: ["Machine Learning", "Deep Learning", "MLFlow", "EDA"],
      github: "#",
      videoUrl: "https://youtu.be/your-video-id-2"
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
    },
    {
      title: "PageRank Comparison with PySpark on GCP",
      description: "Compared PageRank with PySpark DataFrame and RDD, analyzing partitioning and cluster performance on Google Cloud Dataproc.",
      tags: ["Big Data", "PySpark", "Google Cloud Dataproc", "Distributed Computing", "PageRank", "Cluster Performance", "Data Partitioning"],
      github: "https://github.com/KikiaDia/PageRank_Project",
    }
  ],
  fr: [
    {
      title: "Chatbot Conseiller Agricole",
      description: "Développement de modèles de prédiction du rendement, de forecasting de prix, de la température et Chatbot agricole.",
      tags: ["ChatBot", "RAG", "Streamlit", "Docker"],
      github: "https://github.com/KikiaDia/chatbot_agricole",
      videoUrl: "https://youtu.be/your-video-id-1"
    },
    {
      title: "Détection de Catastrophes dans les Tweets",
      description: "Développement, optimisation et déploiement de modèle de machine learning pour classifier les tweets en catégories 'catastrophe' et 'non-catastrophe'.",
      tags: ["Machine Learning", "Deep Learning", "MLFlow", "EDA"],
      github: "#",
      videoUrl: "https://youtu.be/your-video-id-2"
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
    },
    {
      title: "Comparaison de PageRank avec PySpark sur GCP",
      description: "Comparaison de PageRank avec PySpark DataFrame et RDD, en analysant le partitionnement et les performances des clusters sur Google Cloud Dataproc.",
      tags: ["Big Data", "PySpark", "Google Cloud Dataproc", "Calcul Distribué", "PageRank", "Performance Cluster", "Partitionnement des Données"],
      github: "https://github.com/KikiaDia/PageRank_Project",
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
                {project.videoUrl && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Watch Demo' : 'Voir la Démo'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{project.title}</DialogTitle>
                      </DialogHeader>
                      <div className="aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src={project.videoUrl.replace('youtu.be/', 'youtube.com/embed/')}
                          title={project.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
