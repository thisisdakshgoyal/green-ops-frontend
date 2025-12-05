"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getAnalytics, type AnalyticsResponse } from "@/lib/api/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  ArrowLeft,
  BarChart3,
  Activity,
  Loader2,
  AlertCircle,
  Cloud,
  TrendingDown,
  IndianRupee,
  BookOpen,
} from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie,
  Legend,
  ComposedChart,
} from "recharts"

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string; dataKey?: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
      <p className="text-sm font-medium text-foreground mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="text-foreground font-medium">
            {entry.dataKey === "avgCI"
              ? `${entry.value.toFixed(1)} gCO2/kWh`
              : entry.dataKey === "totalCostInr" || entry.dataKey === "avgCostUsd"
                ? `₹${entry.value.toFixed(2)}`
                : entry.dataKey === "totalCO2"
                  ? `${entry.value.toFixed(4)} kg`
                  : entry.value.toFixed(4)}
          </span>
        </div>
      ))}
    </div>
  )
}

function CombinedTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color: string
    dataKey?: string
    payload: { planLabel: string; deployments: number; totalCO2: number; totalCostInr: number }
  }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  const data = payload[0].payload
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg min-w-[180px]">
      <p className="text-sm font-medium text-foreground mb-2">{label || data.planLabel}</p>
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Deployments:</span>
          <span className="text-foreground font-medium">{data.deployments}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            <span className="text-muted-foreground">CO2:</span>
          </span>
          <span className="text-foreground font-medium">{data.totalCO2.toFixed(4)} kg/hr</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
            <span className="text-muted-foreground">Cost:</span>
          </span>
          <span className="text-foreground font-medium">₹{data.totalCostInr.toFixed(2)}/hr</span>
        </div>
      </div>
    </div>
  )
}

function CostTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{
    payload: { planId?: string; regionLabel?: string; deployments: number; totalCostInr: number; avgCI: number }
  }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  const data = payload[0].payload
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
      <p className="text-sm font-medium text-foreground mb-2">{label}</p>
      <div className="space-y-1 text-xs">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Deployments:</span>
          <span className="text-foreground font-medium">{data.deployments}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Total Cost:</span>
          <span className="text-foreground font-medium">₹{data.totalCostInr.toFixed(2)}/hr</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Avg Carbon Intensity:</span>
          <span className="text-foreground font-medium">{data.avgCI.toFixed(1)} gCO2/kWh</span>
        </div>
      </div>
    </div>
  )
}

