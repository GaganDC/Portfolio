"use client"

import { useState } from "react"
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  Server,
  Layout,
  Shield,
  Zap,
  Code2,
  Brain,
  Monitor,
  Database,
  ArrowRight,
  X,
} from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog"
import ScrollReveal from "./scroll-reveal"

const experienceData = {
  company: "Medflow Dynamics",
  period: "Jul 2025 – Feb 2026",
  location: "Remote",
  product: "Medflow Assure",
  summary: [
    "Built Medflow Assure — a full-stack healthcare compliance SaaS platform used by UK medical practices for CQC regulatory compliance and practice management",
    "Contributed across 20+ feature modules spanning governance, staff management, clinical audits, risk compliance, CQC assessment, and rota scheduling",
    "Designed 50+ API routes (BFF layer) and 60+ custom React hooks for state management, while architecting 12 AWS Lambda microservices on the backend",
    "Implemented end-to-end authentication (AWS Cognito + OAuth 2.0), RBAC with Casbin, and secure service-to-service communication",
    "Integrated Amazon Bedrock AI for automated policy generation and built interactive compliance dashboards with real-time KPI tracking",
    "Owned the platform's largest microservice (RotaManagementService — 298 file changes) handling staff, training, appraisals, and shift management",
  ],
  roles: [
    {
      id: "frontend",
      title: "Software Engineer Intern",
      icon: Monitor,
      period: "Jul 2025 – Feb 2026",
      highlight: "Frontend & BFF Layer",
      color: "from-blue-500/10 to-cyan-500/10",
      borderColor: "hover:border-blue-500/30",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
      techStack: [
        "Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "Shadcn/ui",
        "TanStack Query", "TanStack Table", "React Hook Form", "Zod", "TipTap",
        "Framer Motion", "AWS Cognito", "dnd-kit", "Recharts",
      ],
      bullets: [
        "Developed 20+ feature modules including policy management, staff & training matrix, appraisal system, audit events, evidence locker, risk compliance, and rota/shift scheduling",
        "Designed and implemented 50+ RESTful API routes as a Backend-for-Frontend (BFF) layer handling data transformation between the frontend and microservices",
        "Created 60+ custom React hooks following consistent patterns (useGet*, useCreate*, useEdit*, useDelete*) for server state management with TanStack Query",
        "Implemented AWS Cognito authentication with MFA, OTP verification, session management, and JWT-based route protection via Next.js middleware",
        "Built RBAC with granular permissions for read, create, update, delete, and ownership-based access across all modules",
      ],
      details: [
        {
          title: "Product Overview", icon: Briefcase,
          items: [
            "Medflow Assure digitizes CQC compliance tracking, governance, staff management, clinical audits, risk management, and evidence documentation for UK-based medical practices",
            "Replaced manual, paper-based compliance processes with a real-time, data-driven web application",
          ],
        },
        {
          title: "Architecture", icon: Server,
          items: [
            "Backend-for-Frontend (BFF) pattern with 50+ Next.js API routes handling data transformation between the React frontend and microservices backend",
            "60+ custom React hooks following consistent patterns (useGet*, useCreate*, useEdit*, useDelete*) for server state management",
          ],
        },
        {
          title: "Key Features Built", icon: Layout,
          items: [
            "Built a rich-text policy editor using TipTap with tables, images, highlights, task lists, and AI-powered policy generation with template support",
            "Developed a multi-step appraisal wizard with auto-save, data persistence/recovery, auto-population of clinical skills, and PDF export",
            "Implemented drag-and-drop rota management with staff assignment, shift copying, workload analysis, and auto-generation using dnd-kit",
            "Built data visualization dashboards using Recharts with compliance scoring, heatmaps, action priority matrices, and real-time KPI widgets",
            "Implemented PDF/Excel export functionality using jsPDF and SheetJS for reports, audit logs, and compliance documents",
          ],
        },
        {
          title: "Security & Auth", icon: Shield,
          items: [
            "AWS Cognito authentication with MFA setup, OTP verification, session management, and secure JWT-based route protection via Next.js middleware",
            "Role-Based Access Control (RBAC) with granular permissions for read, create, update, delete, and ownership-based access across all modules",
          ],
        },
        {
          title: "Engineering Quality", icon: Code2,
          items: [
            "WCAG AA accessibility compliance — keyboard navigation, screen reader support, and color contrast",
            "TypeScript strict typing, Zod runtime validation, ESLint, Husky pre-commit hooks, and lint-staged pipelines",
          ],
        },
      ],
    },
    {
      id: "backend",
      title: "Backend Developer Intern",
      icon: Database,
      period: "Oct 2025 – Feb 2026",
      highlight: "Microservices & Infrastructure",
      color: "from-purple-500/10 to-pink-500/10",
      borderColor: "hover:border-purple-500/30",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
      techStack: [
        "TypeScript", "Node.js", "AWS Lambda", "Serverless Framework", "MongoDB",
        "Mongoose", "Amazon SQS", "Amazon Bedrock", "Casbin", "OAuth 2.0",
        "JWT", "CloudFormation", "SSM Parameter Store", "pnpm Monorepo",
      ],
      bullets: [
        "Built and maintained 12 AWS Lambda microservices in a pnpm monorepo with OAuth 2.0 service-to-service authentication and SQS event-driven messaging",
        "Architected a hybrid OAuth + SQS email notification system with Dead Letter Queues for reliable async delivery across 6+ services",
        "Implemented RBAC 2.0 with Casbin policy engine — granular ownership-based permissions securing 50+ API endpoints",
        "Owned the RotaManagementService (298 file changes) — the largest service handling staff CRUD, training, appraisals, rotas, and compliance",
        "Integrated Amazon Bedrock AI for automated policy generation and CQC regulatory mapping",
      ],
      details: [
        {
          title: "Architecture", icon: Server,
          items: [
            "12 independently deployable AWS Lambda microservices in a pnpm monorepo, communicating via REST APIs with OAuth 2.0 service-to-service authentication",
            "Asynchronous SQS event-driven messaging for decoupled inter-service communication",
          ],
        },
        {
          title: "Notification & Messaging", icon: Zap,
          items: [
            "Architected a hybrid OAuth + SQS email notification system with Dead Letter Queues (DLQ) for reliable message delivery across 6+ services",
            "Migrated notification patterns across ActionManagement, RiskManagement, Assessment, Rota, and Policy services to a unified SQS-based async pattern",
            "Optimized email throughput with batch sending and single OAuth token reuse per operation",
          ],
        },
        {
          title: "Authentication & Authorization", icon: Shield,
          items: [
            "Implemented OAuth 2.0 Client Credentials Flow for secure service-to-service communication using HS256 JWT tokens with a centralized ServiceAuthClient",
            "Built RBAC 2.0 using Casbin policy engine with granular ownership-based permissions (READ_OWN, UPDATE_OWN, DELETE_OWN) across 6 domain modules",
            "Implemented secure staff invitation flow with hashed tokens, single-use verification links, and email-based onboarding",
          ],
        },
        {
          title: "Staff & Rota Management", icon: Briefcase,
          items: [
            "Owned the RotaManagementService (298 file changes) — handling staff CRUD, training, appraisals, rotas, shifts, and compliance tracking",
            "Decoupled staff creation from invitation flow, enabling independent staff record management and async invitation emails",
            "Built bulk appraisals endpoint and implemented mandatory training auto-assignment with parallelized async operations",
          ],
        },
        {
          title: "Policy & AI Integration", icon: Brain,
          items: [
            "Integrated Amazon Bedrock AI for automated policy generation with policy-to-KLOE mapping for CQC compliance",
            "Resolved 17 bugs in PolicyManagementService and AssessmentService in a single release",
            "Implemented policy acknowledgement flow with staffId guards and auto-populated metadata",
          ],
        },
        {
          title: "Performance & Infrastructure", icon: Zap,
          items: [
            "Resolved AWS CloudFormation 500-resource limit by implementing nested stack strategies (split-stacks with perFunction/perType approaches)",
            "Parallelized async operations across handlers to reduce Lambda cold-start response times",
            "Removed hardcoded credentials and added SSM Parameter Store integration for secure config management",
            "Migrated 5+ services to structured context-aware logging with correlation IDs for distributed tracing",
            "Set up CI build gate as a required status check for PR merges",
          ],
        },
      ],
    },
  ],
}

