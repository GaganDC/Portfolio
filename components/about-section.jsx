"use client"

import { useState } from "react"
import { Github, Linkedin, Twitter, Instagram, Mail, Globe } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import ScrollReveal from "./scroll-reveal"
import { useToast } from "../hooks/use-toast"

export default function AboutSection({ isEditMode }) {
  const { toast } = useToast()
  const [aboutData, setAboutData] = useState({
    title: "About Me",
    description:
      "I am a passionate full-stack developer with over 2 years of experience in creating web applications...",
    skills: [
      "HTML","CSS","JavaScript", "React",  "Node.js", "Python",
      "PostgreSQL", "MongoDB", "AWS", "Docker", "Git", "Figma","Tailwind CSS","Machine Learning","FastAPI","Matplotlib","Scikit-learn", "Pandas","NumPy"
    ],
    socialLinks: {
      github: "https://github.com/GaganDc",
      linkedin: "https://www.linkedin.com/in/gagandeep-chinthakunta-3a7190326/",
      instagram: "https://www.instagram.com/gagan_stark_46?igsh=aG9qejNkcmNwMGpw&utm_source=qr",
      email: "gagandeep.c046@gmail.com",
    },
  })

  const [editData, setEditData] = useState(aboutData)

  const handleSave = () => {
    setAboutData(editData)
    toast({
      title: "Success",
      description: "About section updated successfully!",
    })
  }

  const handleSkillsChange = (value) => {
    const skills = value.split(",").map(skill => skill.trim()).filter(Boolean)
    setEditData({ ...editData, skills })
  }

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
    email: Mail,
    website: Globe,
  }

  return (
    <section id="about" className="py-20 bg-background relative">
      <div className="container mx-auto px-4 sm-6 lg-8 relative z-10">
        {isEditMode ? (
          <ScrollReveal animation="fade-up">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Edit About Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    rows={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Skills (comma separated)</label>
                  <Textarea
                    value={editData.skills.join(", ")}
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(editData.socialLinks).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium mb-2">
                        {key.charAt(0).toUpperCase() + key.slice(1)} URL
                      </label>
                      <Input
                        value={value}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            socialLinks: { ...editData.socialLinks, [key]: e.target.value },
                          })
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        ) : (
          <div className="max-w-4xl mx-auto">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:4xl font-bold font-poppins mb-4 gradient-text">{aboutData.title}</h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <ScrollReveal animation="fade-right" delay={200} className="lg:col-span-2 space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">{aboutData.description}</p>

                <div>
                  <h3 className="text-xl font-semibold mb-4 font-poppins">Skills & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {aboutData.skills.map((skill, index) => (
                      <ScrollReveal key={index} animation="scale-up" delay={index * 50}>
                        <Badge
                          variant="secondary"
                          className="text-sm py-1 px-3 hover-primary hover-primary-foreground transition-colors duration-200 cursor-default"
                        >
                          {skill}
                        </Badge>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-left" delay={400}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center font-poppins">Connect With Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(aboutData.socialLinks).map(([platform, url], index) => {
                        const Icon = socialIcons[platform]
                        return (
                          <ScrollReveal key={platform} animation="fade-up" delay={500 + index * 100}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2 hover-primary hover-primary-foreground transition-colors duration-200 bg-transparent"
                              onClick={() =>
                                platform === "email"
                                  ? (window.location.href = `mailto:${url}`)
                                  : window.open(url, "_blank")
                              }
                            >
                              <Icon className="h-4 w-4" />
                              {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </Button>
                          </ScrollReveal>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
