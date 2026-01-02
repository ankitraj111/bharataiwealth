import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Topbar />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
