"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calculator, TrendingUp, Shield, PieChart } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"
import { cn } from "@/lib/utils"

export function PortfolioSimulator() {
  const [amount, setAmount] = useState("50000")
  const [simulated, setSimulated] = useState(false)

  const handleSimulate = () => {
    setSimulated(true)
  }

  return (
    <motion.div variants={scrollReveal} className="h-full">
      <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border group h-full">
        <CardHeader className="p-8 border-b border-border/50 bg-muted/20 relative">
          <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />
          <CardTitle className="text-sm font-black text-foreground flex items-center gap-4 italic uppercase tracking-tight relative z-10">
            <div className="p-2.5 rounded-xl bg-primary shadow-lg shadow-primary/20">
              <Calculator className="h-6 w-6 text-primary-foreground" />
            </div>
            Neural Impact Simulator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-4 block italic">
                  Structural Alpha Injection (₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-lg font-black text-primary italic">₹</span>
                  </div>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-16 pl-10 bg-muted/30 border-border/50 rounded-2xl text-2xl font-black italic tabular-nums focus:ring-primary/20 transition-all"
                    placeholder="50000"
                  />
                </div>
              </div>
              <Button onClick={handleSimulate} className="w-full h-16 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/30 hover:scale-[1.02] transition-all border-0">
                <Calculator className="h-5 w-5 mr-3" />
                Simulate Alpha Sync
              </Button>
              <div className="p-6 rounded-[2rem] bg-warning/10 border border-warning/20">
                <p className="text-[11px] text-muted-foreground font-bold leading-relaxed italic">
                  <span className="text-warning uppercase font-black tracking-widest mr-2">Directive:</span>
                  This is a structural simulation only. No real alpha execution or principal movement occurs.
                </p>
              </div>
            </div>

            <div className="relative min-h-[300px]">
              {!simulated ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 bg-muted/20 rounded-[2.5rem] border-2 border-dashed border-border/50">
                  <div className="p-6 bg-card rounded-full shadow-inner mb-6">
                    <TrendingUp className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic leading-relaxed">
                    Awaiting Structural Parameters<br />Inject Alpha to Begin Synthesis
                  </p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-10 duration-700">
                  <div className="p-6 rounded-[2rem] bg-muted/30 border border-border/50 group/res">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-2 rounded-xl bg-primary/10">
                        <PieChart className="h-5 w-5 text-primary" />
                      </div>
                      <p className="font-black text-[11px] text-foreground uppercase tracking-widest italic">Structural Allocation</p>
                    </div>
                    <p className="text-3xl font-black text-foreground italic tabular-nums mb-1">15.8%</p>
                    <p className="text-[10px] text-muted-foreground font-medium italic opacity-60">Neural exposure sync (was 12.5%)</p>
                  </div>

                  <div className="p-6 rounded-[2rem] bg-destructive/10 border border-destructive/20 group/res">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-2 rounded-xl bg-destructive/10">
                        <Shield className="h-5 w-5 text-destructive" />
                      </div>
                      <p className="font-black text-[11px] text-foreground uppercase tracking-widest italic">Structural Bias Level</p>
                    </div>
                    <p className="text-3xl font-black text-destructive italic tabular-nums mb-1">High → Extreme</p>
                    <p className="text-[10px] text-muted-foreground font-medium italic opacity-60">Volatility vector increased by 12%</p>
                  </div>

                  <div className="p-6 rounded-[2rem] bg-success/10 border border-success/20 group/res">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-2 rounded-xl bg-success/10">
                        <TrendingUp className="h-5 w-5 text-success" />
                      </div>
                      <p className="font-black text-[11px] text-foreground uppercase tracking-widest italic">Neural Trajectory</p>
                    </div>
                    <p className="text-3xl font-black text-success italic tabular-nums mb-1">+18.5%</p>
                    <p className="text-[10px] text-muted-foreground font-medium italic opacity-60">Alpha projection (High Uncertainty)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
