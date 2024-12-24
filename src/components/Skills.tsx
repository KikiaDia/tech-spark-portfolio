import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const skillCategories = [
  {
    title: "Data Science & ML",
    skills: ["Machine Learning", "Deep Learning", "NLP", "MLOps", "Data Analysis"],
  },
  {
    title: "NLP Technologies",
    skills: ["LLM", "RAG", "Langchain", "Ollama", "Transformers"],
  },
  {
    title: "Programming",
    skills: ["Python", "SQL", "PLSQL", "NoSQL", "JavaScript"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "NLTK", "Spacy"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "Docker", "Azure", "GCP", "MLFlow"],
  },
];

export const Skills = () => {
  return (
    <section className="py-20 px-4 bg-secondary/50">
      <h2 className="section-title">Skills & Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {skillCategories.map((category, index) => (
          <Card key={index} className="glass-card hover-scale">
            <CardHeader>
              <CardTitle className="text-xl">{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
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