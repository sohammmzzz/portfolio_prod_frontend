"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Github, Brain, Zap, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Project A",
    description:
      "LLM-powered application for real-time Root Cause Analysis in manufacturing plants using Retrieval-Augmented Generation frameworks and Neo4j graph databases with Ollama for local model inference.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["Python", "LangChain", "Neo4j", "Ollama", "RAG", "FastAPI"],
    category: "AI/ML",
    impact: "15% reduction in manufacturing downtime",
    features: [
      "Real-time anomaly detection",
      "Graph-based knowledge representation",
      "Local LLM inference for data privacy",
      "Interactive root cause visualization",
    ],
    icon: Brain,
    status: "Production",
    liveUrl: "https://project-a-demo.vercel.app",
  },
  {
    title: "Project B",
    description:
      "Full-stack web application integrated with in-house CRM system to automate order processing and dispatch planning via Python workflows and RPA systems with RAG chatbot integration.",
    image: "/placeholder.svg?height=300&width=500",
    technologies: ["React", "Node.js", "Python", "RPA", "CRM Integration"],
    category: "Automation",
    impact: "80% zero-touch processing, 40-50% turnaround time reduction",
    features: [
      "Automated order processing",
      "Intelligent dispatch planning",
      "CRM system integration",
      "Real-time status tracking",
    ],
    icon: Zap,
    status: "Production",
    liveUrl: "https://project-b-demo.vercel.app",
  },
]

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
    <section id="projects" ref={ref} className="py-20 px-6 relative">
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
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real-world AI solutions delivering measurable business impact across manufacturing, supply chain, and data
              analytics
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="h-full bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <div className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-lg">
                        <project.icon size={20} className="text-cyan-400" />
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-slate-900/80 backdrop-blur-sm border-cyan-500/50 text-cyan-400"
                      >
                        {project.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-green-500/20 border-green-500/50 text-green-400">
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>

                    <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>

                    {/* Impact */}
                    <div className="inline-flex items-center px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                      <TrendingUp size={14} className="text-green-400 mr-2" />
                      <span className="text-green-400 text-sm font-medium">{project.impact}</span>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-cyan-400">Key Features</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {project.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                            <span className="text-gray-400 text-xs">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-cyan-400">Technologies</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs border-slate-600 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                        onClick={() => window.open(project.liveUrl, "_blank")}
                      >
                        <ExternalLink size={16} className="mr-2" />
                        View Live Demo
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 text-gray-400 hover:bg-slate-700">
                        <Github size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center">
            <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-black mb-4">Interested in Collaborating?</h3>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                  I'm always excited to work on innovative AI projects that solve real-world problems. Let's discuss how
                  we can create impactful solutions together.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold"
                  onClick={() => window.open("mailto:sohamdas1300@gmail.com")}
                >
                  Start a Conversation
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
