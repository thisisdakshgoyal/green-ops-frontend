"use client"

import type { Plan, PlanRequest, ElectricityMapsInfo } from "@/lib/api/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlansPanel } from "./plans-panel"
import { YamlPanel } from "./yaml-panel"
import { LayoutGrid, Code } from "lucide-react"

interface ResultsPanelProps {
  plans: Plan[]
  selectedPlanId: string | null
  onSelectPlan: (planId: string) => void
  lastRequestPayload: PlanRequest | null
  lastRawResponse: unknown
  electricityMaps?: ElectricityMapsInfo | null
}

export function ResultsPanel({
  plans,
  selectedPlanId,
  onSelectPlan,
  lastRequestPayload,
  lastRawResponse,
  electricityMaps,
}: ResultsPanelProps) {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Optimization Results</h2>
        <span className="text-xs text-muted-foreground">{plans.length} plan(s) generated</span>
      </div>

      <Tabs defaultValue="plans" className="h-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="plans" className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" />
            Plans
          </TabsTrigger>
          <TabsTrigger value="yaml" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            YAML & JSON
          </TabsTrigger>
        </TabsList>
        <TabsContent value="plans" className="mt-0">
          <PlansPanel plans={plans} electricityMaps={electricityMaps} />
        </TabsContent>
        <TabsContent value="yaml" className="mt-0">
          <YamlPanel
            plans={plans}
            selectedPlanId={selectedPlanId}
            onSelectPlan={onSelectPlan}
            lastRequestPayload={lastRequestPayload}
            lastRawResponse={lastRawResponse}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
