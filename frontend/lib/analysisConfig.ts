/**
 * Risk-based analysis configuration
 * Determines which sections to show for each risk category
 */

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH'

export interface AnalysisSectionConfig {
    show: boolean
    mode?: 'basic' | 'full' | 'full_intraday'
    focusMode?: 'stability' | 'full'
}

export interface RiskConfig {
    // Core sections (always shown)
    fundamentals: AnalysisSectionConfig
    valuation: AnalysisSectionConfig
    smartMoney: AnalysisSectionConfig

    // Technical (varies by risk)
    technicals: AnalysisSectionConfig

    // F&O Data (restricted for low risk)
    fnoData: AnalysisSectionConfig

    // Advanced sections (new 14-20)
    businessCycle: AnalysisSectionConfig
    earningsTrend: AnalysisSectionConfig
    insiderActivity: AnalysisSectionConfig
    globalPeers: AnalysisSectionConfig
    aiScore: AnalysisSectionConfig
    riskMetrics: AnalysisSectionConfig
    eventRadar: AnalysisSectionConfig
    sentiment: AnalysisSectionConfig

    // New professional-grade layers
    macroEconomic: AnalysisSectionConfig
    sectorAnalysis: AnalysisSectionConfig
    companyAnalysis: AnalysisSectionConfig
    financials10Year: AnalysisSectionConfig
    valuationDetailed: AnalysisSectionConfig
    technicalDetailed: AnalysisSectionConfig
    riskFactors: AnalysisSectionConfig
    finalVerdict: AnalysisSectionConfig
}

export const ANALYSIS_CONFIG: Record<RiskLevel, RiskConfig> = {
    LOW: {
        fundamentals: { show: true, mode: 'full' },
        valuation: { show: true },
        smartMoney: { show: true },
        technicals: { show: true, mode: 'basic' },
        fnoData: { show: false }, // No F&O for low risk
        businessCycle: { show: true },
        earningsTrend: { show: true },
        insiderActivity: { show: true },
        globalPeers: { show: true },
        aiScore: { show: true },
        riskMetrics: { show: true, focusMode: 'stability' },
        eventRadar: { show: true },
        sentiment: { show: true, mode: 'basic' },
        macroEconomic: { show: true },
        sectorAnalysis: { show: true, mode: 'basic' },
        companyAnalysis: { show: true, mode: 'full' },
        financials10Year: { show: true },
        valuationDetailed: { show: true, mode: 'basic' },
        technicalDetailed: { show: true, mode: 'basic' },
        riskFactors: { show: true },
        finalVerdict: { show: true },
    },
    MEDIUM: {
        fundamentals: { show: true, mode: 'full' },
        valuation: { show: true },
        smartMoney: { show: true },
        technicals: { show: true, mode: 'full' },
        fnoData: { show: true, mode: 'basic' }, // Partial F&O
        businessCycle: { show: true },
        earningsTrend: { show: true },
        insiderActivity: { show: true },
        globalPeers: { show: true },
        aiScore: { show: true },
        riskMetrics: { show: true, focusMode: 'full' },
        eventRadar: { show: true },
        sentiment: { show: true, mode: 'full' },
        macroEconomic: { show: true },
        sectorAnalysis: { show: true, mode: 'full' },
        companyAnalysis: { show: true, mode: 'full' },
        financials10Year: { show: true },
        valuationDetailed: { show: true, mode: 'full' },
        technicalDetailed: { show: true, mode: 'full' },
        riskFactors: { show: true },
        finalVerdict: { show: true },
    },
    HIGH: {
        fundamentals: { show: true, mode: 'full' },
        valuation: { show: true },
        smartMoney: { show: true },
        technicals: { show: true, mode: 'full_intraday' },
        fnoData: { show: true, mode: 'full' }, // Full F&O
        businessCycle: { show: true },
        earningsTrend: { show: true },
        insiderActivity: { show: true },
        globalPeers: { show: true },
        aiScore: { show: true },
        riskMetrics: { show: true, focusMode: 'full' },
        eventRadar: { show: true },
        sentiment: { show: true, mode: 'full' },
        macroEconomic: { show: true },
        sectorAnalysis: { show: true, mode: 'full' },
        companyAnalysis: { show: true, mode: 'full' },
        financials10Year: { show: true },
        valuationDetailed: { show: true, mode: 'full' },
        technicalDetailed: { show: true, mode: 'full_intraday' },
        riskFactors: { show: true },
        finalVerdict: { show: true },
    },
}

export const RISK_LABELS: Record<RiskLevel, { label: string; color: string; description: string }> = {
    LOW: {
        label: 'Low Risk',
        color: '#16A34A',
        description: 'Stability focused • Long-term compounding • Capital protection',
    },
    MEDIUM: {
        label: 'Medium Risk',
        color: '#0A66C2',
        description: 'Balanced approach • Growth + Value • Moderate volatility',
    },
    HIGH: {
        label: 'High Risk (Cytopy)',
        color: '#f43f5e',
        description: 'Aggressive • F&O signals • Momentum trading • High volatility',
    },
}
