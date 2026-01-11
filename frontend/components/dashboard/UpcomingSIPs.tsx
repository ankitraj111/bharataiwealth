"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const sips = [
    { name: "HDFC Nifty 50 Index", amount: "₹5,000", date: "Jan 12", daysLeft: 2 },
    { name: "Parag Parikh Flexi Cap", amount: "₹10,000", date: "Jan 15", daysLeft: 5 },
    { name: "Quant Small Cap", amount: "₹2,500", date: "Jan 20", daysLeft: 10 },
]

export function UpcomingSIPs() {
    return (
        <Card className="border-border/50 shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold">Upcoming SIPs</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="space-y-4">
                {sips.map((sip, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-lg transition-colors">
                        <div className="space-y-1">
                            <p className="text-sm font-bold leading-none">{sip.name}</p>
                            <p className="text-xs text-muted-foreground">{sip.date} • {sip.daysLeft} days left</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-black">{sip.amount}</p>
                            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Scheduled</p>
                        </div>
                    </div>
                ))}
                <Button variant="ghost" className="w-full text-xs text-primary hover:bg-primary/5 p-0 h-8 font-bold">
                    View All Calendar <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
            </CardContent>
        </Card>
    )
}
