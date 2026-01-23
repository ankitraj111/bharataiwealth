"use client"

import { useEffect, useRef } from "react"

export const DotsBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: -1000, y: -1000 }) // Start off-screen

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let t = 0

        // Handle mouse movement
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        }

        // Handle window resize
        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio
            canvas.height = canvas.offsetHeight * window.devicePixelRatio
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const gridSpacing = 40;
            const dotBaseRadius = 2.5;
            t += 0.02;

            const width = canvas.width / window.devicePixelRatio
            const height = canvas.height / window.devicePixelRatio
            const cols = Math.ceil(width / gridSpacing) + 1
            const rows = Math.ceil(height / gridSpacing) + 1

            // Evolving Color Theme
            const baseHue = (210 + Math.sin(t * 0.05) * 40).toFixed(0)
            const colorA = `hsla(${baseHue}, 80%, 60%, 0.5)`
            const colorB = `hsla(${(Number(baseHue) + 60) % 360}, 70%, 50%, 0.2)`

            const nodes: any[] = []

            // Calculate grid positions with noise
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const baseX = i * gridSpacing
                    const baseY = j * gridSpacing

                    // Evolving noise pattern
                    const noiseX = Math.sin(t + i * 0.3 + j * 0.2) * 8
                    const noiseY = Math.cos(t + j * 0.3 + i * 0.2) * 8

                    // Mouse displacement
                    const dx = mouseRef.current.x - baseX
                    const dy = mouseRef.current.y - baseY
                    const distSq = dx * dx + dy * dy
                    const dist = Math.sqrt(distSq)

                    let activeX = baseX + noiseX
                    let activeY = baseY + noiseY

                    // If close to mouse, warp the grid
                    if (dist < 200) {
                        const force = (200 - dist) / 200
                        activeX += dx * force * 0.4
                        activeY += dy * force * 0.4
                    }

                    nodes.push({ x: activeX, y: activeY, dist })
                }
            }

            // Draw Connections (Lines) - Only for nearby nodes
            ctx.lineWidth = 0.5
            for (let i = 0; i < nodes.length; i++) {
                const nodeA = nodes[i]

                // Optimized connection check: look at a subset of nodes
                // In a grid, neighbors are predictable, but we'll do a simple nested loop for "Neural" feel
                for (let j = i + 1; j < nodes.length; j++) {
                    const nodeB = nodes[j]
                    const dx = nodeA.x - nodeB.x
                    const dy = nodeA.y - nodeB.y
                    const dSq = dx * dx + dy * dy

                    if (dSq < gridSpacing * gridSpacing * 2.5) {
                        const d = Math.sqrt(dSq)
                        const opacity = (1 - d / (gridSpacing * 1.6)) * 0.15

                        // Increase connection visibility near mouse
                        const mouseFactor = Math.max(0, (1 - nodeA.dist / 200) * 0.3)

                        ctx.strokeStyle = `hsla(${baseHue}, 70%, 60%, ${opacity + mouseFactor})`
                        ctx.beginPath()
                        ctx.moveTo(nodeA.x, nodeA.y)
                        ctx.lineTo(nodeB.x, nodeB.y)
                        ctx.stroke()
                    }
                }
            }

            // Draw Nodes (Dots)
            for (const node of nodes) {
                const dynamicRadius = node.dist < 150
                    ? dotBaseRadius * (1 + (150 - node.dist) / 150)
                    : dotBaseRadius

                ctx.fillStyle = node.dist < 150 ? colorA : colorB

                // Add a small glow to active nodes
                if (node.dist < 100) {
                    ctx.shadowBlur = 10
                    ctx.shadowColor = colorA
                } else {
                    ctx.shadowBlur = 0
                }

                ctx.beginPath()
                ctx.arc(node.x, node.y, dynamicRadius, 0, Math.PI * 2)
                ctx.fill()
            }

            animationFrameId = requestAnimationFrame(draw)
        }

        window.addEventListener("resize", resize)
        window.addEventListener("mousemove", handleMouseMove)
        resize()
        draw()

        return () => {
            window.removeEventListener("resize", resize)
            window.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
        />
    )
}
