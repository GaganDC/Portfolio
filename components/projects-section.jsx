"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink, Github, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import ScrollReveal from "./scroll-reveal";
import { useToast } from "../hooks/use-toast";

export default function ProjectsSection({ isEditMode }) {
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "/placeholder.svg",
    technologies: [],
    liveUrl: "",
    githubUrl: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const uploadImage = async (base64) => {
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64 }),
    });

    const data = await res.json();
    if (!res.ok || !data.url) throw new Error(data.error || "Failed to upload");
    return data.url;
  };

  const handleImageUploadForNew = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const url = await uploadImage(reader.result);
        setNewProject((prev) => ({ ...prev, image: url }));
        toast({
          title: "Image Uploaded",
          description: "New project image uploaded.",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageUploadForEdit = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const url = await uploadImage(reader.result);
        setEditingProject((prev) => ({ ...prev, image: url }));
        toast({
          title: "Image Updated",
          description: "Edited image uploaded.",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      const saved = await res.json();
      setProjects([...projects, { ...newProject, _id: saved.id }]);
      setNewProject({
        title: "",
        description: "",
        image: "/placeholder.svg",
        technologies: [],
        liveUrl: "",
        githubUrl: "",
      });
      setIsAddingProject(false);
      toast({
        title: "Project Added",
        description: "Successfully added new project.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to add project.",
        variant: "destructive",
      });
    }
  };

  const handleEditProject = async (project) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });

      if (!res.ok) throw new Error("Failed to update project");

      setProjects((prev) =>
        prev.map((p) => (p._id === project._id ? project : p))
      );
      setEditingProject(null);
      toast({ title: "Project Updated", description: "Changes saved." });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to update project.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast({ title: "Deleted", description: "Project deleted successfully." });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete project.",
        variant: "destructive",
      });
    }
  };

  const handleTechnologiesChange = (value, setter, currentProject) => {
    const technologies = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setter({ ...currentProject, technologies });
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 gradient-text">
              My Projects
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and
              experience
            </p>
          </div>
        </ScrollReveal>

        {isEditMode && (
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="mb-8 text-center">
              <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" /> Add New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      value={newProject.title}
                      onChange={(e) =>
                        setNewProject({ ...newProject, title: e.target.value })
                      }
                      placeholder="Project title"
                    />
                    <Textarea
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      placeholder="Project description"
                    />
                    <Input
                      value={newProject.technologies.join(", ")}
                      onChange={(e) =>
                        handleTechnologiesChange(
                          e.target.value,
                          setNewProject,
                          newProject
                        )
                      }
                      placeholder="Technologies (comma separated)"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={newProject.liveUrl}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            liveUrl: e.target.value,
                          })
                        }
                        placeholder="Live URL"
                      />
                      <Input
                        value={newProject.githubUrl}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            githubUrl: e.target.value,
                          })
                        }
                        placeholder="GitHub URL"
                      />
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUploadForNew}
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddingProject(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddProject}>Add Project</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ScrollReveal key={project._id} animation="fade-up" delay={i * 100}>
              <Card className="group h-full flex flex-col">
                <div className="relative">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  {isEditMode && (
                    <div className="absolute top-2 right-2 space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setEditingProject(project)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteProject(project._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="font-poppins">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="bg-transparent"
                      >
                        <a href={project.liveUrl} target="_blank">
                          <ExternalLink className="h-4 w-4 mr-2" /> Live
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="bg-transparent"
                      >
                        <a href={project.githubUrl} target="_blank">
                          <Github className="h-4 w-4 mr-2" /> Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
        {editingProject && (
  <Dialog
    open={!!editingProject}
    onOpenChange={() => setEditingProject(null)}
  >
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Edit Project</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Input
          value={editingProject.title}
          onChange={(e) =>
            setEditingProject({
              ...editingProject,
              title: e.target.value,
            })
          }
          placeholder="Project Title"
        />
        <Textarea
          value={editingProject.description}
          onChange={(e) =>
            setEditingProject({
              ...editingProject,
              description: e.target.value,
            })
          }
          rows={4}
          placeholder="Project Description"
        />
        <Input
          value={(editingProject.technologies || []).join(", ")}
          onChange={(e) =>
            handleTechnologiesChange(
              e.target.value,
              setEditingProject,
              editingProject
            )
          }
          placeholder="Technologies (comma separated)"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={editingProject.liveUrl}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                liveUrl: e.target.value,
              })
            }
            placeholder="Live URL"
          />
          <Input
            value={editingProject.githubUrl}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                githubUrl: e.target.value,
              })
            }
            placeholder="GitHub URL"
          />
        </div>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUploadForEdit}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setEditingProject(null)}>
            Cancel
          </Button>
          <Button onClick={() => handleEditProject(editingProject)}>
            Save Changes
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)}

        
      </div>
    </section>
  );
}
