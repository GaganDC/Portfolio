"use client"

import { Github, Linkedin, Twitter, Heart } from "lucide-react"
import { Button } from "../components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: "https://github.com/johndoe", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/johndoe", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/johndoe", label: "Twitter" },
  ]

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-poppins gradient-text">Portfolio</h3>
            <p className="text-muted-foreground">
              A passionate developer creating beautiful and functional web experiences.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              {["home", "about", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() =>
                    document.querySelector(`#${section}`)?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="flex space-x-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="icon"
                    asChild
                    className="hover:text-primary transition-colors bg-transparent"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            © {currentYear} Portfolio. 
            <Heart className="h-4 w-4 text-red-500" />
          </p>
        </div>
      </div>
    </footer>
  )
}
