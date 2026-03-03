"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

interface SidebarContextType {
    isCollapsed: boolean
    toggle: () => void
    setCollapsed: (value: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem("sidebar-collapsed")
            if (stored !== null) {
                setIsCollapsed(JSON.parse(stored))
            }
        } catch {
            // ignore
        }
    }, [])

    const setCollapsed = useCallback((value: boolean) => {
        setIsCollapsed(value)
        try {
            localStorage.setItem("sidebar-collapsed", JSON.stringify(value))
        } catch {
            // ignore
        }
    }, [])

    const toggle = useCallback(() => {
        setIsCollapsed((prev) => {
            const next = !prev
            try {
                localStorage.setItem("sidebar-collapsed", JSON.stringify(next))
            } catch {
                // ignore
            }
            return next
        })
    }, [])

    return (
        <SidebarContext.Provider value={{ isCollapsed, toggle, setCollapsed }}>
            {children}
        </SidebarContext.Provider>
    )
}

export function useSidebar() {
    const ctx = useContext(SidebarContext)
    if (!ctx) throw new Error("useSidebar must be used within a SidebarProvider")
    return ctx
}
