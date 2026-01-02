"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { exportToCSV, exportToExcel } from "@/lib/export-utils"

interface ExportButtonProps {
  data: Record<string, unknown>[]
  filename: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function ExportButton({ data, filename, variant = "outline", size = "sm" }: ExportButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-card-elevated">
        <DropdownMenuItem
          onClick={() => exportToCSV(data, filename)}
          className="cursor-pointer rounded-lg transition-premium focus:bg-secondary/80 gap-2"
        >
          <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">CSV</span>
          Download CSV
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => exportToExcel(data, filename)}
          className="cursor-pointer rounded-lg transition-premium focus:bg-secondary/80 gap-2"
        >
          <span className="text-xs font-mono bg-success/20 text-success px-1.5 py-0.5 rounded">XLS</span>
          Download Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
