"use client"

import type { ComponentDef } from "@/lib/api/client"
import { Card, CardContent } from "@/components/ui/card"
import { Layers, MapPin, Zap } from "lucide-react"
import { USER_REGIONS, OPTIMIZATION_PREFERENCES } from "@/lib/constants"

interface AppSummaryProps {
  components: ComponentDef[]
  userRegion: string
  optimizationPreference: string
}

export function AppSummary({ components, userRegion, optimizationPreference }: AppSummaryProps) {
  const regionLabel = USER_REGIONS.find((r) => r.value === userRegion)?.label || userRegion
  const prefLabel =
    OPTIMIZATION_PREFERENCES.find((p) => p.value === optimizationPreference)?.label || optimizationPreference

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg gradient-green-subtle flex items-center justify-center">
            <Layers className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-medium text-foreground">Architecture Summary</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-secondary">
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Components</span>
            </div>
            <p className="text-xl font-semibold text-foreground">{components.length}</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Region</span>
            </div>
            <p className="text-sm font-medium text-foreground truncate">{regionLabel.split(" ")[0]}</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Mode</span>
            </div>
            <p className="text-sm font-medium text-foreground">{prefLabel}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
