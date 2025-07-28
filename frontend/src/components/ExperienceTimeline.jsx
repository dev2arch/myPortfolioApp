import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Calendar, Users, Award } from 'lucide-react';

const ExperienceTimeline = () => {
  const experiences = [
    {
      title: "Senior Manager – Software Engineering",
      company: "Cargill",
      period: "Feb 2025 – Present",
      location: "Global",
      type: "current",
      description: "Leading three engineering teams (8–12 engineers each) with focus on product ownership and team performance management.",
      achievements: [
        "AI-driven Freight Market Intelligence platform development",
        "Integrated ML predictions from Data Science into real-time decision tools",
        "Full-stack architecture implementation on GCP",
        "Cross-functional team leadership across global markets"
      ],
      technologies: ["GCP", "C3.AI", "ReactJS", "NodeJS", "Python", "REST APIs", "Data Science pipelines"]
    },
    {
      title: "Senior Engineer, Software Engineering",
      company: "Cargill",
      period: "2020 – Feb 2025",
      location: "Global",
      type: "past",
      description: "Developed and scaled CORE Private Ad Exchange platform with comprehensive mobile solutions.",
      achievements: [
        "Built Publisher Admin Portal and Mobile App (iOS/Android)",
        "Owned stakeholder communication and release planning",
        "Implemented scalable microservices architecture",
        "Delivered high-performance ad exchange solutions"
      ],
      technologies: ["Angular", "NestJS", "Spring Boot", "GraphQL", "Nx", "Docker", "Bitbucket", "Bamboo"]
    },
    {
      title: "Project Lead / Senior Associate",
      company: "Cognizant",
      period: "2016 – 2020",
      location: "Multiple Global Clients",
      type: "past",
      description: "Led innovative IoT and mapping solutions for Fortune 500 clients including Nike and Chubb.",
      achievements: [
        "Nike Smart Store – IoT-based automated retail solution",
        "Chubb DCat with ArcGIS risk mapping implementation",
        "Advance Reporting Tool (ART) – saved $1.5M annually",
        "Multi-client project delivery and stakeholder management"
      ],
      technologies: ["Angular", "Ionic", "Java", "Spring Boot", "ArcGIS JS API", "Django", "REST APIs", "Apache Tomcat"]
    },
    {
      title: "Assistant Project Manager",
      company: "Zees Media",
      period: "2019 – 2020",
      location: "India",
      type: "past",
      description: "Architected premium streaming platform with advanced AWS cloud processing capabilities.",
      achievements: [
        "Developed Zees Media App (premium audio/video streaming)",
        "Built comprehensive Admin and Creator Portals",
        "Implemented AWS cloud processing pipeline",
        "Integrated YouTube Data API for enhanced content management"
      ],
      technologies: ["Angular", "Ionic", "AWS (S3, Lambda, MediaConvert)", "Node.js", "Spring Boot", "YouTube Data API"]
    },
    {
      title: "Senior Executive",
      company: "Times World",
      period: "2019 – 2020",
      location: "India",
      type: "past",
      description: "Led e-learning product architecture with focus on scalable deployment strategies.",
      achievements: [
        "E-learning platform architecture design",
        "Comprehensive code reviews and quality assurance",
        "Production deployment optimization",
        "Cross-platform compatibility implementation"
      ],
      technologies: ["Java", "Spring", "REST", "HTML", "CSS", "Angular"]
    },
    {
      title: "Project Associate",
      company: "IIT Kanpur",
      period: "2012 – 2014",
      location: "India",
      type: "past",
      description: "Developed internal smart retail platform with focus on rapid prototyping and scalable solutions.",
      achievements: [
        "Smart retail platform development",
        "Rapid prototyping implementation",
        "Internal tooling and automation",
        "Research-driven development approach"
      ],
      technologies: ["Angular", "Sencha", "Django", "Java", "Tomcat", "REST APIs"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Professional Experience</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A comprehensive journey through 14+ years of software engineering excellence, 
            leading teams and delivering impactful solutions across global enterprises.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block"></div>
          
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-12 md:ml-16">
              {/* Timeline Dot */}
              <div className={`absolute -left-20 top-8 w-4 h-4 rounded-full hidden md:block ${
                exp.type === 'current' ? 'bg-blue-600' : 'bg-blue-400'
              }`}></div>
              
              <Card className={`border-l-4 transition-all duration-300 hover:shadow-lg ${
                exp.type === 'current' 
                  ? 'border-l-blue-600 bg-blue-50' 
                  : 'border-l-blue-400 hover:border-l-blue-600'
              }`}>
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
                        {exp.type === 'current' && (
                          <Badge className="bg-green-100 text-green-800 text-xs">Current</Badge>
                        )}
                      </div>
                      <h4 className="text-lg font-semibold text-blue-600 mb-2">{exp.company}</h4>
                      <p className="text-slate-700 mb-4">{exp.description}</p>
                    </div>
                    
                    <div className="lg:ml-8 lg:text-right">
                      <div className="flex items-center gap-2 text-slate-600 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      Key Achievements
                    </h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-700">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h5 className="font-semibold text-slate-900 mb-3">Technologies Used</h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-slate-100 hover:bg-slate-200">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;