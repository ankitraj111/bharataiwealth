export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header]
          // Handle values with commas by wrapping in quotes
          if (typeof value === "string" && value.includes(",")) {
            return `"${value}"`
          }
          return value
        })
        .join(","),
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToExcel(data: Record<string, unknown>[], filename: string) {
  // For Excel format, we create a more structured CSV that Excel handles well
  if (data.length === 0) return

  const headers = Object.keys(data[0])
  const BOM = "\uFEFF" // Byte Order Mark for Excel UTF-8 support

  const csvContent =
    BOM +
    [
      headers.join("\t"),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            return value ?? ""
          })
          .join("\t"),
      ),
    ].join("\n")

  const blob = new Blob([csvContent], { type: "application/vnd.ms-excel;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.xls`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export function exportToPDF(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return

  const doc = new jsPDF()

  // Add Header
  doc.setFontSize(22)
  doc.setTextColor(30, 41, 59) // slate-800
  doc.text("BHARAT AI WEALTH", 14, 22)

  doc.setFontSize(10)
  doc.setTextColor(100, 116, 139) // slate-500
  doc.text("Expense Report", 14, 30)
  doc.text(`Generated on: ${new Date().toLocaleDateString("en-IN")}`, 14, 35)

  // Separator line
  doc.setDrawColor(226, 232, 240) // border color
  doc.line(14, 40, 196, 40)

  const headers = Object.keys(data[0])
  const body = data.map((row) => headers.map((header) => String(row[header] ?? "")))

  autoTable(doc, {
    startY: 45,
    head: [headers],
    body: body,
    theme: "striped",
    headStyles: {
      fillColor: [59, 130, 246], // primary blue
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [30, 41, 59],
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252], // slate-50
    },
    margin: { top: 45 },
    styles: {
      font: "helvetica",
      cellPadding: 3,
    },
  })

  doc.save(`${filename}.pdf`)
}