function RoleCard({ role, index, isVisible, onOpen }) {
  const RoleIcon = role.icon

  return (
    <div
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(40px) scale(0.95)",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <Card
        className={`overflow-hidden border border-border/50 ${role.borderColor} transition-all duration-300 bg-gradient-to-br ${role.color} cursor-pointer hover:shadow-lg hover:shadow-primary/5`}
        onClick={() => onOpen(role)}
      >
        <CardContent className="p-5 md:p-6">
          {/* Role Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className={`h-11 w-11 rounded-xl ${role.iconBg} flex items-center justify-center shrink-0`}>
                <RoleIcon className={`h-5 w-5 ${role.iconColor}`} />
              </div>
              <div>
                <h4 className="text-lg font-bold font-poppins">{role.title}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {role.period}
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs w-fit font-medium">
              {role.highlight}
            </Badge>
          </div>

          {/* Bullets */}
          <ul className="space-y-2.5 mb-5">
            {role.bullets.map((point, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground text-sm leading-relaxed">
                <span className="mt-1.5 shrink-0">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {role.techStack.map((tech, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="text-xs py-0.5 px-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-center gap-2 text-primary font-medium text-sm pt-4 group">
            <span>Click for detailed breakdown</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RoleDetailDialog({ role, isOpen, onClose }) {
  if (!role) return null
  const RoleIcon = role.icon

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto p-5 md:p-8">
        <DialogHeader className="pb-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className={`h-11 w-11 rounded-xl ${role.iconBg} flex items-center justify-center shrink-0`}>
              <RoleIcon className={`h-5 w-5 ${role.iconColor}`} />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold font-poppins">
                {role.title}
              </DialogTitle>
              <DialogDescription className="text-primary font-semibold">
                {role.highlight} &middot; {role.period}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-7 pt-4">
          {role.details.map((section, i) => {
            const Icon = section.icon
            return (
              <div key={i}>
                <h4 className="flex items-center gap-2 text-base font-semibold font-poppins mb-3">
                  <Icon className="h-4 w-4 text-primary" />
                  {section.title}
                </h4>
                <ul className="space-y-2.5 ml-6">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-muted-foreground text-sm leading-relaxed">
                      <span className="mt-1.5 shrink-0">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ExperienceSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)

  return (
    <section id="experience" className="py-20 bg-muted/30 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 gradient-text">
              Internship Experience
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional experience building production-grade SaaS platforms for the healthcare industry
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto">
          {/* Face Card */}
          <ScrollReveal animation="fade-up" delay={100}>
            <Card
              className={`overflow-hidden border border-border/50 transition-all duration-500 ${
                isExpanded ? "border-primary/20" : "hover:border-primary/30 cursor-pointer hover:shadow-lg hover:shadow-primary/5"
              }`}
              onClick={() => !isExpanded && setIsExpanded(true)}
            >
              <CardContent className="p-6 md:p-8">
                {/* Company Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="space-y-1.5">
                    <h3 className="text-2xl md:text-3xl font-bold font-poppins">
                      {experienceData.company}
                    </h3>
                    <p className="text-primary font-semibold text-lg">
                      {experienceData.product} — Healthcare Compliance SaaS
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground md:text-right shrink-0">
                    <span className="flex items-center gap-1.5 md:justify-end">
                      <Calendar className="h-3.5 w-3.5" />
                      {experienceData.period}
                    </span>
                    <span className="flex items-center gap-1.5 md:justify-end">
                      <MapPin className="h-3.5 w-3.5" />
                      {experienceData.location}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <ul className="space-y-3 mb-6">
                  {experienceData.summary.map((point, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground text-sm leading-relaxed">
                      <span className="mt-1.5 shrink-0">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {!isExpanded ? (
                  <div className="flex items-center justify-center gap-2 text-primary font-medium text-sm pt-2 group">
                    <span>Click to explore Frontend & Backend contributions</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center gap-2 text-muted-foreground hover:text-primary"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsExpanded(false)
                    }}
                  >
                    Collapse <X className="h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Expanded Role Cards */}
          <div
            className="transition-all duration-500 ease-out overflow-hidden"
            style={{
              maxHeight: isExpanded ? "2000px" : "0px",
              opacity: isExpanded ? 1 : 0,
              marginTop: isExpanded ? "1.5rem" : "0",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {experienceData.roles.map((role, index) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  index={index}
                  isVisible={isExpanded}
                  onOpen={setSelectedRole}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Deep Dive Popup */}
        <RoleDetailDialog
          role={selectedRole}
          isOpen={!!selectedRole}
          onClose={() => setSelectedRole(null)}
        />
      </div>
    </section>
  )
}
