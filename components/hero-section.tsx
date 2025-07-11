"use client"

import { useEffect,useState, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"


export default function HeroSection() {
  const controls = useAnimation()
  const sectionRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateIsMobile);
    updateIsMobile(); // set initial value
    return () => mediaQuery.removeEventListener('change', updateIsMobile);
  }, []);
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    })
  }, [controls])

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        className="text-center max-w-4xl mx-auto relative z-10"
      >

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Soham Das
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 h-16"
        >
          
          <TypeAnimation
            sequence={[
              "AI Engineer",
              2000,
              "Data Scientist",
              2000,
              "LLM Integration Developer",
              2000,
              "Supply Chain AI Innovator",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Number.POSITIVE_INFINITY}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          />
        </motion.div>

        {/* Paragraph with conditional glassmorphism background */}
        <div className="relative mb-12">
          {/* Glassmorphism background - only visible on mobile */}
          {isMobile && (
            <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl -m-4" />
          )}
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed relative z-10 px-4 py-4"
          >
            Bridging the gap between cutting-edge AI technology and real-world applications. Specializing in Generative
            AI, RAG systems, and enterprise automation with measurable impact on business outcomes.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={scrollToNext}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Explore My Work
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open("mailto:sohamdas1300@gmail.com")}
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
          >
            Get In Touch
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-25 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToNext}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ChevronDown size={32} />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}