"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Info } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"

const predictionData = {
  asset: "BTC",
  currentPrice: 3850000,
  prediction1d: { low: 3750000, high: 3950000, probability: 72 },
  prediction7d: { low: 3600000, high: 4100000, probability: 65 },
  trend: "Up",
  model: "LSTM + XGBoost Ensemble",
}

export function MLPrediction() {
  return (
    <motion.div variants={scrollReveal}>
      <Card className="glass-card border-purple-500/20 h-full">
        <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-b border-border">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            ML Price Prediction
            <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 ml-auto">
              AI-Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Current Price ({predictionData.asset})
              </p>
              <p className="text-4xl font-bold tabular-nums">
                ₹{(predictionData.currentPrice / 100000).toFixed(2)}L
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  1-Day Forecast
                </p>
                <p className="text-sm font-bold mb-1">
                  ₹{(predictionData.prediction1d.low / 100000).toFixed(2)}L - ₹{(predictionData.prediction1d.high / 100000).toFixed(2)}L
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${predictionData.prediction1d.probability}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold">{predictionData.prediction1d.probability}%</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  7-Day Forecast
                </p>
                <p className="text-sm font-bold mb-1">
                  ₹{(predictionData.prediction7d.low / 100000).toFixed(2)}L - ₹{(predictionData.prediction7d.high / 100000).toFixed(2)}L
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${predictionData.prediction7d.probability}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold">{predictionData.prediction7d.probability}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  Trend Bias
                </p>
                <p className="text-lg font-bold text-emerald-600 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {predictionData.trend}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  Model Used
                </p>
                <p className="text-xs font-bold">{predictionData.model}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                  <span className="font-bold">Disclaimer:</span> Predictions are probabilistic and not guaranteed. 
                  Crypto markets are highly volatile. Use for educational purposes only.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
