"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, subDays } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
    className,
    date,
    setDate,
}: {
    className?: string
    date: DateRange | undefined
    setDate: (date: DateRange | undefined) => void
}) {
    const [activePreset, setActivePreset] = React.useState<string | null>("30D")

    const presets = [
        { label: "Today", value: "today", getRange: () => ({ from: new Date(), to: new Date() }) },
        { label: "7D", value: "7D", getRange: () => ({ from: subDays(new Date(), 7), to: new Date() }) },
        { label: "1M", value: "30D", getRange: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) }) },
        { label: "6M", value: "6M", getRange: () => ({ from: subDays(new Date(), 180), to: new Date() }) },
        { label: "1Y", value: "1Y", getRange: () => ({ from: startOfYear(new Date()), to: endOfYear(new Date()) }) },
    ]

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[240px] justify-start text-left font-bold rounded-xl border-border/40 bg-secondary/20 hover:bg-secondary/40 h-9 text-[11px] uppercase tracking-wider transition-all duration-300 hover:border-primary/30 active:scale-95 shadow-sm",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "dd LLL") + " — " + format(date.to, "dd LLL, yy")}
                                </>
                            ) : (
                                format(date.from, "dd LLL, yyyy")
                            )
                        ) : (
                            <span>Select Date Period</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 glass-card-elevated border-primary/20 shadow-2xl shadow-primary/10 rounded-2xl overflow-hidden" align="end">
                    <div className="p-2 bg-muted/30 border-b border-border/20">
                        <div className="flex bg-secondary/20 p-1 rounded-xl gap-1">
                            {presets.map((preset) => (
                                <Button
                                    key={preset.value}
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "flex-1 text-[10px] h-8 font-black rounded-lg uppercase tracking-widest transition-all duration-300",
                                        activePreset === preset.value
                                            ? "bg-background text-primary shadow-sm"
                                            : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                                    )}
                                    onClick={() => {
                                        setActivePreset(preset.value)
                                        setDate(preset.getRange())
                                    }}
                                >
                                    {preset.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(newDate) => {
                            setDate(newDate)
                            setActivePreset(null)
                        }}
                        numberOfMonths={2}
                        className="p-4"
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
