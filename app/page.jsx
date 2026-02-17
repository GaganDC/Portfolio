"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/navbar"
import HeroSection from "../components/hero-section"
import AboutSection from "../components/about-section"
import ExperienceSection from "../components/experience-section"
import ProjectsSection from "../components/projects-section"
import ResumeSection from "../components/resume-section"
import ContactSection from "../components/contact-section"

import FloatingDotsBackground from "../components/floating-dots-background"
import Footer from "../components/footer"


export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  // Optional: persist login state using localStorage
  useEffect(() => {
    const auth = localStorage.getItem("portfolio-auth")
    if (auth === "true") {
      setIsAuthenticated(true)
      setIsEditMode(true)
    }
  }, [])

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
    setIsEditMode(true)
    localStorage.setItem("portfolio-auth", "true")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsEditMode(false)
    localStorage.removeItem("portfolio-auth")
  }

  const handleEditModeToggle = () => {
    setIsEditMode((prev) => !prev)
  }

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        isEditMode={isEditMode}
        onEditMode={handleEditModeToggle}
        onLogout={handleLogout}
        onAuthenticated={handleAuthenticated}
      />
      <FloatingDotsBackground />
      <HeroSection isEditMode={isEditMode} />
      <AboutSection isEditMode={isEditMode} />
      <ExperienceSection />
      <ProjectsSection isEditMode={isEditMode} />
      <ResumeSection isEditMode={isEditMode} />
      <ContactSection />
      <Footer />
    </>
  )
}
