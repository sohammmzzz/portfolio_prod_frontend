"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, MapPin, Mail, Phone, Github, Linkedin, Music } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutSection() {
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
    <section id="about" ref={ref} className="py-20 px-6 relative">
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
              About Me
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Passionate AI Engineer bridging the gap between cutting-edge technology and real-world impact
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Personal Story */}
            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-cyan-400">My Journey</h3>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      With 1.5 years of hands-on experience at Solar Industries India Ltd, I've specialized in
                      developing AI-powered solutions that drive real business impact. My expertise spans from
                      Generative AI and RAG systems to enterprise automation and supply chain optimization.
                    </p>
                    <p>
                      I'm passionate about creating locally hosted agentic systems that minimize hallucinations while
                      maximizing efficiency. My work has resulted in measurable outcomes including 15% reduction in
                      manufacturing downtime and 80% automation in order processing.
                    </p>
                    <p>
                      Beyond technology, I'm a multi-instrumentalist and music producer, bringing creativity and
                      artistic sensibility to my technical work. This unique combination allows me to approach AI
                      challenges with both analytical rigor and creative innovation.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Get In Touch</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <MapPin size={20} className="text-cyan-400" />
                      <span>Nagpur, Maharashtra, India</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Mail size={20} className="text-cyan-400" />
                      <a href="mailto:sohamdas1300@gmail.com" className="hover:text-cyan-400 transition-colors">
                        sohamdas1300@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Phone size={20} className="text-cyan-400" />
                      <span>+91 83350 98451</span>
                    </div>
                    <div className="flex items-center space-x-4 pt-2">
                      <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                        <Github size={24} />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                        <Linkedin size={24} />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Education & Achievements */}
            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Education</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <GraduationCap size={24} className="text-cyan-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">Bachelor of Technology (Information Technology)</h4>
                        <p className="text-gray-400">Sikkim Manipal Institute of Technology, Majitar</p>
                        <p className="text-gray-400">June 2018 – June 2022 | CGPA: 8.17</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Coursework: Data Structures, AI, Machine Learning, Database Systems
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Beyond Technology</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Music size={24} className="text-cyan-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">Music & Leadership</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Multi-instrumentalist and music producer with professional experience in recording, mixing,
                          and mastering. Former President of SMIT Music Club, organizing festivals with 200+
                          participants. Passionate about experimental sound design and mentoring aspiring musicians.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Achievements */}
              <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Key Achievements</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">15% reduction in manufacturing downtime</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">80% zero-touch order processing automation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">40-50% reduction in turnaround time</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">80% reduction in manual data cleaning time</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
