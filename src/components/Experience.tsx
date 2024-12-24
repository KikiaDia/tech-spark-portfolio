import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const experiences = [
  {
    title: "Alternance Projet Fin d'étude - Orange Sonatel",
    period: "Septembre 2023 – Juin 2024",
    location: "Dakar, Sénégal",
    description: "Amélioration de l'expérience client par l'IA et la Data",
    responsibilities: [
      "Développement de modèle d'analyse de sentiment pour détecter les clients fragiles lors des interactions téléphoniques",
      "Développement de Topic Modeling pour détecter les motifs d'appels des clients",
      "Développement de modèle de forecasting pour la prédiction de flux d'appels téléphoniques",
      "Déploiement de Modèles de machine learning dans des API REST",
      "Transcription de conversations audio téléphoniques avec le modèle Whisper d'OpenAi",
      "Automatisation du calcul de KPIs",
      "Mise en place de dashboards",
      "Collaboration étroite avec l'équipe technique pour l'intégration des modèles"
    ],
    tools: ["Python", "LDA", "Whisper OpenAi", "distilcamembert-base-sentiment", "Hugging Face", "SARIMA", "Flask", "SVM", "Angular", "Scrum"]
  },
  {
    title: "Stage Développeur Backend - Team X Group",
    period: "Septembre 2022 – Décembre 2022",
    location: "Dakar, Sénégal",
    description: "Développement de plateformes Web et Mobiles",
    responsibilities: [
      "Développement de la logique métier de plateformes mobiles et web backend avec NestJS",
      "Structuration et gestion de flux de données avec MongoDB",
      "Utilisation d'outils de test de requêtes (Postman)"
    ],
    tools: ["Javascript", "Node.js", "MongoDB", "Postman", "Mongoose", "API Rest", "CRUD"]
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 bg-secondary/50">
      <h2 className="section-title">Professional Experience</h2>
      <div className="max-w-4xl mx-auto space-y-8">
        {experiences.map((exp, index) => (
          <Card key={index} className="glass-card hover-scale">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                <div>
                  <CardTitle className="text-xl">{exp.title}</CardTitle>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{exp.period}</p>
                  <p className="text-sm text-muted-foreground">{exp.location}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 mb-4 text-sm">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-muted-foreground">{resp}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.tools.map((tool) => (
                  <Badge key={tool} variant="secondary">
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};