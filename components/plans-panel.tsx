"use client"

import type { Plan, ElectricityMapsInfo } from "@/lib/api/client"
import { PlanCard } from "./plan-card"
import { ComparisonCharts } from "./comparison-charts"
import { Sparkles, Info, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

interface PlansPanelProps {
  plans: Plan[]
  electricityMaps?: ElectricityMapsInfo | null
}

export function PlansPanel({ plans, electricityMaps }: PlansPanelProps) {
  const { toast } = useToast()

  const handleDeploySuccess = (message: string) => {
    toast({
      title: "Deployment Initiated",
      description: message,
    })
  }

  const handleDeployError = (error: string) => {
    toast({
      title: "Deployment Failed",
      description: error,
      variant: "destructive",
    })
  }

  if (plans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full gradient-green-subtle flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No plans yet</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Design your app architecture and click &quot;Generate GreenOps Deployment Plan&quot; to see optimized
          configurations.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {/* Live CO2 status badge for mobile */}
        {electricityMaps && (
          <div className="md:hidden flex items-center gap-2">
            <Badge variant={electricityMaps.enabled ? "default" : "secondary"} className="text-xs">
              <Zap className="w-3 h-3 mr-1" />
              Live CO2 data: {electricityMaps.enabled ? "ON" : "OFF"}
            </Badge>
          </div>
        )}

        <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary/50 border border-border">
          <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              Scores are normalized between 0 and 1. Higher is better for CO2 efficiency, latency, and cost.
            </p>
            <div className="flex flex-wrap gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="text-xs cursor-help">
                      CO2
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Relative carbon efficiency based on grid carbon intensity</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="text-xs cursor-help">
                      Latency
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Relative proximity to selected user region</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="text-xs cursor-help">
                      Cost
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Relative cost efficiency based on region cost index</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      <ComparisonCharts plans={plans} />

      {/* Plan cards */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Individual Plan Details</h4>
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onDeploySuccess={handleDeploySuccess} onDeployError={handleDeployError} />
        ))}
      </div>
    </div>
  )
}
