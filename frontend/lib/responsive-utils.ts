/**
 * Responsive utility classes for consistent sizing across devices
 */

export const responsiveClasses = {
  // Container classes
  container: "w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl",
  containerNarrow: "w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl",
  containerWide: "w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-screen-2xl",

  // Section spacing
  sectionPadding: "py-12 sm:py-16 md:py-20 lg:py-24",
  sectionPaddingSmall: "py-8 sm:py-10 md:py-12 lg:py-16",
  sectionPaddingLarge: "py-16 sm:py-20 md:py-24 lg:py-32",

  // Typography
  headingXL: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
  headingLarge: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
  headingMedium: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
  headingSmall: "text-lg sm:text-xl md:text-2xl lg:text-3xl",
  bodyLarge: "text-base sm:text-lg md:text-xl",
  bodyMedium: "text-sm sm:text-base md:text-lg",
  bodySmall: "text-xs sm:text-sm md:text-base",

  // Grid layouts
  gridCols2: "grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6",
  gridCols3: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
  gridCols4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6",

  // Flex layouts
  flexRow: "flex flex-col sm:flex-row gap-4 md:gap-6",
  flexRowReverse: "flex flex-col-reverse sm:flex-row gap-4 md:gap-6",
  flexCenter: "flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6",

  // Card padding
  cardPadding: "p-4 sm:p-6 md:p-8",
  cardPaddingSmall: "p-3 sm:p-4 md:p-6",
  cardPaddingLarge: "p-6 sm:p-8 md:p-10 lg:p-12",

  // Button sizes
  buttonSmall: "h-8 sm:h-9 md:h-10 px-3 sm:px-4 text-xs sm:text-sm",
  buttonMedium: "h-10 sm:h-11 md:h-12 px-4 sm:px-6 text-sm sm:text-base",
  buttonLarge: "h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 text-base sm:text-lg",

  // Spacing
  gap: "gap-4 sm:gap-6 md:gap-8",
  gapSmall: "gap-2 sm:gap-3 md:gap-4",
  gapLarge: "gap-6 sm:gap-8 md:gap-10 lg:gap-12",
}

/**
 * Breakpoint utilities for JavaScript
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

/**
 * Check if current viewport matches breakpoint
 */
export function useBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth >= breakpoints[breakpoint]
}

/**
 * Get current breakpoint
 */
export function getCurrentBreakpoint(): keyof typeof breakpoints | "xs" {
  if (typeof window === "undefined") return "xs"
  const width = window.innerWidth
  if (width >= breakpoints["2xl"]) return "2xl"
  if (width >= breakpoints.xl) return "xl"
  if (width >= breakpoints.lg) return "lg"
  if (width >= breakpoints.md) return "md"
  if (width >= breakpoints.sm) return "sm"
  return "xs"
}
