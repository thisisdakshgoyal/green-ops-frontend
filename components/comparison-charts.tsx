"use client"

import type { Plan } from "@/lib/api/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  LabelList,
  Tooltip,
  Legend,
} from "recharts"

interface ComparisonChartsProps {
  plans: Plan[]
}

function CustomTooltip({
  active,
  payload,
  label,
}: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
      <p className="text-sm font-medium text-foreground mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="text-foreground font-medium">{entry.value}%</span>
        </div>
      ))}
    </div>
  )
}

function CustomLegend({ payload }: { payload?: Array<{ value: string; color: string }> }) {
  if (!payload?.length) return null
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-2">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }} />
          <span className="text-xs text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export function ComparisonCharts({ plans }: ComparisonChartsProps) {
  if (plans.length === 0) return null

  const comparisonData = plans.map((plan) => ({
    id: plan.id,
    label: plan.label.replace(" Plan", ""),
    co2: Math.round(plan.scores.co2 * 100),
    latency: Math.round(plan.scores.latency * 100),
    cost: Math.round(plan.scores.cost * 100),
    overall: Math.round(plan.scores.overall * 100),
  }))

  const costData = plans.map((plan) => ({
    id: plan.id,
    label: plan.label.replace(" Plan", ""),
    cost: Math.round(plan.scores.cost * 100),
  }))

  const getBarColor = (id: string) => {
    switch (id) {
      case "max-green":
        return "#22c55e"
      case "budget":
        return "#eab308"
      default:
        return "#3b82f6"
    }
  }

  return (
    <div className="space-y-4">
      {/* Score Comparison Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-foreground">Plan Score Comparison</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Compare all plans across CO2, Latency, Cost, and Overall metrics. Scores are 0-100% (higher is better).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
                <Bar dataKey="co2" name="CO2" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="latency" name="Latency" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cost" name="Cost" fill="#eab308" radius={[4, 4, 0, 0]} />
                <Bar dataKey="overall" name="Overall" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Cost-Focused Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-foreground">Cost Efficiency Comparison</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Higher bar = more cost-efficient (cheaper relative choice)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costData} layout="vertical" margin={{ top: 10, right: 40, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis
                  type="category"
                  dataKey="label"
                  tick={{ fill: "#e2e8f0", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                  tickLine={false}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="cost" name="Cost Efficiency" radius={[0, 4, 4, 0]}>
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.id)} />
                  ))}
                  <LabelList
                    dataKey="cost"
                    position="right"
                    formatter={(value: number) => `${value}%`}
                    fill="#e2e8f0"
                    fontSize={12}
                    fontWeight={500}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
