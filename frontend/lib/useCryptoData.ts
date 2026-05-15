/**
 * useCryptoData.ts
 * React hook to fetch live crypto + currency data from the ML service (CoinGecko)
 * ML service runs on localhost:8000
 */

import { useState, useEffect, useCallback } from "react"
import config from "./config"

const ML_SERVICE_URL = config.ML_SERVICE_URL;

// ─────────── Types ───────────

export interface CoinListing {
    id: number
    name: string
    symbol: string
    rank: number
    price: number
    price_inr: number
    change_1h: number
    change_24h: number
    change_7d?: number
    market_cap: number
    volume_24h: number
    circulating_supply: number
    max_supply: number | null
    dominance: number
    last_updated: string
    source: string
}

export interface GlobalMetrics {
    total_market_cap: number
    total_volume_24h: number
    btc_dominance: number
    eth_dominance?: number
    active_cryptocurrencies: number
    market_cap_change_24h: number
    last_updated: string
    source: string
}

export interface FearGreedIndex {
    value: number
    value_classification: string
    timestamp?: string
    source: string
}

export interface ForexRate {
    rate: number
    last_updated?: string
}

export interface ForexRates {
    base: string
    source: string
    [currency: string]: ForexRate | string
}

// ─────────── Helpers ───────────

async function fetchML<T>(path: string): Promise<T | null> {
    try {
        const res = await fetch(`${ML_SERVICE_URL}${path}`, {
            headers: { "Content-Type": "application/json" },
            signal: AbortSignal.timeout(10000),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return (await res.json()) as T
    } catch (err) {
        console.error(`[CoinGecko] fetch failed ${path}:`, err)
        return null
    }
}

// ─────────── Hooks ───────────

/** Top N crypto listings from CoinGecko */
export function useCryptoListings(limit = 20, convert = "USD") {
    const [coins, setCoins] = useState<CoinListing[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const refresh = useCallback(async () => {
        setLoading(true)
        const data = await fetchML<{ data: CoinListing[] }>(
            `/crypto/listings?limit=${limit}&convert=${convert}`
        )
        if (data?.data) {
            setCoins(data.data)
            setError(null)
        } else {
            setError("Failed to load crypto data")
        }
        setLoading(false)
    }, [limit, convert])

    useEffect(() => {
        refresh()
        const interval = setInterval(refresh, 60_000) // refresh every 60s
        return () => clearInterval(interval)
    }, [refresh])

    return { coins, loading, error, refresh }
}

/** Real-time quotes for specific symbols */
export function useCryptoQuotes(symbols: string[], convert = "USD") {
    const [quotes, setQuotes] = useState<Record<string, CoinListing>>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const refresh = useCallback(async () => {
        if (!symbols.length) return
        setLoading(true)
        const joined = symbols.join(",")
        const data = await fetchML<{ data: Record<string, CoinListing> }>(
            `/crypto/quotes?symbols=${joined}&convert=${convert}`
        )
        if (data?.data) {
            setQuotes(data.data)
            setError(null)
        } else {
            setError("Failed to load quotes")
        }
        setLoading(false)
    }, [symbols.join(","), convert])

    useEffect(() => {
        refresh()
        const interval = setInterval(refresh, 60_000)
        return () => clearInterval(interval)
    }, [refresh])

    return { quotes, loading, error, refresh }
}

/** Global crypto market metrics + Fear & Greed index from CoinGecko */
export function useCryptoGlobal(convert = "USD") {
    const [market, setMarket] = useState<GlobalMetrics | null>(null)
    const [fearGreed, setFearGreed] = useState<FearGreedIndex | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const refresh = useCallback(async () => {
        setLoading(true)
        const data = await fetchML<{ market: GlobalMetrics; fear_greed: FearGreedIndex }>(
            `/crypto/global?convert=${convert}`
        )
        if (data) {
            setMarket(data.market)
            setFearGreed(data.fear_greed)
            setError(null)
        } else {
            setError("Failed to load global metrics")
        }
        setLoading(false)
    }, [convert])

    useEffect(() => {
        refresh()
        const interval = setInterval(refresh, 120_000) // 2 min
        return () => clearInterval(interval)
    }, [refresh])

    return { market, fearGreed, loading, error, refresh }
}

/** Trending / biggest movers from CoinGecko */
export function useCryptoTrending(limit = 10) {
    const [trending, setTrending] = useState<CoinListing[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchML<{ trending: CoinListing[] }>(`/crypto/trending?limit=${limit}`).then(
            (data) => {
                if (data?.trending) setTrending(data.trending)
                setLoading(false)
            }
        )
    }, [limit])

    return { trending, loading }
}

/** Fiat / forex exchange rates */
export function useForexRates(base = "USD", targets?: string) {
    const [rates, setRates] = useState<ForexRates | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const refresh = useCallback(async () => {
        setLoading(true)
        const path = `/currency/rates?base=${base}${targets ? `&targets=${targets}` : ""}`
        const data = await fetchML<ForexRates>(path)
        if (data) {
            setRates(data)
            setError(null)
        } else {
            setError("Failed to load forex rates")
        }
        setLoading(false)
    }, [base, targets])

    useEffect(() => {
        refresh()
        const interval = setInterval(refresh, 300_000) // 5 min
        return () => clearInterval(interval)
    }, [refresh])

    return { rates, loading, error, refresh }
}

/** Currency / crypto converter */
export async function convertCurrency(
    amount: number,
    fromSymbol: string,
    toSymbol: string
): Promise<{ converted_amount: number; source: string } | null> {
    return fetchML(
        `/currency/convert?amount=${amount}&from_symbol=${fromSymbol}&to_symbol=${toSymbol}`
    )
}
