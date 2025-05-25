"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Building2, Calendar, MapPin, TrendingUp, Zap, Database, Bot } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    title: "Lead AI Engineer",
    company: "Solar Industries India Ltd",
    location: "Nagpur, Maharashtra",
    period: "October 2023 – Present",
    type: "Full-time",
    description:
      "Leading AI initiatives in manufacturing and supply chain optimization, developing enterprise-grade AI solutions with measurable business impact.",
    achievements: [
      {
        title: "Intelligent Root Cause Analysis System",
        description:
          "Designed and implemented an LLM-powered application for real-time Root Cause Analysis in manufacturing plants using RAG frameworks and Neo4j graph databases.",
        impact: "15% reduction in downtime",
        icon: Bot,
      },
      {
        title: "Supply Chain Optimization with LLMs",
        description:
          "Developed AI-based tool that dynamically adjusts optimization constraints in Gurobi, enabling real-time simulation and impact estimation.",
        impact: "Enhanced responsiveness to supply chain deviations",
        icon: TrendingUp,
      },
      {
        title: "ArselaT Sales Data Chatbot",
        description:
          "Created locally hosted, PostgreSQL-integrated chatbot to query and analyze sales data, uncovering trends and outliers.",
        impact: "Improved data visibility for non-technical stakeholders",
        icon: Database,
      },
      {
        title: "Order Management & Dispatch Automation",
        description:
          "Developed full-stack web application integrated with CRM system to automate order processing and dispatch planning.",
        impact: "80% zero-touch processing, 40-50% reduction in turnaround time",
        icon: Zap,
      },
    ],
    technologies: ["Python", "LangChain", "Neo4j", "PostgreSQL", "Ollama", "Gurobi", "AWS Lambda", "FastAPI", "React"],
  },
]

export default function ExperienceSection() {
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
    <section id="experience" ref={ref} className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Experience
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              1.5 years of hands-on experience delivering AI solutions with measurable business impact
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
                  <CardContent className="p-8">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                        <div className="flex items-center space-x-4 text-gray-400">
                          <div className="flex items-center space-x-2">
                            <Building2 size={16} />
                            <span>{exp.company}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin size={16} />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                        <Calendar size={16} className="text-cyan-400" />
                        <span className="text-cyan-400 font-semibold">{exp.period}</span>
                        <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                          {exp.type}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-8 leading-relaxed">{exp.description}</p>

                    {/* Key Achievements */}
                    <div className="space-y-6 mb-8">
                      <h4 className="text-xl font-semibold text-cyan-400">Key Achievements</h4>
                      <div className="grid gap-6">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.div
                            key={achIndex}
                            whileHover={{ scale: 1.02 }}
                            className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50"
                          >
                            <div className="flex items-start space-x-4">
                              <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                                <achievement.icon size={20} className="text-cyan-400" />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-semibold text-white mb-2">{achievement.title}</h5>
                                <p className="text-gray-400 text-sm mb-3 leading-relaxed">{achievement.description}</p>
                                <div className="inline-flex items-center px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                                  <TrendingUp size={14} className="text-green-400 mr-2" />
                                  <span className="text-green-400 text-sm font-medium">{achievement.impact}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-cyan-400">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Projects */}
          <motion.div variants={itemVariants}>
            <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Additional Projects & Initiatives</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-cyan-400">Sales Data Pipeline Implementation</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Led development of automated ETL pipeline for daily sales data with Python data-cleaning scripts,
                      schema validation, and AWS Lambda deployment with EventBridge orchestration.
                    </p>
                    <div className="inline-flex items-center px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                      <TrendingUp size={14} className="text-green-400 mr-2" />
                      <span className="text-green-400 text-sm font-medium">
                        80% reduction in manual data cleaning time
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-cyan-400">Power BI Dashboard Development</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Designed interactive dashboards to visualize anomalies in sales and operational metrics,
                      integrating custom DAX measures and drill-through capabilities for stakeholder insights.
                    </p>
                    <div className="inline-flex items-center px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                      <TrendingUp size={14} className="text-green-400 mr-2" />
                      <span className="text-green-400 text-sm font-medium">
                        Minutes to identify trends vs hours previously
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
