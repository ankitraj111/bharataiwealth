"use client"

import { useEffect, useRef, useCallback } from "react"

// ─── Crypto coin symbols drawn via Canvas paths ───
interface CoinDef {
    symbol: string
    color: string
    glowColor: string
    char: string
}

const COINS: CoinDef[] = [
    { symbol: "BTC", color: "#F7931A", glowColor: "rgba(247,147,26,0.15)", char: "₿" },
    { symbol: "ETH", color: "#627EEA", glowColor: "rgba(98,126,234,0.15)", char: "Ξ" },
    { symbol: "BNB", color: "#F3BA2F", glowColor: "rgba(243,186,47,0.15)", char: "B" },
    { symbol: "SOL", color: "#9945FF", glowColor: "rgba(153,69,255,0.15)", char: "S" },
    { symbol: "XRP", color: "#00AAE4", glowColor: "rgba(0,170,228,0.15)", char: "X" },
    { symbol: "ADA", color: "#0033AD", glowColor: "rgba(0,51,173,0.15)", char: "A" },
    { symbol: "DOT", color: "#E6007A", glowColor: "rgba(230,0,122,0.15)", char: "D" },
    { symbol: "DOGE", color: "#C2A633", glowColor: "rgba(194,166,51,0.15)", char: "Ð" },
]

interface FloatingCoin {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    rotation: number
    rotSpeed: number
    coin: CoinDef
    opacity: number
    pulsePhase: number
    depth: number // parallax depth 0-1
}

interface Candle {
    x: number
    open: number
    close: number
    high: number
    low: number
    isGreen: boolean
}

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    life: number
    maxLife: number
    size: number
    color: string
}

interface Ticker {
    symbol: string
    price: number
    change: number
    x: number
    speed: number
}

