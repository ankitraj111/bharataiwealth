"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PortfolioLoading() {
    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-24" />
                     
                </div>
            </div>

            {/* NIFTY Chart */}
            <Card className="border-border/50">
                <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                    <Skeleton className="h-[200px] w-full" />
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="border-border/50">
                        <CardContent className="p-6">
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-8 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid gap-6 md:grid-cols-7">
                <Card className="md:col-span-4 border-border/50">
                    <CardContent className="p-6">
                        <Skeleton className="h-6 w-48 mb-4" />
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
                <Card className="md:col-span-3 border-border/50">
                    <CardContent className="p-6">
                        <Skeleton className="h-6 w-48 mb-4" />
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
