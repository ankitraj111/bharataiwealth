"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { AssetInsightPanel } from "@/components/asset-insight-panel"
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext"

function AppShellInner({ children, noPadding = false }: { children: React.ReactNode, noPadding?: boolean }) {
  const [insightAsset, setInsightAsset] = useState<string | null>(null)
  const { isCollapsed } = useSidebar()
  const [mounted, setMounted] = useState(false)

  // Use useEffect to handle mounting state and avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className={`min-h-screen bg-background selection:bg-primary/20 selection:text-primary overflow-x-hidden relative ${mounted ? 'mesh-gradient' : ''}`}>
      {/* Premium Background Effects - Only render on client to avoid hydration mismatch */}
      {mounted && (
        <>
          <div className="studio-lighting" />
          <div className="noise-overlay" />
        </>
      )}

      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <Topbar />
      {/* Main Content Area — padding adjusts with sidebar width */}
      <div
        className={`w-full relative z-0 transition-[padding-left,padding-top] duration-300 ease-in-out pt-[72px] ${isCollapsed ? "lg:pl-[64px]" : "lg:pl-[260px]"
          }`}
      >
        <main className={`${noPadding ? "" : "p-3 sm:p-4 lg:p-6"} min-h-[calc(100vh-72px)] relative z-10`}>{children}</main>
      </div>

      <AssetInsightPanel
        asset={insightAsset || "RELIANCE"}
        isOpen={!!insightAsset}
        onClose={() => setInsightAsset(null)}
      />
    </div>
  )
}

export function AppShell({ children, noPadding = false }: { children: React.ReactNode, noPadding?: boolean }) {
  return (
    <SidebarProvider>
      <AppShellInner noPadding={noPadding}>{children}</AppShellInner>
    </SidebarProvider>
  )
}
