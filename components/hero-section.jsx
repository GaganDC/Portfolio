"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent } from "../components/ui/card"
import TypewriterEffect from "./typewriter-effect"
import ScrollReveal from "./scroll-reveal"
import { useToast } from "../hooks/use-toast"

export default function HeroSection({ isEditMode }) {
  const { toast } = useToast()

  const [heroData, setHeroData] = useState(null)
  const [editData, setEditData] = useState(null)

 useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile")
      const data = await res.json()

      // Remove _id from state to avoid MongoDB update error
      const { _id, ...rest } = data

      setHeroData(rest)
      setEditData(rest)
    } catch (err) {
      toast({
        title: "Failed to load profile",
        description: "Check backend/server logs.",
        variant: "destructive",
      })
    }
  }

  fetchProfile()
}, [])
const handleSave = async () => {
  console.log("Submitting this to MongoDB:", editData) // 👀 See if imageUrl is there

  await fetch("/api/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editData),
  })

  setHeroData(editData)

  toast({
    title: "Success",
    description: "Hero section updated successfully!",
  })
}







  const handleImageUpload = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onloadend = async () => {
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: reader.result }),
      })

      const data = await res.json()
      if (data.url) {
        setEditData((prev) => ({ ...prev, imageUrl: data.url }))
        toast({
          title: "Image Uploaded",
          description: "Successfully uploaded to Cloudinary.",
        })
      } else {
        throw new Error(data.error || "Upload failed")
      }
    } catch (err) {
      toast({
        title: "Upload Error",
        description: err.message,
        variant: "destructive",
      })
    }
  }
  reader.readAsDataURL(file)
}




  if (!heroData) return (
  <section className="min-h-screen flex items-center justify-center">
    <p className="text-muted-foreground animate-pulse">Loading profile...</p>
  </section>
)


  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 relative">
      <div className="container mx-auto px-4 sm-6 lg-8 relative z-10">
        {isEditMode ? (
          <ScrollReveal animation="fade-up">
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Edit Hero Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Greeting</label>
                      <Input
                        value={editData.greeting}
                        onChange={(e) => setEditData({ ...editData, greeting: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Professions (comma separated)</label>
                      <Input
                        value={editData.professions?.join(", ") || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            professions: e.target.value.split(",").map((p) => p.trim()).filter(Boolean),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        rows={4}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Profile Image</label>
                      <Input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
                      <div className="relative w-48 h-48 mx-auto">
                        <Image
                          src={editData.imageUrl || "/placeholder.svg"}
                          alt={editData.name || "Profile image"}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <ScrollReveal animation="fade-right" delay={200}>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground font-poppins">
                    {heroData.greeting}
                  </h2>
                  <h1 className="text-4xl md:text-5xl lg:text-7xl pb-5 font-bold font-poppins gradient-text">
                    {heroData.name}
                  </h1>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary font-poppins">
                    <TypewriterEffect words={heroData.professions || []} />
                  </div>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                  {heroData.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="font-semibold"
                    onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Get In Touch
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-semibold bg-transparent"
                    onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    View My Work
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={400}>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="relative w-80 h-80 md:w-96 md:h-96">
                    <Image
                      src={heroData.imageUrl || "/placeholder.svg"}
                      alt={heroData.name || "Profile image"}
                      fill
                      className="rounded-full object-cover shadow-2xl"
                      priority
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>
    </section>
  )
}
