"use client"

import { CryptoDashboardContent } from "@/components/crypto/CryptoDashboard"
import { AppShell } from "@/components/app-shell"
import { ProtectedRoute } from "@/components/protected-route"

export default function CryptoDashboardPage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <CryptoDashboardContent />
      </AppShell>
    </ProtectedRoute>
  )
}