export const CryptoFinanceBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: -1000, y: -1000 })
    const coinsRef = useRef<FloatingCoin[]>([])
    const candlesRef = useRef<Candle[]>([])
    const particlesRef = useRef<Particle[]>([])
    const tickersRef = useRef<Ticker[]>([])
    const timeRef = useRef(0)
    const initializedRef = useRef(false)

    const initScene = useCallback((w: number, h: number) => {
        // Floating coins
        const coinCount = Math.max(8, Math.floor((w * h) / 60000))
        coinsRef.current = Array.from({ length: coinCount }, () => {
            const coin = COINS[Math.floor(Math.random() * COINS.length)]
            return {
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.4,
                vy: -Math.random() * 0.3 - 0.1,
                size: 18 + Math.random() * 28,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.015,
                coin,
                opacity: 0.3 + Math.random() * 0.3,
                pulsePhase: Math.random() * Math.PI * 2,
                depth: 0.3 + Math.random() * 0.7,
            }
        })

        // Candlestick chart data — multiple chart bands
        const candleCount = Math.ceil(w / 14) + 5
        const candleArr: Candle[] = []
        let lastClose = h * 0.5
        for (let i = 0; i < candleCount; i++) {
            const change = (Math.random() - 0.48) * 30
            const open = lastClose
            const close = open + change
            const high = Math.max(open, close) + Math.random() * 15
            const low = Math.min(open, close) - Math.random() * 15
            candleArr.push({ x: i * 14, open, close, high, low, isGreen: close >= open })
            lastClose = close
        }
        candlesRef.current = candleArr

        // Ticker tape
        const tickerSymbols = ["NIFTY50", "SENSEX", "BTC/USD", "ETH/USD", "RELIANCE", "TCS", "INFY", "HDFCBANK", "SOL/INR", "MATIC/INR"]
        tickersRef.current = tickerSymbols.map((s, i) => ({
            symbol: s,
            price: +(1000 + Math.random() * 50000).toFixed(2),
            change: +((Math.random() - 0.45) * 8).toFixed(2),
            x: w + i * 220,
            speed: 0.4 + Math.random() * 0.3,
        }))

        particlesRef.current = []
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animId: number

        const resize = () => {
            const dpr = window.devicePixelRatio || 1
            const w = canvas.offsetWidth
            const h = canvas.offsetHeight
            canvas.width = w * dpr
            canvas.height = h * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            if (!initializedRef.current) {
                initScene(w, h)
                initializedRef.current = true
            }
        }

        const handleMouse = (e: MouseEvent) => {
            const r = canvas.getBoundingClientRect()
            mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
        }

        // ─── Drawing helpers ───
        const drawCoin = (c: FloatingCoin, t: number) => {
            const pulse = 1 + Math.sin(t * 2 + c.pulsePhase) * 0.08
            const sz = c.size * pulse
            const scaleX = Math.cos(c.rotation) // 3D-ish flip

            ctx.save()
            ctx.translate(c.x, c.y)
            ctx.scale(scaleX, 1)
            ctx.globalAlpha = c.opacity

            // Outer glow
            ctx.shadowBlur = sz * 0.8
            ctx.shadowColor = c.coin.glowColor

            // Coin body
            ctx.beginPath()
            ctx.arc(0, 0, sz / 2, 0, Math.PI * 2)
            ctx.fillStyle = c.coin.color
            ctx.globalAlpha = c.opacity * 0.4
            ctx.fill()

            // Coin border ring
            ctx.strokeStyle = c.coin.color
            ctx.globalAlpha = c.opacity * 0.8
            ctx.lineWidth = 1.5
            ctx.stroke()

            // Symbol
            ctx.shadowBlur = 0
            ctx.globalAlpha = c.opacity
            ctx.fillStyle = c.coin.color
            ctx.font = `bold ${sz * 0.5}px "Inter", sans-serif`
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            if (Math.abs(scaleX) > 0.3) {
                ctx.fillText(c.coin.char, 0, 1)
            }

            ctx.restore()
        }

        const drawCandlesticks = (w: number, h: number, t: number) => {
            const chartY = h * 0.55
            const chartH = h * 0.35
            ctx.save()
            ctx.globalAlpha = 0.25

            const offset = (t * 15) % 14

            for (const candle of candlesRef.current) {
                const cx = candle.x - offset
                if (cx < -20 || cx > w + 20) continue

                const y1 = chartY + ((candle.open - h * 0.3) / (h * 0.5)) * chartH
                const y2 = chartY + ((candle.close - h * 0.3) / (h * 0.5)) * chartH
                const yH = chartY + ((candle.high - h * 0.3) / (h * 0.5)) * chartH
                const yL = chartY + ((candle.low - h * 0.3) / (h * 0.5)) * chartH

                const color = candle.isGreen ? "#00C853" : "#F43F5E"

                // Wick
                ctx.strokeStyle = color
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(cx + 5, yH)
                ctx.lineTo(cx + 5, yL)
                ctx.stroke()

                // Body
                ctx.fillStyle = color
                const bodyTop = Math.min(y1, y2)
                const bodyH = Math.max(Math.abs(y2 - y1), 2)
                ctx.fillRect(cx + 1, bodyTop, 8, bodyH)
            }
            ctx.restore()
        }

        const drawPriceLine = (w: number, h: number, t: number) => {
            // Animated flowing price line
            ctx.save()
            ctx.globalAlpha = 0.30
            ctx.strokeStyle = "#00C853"
            ctx.lineWidth = 1
            ctx.shadowBlur = 4
            ctx.shadowColor = "rgba(0,200,83,0.15)"
            ctx.beginPath()
            for (let x = 0; x <= w; x += 3) {
                const y = h * 0.4
                    + Math.sin(x * 0.008 + t * 0.5) * 40
                    + Math.sin(x * 0.02 + t * 1.2) * 15
                    + Math.cos(x * 0.005 - t * 0.3) * 25
                if (x === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
            }
            ctx.stroke()

            // Second line (bearish indicator)
            ctx.strokeStyle = "#F43F5E"
            ctx.globalAlpha = 0.20
            ctx.shadowColor = "rgba(244,63,94,0.1)"
            ctx.beginPath()
            for (let x = 0; x <= w; x += 3) {
                const y = h * 0.6
                    + Math.sin(x * 0.01 - t * 0.4) * 30
                    + Math.cos(x * 0.015 + t * 0.8) * 20
                if (x === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
            }
            ctx.stroke()
            ctx.restore()
        }

        const drawGrid = (w: number, h: number, t: number) => {
            ctx.save()
            ctx.globalAlpha = 0.1
            ctx.strokeStyle = "#1E293B"
            ctx.lineWidth = 0.5

            const spacing = 60
            // Horizontal lines
            for (let y = 0; y < h; y += spacing) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(w, y)
                ctx.stroke()
            }
            // Vertical lines
            for (let x = 0; x < w; x += spacing) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, h)
                ctx.stroke()
            }
            ctx.restore()
        }

        const drawTicker = (w: number, h: number, t: number) => {
            ctx.save()
            const tickerY = h - 40

            // Ticker background bar
            ctx.globalAlpha = 0.03
            ctx.fillStyle = "#12121e"
            ctx.fillRect(0, tickerY - 5, w, 30)

            ctx.globalAlpha = 0.10
            ctx.font = '600 11px "Inter", monospace'
            ctx.textBaseline = "middle"

            for (const ticker of tickersRef.current) {
                ticker.x -= ticker.speed
                if (ticker.x < -200) {
                    ticker.x = w + 100
                    ticker.price += (Math.random() - 0.48) * 50
                    ticker.change = +((Math.random() - 0.45) * 8).toFixed(2)
                }

                const isUp = ticker.change >= 0
                const arrow = isUp ? "▲" : "▼"
                const color = isUp ? "#00C853" : "#F43F5E"

                // Symbol
                ctx.fillStyle = "#475569"
                ctx.textAlign = "left"
                ctx.fillText(ticker.symbol, ticker.x, tickerY + 10)

                // Price
                ctx.fillStyle = "#94A3B8"
                ctx.fillText(`₹${ticker.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`, ticker.x + 80, tickerY + 10)

                // Change
                ctx.fillStyle = color
                ctx.fillText(`${arrow} ${Math.abs(ticker.change).toFixed(2)}%`, ticker.x + 170, tickerY + 10)
            }

            ctx.restore()
        }

        const spawnParticles = (t: number) => {
            if (Math.random() < 0.08) {
                const w = canvas.offsetWidth
                const h = canvas.offsetHeight
                particlesRef.current.push({
                    x: Math.random() * w,
                    y: h + 5,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: -0.5 - Math.random() * 0.8,
                    life: 1,
                    maxLife: 150 + Math.random() * 200,
                    size: 1 + Math.random() * 2,
                    color: Math.random() > 0.5 ? "#F7931A" : "#00C853",
                })
            }
        }

        const drawParticles = () => {
            ctx.save()
            particlesRef.current = particlesRef.current.filter(p => {
                p.x += p.vx
                p.y += p.vy
                p.life++
                const progress = p.life / p.maxLife
                if (progress >= 1) return false

                const alpha = (1 - progress) * 0.20
                ctx.globalAlpha = alpha
                ctx.fillStyle = p.color
                ctx.shadowBlur = 6
                ctx.shadowColor = p.color
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2)
                ctx.fill()
                return true
            })
            ctx.restore()
        }

        // ─── Gradient mesh background ───
        const drawMeshGradient = (w: number, h: number, t: number) => {
            // Deep dark fintech background
            const bgGrad = ctx.createLinearGradient(0, 0, 0, h)
            bgGrad.addColorStop(0, "#12121e")
            bgGrad.addColorStop(0.4, "#161624")
            bgGrad.addColorStop(0.7, "#141420")
            bgGrad.addColorStop(1, "#0f0f18")
            ctx.fillStyle = bgGrad
            ctx.fillRect(0, 0, w, h)

            // Subtle animated radial glow
            const gx = w * 0.3 + Math.sin(t * 0.2) * w * 0.1
            const gy = h * 0.3 + Math.cos(t * 0.15) * h * 0.1
            const grad1 = ctx.createRadialGradient(gx, gy, 0, gx, gy, w * 0.6)
            grad1.addColorStop(0, "rgba(59,130,246,0.03)")
            grad1.addColorStop(0.5, "rgba(30,58,138,0.015)")
            grad1.addColorStop(1, "transparent")
            ctx.fillStyle = grad1
            ctx.fillRect(0, 0, w, h)

            const g2x = w * 0.7 + Math.cos(t * 0.18) * w * 0.1
            const g2y = h * 0.7 + Math.sin(t * 0.22) * h * 0.1
            const grad2 = ctx.createRadialGradient(g2x, g2y, 0, g2x, g2y, w * 0.5)
            grad2.addColorStop(0, "rgba(30,58,138,0.03)")
            grad2.addColorStop(0.6, "rgba(59,130,246,0.015)")
            grad2.addColorStop(1, "transparent")
            ctx.fillStyle = grad2
            ctx.fillRect(0, 0, w, h)
        }

        // ─── Main render loop ───
        const render = () => {
            const w = canvas.offsetWidth
            const h = canvas.offsetHeight
            timeRef.current += 0.016
            const t = timeRef.current

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Layer 1: Deep gradient mesh background
            drawMeshGradient(w, h, t)

            // Layer 2: Subtle grid
            drawGrid(w, h, t)

            // Layer 3: Candlestick chart
            drawCandlesticks(w, h, t)

            // Layer 4: Flowing price lines
            drawPriceLine(w, h, t)

            // Layer 5: Floating crypto coins (Removed by user request)

            // Layer 6: Rising particles
            spawnParticles(t)
            drawParticles()

            // Layer 7: Ticker tape at bottom
            drawTicker(w, h, t)

            animId = requestAnimationFrame(render)
        }

        window.addEventListener("resize", resize)
        window.addEventListener("mousemove", handleMouse)
        resize()
        render()

        return () => {
            window.removeEventListener("resize", resize)
            window.removeEventListener("mousemove", handleMouse)
            cancelAnimationFrame(animId)
        }
    }, [initScene])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: "auto" }}
        />
    )
}
