"use client"

import React, { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.target
    const formData = {
      access_key: "1f9b6369-b1d9-4b01-80ce-662d54bf6522", // ✅ Replace with your actual Web3Forms access key
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        alert("✅ Message sent successfully!")
        form.reset()
      } else {
        alert("❌ Submission failed: " + (data.message || "Unknown error"))
        console.error("Web3Forms error:", data)
      }
    } catch (error) {
      alert("❌ Network error. Please try again later.")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 gradient-text">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I’d love to hear from you!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold font-poppins mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always open to discussing new opportunities, creative projects, or potential collaborations.
              </p>
            </div>
            <div className="space-y-6">
              <ContactInfo icon={<Mail />} label="Email" value="your.email@example.com" />
              <ContactInfo icon={<Phone />} label="Phone" value="+91 9123456789" />
              <ContactInfo icon={<MapPin />} label="Location" value="Hyderabad, India" />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Send Me a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup
                    label="Name *"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                  />
                  <InputGroup
                    label="Email *"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                  />
                </div>

                <InputGroup
                  label="Subject *"
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                />

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Tell me about your project or just say hello!"
                    rows={6}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function ContactInfo({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold">{label}</h4>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}

function InputGroup({ label, id, name, type, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <Input
        id={id}
        name={name}
        type={type}
        required
        placeholder={placeholder}
      />
    </div>
  )
}
