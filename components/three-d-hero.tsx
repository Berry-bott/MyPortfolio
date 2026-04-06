'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  opacity: number
}

export function ThreeDHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rotationRef = useRef({ x: 0, y: 0, z: 0 })
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resizeCanvas()

    // Initialize particles in a 3D cube formation
    const initializeParticles = () => {
      particlesRef.current = []
      const particleCount = 150
      const spacing = 4

      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2
        const radius = 80 + Math.sin(i * 0.1) * 30

        particlesRef.current.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius + Math.sin(i * 0.05) * 40,
          z: Math.cos(i * 0.02) * 100,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
        })
      }
    }

    initializeParticles()

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(8, 15, 25, 0.1)'
      ctx.fillRect(0, 0, width, height)

      // Update rotation
      rotationRef.current.x += 0.0005 + mouseRef.current.y * 0.0001
      rotationRef.current.y += 0.0008 + mouseRef.current.x * 0.0001
      rotationRef.current.z += 0.0003

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        // Add slight attraction to center
        const centerX = -particle.x * 0.002
        const centerY = -particle.y * 0.002
        const centerZ = -particle.z * 0.001

        particle.vx += centerX
        particle.vy += centerY
        particle.vz += centerZ

        // Damping
        particle.vx *= 0.99
        particle.vy *= 0.99
        particle.vz *= 0.99

        // 3D rotation using rotation matrix
        const x = particle.x
        const y = particle.y
        const z = particle.z

        // Rotate around X
        let y1 = y * Math.cos(rotationRef.current.x) - z * Math.sin(rotationRef.current.x)
        let z1 = y * Math.sin(rotationRef.current.x) + z * Math.cos(rotationRef.current.x)

        // Rotate around Y
        let x2 = x * Math.cos(rotationRef.current.y) + z1 * Math.sin(rotationRef.current.y)
        let z2 = -x * Math.sin(rotationRef.current.y) + z1 * Math.cos(rotationRef.current.y)

        // Rotate around Z
        let x3 = x2 * Math.cos(rotationRef.current.z) - y1 * Math.sin(rotationRef.current.z)
        let y3 = x2 * Math.sin(rotationRef.current.z) + y1 * Math.cos(rotationRef.current.z)

        // Perspective projection
        const scale = 500 / (z2 + 400)
        const screenX = width / 2 + x3 * scale
        const screenY = height / 2 + y3 * scale

        // Calculate depth-based opacity and size
        const depthOpacity = (z2 + 200) / 400
        const depthSize = particle.size * scale * 0.5

        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, depthSize * 2)
        gradient.addColorStop(0, `rgba(0, 212, 255, ${particle.opacity * depthOpacity * 0.6})`)
        gradient.addColorStop(0.5, `rgba(0, 212, 255, ${particle.opacity * depthOpacity * 0.3})`)
        gradient.addColorStop(1, `rgba(0, 212, 255, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(screenX, screenY, depthSize * 2, 0, Math.PI * 2)
        ctx.fill()

        // Draw solid core
        ctx.fillStyle = `rgba(0, 212, 255, ${Math.min(1, particle.opacity * depthOpacity)})`
        ctx.beginPath()
        ctx.arc(screenX, screenY, depthSize, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw central orb
      const centerScale = 500 / 400
      const centralGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        80 * centerScale
      )
      centralGradient.addColorStop(0, 'rgba(0, 212, 255, 0.8)')
      centralGradient.addColorStop(0.5, 'rgba(0, 153, 204, 0.3)')
      centralGradient.addColorStop(1, 'rgba(0, 212, 255, 0)')

      ctx.fillStyle = centralGradient
      ctx.beginPath()
      ctx.arc(width / 2, height / 2, 80 * centerScale, 0, Math.PI * 2)
      ctx.fill()

      // Draw core sphere
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.6)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(width / 2, height / 2, 60 * centerScale, 0, Math.PI * 2)
      ctx.stroke()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background: 'transparent',
        display: 'block',
      }}
    />
  )
}
