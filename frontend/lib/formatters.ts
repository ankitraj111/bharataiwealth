/**
 * Centralized formatting utilities to ensure consistency between SSR and CSR.
 * Using 'en-IN' locale as default to match the Bharat brand and prevent hydration mismatches.
 */

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount)
}

export const formatNumber = (value: number, options?: Intl.NumberFormatOptions): string => {
    return new Intl.NumberFormat("en-IN", options).format(value)
}
