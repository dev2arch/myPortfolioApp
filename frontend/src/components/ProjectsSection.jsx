import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, Github, Zap, Database, Cloud, Smartphone } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      title: "Freight Market Intelligence",
      company: "Cargill",
      category: "AI & Machine Learning",
      description: "AI-powered insights tool that integrates machine learning predictions into real-time decision-making systems for global freight operations.",
      impact: "Revolutionized freight market analysis and decision-making",
      technologies: ["GCP", "C3.AI", "NodeJS", "React", "ML pipelines", "Python"],
      icon: <Zap className="w-6 h-6" />,
      color: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      title: "CORE Private Ad Exchange",
      company: "Cargill",
      category: "Enterprise Platform",
      description: "Comprehensive ad exchange platform with dedicated admin portal and cross-platform mobile applications for publishers.",
      impact: "Streamlined ad operations for global publisher network",
      technologies: ["Angular", "NestJS", "Spring Boot", "GraphQL", "Docker"],
      icon: <Database className="w-6 h-6" />,
      color: "bg-gradient-to-br from-green-500 to-teal-600"
    },
    {
      title: "Zees Media App",
      company: "Zees Media",
      category: "Media & Streaming",
      description: "Premium hybrid video/audio streaming platform with advanced AWS cloud processing and content management capabilities.",
      impact: "Delivered scalable streaming solution for premium content",
      technologies: ["Ionic", "AWS", "Angular", "Node.js", "YouTube API"],
      icon: <Smartphone className="w-6 h-6" />,
      color: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      title: "Nike Smart Store",
      company: "Nike (via Cognizant)",
      category: "IoT & Retail",
      description: "IoT-based automated retail solution that transforms the in-store shopping experience with smart inventory and customer interaction systems.",
      impact: "Enhanced customer experience through IoT automation",
      technologies: ["Sencha", "Angular", "Django", "Java", "IoT Sensors"],
      icon: <Cloud className="w-6 h-6" />,
      color: "bg-gradient-to-br from-orange-500 to-red-600"
    },
    {
      title: "DCat App",
      company: "Chubb",
      category: "GIS & Analytics",
      description: "Natural disaster tracking and insights platform with advanced ArcGIS mapping and real-time loss visualization for insurance operations.",
      impact: "Improved disaster response and risk assessment capabilities",
      technologies: ["ArcGIS JS API", "Ionic", "Angular", "Real-time APIs"],
      icon: <Database className="w-6 h-6" />,
      color: "bg-gradient-to-br from-teal-500 to-blue-600"
    },
    {
      title: "Advance Reporting Tool (ART)",
      company: "Cognizant",
      category: "Business Intelligence",
      description: "Comprehensive reporting solution that replaced DOMO platform, providing advanced analytics and cost-effective business intelligence.",
      impact: "Saved $1.5M annually while improving reporting capabilities",
      technologies: ["Angular", "BigQuery", "Data Visualization", "REST APIs"],
      icon: <Zap className="w-6 h-6" />,
      color: "bg-gradient-to-br from-indigo-500 to-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Showcasing impactful solutions across diverse industries, from AI-driven platforms 
            to IoT innovations that have transformed business operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
              <div className={`h-2 ${project.color}`}></div>
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl text-white ${project.color}`}>
                      {project.icon}
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs text-slate-600 mb-2">
                        {project.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-600 font-medium">{project.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                      <Github className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-slate-700 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">Impact</h4>
                  <p className="text-blue-800 text-sm">{project.impact}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs bg-slate-100 hover:bg-slate-200">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;