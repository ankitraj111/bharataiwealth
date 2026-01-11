"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
    return (
        <div className="space-y-8 p-6">
            {/* Header */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="border-border/50">
                        <CardContent className="p-6">
                            <Skeleton className="h-4 w-24 mb-4" />
                            <Skeleton className="h-8 w-32 mb-2" />
                            <Skeleton className="h-4 w-20" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-border/50">
                    <CardContent className="p-6">
                        <Skeleton className="h-6 w-48 mb-4" />
                        <Skeleton className="h-[280px] w-full" />
                    </CardContent>
                </Card>
                <Card className="border-border/50">
                    <CardContent className="p-6">
                        <Skeleton className="h-6 w-48 mb-4" />
                        <Skeleton className="h-[280px] w-full rounded-full mx-auto" style={{ maxWidth: "200px" }} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
