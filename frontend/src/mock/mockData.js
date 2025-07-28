// Mock data for the portfolio website
export const mockData = {
  // Blog posts for Engineering Thoughts section
  blogPosts: [
    {
      id: 1,
      title: "Building Scalable AI-Driven Freight Systems",
      excerpt: "Lessons learned from implementing machine learning predictions in real-time freight market intelligence platforms at enterprise scale.",
      content: "Full blog post content would go here...",
      date: "2024-12-15",
      readTime: "8 min read",
      category: "AI & Machine Learning",
      tags: ["AI", "Machine Learning", "Freight", "Enterprise", "GCP"],
      author: "Dewanshu Singh Sisaudiya",
      featured: true
    },
    {
      id: 2,
      title: "Leading Global Engineering Teams in Remote-First Era",
      excerpt: "Strategies for managing 24+ engineers across different time zones while maintaining code quality and team cohesion.",
      content: "Full blog post content would go here...",
      date: "2024-11-28",
      readTime: "6 min read",
      category: "Leadership",
      tags: ["Leadership", "Remote Work", "Team Management", "Engineering"],
      author: "Dewanshu Singh Sisaudiya",
      featured: true
    },
    {
      id: 3,
      title: "Microservices Architecture: Lessons from CORE Ad Exchange",
      excerpt: "How we designed and scaled a high-performance ad exchange platform using microservices architecture and GraphQL.",
      content: "Full blog post content would go here...",
      date: "2024-11-10",
      readTime: "12 min read",
      category: "Architecture",
      tags: ["Microservices", "GraphQL", "Spring Boot", "Architecture"],
      author: "Dewanshu Singh Sisaudiya",
      featured: false
    },
    {
      id: 4,
      title: "IoT in Retail: The Nike Smart Store Experience",
      excerpt: "Transforming retail through IoT sensors and automated inventory management systems that enhance customer experience.",
      content: "Full blog post content would go here...",
      date: "2024-10-22",
      readTime: "10 min read",
      category: "IoT",
      tags: ["IoT", "Retail", "Automation", "Angular", "Django"],
      author: "Dewanshu Singh Sisaudiya",
      featured: false
    },
    {
      id: 5,
      title: "Cloud Migration Strategies for Enterprise Applications",
      excerpt: "A comprehensive guide to migrating legacy enterprise systems to cloud platforms with minimal downtime and maximum efficiency.",
      content: "Full blog post content would go here...",
      date: "2024-10-05",
      readTime: "15 min read",
      category: "Cloud",
      tags: ["Cloud", "Migration", "AWS", "GCP", "Enterprise"],
      author: "Dewanshu Singh Sisaudiya",
      featured: false
    },
    {
      id: 6,
      title: "The Evolution of Frontend Frameworks: From Angular to React",
      excerpt: "Comparing frontend frameworks based on real-world project experience and when to choose each for different use cases.",
      content: "Full blog post content would go here...",
      date: "2024-09-18",
      readTime: "9 min read",
      category: "Frontend",
      tags: ["Angular", "React", "Frontend", "JavaScript", "Development"],
      author: "Dewanshu Singh Sisaudiya",
      featured: false
    }
  ],

  // Contact form submissions (for demonstration)
  contactSubmissions: [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      subject: "Collaboration Opportunity",
      message: "I'd like to discuss a potential collaboration on an AI project.",
      timestamp: "2024-12-01T10:30:00Z",
      status: "new"
    }
  ],

  // Testimonials (placeholder)
  testimonials: [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "VP of Engineering, Cargill",
      company: "Cargill",
      content: "Dewanshu's leadership in developing our AI-driven freight intelligence platform has been exceptional. His ability to translate complex technical concepts into business value is remarkable.",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Mike Chen",
      position: "Product Manager, Nike",
      company: "Nike",
      content: "The IoT retail solution Dewanshu architected for our smart stores exceeded all expectations. His technical expertise and project management skills were instrumental to our success.",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "CTO, Zees Media",
      company: "Zees Media",
      content: "Dewanshu delivered a robust streaming platform that handles millions of users seamlessly. His cloud architecture expertise and attention to scalability were impressive.",
      rating: 5,
      image: "/api/placeholder/80/80"
    }
  ],

  // Resume/CV data
  resumeData: {
    personalInfo: {
      name: "Dewanshu Singh Sisaudiya",
      title: "Senior Manager – Software Engineering",
      email: "sisaudiya.dewan17@gmail.com",
      phone: "+91 7668436606",
      location: "Bangalore, India",
      linkedin: "https://linkedin.com/in/dewanshu-sisaudiya",
      github: "https://github.com/dewanshu-sisaudiya"
    },
    summary: "Experienced engineering leader with 14+ years in software development, team management, and AI integration. Proven track record in delivering enterprise-scale solutions across multiple industries.",
    education: [
      {
        degree: "B.Tech. in Information Technology",
        institution: "UNSIET Jaunpur",
        year: "2007-2011",
        location: "India"
      }
    ]
  },

  // Skills and competencies
  skills: {
    programming: ["Java", "JavaScript", "Python", "TypeScript", "C#"],
    frameworks: ["Angular", "React", "Spring Boot", "NestJS", "Django"],
    cloud: ["AWS", "GCP", "Azure", "Docker", "Kubernetes"],
    databases: ["MongoDB", "PostgreSQL", "MySQL", "BigQuery"],
    tools: ["Git", "Jenkins", "Bamboo", "SonarQube", "Jira"],
    methodologies: ["Agile", "Scrum", "DevOps", "CI/CD", "Test-Driven Development"]
  },

  // Statistics for dashboard/analytics
  statistics: {
    yearsOfExperience: 14,
    teamsLed: 5,
    projectsCompleted: 25,
    companiesWorked: 8,
    technologiesUsed: 30
  }
};

export default mockData;