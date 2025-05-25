"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Brain, Database, Code, Cloud, BarChart3, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const expertiseAreas = [
  {
    icon: Brain,
    title: "Generative AI",
    description: "RAG systems, LLM fine-tuning, synthetic data generation, and model evaluation",
    skills: ["RAG", "LangChain", "LlamaIndex", "CrewAI", "Model Fine-tuning"],
    level: 95,
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "ETL pipelines, database optimization, and real-time data processing",
    skills: ["PostgreSQL", "Neo4j", "ChromaDB", "FAISS", "AWS Lambda"],
    level: 90,
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "End-to-end application development with modern frameworks",
    skills: ["React", "Node.js", "Python", "TypeScript", "FastAPI"],
    level: 88,
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Serverless architectures, automation, and scalable deployments",
    skills: ["AWS", "Docker", "CI/CD", "Serverless", "Infrastructure"],
    level: 85,
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    description: "Data visualization, analytics dashboards, and business insights",
    skills: ["Power BI", "DAX", "Analytics", "Reporting", "KPI Design"],
    level: 92,
  },
  {
    icon: Zap,
    title: "AI Automation",
    description: "Agentic workflows, RPA systems, and intelligent process automation",
    skills: ["LangGraph", "Workflow Design", "RPA", "Process Mining", "Optimization"],
    level: 93,
  },
]

const technologies = [
  { name: "Python", level: 95, category: "Programming" },
  { name: "JavaScript/TypeScript", level: 90, category: "Programming" },
  { name: "LangChain", level: 95, category: "AI/ML" },
  { name: "PyTorch", level: 85, category: "AI/ML" },
  { name: "React/Next.js", level: 88, category: "Frontend" },
  { name: "PostgreSQL", level: 90, category: "Database" },
  { name: "AWS", level: 85, category: "Cloud" },
  { name: "Docker", level: 80, category: "DevOps" },
]

export default function ExpertiseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section id="expertise" ref={ref} className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Expertise
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Specialized skills in AI engineering, from research to production deployment
            </p>
          </motion.div>

          {/* Expertise Areas Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="h-full bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                        <area.icon size={24} className="text-cyan-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{area.title}</h3>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{area.description}</p>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Proficiency</span>
                        <span className="text-sm text-cyan-400 font-semibold">{area.level}%</span>
                      </div>
                      <Progress value={area.level} className="h-2" />
                    </div>

                    <div className="mt-4">
                      <div className="flex flex-wrap gap-1">
                        {area.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded-md border border-cyan-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Technology Stack */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-3xl font-bold text-center text-white">Technology Stack</h3>

            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(
                technologies.reduce(
                  (acc, tech) => {
                    if (!acc[tech.category]) acc[tech.category] = []
                    acc[tech.category].push(tech)
                    return acc
                  },
                  {} as Record<string, typeof technologies>,
                ),
              ).map(([category, techs]) => (
                <Card key={category} className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-cyan-400 mb-4">{category}</h4>
                    <div className="space-y-4">
                      {techs.map((tech) => (
                        <div key={tech.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">{tech.name}</span>
                            <span className="text-sm text-cyan-400 font-semibold">{tech.level}%</span>
                          </div>
                          <Progress value={tech.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
