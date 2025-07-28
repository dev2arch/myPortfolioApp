import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Users, Award, Globe, Code2 } from 'lucide-react';

const AboutSection = () => {
  const highlights = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Leadership",
      description: "Leading 8-12 engineers across multiple global teams"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "14+ Years Experience",
      description: "Proven track record in enterprise software development"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Impact",
      description: "Worked with Fortune 500 companies across continents"
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "AI Integration",
      description: "Pioneering AI-driven solutions in enterprise environments"
    }
  ];

  const expertise = [
    "Java", "Angular", "Node.js", "Spring Boot", "React", "GCP", "AWS", 
    "Docker", "Agile", "System Design", "Cloud Architecture", "Mobile Development"
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">About Me</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            As a Senior Manager at Cargill, I lead global software engineering teams to deliver 
            innovative solutions that transform how businesses operate. With 14+ years of experience, 
            I specialize in architecting large-scale enterprise applications and integrating cutting-edge 
            AI technologies into production systems.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((highlight, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full text-blue-600 mb-4">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{highlight.title}</h3>
                <p className="text-slate-600 text-sm">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Description */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Professional Journey</h3>
          <div className="space-y-4 text-slate-700">
            <p className="leading-relaxed">
              Currently, I'm spearheading AI-driven initiatives at Cargill, where I lead three engineering 
              teams totaling 24-36 engineers. My focus is on developing the Freight Market Intelligence 
              platform that integrates machine learning predictions into real-time decision-making tools.
            </p>
            <p className="leading-relaxed">
              Throughout my career, I've had the privilege of working with industry leaders including 
              Nike, Novartis, Merck, Blue Cross, and Times World. My experience spans across diverse 
              sectors including logistics, retail, healthcare, media, and ad-tech.
            </p>
            <p className="leading-relaxed">
              I'm passionate about building scalable systems, mentoring engineering teams, and driving 
              innovation through thoughtful architecture decisions. My approach combines technical 
              excellence with strong business acumen to deliver solutions that create real impact.
            </p>
          </div>
        </div>

        {/* Core Expertise */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Core Expertise</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {expertise.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;