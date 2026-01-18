"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radar, Calendar, AlertTriangle, TrendingUp, Building2, Landmark, Vote } from "lucide-react"

interface UpcomingEvent {
    date: string
    event: string
    type: string
    impact: string
    potentialEffect: string
}

interface EventRadarProps {
    upcoming: UpcomingEvent[]
    overallRiskLevel: string
    weekOutlook: string
}

const EVENT_ICONS: Record<string, any> = {
    RESULTS: Building2,
    RBI: Landmark,
    FED: Landmark,
    BUDGET: Vote,
    ELECTION: Vote,
}

const IMPACT_CONFIG = {
    HIGH: { color: "#f43f5e", bg: "bg-red-500", label: "High Impact" },
    MEDIUM: { color: "#FF8C00", bg: "bg-amber-500", label: "Medium" },
    LOW: { color: "#16A34A", bg: "bg-emerald-500", label: "Low Impact" },
}

export function EventRadarCard({ upcoming, overallRiskLevel, weekOutlook }: EventRadarProps) {
    const getRiskConfig = (level: string) => {
        if (level === "HIGH_RISK") return { color: "#f43f5e", label: "High Risk Week", icon: AlertTriangle }
        if (level === "TAILWIND") return { color: "#16A34A", label: "Tailwind Period", icon: TrendingUp }
        return { color: "#FF8C00", label: "Moderate", icon: Radar }
    }

    const riskConfig = getRiskConfig(overallRiskLevel)
    const RiskIcon = riskConfig.icon

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        const now = new Date()
        const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

        const formatted = date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
        if (diffDays <= 7) return `${formatted} (${diffDays}d)`
        return formatted
    }

    return (
        <Card className="border-2 border-border/50">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Radar className="h-4 w-4 text-indigo-500" />
                    Event & Trigger Radar
                    <Badge
                        className="ml-auto text-[10px] text-white"
                        style={{ backgroundColor: riskConfig.color }}
                    >
                        <RiskIcon className="h-3 w-3 mr-1" />
                        {riskConfig.label}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Week Outlook */}
                <div
                    className="p-3 rounded-xl mb-4 border"
                    style={{
                        backgroundColor: `${riskConfig.color}10`,
                        borderColor: `${riskConfig.color}30`
                    }}
                >
                    <p className="text-xs font-medium" style={{ color: riskConfig.color }}>Week Outlook</p>
                    <p className="text-sm text-foreground mt-1">{weekOutlook}</p>
                </div>

                {/* Upcoming Events */}
                <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Upcoming Catalysts
                    </p>

                    {upcoming.map((event, i) => {
                        const EventIcon = EVENT_ICONS[event.type] || Calendar
                        const impactConfig = IMPACT_CONFIG[event.impact as keyof typeof IMPACT_CONFIG] || IMPACT_CONFIG.MEDIUM

                        return (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors"
                            >
                                <div
                                    className="p-2 rounded-lg"
                                    style={{ backgroundColor: `${impactConfig.color}15` }}
                                >
                                    <EventIcon className="h-4 w-4" style={{ color: impactConfig.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-bold text-sm">{event.event}</span>
                                        <Badge
                                            className={`text-[9px] ${impactConfig.bg} text-white`}
                                        >
                                            {event.impact}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                                        {event.potentialEffect}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-xs font-medium text-muted-foreground">
                                        {formatDate(event.date)}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Quick Legend */}
                <div className="flex justify-center gap-4 mt-4 text-[10px]">
                    <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <span>High Impact</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                        <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Low</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