function CustomLegend({ payload }: { payload?: Array<{ value: string; color: string }> }) {
  if (!payload) return null
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-2">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-1.5 text-xs">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

const PLAN_COLORS: Record<string, string> = {
  balanced: "#3b82f6",
  "max-green": "#22c55e",
  budget: "#eab308",
}

const REGION_COLORS = ["#22c55e", "#0ea5e9", "#8b5cf6", "#f97316", "#ec4899"]

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const data = await getAnalytics()
        setAnalytics(data)
      } catch (err) {
        setError("Failed to fetch analytics. Make sure the backend is running.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error || !analytics) {
    return (
      <div className="min-h-screen bg-background">
        <AnalyticsHeader />
        <main className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Unable to Load Analytics</h3>
            <p className="text-sm text-muted-foreground max-w-xs mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const byPlanData = analytics.byPlan.map((p) => ({
    ...p,
    planLabel: p.planId.charAt(0).toUpperCase() + p.planId.slice(1).replace("-", " "),
  }))

  const byRegionData = analytics.byRegion.map((r, i) => ({
    ...r,
    fill: REGION_COLORS[i % REGION_COLORS.length],
  }))

  const timeSeriesData = analytics.deployments.map((d) => ({
    ...d,
    time: new Date(d.timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }))

  const formatInr = (value: number | undefined) => {
    if (value === undefined || value === null) return "₹0.00"
    return `₹${value.toFixed(2)}`
  }

  return (
    <div className="min-h-screen bg-background">
      <AnalyticsHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Description */}
        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <p className="text-sm text-muted-foreground">
            This dashboard estimates hourly CO2 impact and cost for each deployment based on grid carbon intensity,
            replica count, and cloud pricing. Values are approximate but useful for comparative insight.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            icon={<Activity className="w-5 h-5" />}
            label="Total Deployments"
            value={analytics.summary.totalDeployments.toString()}
          />
          <KPICard
            icon={<IndianRupee className="w-5 h-5" />}
            label="Estimated Hourly Cost"
            value={formatInr(analytics.summary.totalEstimatedHourlyCostInr)}
            subtext="All active plans (per hour)"
          />
          <KPICard
            icon={<TrendingDown className="w-5 h-5" />}
            label="Savings vs Worst Region"
            value={formatInr(analytics.summary.estimatedHourlySavingsInr)}
            subtext="Per hour vs most expensive region"
            highlight={analytics.summary.estimatedHourlySavingsInr > 0}
          />
          <KPICard
            icon={<Cloud className="w-5 h-5" />}
            label="Estimated Hourly CO2"
            value={`${analytics.summary.totalEstimatedHourlyCO2Kg.toFixed(4)} kg`}
            subtext="Across all deployed plans"
          />
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              CO2 vs Cost by Plan
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Comparing total hourly CO2 emissions (bars) with total hourly cost in INR (line) per plan type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {byPlanData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  No deployment data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={byPlanData} margin={{ top: 20, right: 40, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" vertical={false} />
                    <XAxis
                      dataKey="planLabel"
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                      tickLine={false}
                    />
                    <YAxis
                      yAxisId="left"
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                      tickLine={false}
                      tickFormatter={(v) => v.toFixed(3)}
                      label={{
                        value: "CO2 (kg/hr)",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#94a3b8",
                        fontSize: 10,
                      }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                      tickLine={false}
                      tickFormatter={(v) => `₹${v.toFixed(2)}`}
                      label={{
                        value: "Cost (₹/hr)",
                        angle: 90,
                        position: "insideRight",
                        fill: "#94a3b8",
                        fontSize: 10,
                      }}
                    />
                    <Tooltip content={<CombinedTooltip />} />
                    <Legend
                      content={() => (
                        <div className="flex justify-center gap-6 mt-2 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded bg-[#22c55e]" />
                            <span className="text-muted-foreground">CO2 (kg/hr)</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                            <span className="text-muted-foreground">Cost (₹/hr)</span>
                          </div>
                        </div>
                      )}
                    />
                    <Bar yAxisId="left" dataKey="totalCO2" name="CO2 (kg/hr)" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="totalCostInr"
                      name="Cost (₹/hr)"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={{ fill: "#f59e0b", strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7, fill: "#f59e0b" }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost by Plan Bar Chart */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-foreground flex items-center gap-2">
                <IndianRupee className="w-4 h-4" />
                Cost by Plan (per hour)
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Total estimated hourly cost in INR per plan type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[260px] w-full">
                {byPlanData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                    No deployment data available
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={byPlanData} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" vertical={false} />
                      <XAxis
                        dataKey="planLabel"
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                        axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                        tickLine={false}
                        tickFormatter={(v) => `₹${v.toFixed(2)}`}
                      />
                      <Tooltip content={<CostTooltip />} />
                      <Bar dataKey="totalCostInr" name="Cost (₹/hr)" radius={[4, 4, 0, 0]}>
                        {byPlanData.map((entry) => (
                          <Cell key={entry.planId} fill={PLAN_COLORS[entry.planId] || "#6b7280"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cost by Region Bar Chart */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-foreground flex items-center gap-2">
                <IndianRupee className="w-4 h-4" />
                Cost by Region (per hour)
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Total estimated hourly cost in INR per region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[260px] w-full">
                {byRegionData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                    No deployment data available
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={byRegionData} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" vertical={false} />
                      <XAxis
                        dataKey="regionLabel"
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                        tickLine={false}
                        interval={0}
                        angle={-15}
                        textAnchor="end"
                        height={50}
                      />
                      <YAxis
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                        tickLine={false}
                        tickFormatter={(v) => `₹${v.toFixed(2)}`}
                      />
                      <Tooltip content={<CostTooltip />} />
                      <Bar dataKey="totalCostInr" name="Cost (₹/hr)" radius={[4, 4, 0, 0]}>
                        {byRegionData.map((entry, index) => (
                          <Cell key={entry.region} fill={REGION_COLORS[index % REGION_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CO2 Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CO2 by Plan Bar Chart */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-foreground">CO2 by Plan Type</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Total estimated hourly CO2 emissions per plan type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byPlanData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" vertical={false} />
                    <XAxis
                      dataKey="planLabel"
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                      tickLine={false}
                      tickFormatter={(v) => v.toFixed(3)}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="totalCO2" name="Total CO2 (kg/hr)" radius={[4, 4, 0, 0]}>
                      {byPlanData.map((entry) => (
                        <Cell key={entry.planId} fill={PLAN_COLORS[entry.planId] || "#6b7280"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* By Region Pie Chart */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-foreground">Deployments by Region</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Distribution of deployments across regions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={byRegionData}
                      dataKey="deployments"
                      nameKey="regionLabel"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ regionLabel, percent }) => `${regionLabel} (${(percent * 100).toFixed(0)}%)`}
                      labelLine={{ stroke: "#64748b" }}
                    >
                      {byRegionData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Series Chart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Deployments Over Time
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Estimated hourly CO2 for each deployment event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {timeSeriesData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  No deployment data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                    <XAxis
                      dataKey="time"
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      axisLine={{ stroke: "rgba(148, 163, 184, 0.3)" }}
                      tickLine={false}
                      tickFormatter={(v) => v.toFixed(4)}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="estimatedHourlyCO2Kg"
                      name="CO2 (kg/hr)"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "#22c55e" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Deployments Table */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-foreground">Recent Deployments</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Detailed log of deployment events with cost estimates
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analytics.deployments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No deployments recorded yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-2 text-muted-foreground font-medium">Time</th>
                      <th className="text-left py-2 px-2 text-muted-foreground font-medium">Plan</th>
                      <th className="text-left py-2 px-2 text-muted-foreground font-medium">Region</th>
                      <th className="text-right py-2 px-2 text-muted-foreground font-medium">CI (gCO2/kWh)</th>
                      <th className="text-right py-2 px-2 text-muted-foreground font-medium">Replicas</th>
                      <th className="text-right py-2 px-2 text-muted-foreground font-medium">Est. CO2 (kg/hr)</th>
                      <th className="text-right py-2 px-2 text-muted-foreground font-medium">Est. Cost (₹/hr)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.deployments.slice(0, 10).map((d, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-secondary/30">
                        <td className="py-2 px-2 text-muted-foreground">{new Date(d.timestamp).toLocaleString()}</td>
                        <td className="py-2 px-2">
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{
                              borderColor: PLAN_COLORS[d.planId] || "#6b7280",
                              color: PLAN_COLORS[d.planId] || "#6b7280",
                            }}
                          >
                            {d.planId}
                          </Badge>
                        </td>
                        <td className="py-2 px-2 text-foreground">{d.regionLabel}</td>
                        <td className="py-2 px-2 text-right text-foreground">
                          {d.carbonIntensity_gCo2PerKwh.toFixed(1)}
                        </td>
                        <td className="py-2 px-2 text-right text-foreground">{d.replicas}</td>
                        <td className="py-2 px-2 text-right text-foreground">{d.estimatedHourlyCO2Kg.toFixed(4)}</td>
                        <td className="py-2 px-2 text-right text-foreground">{formatInr(d.estimatedHourlyCostInr)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function AnalyticsHeader() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">GreenOps Studio</h1>
              <p className="text-xs text-muted-foreground">Carbon Analytics</p>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/docs">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <BookOpen className="w-4 h-4 mr-2" />
              Docs
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link href="/studio">
            <Button size="sm" className="gradient-green text-primary-foreground">
              <BarChart3 className="w-4 h-4 mr-2" />
              Planner
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

function KPICard({
  icon,
  label,
  value,
  subtext,
  highlight,
}: {
  icon: React.ReactNode
  label: string
  value: string
  subtext?: string
  highlight?: boolean
}) {
  return (
    <Card className={`bg-card border-border ${highlight ? "ring-1 ring-success/50" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${highlight ? "bg-success/20 text-success" : "gradient-green-subtle text-primary"}`}
          >
            {icon}
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className={`text-xl font-bold ${highlight ? "text-success" : "text-foreground"}`}>{value}</p>
            {subtext && <p className="text-xs text-muted-foreground mt-0.5">{subtext}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
