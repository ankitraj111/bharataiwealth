import type React from "react"
import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { AssetInsightPanel } from "@/components/asset-insight-panel"

export function AppShell({ children, noPadding = false }: { children: React.ReactNode, noPadding?: boolean }) {
  const [insightAsset, setInsightAsset] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-white selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Sidebar />
      <div className="lg:pl-[260px] relative z-0">
        <Topbar />
        <main className={`${noPadding ? "" : "p-4 lg:p-6"} min-h-[calc(100vh-72px)]`}>{children}</main>
      </div>
      <AssetInsightPanel
        asset={insightAsset || "RELIANCE"}
        isOpen={!!insightAsset}
        onClose={() => setInsightAsset(null)}
      />
    </div>
  )
}
