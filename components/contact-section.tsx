"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || "Portfolio Contact")
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.open(`mailto:sohamdas1300@gmail.com?subject=${subject}&body=${body}`)
  }

  return (
    <section id="contact" ref={ref} className="py-20 px-6 relative">
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
              Let's Connect
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ready to collaborate on innovative AI solutions? Let's discuss how we can create impactful technology
              together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Get In Touch</h3>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                        <Mail size={24} className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <a
                          href="mailto:sohamdas1300@gmail.com"
                          className="text-white hover:text-cyan-400 transition-colors font-medium"
                        >
                          sohamdas1300@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                        <Phone size={24} className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <p className="text-white font-medium">+91 83350 98451</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                        <MapPin size={24} className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-white font-medium">Nagpur, Maharashtra, India</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-700">
                    <h4 className="text-lg font-semibold text-white mb-4">Connect Online</h4>
                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                        onClick={() => window.open("#")}
                      >
                        <Github size={20} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                        onClick={() => window.open("#")}
                      >
                        <Linkedin size={20} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                        onClick={() => window.open("#")}
                      >
                        <ExternalLink size={20} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Availability Status */}
              <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-white font-medium">Available for Projects</p>
                      <p className="text-gray-400 text-sm">Open to AI engineering opportunities and collaborations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Send a Message</h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-400"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-400"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-300">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-400"
                        placeholder="Project collaboration, job opportunity, etc."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-300">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-slate-800/50 border-slate-600 text-white focus:border-cyan-400 min-h-[120px]"
                        placeholder="Tell me about your project or opportunity..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3"
                    >
                      <Send size={20} className="mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center pt-12 border-t border-slate-700">
            <p className="text-gray-400">© 2024 Soham Das. Built with Next.js, TypeScript, and Framer Motion.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
