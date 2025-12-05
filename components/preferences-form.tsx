"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { USER_REGIONS, LATENCY_TOLERANCES, OPTIMIZATION_PREFERENCES } from "@/lib/constants"
import { Settings, MapPin, Clock, Leaf, DollarSign, Scale } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PreferencesFormProps {
  userRegion: string
  latencyTolerance: string
  optimizationPreference: string
  onRegionChange: (value: string) => void
  onLatencyChange: (value: string) => void
  onPreferenceChange: (value: string) => void
}

export function PreferencesForm({
  userRegion,
  latencyTolerance,
  optimizationPreference,
  onRegionChange,
  onLatencyChange,
  onPreferenceChange,
}: PreferencesFormProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Settings className="w-4 h-4 text-primary" />
          Workload & Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            Primary User Region
          </Label>
          <Select value={userRegion} onValueChange={onRegionChange}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {USER_REGIONS.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            Latency Tolerance
          </Label>
          <Select value={latencyTolerance} onValueChange={onLatencyChange}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LATENCY_TOLERANCES.map((lt) => (
                <SelectItem key={lt.value} value={lt.value}>
                  <span className="flex items-center justify-between w-full gap-4">
                    <span>{lt.label}</span>
                    <span className="text-xs text-muted-foreground">{lt.description}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm text-muted-foreground">Optimization Preference</Label>
          <TooltipProvider>
            <div className="grid grid-cols-3 gap-2">
              {OPTIMIZATION_PREFERENCES.map((pref) => {
                const isSelected = optimizationPreference === pref.value
                const Icon = pref.value === "max-green" ? Leaf : pref.value === "budget" ? DollarSign : Scale
                return (
                  <Tooltip key={pref.value}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onPreferenceChange(pref.value)}
                        className={`p-3 rounded-lg border transition-all duration-200 text-center ${
                          isSelected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-secondary hover:border-primary/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className={`w-5 h-5 mx-auto mb-1.5 ${isSelected ? "text-primary" : ""}`} />
                        <span className="text-xs font-medium">{pref.label}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{pref.description}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}
