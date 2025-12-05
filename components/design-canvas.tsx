"use client"

import type { ComponentDef } from "@/lib/api/client"
import { AppSummary } from "./app-summary"
import { ComponentBuilder } from "./component-builder"
import { ComponentList } from "./component-list"
import { PreferencesForm } from "./preferences-form"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles, AlertCircle } from "lucide-react"

interface DesignCanvasProps {
  components: ComponentDef[]
  userRegion: string
  latencyTolerance: string
  optimizationPreference: string
  isPlanning: boolean
  error: string | null
  onAddComponent: (component: ComponentDef) => void
  onRemoveComponent: (index: number) => void
  onRegionChange: (value: string) => void
  onLatencyChange: (value: string) => void
  onPreferenceChange: (value: string) => void
  onGeneratePlan: () => void
}

export function DesignCanvas({
  components,
  userRegion,
  latencyTolerance,
  optimizationPreference,
  isPlanning,
  error,
  onAddComponent,
  onRemoveComponent,
  onRegionChange,
  onLatencyChange,
  onPreferenceChange,
  onGeneratePlan,
}: DesignCanvasProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Design Canvas</h2>
        <span className="text-xs text-muted-foreground">Define your architecture</span>
      </div>

      <AppSummary components={components} userRegion={userRegion} optimizationPreference={optimizationPreference} />

      <ComponentBuilder onAddComponent={onAddComponent} />

      <ComponentList components={components} onRemoveComponent={onRemoveComponent} />

      <PreferencesForm
        userRegion={userRegion}
        latencyTolerance={latencyTolerance}
        optimizationPreference={optimizationPreference}
        onRegionChange={onRegionChange}
        onLatencyChange={onLatencyChange}
        onPreferenceChange={onPreferenceChange}
      />

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <Button
        onClick={onGeneratePlan}
        disabled={isPlanning || components.length === 0}
        className="w-full h-12 gradient-green text-primary-foreground hover:opacity-90 transition-all duration-200 disabled:opacity-50"
      >
        {isPlanning ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Computing optimal plan...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Generate GreenOps Deployment Plan
          </>
        )}
      </Button>
    </div>
  )
}
