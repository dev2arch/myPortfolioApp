import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Code2, 
  Globe, 
  Cloud, 
  Database, 
  Smartphone, 
  Cpu, 
  Server, 
  Zap,
  GitBranch,
  Settings
} from 'lucide-react';

const TechStackSection = () => {
  const techCategories = [
    {
      title: "Frontend",
      icon: <Globe className="w-6 h-6" />,
      color: "bg-blue-500",
      technologies: [
        { name: "Angular", experience: "Expert", years: "8+" },
        { name: "React", experience: "Expert", years: "5+" },
        { name: "NestJS", experience: "Advanced", years: "3+" },
        { name: "Ionic", experience: "Advanced", years: "4+" },
        { name: "Sencha", experience: "Intermediate", years: "2+" }
      ]
    },
    {
      title: "Backend",
      icon: <Server className="w-6 h-6" />,
      color: "bg-green-500",
      technologies: [
        { name: "NodeJS", experience: "Expert", years: "6+" },
        { name: "Java", experience: "Expert", years: "10+" },
        { name: "Spring Boot", experience: "Expert", years: "8+" },
        { name: "Django", experience: "Advanced", years: "4+" },
        { name: "Python", experience: "Advanced", years: "3+" }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6" />,
      color: "bg-purple-500",
      technologies: [
        { name: "AWS", experience: "Expert", years: "6+" },
        { name: "GCP", experience: "Expert", years: "4+" },
        { name: "Docker", experience: "Advanced", years: "5+" },
        { name: "Kubernetes", experience: "Intermediate", years: "3+" },
        { name: "Jenkins", experience: "Advanced", years: "4+" }
      ]
    },
    {
      title: "Database",
      icon: <Database className="w-6 h-6" />,
      color: "bg-orange-500",
      technologies: [
        { name: "MongoDB", experience: "Expert", years: "6+" },
        { name: "PostgreSQL", experience: "Advanced", years: "5+" },
        { name: "BigQuery", experience: "Advanced", years: "3+" },
        { name: "MySQL", experience: "Advanced", years: "7+" },
        { name: "Redis", experience: "Intermediate", years: "2+" }
      ]
    },
    {
      title: "AI & ML",
      icon: <Cpu className="w-6 h-6" />,
      color: "bg-pink-500",
      technologies: [
        { name: "C3.AI", experience: "Advanced", years: "2+" },
        { name: "TensorFlow", experience: "Intermediate", years: "2+" },
        { name: "ML Pipelines", experience: "Advanced", years: "3+" },
        { name: "Data Science", experience: "Intermediate", years: "2+" },
        { name: "REST APIs", experience: "Expert", years: "10+" }
      ]
    },
    {
      title: "Mobile & APIs",
      icon: <Smartphone className="w-6 h-6" />,
      color: "bg-teal-500",
      technologies: [
        { name: "React Native", experience: "Advanced", years: "3+" },
        { name: "GraphQL", experience: "Advanced", years: "3+" },
        { name: "REST APIs", experience: "Expert", years: "10+" },
        { name: "iOS/Android", experience: "Intermediate", years: "4+" },
        { name: "PWA", experience: "Advanced", years: "3+" }
      ]
    }
  ];

  const tools = [
    { name: "Git", icon: <GitBranch className="w-4 h-4" /> },
    { name: "VS Code", icon: <Code2 className="w-4 h-4" /> },
    { name: "Bamboo", icon: <Settings className="w-4 h-4" /> },
    { name: "Bitbucket", icon: <GitBranch className="w-4 h-4" /> },
    { name: "SonarQube", icon: <Settings className="w-4 h-4" /> },
    { name: "Jira", icon: <Settings className="w-4 h-4" /> },
    { name: "Agile", icon: <Zap className="w-4 h-4" /> },
    { name: "Scrum", icon: <Zap className="w-4 h-4" /> }
  ];

  const getExperienceColor = (experience) => {
    switch (experience) {
      case "Expert": return "bg-green-100 text-green-800";
      case "Advanced": return "bg-blue-100 text-blue-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Tech Stack & Expertise</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive technical expertise across modern technologies, with deep experience 
            in enterprise-scale development and emerging AI/ML platforms.
          </p>
        </div>

        {/* Main Tech Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {techCategories.map((category, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-lg text-white ${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.technologies.map((tech, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-slate-900">{tech.name}</span>
                          <Badge className={`text-xs ${getExperienceColor(tech.experience)}`}>
                            {tech.experience}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-600">{tech.years} experience</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tools & Methodologies */}
        <div className="bg-slate-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Tools & Methodologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {tools.map((tool, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-blue-600 mb-2">
                  {tool.icon}
                </div>
                <span className="text-sm font-medium text-slate-900 text-center">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Summary */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">14+</div>
              <div className="text-slate-600">Years Experience</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">30+</div>
              <div className="text-slate-600">Technologies</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
              <div className="text-slate-600">Projects Delivered</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">8+</div>
              <div className="text-slate-600">Companies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;