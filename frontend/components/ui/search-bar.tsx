"use client"

import { Search, MoreVertical } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
    onSearch?: (query: string) => void
    className?: string
}

export function SearchBar({ onSearch, className }: SearchBarProps) {
    const [query, setQuery] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (onSearch) onSearch(query)
    }

    return (
        <div className={cn("flex items-center w-full max-w-xl px-2 py-2 bg-transparent", className)}>
            <form
                onSubmit={handleSubmit}
                className="relative group w-full"
            >
                {/* Main Search Container - Clean White Pill */}
                <div className="relative flex items-center w-full bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 px-5 py-2.5 shadow-sm transition-all duration-300 hover:shadow-md focus-within:shadow-md focus-within:border-slate-300 dark:focus-within:border-slate-700">

                    {/* Search Icon - Solid Black/Dark */}
                    <div className="flex items-center justify-center mr-3 shrink-0">
                        <Search className="h-5 w-5 text-slate-900 dark:text-slate-100" />
                    </div>

                    {/* Input Field */}
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search stocks, crypto, mutual funds..."
                        className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 font-medium text-[15px]"
                    />

                    {/* Search Button - Minimalist Text */}
                    <button
                        type="submit"
                        className="ml-4 px-4 py-1 text-blue-600 dark:text-blue-400 font-bold text-sm tracking-wide hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    )
}
