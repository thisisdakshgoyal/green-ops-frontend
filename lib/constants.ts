export const COMPONENT_TYPES = [
  { value: "api-gateway", label: "API Gateway", icon: "🌐" },
  { value: "frontend", label: "Frontend", icon: "🖥️" },
  { value: "function", label: "Serverless Function", icon: "⚡" },
  { value: "container", label: "Container", icon: "📦" },
  { value: "database", label: "Database", icon: "🗄️" },
  { value: "queue", label: "Message Queue", icon: "📬" },
  { value: "batch-job", label: "Batch Job", icon: "⏱️" },
  { value: "object-storage", label: "Object Storage", icon: "💾" },
] as const

export const USER_REGIONS = [
  { value: "global", label: "Global (Multi-Region)" },
  { value: "ap-south", label: "India / APAC (ap-south)" },
  { value: "eu-west", label: "Europe (eu-west)" },
  { value: "us-east", label: "US East (us-east)" },
  { value: "us-west", label: "US West (us-west)" },
] as const

export const LATENCY_TOLERANCES = [
  { value: "strict", label: "Strict", description: "< 100ms" },
  { value: "balanced", label: "Balanced", description: "100–200ms" },
  { value: "relaxed", label: "Relaxed", description: "> 200ms ok" },
] as const

export const OPTIMIZATION_PREFERENCES = [
  { value: "balanced", label: "Balanced", description: "Optimal trade-off between all factors" },
  { value: "max-green", label: "Max Green", description: "Prioritize carbon efficiency" },
  { value: "budget", label: "Budget Friendly", description: "Minimize cost" },
] as const
