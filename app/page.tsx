  "use client"

  import { use, useRef ,useState,useEffect} from "react"
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



  import Spline from '@splinetool/react-spline';

  // export default function Portfolio() {
  //   return (
  //     <main>
        // <Spline
        //   scene="https://prod.spline.design/5XqEfa93rkm7U6Gk/scene.splinecode" 
        // />
  //     </main>
  //   );
  // }
  export default function Portfolio() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"],
    })

    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.6, 0.4])
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateIsMobile);
    updateIsMobile(); // set initial value
    return () => mediaQuery.removeEventListener('change', updateIsMobile);
  }, []);
    
  

    return (
      <div ref={containerRef} className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden">
        


        {/* Particle Background (layered on top of Spline) */}
        <motion.div className="fixed inset-0 z-1" style={{ opacity: backgroundOpacity }}>
          <ParticleBackground />
          
        </motion.div>

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="relative z-10">
        
        <Spline
          scene="https://prod.spline.design/5XqEfa93rkm7U6Gk/scene.splinecode" 
          style={{ position: 'absolute' ,height: isMobile ? '3%' : '9%', width: '100%',zIndex:1,top: isMobile ? '0.5%' : '0.4%' ,paddingBottom: isMobile ?'0%' : '0%'}}
                />
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