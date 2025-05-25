"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  const createParticle = useCallback((width: number, height: number): Particle => {
    const colors = ["#00d4ff", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6"]
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }
  }, [])

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const { width, height } = canvas
    const particleCount = Math.min(Math.floor((width * height) / 8000), 150)

    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(width, height))
  }, [createParticle])

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save()
    ctx.globalAlpha = particle.opacity
    ctx.fillStyle = particle.color
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }, [])

  const drawConnections = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    const maxDistance = 100

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.2
          ctx.save()
          ctx.globalAlpha = opacity
          ctx.strokeStyle = "#00d4ff"
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
          ctx.restore()
        }
      }
    }
  }, [])

  const updateParticle = useCallback(
    (particle: Particle, width: number, height: number, mouseX: number, mouseY: number) => {
      // Mouse interaction
      const dx = mouseX - particle.x
      const dy = mouseY - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = 150

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance
        particle.vx -= (dx / distance) * force * 0.01
        particle.vy -= (dy / distance) * force * 0.01
      }

      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Boundary collision
      if (particle.x < 0 || particle.x > width) {
        particle.vx *= -0.8
        particle.x = Math.max(0, Math.min(width, particle.x))
      }
      if (particle.y < 0 || particle.y > height) {
        particle.vy *= -0.8
        particle.y = Math.max(0, Math.min(height, particle.y))
      }

      // Damping
      particle.vx *= 0.99
      particle.vy *= 0.99
    },
    [],
  )

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = canvas

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Update and draw particles
    const particles = particlesRef.current
    const { x: mouseX, y: mouseY } = mouseRef.current

    particles.forEach((particle) => {
      updateParticle(particle, width, height, mouseX, mouseY)
      drawParticle(ctx, particle)
    })

    // Draw connections
    drawConnections(ctx, particles)

    animationRef.current = requestAnimationFrame(animate)
  }, [updateParticle, drawParticle, drawConnections])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initParticles, animate])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ background: "transparent" }} />
  )
}
