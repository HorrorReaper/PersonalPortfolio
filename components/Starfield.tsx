'use client'

import { useEffect, useRef, useState } from 'react'

type Star = {
  x: number
  y: number
  size: number
  baseAlpha: number
  amp: number
  phase: number
  freq: number
  layer: number
  speed: number // px/s
}

type Props = {
  className?: string
  density?: number // stars per viewport pixel (very small); default ~0.00012
  maxStars?: number // hard cap for perf
  speed?: number // global speed multiplier
  parallax?: number // mouse parallax strength in px (max offset)
  color?: string // base color for stars (CSS color)
  twinkle?: boolean
}

export default function Starfield({
  className = '',
  density = 0.00012,
  maxStars = 700,
  speed = 1,
  parallax = 12,
  color = '#ffffff',
  twinkle = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const [ready, setReady] = useState(false)

  // Mouse parallax state (render-only, no layout)
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Respect reduced motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const DPR = Math.min(window.devicePixelRatio || 1, 2) // cap DPR for perf
    let width = 0
    let height = 0

    // Three depth layers for parallax and varying speed
    const layers = [
      { weight: 0.5, speed: 8 },   // far
      { weight: 0.3, speed: 18 },  // mid
      { weight: 0.2, speed: 36 },  // near
    ]

    let stars: Star[] = []

    function resize() {
      const { innerWidth: w, innerHeight: h } = window
      width = w
      height = h

      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      canvas.width = Math.floor(w * DPR)
      canvas.height = Math.floor(h * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)

      // Rebuild stars based on area
      const desired = Math.min(maxStars, Math.floor(w * h * density))
      stars = []

      // Compute counts per layer by weights
      const counts = layers.map((l) => Math.floor(desired * l.weight))
      const total = counts.reduce((a, b) => a + b, 0)
      // distribute remainder
      for (let i = 0; i < desired - total; i++) counts[i % counts.length]++

      layers.forEach((l, li) => {
        for (let i = 0; i < counts[li]; i++) {
          stars.push(makeStar(li))
        }
      })
    }

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    function makeStar(layer: number): Star {
      // Larger/near layers have bigger size, stronger twinkle, and higher alpha
      const layerBias = layer // 0,1,2
      const size = rand(0.6 + layerBias * 0.2, 1.6 + layerBias * 0.5)
      const baseAlpha = rand(0.25 + layerBias * 0.1, 0.75 + layerBias * 0.1)
      const amp = twinkle ? rand(0.05, 0.25 + layerBias * 0.05) : 0
      const phase = rand(0, Math.PI * 2)
      const freq = rand(0.6, 1.6) // twinkle frequency
      const baseSpeed = layers[layer].speed * speed

      return {
        x: rand(0, width),
        y: rand(0, height),
        size,
        baseAlpha,
        amp,
        phase,
        freq,
        layer,
        speed: baseSpeed,
      }
    }

    // Mouse parallax
    function onPointerMove(e: PointerEvent) {
      const nx = (e.clientX / width) * 2 - 1 // -1..1
      const ny = (e.clientY / height) * 2 - 1
      target.current.x = nx * parallax
      target.current.y = ny * parallax
    }

    // Gentle spring toward target each frame
    function updateParallax() {
      mouse.current.x += (target.current.x - mouse.current.x) * 0.06
      mouse.current.y += (target.current.y - mouse.current.y) * 0.06
    }

    let last = performance.now()

    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000) // cap dt at 50ms
      last = now

      if (!reduce) updateParallax()

      // Clear with transparent to let page bg show
      ctx.clearRect(0, 0, width, height)

      // Draw stars by layer order (far to near)
      for (let layer = 0; layer < 3; layer++) {
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i]
          if (s.layer !== layer) continue

          // Move horizontally; wrap around
          if (!reduce) {
            s.x -= s.speed * dt
            if (s.x < -8) {
              s.x = width + 8
              s.y = Math.random() * height
            }
          }

          // Parallax offset (near layers move more)
          const depth = 1 + layer * 0.5 // 1, 1.5, 2
          const px = mouse.current.x * (layer * 0.35)
          const py = mouse.current.y * (layer * 0.35)

          // Twinkle
          const alpha = Math.max(
            0,
            Math.min(1, s.baseAlpha + (reduce ? 0 : Math.sin(now / 1000 * s.freq + s.phase) * s.amp))
          )

          // Draw star
          ctx.globalAlpha = alpha
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.arc(s.x + px / depth, s.y + py / depth, s.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(frame)
    }

    resize()
    setReady(true)

    window.addEventListener('resize', resize)
    window.addEventListener('orientationchange', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    rafRef.current = requestAnimationFrame((t) => {
      last = t
      frame(t)
    })

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('orientationchange', resize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [density, maxStars, speed, parallax, color, twinkle])

  return (
    <div
      className={`fixed inset-0 -z-10 pointer-events-none overflow-hidden ${ready ? '' : 'opacity-0'} ${className}`}
      aria-hidden
    >
      <canvas ref={canvasRef} />
    </div>
  )
}
