import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

// Components
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ProjectsSection from "./components/ProjectsSection";
import TechStackSection from "./components/TechStackSection";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ExperienceTimeline />
      <ProjectsSection />
      <TechStackSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/myPortfolioApp">
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
