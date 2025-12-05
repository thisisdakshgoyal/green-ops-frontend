"use client"

import type { Plan } from "@/lib/api/client"
import { deployPlan } from "@/lib/api/client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScoreBar } from "./score-bar"
import {
  Copy,
  Check,
  Server,
  MapPin,
  Layers,
  Hash,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Rocket,
  Loader2,
} from "lucide-react"
import { useState } from "react"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"

interface PlanCardProps {
  plan: Plan
  onDeploySuccess?: (message: string) => void
  onDeployError?: (error: string) => void
}

export function PlanCard({ plan, onDeploySuccess, onDeployError }: PlanCardProps) {
  const [copied, setCopied] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployResult, setDeployResult] = useState<{ status: "dry-run" | "ok"; message: string; co2: number } | null>(
    null,
  )

  const handleCopySummary = () => {
    const summary = `${plan.label} in region ${plan.civo.region} (${plan.civo.regionLabel}) using ${plan.civo.clusterType}/${plan.civo.instanceClass} with ${plan.civo.replicas} replicas. Overall score: ${plan.scores.overall.toFixed(2)}, CO2: ${plan.scores.co2.toFixed(2)}, Latency: ${plan.scores.latency.toFixed(2)}, Cost: ${plan.scores.cost.toFixed(2)}. Grid CI: ${plan.carbonIntensity.value_gCo2PerKwh} gCO2/kWh.`
    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDeploy = async () => {
    setIsDeploying(true)
    setDeployResult(null)
    try {
      const response = await deployPlan({
        planId: plan.id,
        region: plan.civo.region,
        regionLabel: plan.civo.regionLabel,
        carbonIntensity: plan.carbonIntensity.value_gCo2PerKwh,
        replicas: plan.civo.replicas,
        scores: plan.scores,
        kubernetesYaml: plan.kubernetesYaml,
      })
      setDeployResult({
        status: response.status as "dry-run" | "ok",
        message: response.message,
        co2: response.analytics.estimatedHourlyCO2Kg,
      })
      onDeploySuccess?.(response.message)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to deploy"
      onDeployError?.(errorMessage)
    } finally {
      setIsDeploying(false)
    }
  }

  const getBadgeVariant = (id: string) => {
    switch (id) {
      case "max-green":
        return "default"
      case "budget":
        return "secondary"
      default:
        return "outline"
    }
  }

  const radarData = [
    { metric: "CO2", value: plan.scores.co2 * 100, fullMark: 100 },
    { metric: "Latency", value: plan.scores.latency * 100, fullMark: 100 },
    { metric: "Cost", value: plan.scores.cost * 100, fullMark: 100 },
    { metric: "Overall", value: plan.scores.overall * 100, fullMark: 100 },
  ]

  const analysis: { type: "success" | "warning"; text: string }[] = []
  if (plan.scores.co2 >= 0.8) {
    analysis.push({ type: "success", text: "High carbon efficiency" })
  }
  if (plan.scores.latency >= 0.8) {
    analysis.push({ type: "success", text: "Excellent latency for your chosen region" })
  }
  if (plan.scores.cost >= 0.8) {
    analysis.push({ type: "success", text: "Highly cost efficient" })
  }
  if (plan.scores.co2 <= 0.3) {
    analysis.push({ type: "warning", text: "Trade-off: higher carbon footprint" })
  }
  if (plan.scores.latency <= 0.3) {
    analysis.push({ type: "warning", text: "Trade-off: higher latency expected" })
  }
  if (plan.scores.cost <= 0.3) {
    analysis.push({ type: "warning", text: "Trade-off: higher relative cost" })
  }

  return (
    <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-base font-semibold text-foreground">{plan.label}</h3>
              <Badge variant={getBadgeVariant(plan.id)} className="text-xs">
                {plan.id}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Region: {plan.civo.region} - {plan.civo.regionLabel} · Instance: {plan.civo.instanceClass} · Replicas:{" "}
              {plan.civo.replicas}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopySummary}
            className="text-muted-foreground hover:text-foreground shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 border border-border">
          <Leaf className="w-4 h-4 text-success shrink-0" />
          <div className="text-sm">
            <span className="text-muted-foreground">Grid CI: </span>
            <span className="font-medium text-foreground">{plan.carbonIntensity.value_gCo2PerKwh} gCO2/kWh</span>
            <span className="text-xs text-muted-foreground ml-1">
              ({plan.carbonIntensity.source === "electricitymaps" ? "Electricity Maps" : "static fallback"})
            </span>
          </div>
        </div>

        {analysis.length > 0 && (
          <div className="space-y-1.5">
            {analysis.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                {item.type === "success" ? (
                  <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />
                )}
                <span className={item.type === "success" ? "text-success" : "text-warning"}>{item.text}</span>
              </div>
            ))}
          </div>
        )}

        <div className="p-3 rounded-lg bg-secondary/30 border border-border">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Score Breakdown</h4>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="rgba(148, 163, 184, 0.3)" strokeWidth={1} />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
                  stroke="rgba(148, 163, 184, 0.3)"
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  tickCount={5}
                  stroke="rgba(148, 163, 184, 0.2)"
                  axisLine={false}
                />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.35}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-3">
          <ScoreBar
            label="CO2 Efficiency"
            value={plan.scores.co2}
            color="bg-success"
            tooltip="Relative carbon efficiency based on grid carbon intensity (higher is greener)"
          />
          <ScoreBar
            label="Latency"
            value={plan.scores.latency}
            color="bg-info"
            tooltip="Relative proximity to selected user region (higher is better)"
          />
          <ScoreBar
            label="Cost"
            value={plan.scores.cost}
            color="bg-warning"
            tooltip="Relative cost efficiency based on region cost index (higher is cheaper)"
          />
          <ScoreBar
            label="Overall"
            value={plan.scores.overall}
            color="bg-primary"
            tooltip="Combined optimization score (weighted composite)"
          />
        </div>

        <div className="p-3 rounded-lg bg-secondary space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">CIVO Configuration</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Region:</span>
              <span className="font-medium text-foreground">{plan.civo.region}</span>
            </div>
            <div className="flex items-center gap-2">
              <Server className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium text-foreground">{plan.civo.clusterType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Instance:</span>
              <span className="font-medium text-foreground">{plan.civo.instanceClass}</span>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Replicas:</span>
              <span className="font-medium text-foreground">{plan.civo.replicas}</span>
            </div>
          </div>
        </div>

        {plan.notes.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Notes</h4>
            <ul className="space-y-1">
              {plan.notes.map((note, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">-</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {deployResult && (
          <div
            className={`p-3 rounded-lg border ${deployResult.status === "ok" ? "bg-success/10 border-success/30" : "bg-info/10 border-info/30"}`}
          >
            <div className="flex items-start gap-2">
              {deployResult.status === "ok" ? (
                <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
              ) : (
                <Server className="w-4 h-4 text-info mt-0.5 shrink-0" />
              )}
              <div className="text-sm">
                <p className={deployResult.status === "ok" ? "text-success" : "text-info"}>
                  {deployResult.status === "dry-run" ? "Dry-run: " : ""}
                  {deployResult.message}
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  Estimated CO2: {deployResult.co2.toFixed(4)} kg/hour
                </p>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={handleDeploy}
          disabled={isDeploying}
          className="w-full gradient-green text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {isDeploying ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Deploying...
            </>
          ) : (
            <>
              <Rocket className="w-4 h-4 mr-2" />
              Deploy to CIVO
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
