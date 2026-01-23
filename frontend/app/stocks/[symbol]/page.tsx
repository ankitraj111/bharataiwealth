import { Suspense } from "react"
import StockAnalysisClient from "@/components/analysis/StockAnalysisClient"
import { ProtectedRoute } from "@/components/protected-route"

// Generate static params for pre-rendering popular stocks
export function generateStaticParams() {
    const stocks = [
        'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'TATAMOTORS',
        'ADANIENT', 'ICICIBANK', 'WIPRO', 'SBIN', 'BHARTIARTL',
        'HDFC', 'AXIS', 'SBI', 'BITCOIN', 'ETHEREUM', 'SOLANA'
    ]
    return stocks.map((symbol) => ({ symbol }))
}

interface PageProps {
    params: Promise<{ symbol: string }>;
}

export default async function StockAnalysisPage({ params }: PageProps) {
    const resolvedParams = await params

    return (
        <ProtectedRoute>
            <Suspense fallback={<div>Loading analysis...</div>}>
                <StockAnalysisClient
                    symbol={resolvedParams.symbol}
                />
            </Suspense>
        </ProtectedRoute>
    )
}
