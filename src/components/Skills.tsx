import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Data Science & ML",
    skills: [
      { name: "Machine Learning", level: 90 },
      { name: "Deep Learning", level: 85 },
      { name: "NLP", level: 90 },
      { name: "MLOps", level: 80 },
      { name: "Data Analysis", level: 85 }
    ],
  },
  {
    title: "NLP Technologies",
    skills: [
      { name: "LLM", level: 85 },
      { name: "RAG", level: 80 },
      { name: "Langchain", level: 85 },
      { name: "Ollama", level: 75 },
      { name: "Transformers", level: 85 }
    ],
  },
  {
    title: "Programming",
    skills: [
      { name: "Python", level: 95 },
      { name: "SQL", level: 85 },
      { name: "PLSQL", level: 80 },
      { name: "NoSQL", level: 85 },
      { name: "JavaScript", level: 80 }
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "PyTorch", level: 85 },
      { name: "TensorFlow", level: 80 },
      { name: "Scikit-Learn", level: 90 },
      { name: "NLTK", level: 85 },
      { name: "Spacy", level: 80 }
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 85 },
      { name: "Azure", level: 80 },
      { name: "GCP", level: 75 },
      { name: "MLFlow", level: 85 }
    ],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 bg-secondary/50">
      <h2 className="section-title">Skills & Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card hover-scale h-full">
              <CardHeader>
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        className="h-full bg-[#18181b] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};