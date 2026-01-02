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
