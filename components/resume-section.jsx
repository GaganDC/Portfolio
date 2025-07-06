"use client";

import React, { useState, useEffect, useRef } from "react";
import { Download, Upload, FileText, Eye } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useToast } from "../hooks/use-toast";
import { Input } from "../components/ui/input";

export default function ResumeSection({ isEditMode }) {
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  const [resumeData, setResumeData] = useState({
    fileName: "",
    fileUrl: "",
    uploadDate: null,
  });

  // ✅ Fetch resume data from MongoDB on mount
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (data.resumeUrl) {
          setResumeData({
            fileName: data.resumeFileName || extractFileName(data.resumeUrl),
            fileUrl: data.resumeUrl,
            uploadDate: data.resumeUploadDate || new Date().toISOString(),
          });
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to load resume",
          variant: "destructive",
        });
      }
    };
    fetchResume();
  }, []);

  const extractFileName = (url) => {
    try {
      return decodeURIComponent(url.split("/").pop().split("?")[0]);
    } catch {
      return "Resume.pdf";
    }
  };

  const handleFileUpload = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = async () => {
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileBase64: reader.result,
          isResume: true,
        }),
      });

      const data = await res.json();
      if (!data.url) throw new Error(data.error || "Upload failed");

      setResumeData({
        fileName: file.name,
        fileUrl: data.url,
        uploadDate: new Date().toISOString(),
      });

      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeUrl: data.url,
          resumeFileName: file.name,
          resumeUploadDate: new Date().toISOString(),
        }),
      });

      toast({ title: "Resume uploaded", description: "Saved successfully." });
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  reader.readAsDataURL(file);
};



  const handleDownload = () => {
    if (!resumeData.fileUrl) return;
    const link = document.createElement("a");
    link.href = resumeData.fileUrl;
    link.download = resumeData.fileName || "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    if (resumeData.fileUrl) {
      window.open(resumeData.fileUrl, "_blank");
    }
  };

  return (
    <section id="resume" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 gradient-text">
            Resume
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download my resume to learn more about my experience and
            qualifications
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="animate-slide-in-left">
            <CardHeader className="text-center">
              <CardTitle className="font-poppins flex items-center justify-center gap-2">
                <FileText className="h-6 w-6" />
                My Resume
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-32 bg-muted rounded-lg mb-4">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {resumeData.fileName || "No file uploaded"}
                </h3>
                {resumeData.uploadDate && (
                  <p className="text-sm text-muted-foreground">
                    Last updated:{" "}
                    {new Date(resumeData.uploadDate).toLocaleDateString(
                      "en-US"
                    )}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a
                    href={resumeData.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </Button>

                <Button asChild>
                  <a href={resumeData.fileUrl} download="Gagan_Resume.pdf">
                    Download Resume
                  </a>
                </Button>
              </div>

              {isEditMode && (
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold mb-4 text-center">
                    Update Resume
                  </h4>
                  <div className="space-y-4">
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Upload New Resume (PDF only)
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Max size 5MB. PDF files only.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              className="text-center animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">1+</div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </CardContent>
            </Card>
            <Card
              className="text-center animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">2+</div>
                <div className="text-sm text-muted-foreground">
                  Projects Completed
                </div>
              </CardContent>
            </Card>
            <Card
              className="text-center animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">0+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Clients
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
