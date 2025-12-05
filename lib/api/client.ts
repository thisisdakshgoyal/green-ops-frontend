export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://212.2.244.108:4000";

export interface ComponentDef {
  name: string
  type: string
}

export interface PlanScores {
  co2: number
  latency: number
  cost: number
  overall: number
}

export interface PlanCarbonIntensity {
  value_gCo2PerKwh: number
  source: "electricitymaps" | "fallback-static"
}

export interface PlanCivo {
  region: string
  regionLabel: string
  clusterType: "kubernetes" | "vm"
  instanceClass: string
  replicas: number
}

export interface Plan {
  id: string
  label: string
  description: string
  scores: PlanScores
  carbonIntensity: PlanCarbonIntensity
  civo: PlanCivo
  notes: string[]
  kubernetesYaml: string
}

export interface HealthResponse {
  status: string
  app: string
  message: string
}

export interface PlanRequest {
  components: ComponentDef[]
  userRegion: string
  latencyTolerance: string
  optimizationPreference: string
}

export interface ElectricityMapsInfo {
  enabled: boolean
}

export interface PlanResponse {
  inputEcho: PlanRequest
  electricityMaps: ElectricityMapsInfo
  plans: Plan[]
}

export interface DeployRequest {
  planId: string
  region: string
  regionLabel: string
  carbonIntensity: number
  replicas: number
  scores: PlanScores
  kubernetesYaml: string
}

export interface DeployAnalytics {
  timestamp: string
  estimatedHourlyEnergyKwh: number
  estimatedHourlyCO2Kg: number
}

export interface DeployResponse {
  status: "dry-run" | "ok" | "error"
  message: string
  command: string
  kubectl?: {
    stdout: string
    stderr: string
  }
  analytics: DeployAnalytics
}

export interface AnalyticsSummary {
  totalDeployments: number
  totalEstimatedHourlyCO2Kg: number
  averageCarbonIntensity_gCo2PerKwh: number
  totalEstimatedHourlyCostUsd: number
  totalEstimatedHourlyCostInr: number
  baselineEstimatedHourlyCostUsd: number
  baselineEstimatedHourlyCostInr: number
  estimatedHourlySavingsUsd: number
  estimatedHourlySavingsInr: number
}

export interface AnalyticsByPlan {
  planId: string
  deployments: number
  totalCO2: number
  totalCI: number
  avgCI: number
  totalCostUsd: number
  totalCostInr: number
  avgCostUsd: number
}

export interface AnalyticsByRegion {
  region: string
  regionLabel: string
  deployments: number
  totalCO2: number
  totalCI: number
  avgCI: number
  totalCostUsd: number
  totalCostInr: number
  avgCostUsd: number
}

export interface AnalyticsDeployment {
  timestamp: string
  planId: string
  region: string
  regionLabel: string
  carbonIntensity_gCo2PerKwh: number
  replicas: number
  scores: PlanScores | null
  estimatedHourlyEnergyKwh: number
  estimatedHourlyCO2Kg: number
  estimatedHourlyCostUsd: number
  estimatedHourlyCostInr: number
}

export interface AnalyticsResponse {
  summary: AnalyticsSummary
  byPlan: AnalyticsByPlan[]
  byRegion: AnalyticsByRegion[]
  deployments: AnalyticsDeployment[]
  currency: {
    usdToInr: number
  }
}

export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/health`)
  if (!response.ok) {
    throw new Error("Backend health check failed")
  }
  return response.json()
}

export async function generatePlan(request: PlanRequest): Promise<PlanResponse> {
  const response = await fetch(`${API_BASE_URL}/api/plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
  if (!response.ok) {
    throw new Error("Failed to generate deployment plan")
  }
  return response.json()
}

export async function deployPlan(request: DeployRequest): Promise<DeployResponse> {
  const response = await fetch(`${API_BASE_URL}/api/deploy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Failed to deploy to CIVO")
  }
  return response.json()
}

export async function getAnalytics(): Promise<AnalyticsResponse> {
  const response = await fetch(`${API_BASE_URL}/api/analytics`)
  if (!response.ok) {
    throw new Error("Failed to fetch analytics")
  }
  return response.json()
}
