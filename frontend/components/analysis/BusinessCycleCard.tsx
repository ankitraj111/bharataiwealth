"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gauge, TrendingUp, TrendingDown, Activity } from "lucide-react"
import { ResponsiveContainer, RadialBarChart, RadialBar, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

interface CycleHistoryPoint {
    period: string
    phase: string
    returnPercent: number
}

interface BusinessCycleProps {
    phase: string
    cyclePosition: number
    description: string
    historicalCycles?: CycleHistoryPoint[]
}

const PHASE_CONFIG = {
    EARLY_EXPANSION: { color: "#16A34A", label: "Early Expansion", icon: TrendingUp },
    MID_EXPANSION: { color: "#0A66C2", label: "Mid Expansion", icon: Activity },
    LATE_CYCLE: { color: "#FF8C00", label: "Late Cycle", icon: TrendingDown },
    RECESSION: { color: "#f43f5e", label: "Recession", icon: TrendingDown },
}

export function BusinessCycleCard({ phase, cyclePosition, description, historicalCycles }: BusinessCycleProps) {
    const config = PHASE_CONFIG[phase as keyof typeof PHASE_CONFIG] || PHASE_CONFIG.MID_EXPANSION
    const Icon = config.icon

    const gaugeData = [{ value: cyclePosition, fill: config.color }]

    const chartData = historicalCycles?.map(h => ({
        period: h.period,
        return: h.returnPercent
    })) || []

    return (
        <Card className="glass-card border-blue-500/20 bg-blue-500/5 overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
            <CardHeader className="pb-2 border-b border-border/10 bg-muted/5">
                <CardTitle className="text-base font-black flex items-center gap-2 uppercase tracking-tight">
                    <Gauge className="h-4 w-4 text-[#0A66C2]" />
                    Cycle Intel Command
                    <Badge
                        className="ml-auto text-[9px] font-black uppercase border-none"
                        style={{ backgroundColor: `${config.color}20`, color: config.color }}
                    >
                        {config.label}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Cycle Gauge */}
                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-inner">
                        <div className="relative h-36 w-36 group/gauge">
                            <div className="absolute inset-0 bg-[#0A66C2]/10 blur-3xl rounded-full opacity-0 group-hover/gauge:opacity-100 transition-opacity duration-700" />
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="70%"
                                    outerRadius="100%"
                                    data={gaugeData}
                                    startAngle={210}
                                    endAngle={-30}
                                >
                                    <RadialBar
                                        dataKey="value"
                                        cornerRadius={20}
                                        background={{ fill: 'rgba(var(--muted), 0.2)' }}
                                        animationDuration={1500}
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <Icon className="h-6 w-6 mb-1" style={{ color: config.color }} />
                                <span className="text-3xl font-black tracking-tighter" style={{ color: config.color }}>
                                    {cyclePosition}%
                                </span>
                                <span className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Momentum</span>
                            </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground text-center mt-4 max-w-[220px] font-medium leading-relaxed italic">
                            "{description}"
                        </p>
                    </div>

                    {/* Historical Performance */}
                    {chartData.length > 0 && (
                        <div className="flex flex-col justify-center">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <TrendingUp className="h-3 w-3 text-[#0A66C2]" />
                                Volatility Delta
                            </p>
                            <div className="h-32 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <XAxis
                                            dataKey="period"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 9, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }}
                                        />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(var(--background), 0.8)',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(var(--border), 0.3)',
                                                backdropFilter: 'blur(8px)'
                                            }}
                                            formatter={(v: number | string | (number | string)[] | undefined) => [`${Number(v || 0).toFixed(1)}%`, 'Return']}
                                        />
                                        <Line
                                            type="step"
                                            dataKey="return"
                                            stroke={config.color}
                                            strokeWidth={3}
                                            dot={{ fill: config.color, r: 4, strokeWidth: 2, stroke: 'white' }}
                                            activeDot={{ r: 6, strokeWidth: 0 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 p-3 rounded-xl bg-muted/20 border border-border/10">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest text-center">Engine Confidence: <span className="text-[#0A66C2]">84.2%</span></p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
