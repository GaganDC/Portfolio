"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Menu, Edit, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "../components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
import AuthDialog from "./auth-dialog"
import { useToast } from "../hooks/use-toast"

export default function Navbar({ onEditMode, isEditMode, isAuthenticated, onLogout, onAuthenticated }) {
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const handleEditClick = () => {
    if (isAuthenticated) {
      onEditMode()
    } else {
      setShowAuthDialog(true)
    }
  }

  const handleAuthenticated = () => {
    onAuthenticated()
  }

  const handleLogout = () => {
    onLogout()
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    })
  }

  if (!mounted) return null

  return (
    <>
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
        <div className="container mx-auto px-4 sm-6 lg-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold font-poppins gradient-text">Portfolio</div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover-primary transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated && isEditMode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-destructive hover-destructive bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handleEditClick}
                className={isEditMode ? "bg-primary text-primary-foreground" : ""}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditMode ? "Exit Edit" : "Edit"}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark-0 dark-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="block md:hidden">
                  <Button variant="outline" size="icon" className="flex justify-center items-center">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm-[400px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className="text-left text-lg font-medium text-foreground hover-primary transition-colors duration-200"
                      >
                        {item.name}
                      </button>
                    ))}
                    <div className="border-t pt-4 space-y-2">
                      {isAuthenticated && isEditMode && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleLogout}
                          className="w-full text-destructive hover-destructive bg-transparent"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEditClick}
                        className={`w-full ${isEditMode ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        {isEditMode ? "Exit Edit" : "Edit"}
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onAuthenticated={handleAuthenticated}
      />
    </>
  )
}
