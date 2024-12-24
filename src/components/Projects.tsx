import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Sentiment Analysis for Customer Experience",
    description: "Developed sentiment analysis models to detect vulnerable customers during phone interactions at Orange Sonatel.",
    tags: ["Python", "NLP", "Machine Learning", "Hugging Face"],
    github: "#",
  },
  {
    title: "Agricultural Chatbot Advisor",
    description: "Built an intelligent chatbot for agricultural yield prediction and weather forecasting using RAG and LLMs.",
    tags: ["ChatBot", "RAG", "Streamlit", "Docker"],
    github: "#",
  },
  {
    title: "Real-time Weather Pipeline",
    description: "Implemented an ETL pipeline using Microsoft Azure for processing and visualizing weather data with forecasting capabilities.",
    tags: ["Azure", "Databricks", "Power BI", "Machine Learning"],
    github: "#",
  },
  {
    title: "Fintech Fraud Detection",
    description: "Developed ML models to detect suspicious transactions in Fintech, focusing on various transaction types.",
    tags: ["Machine Learning", "Deep Learning", "MLFlow", "EDA"],
    github: "#",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4">
      <h2 className="section-title">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
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
                    View Code
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