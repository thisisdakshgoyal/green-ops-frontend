"use client"

import { useState } from "react"
import type { Plan, PlanRequest } from "@/lib/api/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Copy, Check, ChevronDown, FileCode, FileJson } from "lucide-react"

interface YamlPanelProps {
  plans: Plan[]
  selectedPlanId: string | null
  onSelectPlan: (planId: string) => void
  lastRequestPayload: PlanRequest | null
  lastRawResponse: unknown
}

export function YamlPanel({
  plans,
  selectedPlanId,
  onSelectPlan,
  lastRequestPayload,
  lastRawResponse,
}: YamlPanelProps) {
  const [yamlCopied, setYamlCopied] = useState(false)
  const [jsonOpen, setJsonOpen] = useState(false)

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[0]

  const handleCopyYaml = () => {
    if (selectedPlan?.kubernetesYaml) {
      navigator.clipboard.writeText(selectedPlan.kubernetesYaml)
      setYamlCopied(true)
      setTimeout(() => setYamlCopied(false), 2000)
    }
  }

  if (plans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
          <FileCode className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No YAML available</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Generate a deployment plan to see the Kubernetes YAML configuration.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <FileCode className="w-4 h-4 text-primary" />
              Kubernetes YAML
            </CardTitle>
            {plans.length > 1 && (
              <Select value={selectedPlanId || plans[0]?.id} onValueChange={onSelectPlan}>
                <SelectTrigger className="w-40 h-8 text-xs bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <ScrollArea className="h-80 rounded-lg bg-[#0d0d0d] border border-border">
              <pre className="p-4 text-sm font-mono text-foreground whitespace-pre overflow-x-auto">
                {selectedPlan?.kubernetesYaml || "# No YAML available"}
              </pre>
            </ScrollArea>
            <Button size="sm" variant="secondary" className="absolute top-2 right-2" onClick={handleCopyYaml}>
              {yamlCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-success" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  Copy YAML
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Collapsible open={jsonOpen} onOpenChange={setJsonOpen}>
        <Card className="bg-card border-border">
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer hover:bg-secondary/50 transition-colors rounded-t-lg">
              <CardTitle className="text-base font-medium flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-primary" />
                  Raw Request & Response
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${jsonOpen ? "rotate-180" : ""}`}
                />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Request Payload
                </h4>
                <ScrollArea className="h-40 rounded-lg bg-[#0d0d0d] border border-border">
                  <pre className="p-4 text-xs font-mono text-foreground">
                    {JSON.stringify(lastRequestPayload, null, 2)}
                  </pre>
                </ScrollArea>
              </div>
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  API Response
                </h4>
                <ScrollArea className="h-60 rounded-lg bg-[#0d0d0d] border border-border">
                  <pre className="p-4 text-xs font-mono text-foreground">
                    {JSON.stringify(lastRawResponse, null, 2)}
                  </pre>
                </ScrollArea>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  )
}
