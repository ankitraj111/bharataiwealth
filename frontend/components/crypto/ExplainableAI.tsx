"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Brain, TrendingUp, Activity, BarChart3, Users } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"

const aiFactors = [
  { factor: "Momentum Indicators", impact: 85, icon: TrendingUp, description: "Strong bullish momentum detected" },
  { factor: "Trading Volume", impact: 78, icon: Activity, description: "Above-average volume confirms trend" },
  { factor: "BTC Dominance", impact: 72, icon: BarChart3, description: "Stable dominance supports altcoins" },
  { factor: "Market Sentiment", impact: 68, icon: Users, description: "Fear & Greed index shows optimism" },
]

export function ExplainableAI() {
  return (
    <motion.div variants={scrollReveal}>
      <Card className="glass-card border-purple-500/20 h-full">
        <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-b border-border">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Explainable AI - Why Bullish?
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm font-bold text-emerald-900 dark:text-emerald-100 mb-2">
                Model Prediction: Bullish Bias
              </p>
              <p className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed">
                Our ensemble ML model (LSTM + XGBoost) predicts upward price movement based on 
                technical indicators, volume analysis, and market sentiment. Confidence: 78%.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Top Influencing Factors
              </p>
              {aiFactors.map((factor, i) => (
                <div key={i} className="p-3 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="h-8 w-8 rounded-lg bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center flex-shrink-0">
                      <factor.icon className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-sm">{factor.factor}</p>
                        <span className="text-xs font-bold text-purple-600">{factor.impact}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{factor.description}</p>
                    </div>
                  </div>
                  <div className="h-1.5 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${factor.impact}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                <span className="font-bold">Plain English:</span> The model sees strong buying pressure, 
                increasing volume, and positive market sentiment. These factors historically precede 
                price increases. However, crypto remains highly volatile.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
