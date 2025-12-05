"use client"

import { useState } from "react"
import type { ComponentDef, Plan, PlanRequest, ElectricityMapsInfo } from "@/lib/api/client"
import { generatePlan } from "@/lib/api/client"
import { Header } from "@/components/header"
import { DesignCanvas } from "@/components/design-canvas"
import { ResultsPanel } from "@/components/results-panel"

export default function StudioPage() {
  const [components, setComponents] = useState<ComponentDef[]>([])
  const [userRegion, setUserRegion] = useState("global")
  const [latencyTolerance, setLatencyTolerance] = useState("balanced")
  const [optimizationPreference, setOptimizationPreference] = useState<"balanced" | "max-green" | "budget">("balanced")
  const [isPlanning, setIsPlanning] = useState(false)
  const [plans, setPlans] = useState<Plan[]>([])
  const [lastRequestPayload, setLastRequestPayload] = useState<PlanRequest | null>(null)
  const [lastRawResponse, setLastRawResponse] = useState<unknown>(null)
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [electricityMaps, setElectricityMaps] = useState<ElectricityMapsInfo | null>(null)

  const handleAddComponent = (component: ComponentDef) => {
    setComponents((prev) => [...prev, component])
  }

  const handleRemoveComponent = (index: number) => {
    setComponents((prev) => prev.filter((_, i) => i !== index))
  }

  const handleGeneratePlan = async () => {
    if (components.length === 0) {
      setError("Please add at least one component to generate a plan.")
      return
    }

    setError(null)
    setIsPlanning(true)

    const payload: PlanRequest = {
      components,
      userRegion,
      latencyTolerance,
      optimizationPreference,
    }

    setLastRequestPayload(payload)

    try {
      const response = await generatePlan(payload)
      setLastRawResponse(response)
      setPlans(response.plans)
      setElectricityMaps(response.electricityMaps || null)
      if (response.plans.length > 0) {
        setSelectedPlanId(response.plans[0].id)
      }
    } catch (err) {
      setError("Failed to generate plan. Please ensure the backend is running and try again.")
      console.error(err)
    } finally {
      setIsPlanning(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header electricityMapsEnabled={electricityMaps?.enabled ?? null} showNavLinks />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 xl:col-span-7">
            <DesignCanvas
              components={components}
              userRegion={userRegion}
              latencyTolerance={latencyTolerance}
              optimizationPreference={optimizationPreference}
              isPlanning={isPlanning}
              error={error}
              onAddComponent={handleAddComponent}
              onRemoveComponent={handleRemoveComponent}
              onRegionChange={setUserRegion}
              onLatencyChange={setLatencyTolerance}
              onPreferenceChange={(value) => setOptimizationPreference(value as "balanced" | "max-green" | "budget")}
              onGeneratePlan={handleGeneratePlan}
            />
          </div>
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="lg:sticky lg:top-24">
              <ResultsPanel
                plans={plans}
                selectedPlanId={selectedPlanId}
                onSelectPlan={setSelectedPlanId}
                lastRequestPayload={lastRequestPayload}
                lastRawResponse={lastRawResponse}
                electricityMaps={electricityMaps}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
