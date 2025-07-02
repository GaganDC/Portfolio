"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import ResumeSection from "@/components/resume-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import FloatingDotsBackground from "@/components/floating-dots-background"

export default function Home() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for existing authentication on page load
  useEffect(() => {
    const authStatus = localStorage.getItem("portfolio-auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  // Save authentication status to localStorage
  useEffect(() => {
    localStorage.setItem("portfolio-auth", isAuthenticated.toString())
  }, [isAuthenticated])

  const toggleEditMode = () => {
    if (!isAuthenticated) {
      return // This shouldn't happen, but just in case
    }
    setIsEditMode(!isEditMode)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsEditMode(false)
    localStorage.removeItem("portfolio-auth")
  }

  // Debug logging
  console.log("Edit Mode:", isEditMode, "Authenticated:", isAuthenticated)

  return (
    <main className="min-h-screen relative">
      <FloatingDotsBackground />
      <div className="relative z-10">
        <Navbar
          onEditMode={toggleEditMode}
          isEditMode={isEditMode}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
        <HeroSection isEditMode={isEditMode} />
        <AboutSection isEditMode={isEditMode} />
        <ProjectsSection isEditMode={isEditMode} />
        <ResumeSection isEditMode={isEditMode} />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
