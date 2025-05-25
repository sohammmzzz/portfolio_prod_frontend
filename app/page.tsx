"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ExpertiseSection from "@/components/expertise-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import ContactSection from "@/components/contact-section"
import ParticleBackground from "@/components/particle-background"
import ChatAssistant from "@/components/chat-assistant"
import Navigation from "@/components/navigation"

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.6, 0.4])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Particle Background */}
      <motion.div className="fixed inset-0 z-0" style={{ opacity: backgroundOpacity }}>
        <ParticleBackground />
      </motion.div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExpertiseSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Chat Assistant */}
      <ChatAssistant />
    </div>
  )
}
