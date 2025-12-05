import Link from "next/link"
import { Leaf, BookOpen, ArrowLeft, Server, Globe, Database, Zap, Code, Rocket, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">GreenOps Studio</h1>
                <p className="text-xs text-muted-foreground">Documentation</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link href="/studio">
              <Button size="sm" className="gradient-green text-primary-foreground">
                Launch Planner
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Page Title */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Technical Documentation</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            A comprehensive overview of GreenOps Studio's architecture, optimization algorithms, and API integrations.
          </p>
        </div>

        {/* Table of Contents */}
        <Card className="mb-10 bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <a href="#overview" className="text-primary hover:underline">
                A. Overview
              </a>
              <a href="#architecture" className="text-primary hover:underline">
                B. Architecture
              </a>
              <a href="#optimization" className="text-primary hover:underline">
                C. Optimization Math & Formulas
              </a>
              <a href="#apis" className="text-primary hover:underline">
                D. APIs Used
              </a>
              <a href="#deployment-flow" className="text-primary hover:underline">
                E. Deployment Flow
              </a>
              <a href="#assumptions" className="text-primary hover:underline">
                F. Assumptions & Limitations
              </a>
            </nav>
          </CardContent>
        </Card>

        {/* A. Overview */}
        <section id="overview" className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center text-primary-foreground text-sm font-bold">
              A
            </span>
            Overview
          </h2>
          <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">GreenOps Studio</strong> is a multi-objective deployment planner
              designed to help engineering teams optimize their Kubernetes workloads for carbon efficiency, network
              latency, and cost simultaneously. Rather than treating sustainability as an afterthought, GreenOps makes
              carbon-aware decisions a first-class citizen in the deployment process.
            </p>
            <p>
              The system integrates with the <strong className="text-foreground">Electricity Maps API</strong> to fetch
              real-time grid carbon intensity data (measured in gCO2eq/kWh) for different cloud regions. This live data
              ensures that deployment decisions reflect the actual carbon footprint of electricity generation at the
              time of deployment, not static averages.
            </p>
            <p>
              Users can deploy workloads to <strong className="text-foreground">Kubernetes clusters</strong> with a
              single click. GreenOps generates production-ready Kubernetes YAML manifests and can optionally apply them
              directly via kubectl. Every deployment is logged with estimated energy consumption, CO2 emissions, and
              cost in INR, enabling teams to track their carbon impact over time through the Analytics dashboard.
            </p>
          </div>
        </section>

        {/* B. Architecture */}
        <section id="architecture" className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center text-primary-foreground text-sm font-bold">
              B
            </span>
            Architecture
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                  <Globe className="w-4 h-4 text-primary" />
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>
                  <strong className="text-foreground">Stack:</strong> Next.js, React, Tailwind CSS
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Planner UI for component design</li>
                  <li>Analytics Dashboard for tracking</li>
                  <li>"Deploy" button triggers /api/deploy</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                  <Server className="w-4 h-4 text-primary" />
                  Backend
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>
                  <strong className="text-foreground">Stack:</strong> Node.js, Express
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <code className="text-primary">/api/plan</code> — computes strategies
                  </li>
                  <li>
                    <code className="text-primary">/api/deploy</code> — records & applies YAML
                  </li>
                  <li>
                    <code className="text-primary">/api/analytics</code> — aggregates history
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                  <Database className="w-4 h-4 text-primary" />
                  External Services
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong className="text-foreground">Electricity Maps API</strong> for carbonIntensity (gCO2/kWh)
                  </li>
                  <li>
                    <strong className="text-foreground">Kubernetes cluster</strong> via kubectl context
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <p className="text-sm text-muted-foreground">
              <Zap className="w-4 h-4 inline mr-1 text-primary" />
              <strong className="text-foreground">Data Flow:</strong> Frontend → POST /api/plan → Backend computes
              scores using Electricity Maps data → Returns plans with YAML → User clicks Deploy → POST /api/deploy →
              Backend records analytics + runs kubectl apply
            </p>
          </div>
        </section>

        {/* C. Optimization Math */}
        <section id="optimization" className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center text-primary-foreground text-sm font-bold">
              C
            </span>
            Optimization Math & Formulas
          </h2>

          <div className="space-y-8">
            {/* Normalization */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">1. Normalization of Metrics</h3>
              <p className="text-sm text-muted-foreground mb-4">
                For each region <code className="text-primary">r</code>, we collect raw values and normalize them to a
                0-1 scale:
              </p>
              <div className="bg-secondary/70 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-foreground">
                  {`Raw values for region r:
  CO2_r      = carbon intensity (gCO2eq/kWh) from Electricity Maps
  Cost_r     = baseCost (USD per replica per hour)
  Latency_r  = latencyBaseScore(userRegion, region)  // already 0-1

Normalized scores (lower raw = better, so invert):
  co2Score_r     = 1 - normalize(CO2_r)
  costScore_r    = 1 - normalize(Cost_r)
  latencyScore_r = Latency_r  // already normalized

Where normalize(x) = (x - min) / (max - min)
  across all candidate regions`}
                </pre>
              </div>
            </div>

            {/* Weighting */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">2. Strategy Weights</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Each strategy applies different weights to the three objectives:
              </p>
              <div className="bg-secondary/70 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-foreground">
                  {`overallScore_r(Strategy) = 
    w_CO2   * co2Score_r +
    w_Lat   * latencyScore_r +
    w_Cost  * costScore_r

Base weights by strategy:
┌─────────────┬───────┬─────────┬────────┐
│ Strategy    │  CO2  │ Latency │  Cost  │
├─────────────┼───────┼─────────┼────────┤
│ max-green   │  0.60 │   0.25  │  0.15  │
│ budget      │  0.15 │   0.25  │  0.60  │
│ balanced    │  0.34 │   0.33  │  0.33  │
└─────────────┴───────┴─────────┴────────┘`}
                </pre>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                <strong className="text-foreground">Latency Tolerance Adjustments:</strong> When user selects "strict"
                latency, the latency weight increases and others decrease proportionally. "Relaxed" does the opposite.
              </p>
            </div>

            {/* CO2 Estimation */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">3. CO2 Estimation per Deployment</h3>
              <div className="bg-secondary/70 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-foreground">
                  {`Assumptions:
  powerPerReplicaKw = 0.1 kW  (estimated average)
  
Formulas:
  hourlyEnergyKwh = replicas * powerPerReplicaKw
  
  hourlyCO2kg = (carbonIntensity_gCO2perKwh / 1000) * hourlyEnergyKwh

Example:
  replicas = 3, carbonIntensity = 450 gCO2/kWh
  hourlyEnergyKwh = 3 * 0.1 = 0.3 kWh
  hourlyCO2kg = (450 / 1000) * 0.3 = 0.135 kg CO2/hour`}
                </pre>
              </div>
            </div>

            {/* Cost Estimation */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">4. Cost Estimation</h3>
              <div className="bg-secondary/70 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-foreground">
                  {`Assumptions:
  baseCost(region) = hourly cost per replica in USD
  FX = 85 INR/USD (configurable)
  
Formulas:
  hourlyCostUsd = baseCost(region) * replicas
  hourlyCostInr = hourlyCostUsd * FX

Example:
  baseCost("LON1") = 0.02 USD, replicas = 3
  hourlyCostUsd = 0.02 * 3 = 0.06 USD/hour
  hourlyCostInr = 0.06 * 85 = 5.10 INR/hour`}
                </pre>
              </div>
            </div>

            {/* Savings Calculation */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">5. Baseline and Savings</h3>
              <div className="bg-secondary/70 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-foreground">
                  {`Let maxBaseCost = max(baseCost) across all regions

For each deployment d:
  baselineHourlyCostUsd_d = maxBaseCost * replicas_d

Aggregated:
  baselineCostUsd = SUM(baselineHourlyCostUsd_d)
  totalCostUsd    = SUM(actualEstimatedHourlyCostUsd_d)
  
  savingsUsd = baselineCostUsd - totalCostUsd
  savingsInr = savingsUsd * FX

This shows how much you save vs. always picking the most expensive region.`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* D. APIs Used */}
        <section id="apis" className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center text-primary-foreground text-sm font-bold">
              D
            </span>
            APIs Used
          </h2>

          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-foreground">
                  <Zap className="w-4 h-4 text-primary" />
                  Electricity Maps API
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>
                  <strong className="text-foreground">Endpoint:</strong>{" "}
                  <code className="text-primary">GET /v3/carbon-intensity/latest?zone=ZONE_ID</code>
                </p>
                <p>
                  <strong className="text-foreground">Authentication:</strong>{" "}
                  <code className="text-primary">auth-token</code> header
                </p>
                <p>
                  <strong className="text-foreground">Response field used:</strong>{" "}
                  <code className="text-primary">carbonIntensity</code> (gCO2eq/kWh)
                </p>
                <p>
                  Zone IDs map to cloud regions (e.g., GB for London, DE for Frankfurt, US-CAL-CISO for California).
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-foreground">
                  <Code className="w-4 h-4 text-primary" />
                  Internal Backend APIs
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-4">
                <div>
                  <p className="font-medium text-foreground mb-1">POST /api/plan</p>
                  <p className="mb-2">
                    Request:{" "}
                    <code className="text-primary">{`{ components, userRegion, latencyTolerance, optimizationPreference }`}</code>
                  </p>
                  <p>
                    Response:{" "}
                    <code className="text-primary">{`{ inputEcho, electricityMaps: { enabled }, plans: [{ id, label, scores, carbonIntensity, civo, kubernetesYaml, notes }] }`}</code>
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">POST /api/deploy</p>
                  <p className="mb-2">
                    Request:{" "}
                    <code className="text-primary">{`{ planId, region, regionLabel, carbonIntensity, replicas, scores, kubernetesYaml }`}</code>
                  </p>
                  <p>
                    Response:{" "}
                    <code className="text-primary">{`{ status, message, command, kubectl?, analytics: { timestamp, estimatedHourlyEnergyKwh, estimatedHourlyCO2Kg } }`}</code>
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">GET /api/analytics</p>
                  <p>
                    Response:{" "}
                    <code className="text-primary">{`{ summary, byPlan[], byRegion[], deployments[], currency: { usdToInr } }`}</code>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* E. Deployment Flow */}
        <section id="deployment-flow" className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center text-primary-foreground text-sm font-bold">
              E
            </span>
            Deployment Flow
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 border border-border">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <p className="font-medium text-foreground">User designs components + preferences in UI</p>
                <p className="text-sm text-muted-foreground">
                  Add microservices, databases, queues. Select region, latency tolerance, and optimization preference.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 border border-border">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <p className="font-medium text-foreground">Frontend calls POST /api/plan</p>
                <p className="text-sm text-muted-foreground">Sends component list and user preferences to backend.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 border border-border">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <p className="font-medium text-foreground">Backend computes strategies</p>
                <p className="text-sm text-muted-foreground">
                  Fetches live carbon intensity from Electricity Maps, calculates scores for each region/strategy
                  combination, generates Kubernetes YAML.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 border border-border">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                4
              </div>
              <div>
                <p className="font-medium text-foreground">Frontend displays plans</p>
                <p className="text-sm text-muted-foreground">
                  Shows plan cards with scores, carbon intensity, CIVO details, and generated YAML.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 border border-border">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                5
              </div>
              <div>
                <p className="font-medium text-foreground">User clicks "Deploy" on chosen plan</p>
                <p className="text-sm text-muted-foreground">
                  Frontend calls POST /api/deploy with plan data and YAML.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 border border-border">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                6
              </div>
              <div>
                <p className="font-medium text-foreground">Backend records analytics + optionally applies YAML</p>
                <p className="text-sm text-muted-foreground">
                  Calculates energy/CO2/cost estimates, logs to analytics store. If{" "}
                  <code className="text-primary">ENABLE_CIVO_DEPLOY=true</code>, writes YAML to temp file and runs{" "}
                  <code className="text-primary">kubectl apply -f ...</code>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 border border-border">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                7
              </div>
              <div>
                <p className="font-medium text-foreground">Analytics dashboard shows impact</p>
                <p className="text-sm text-muted-foreground">
                  User views /analytics to see CO2, cost, and savings charts over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* F. Assumptions & Limitations */}
        <section id="assumptions" className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center text-primary-foreground text-sm font-bold">
              F
            </span>
            Assumptions & Limitations
          </h2>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  The estimates provided by GreenOps are intended for{" "}
                  <strong className="text-foreground">planning and comparison purposes</strong>, not exact billing or
                  carbon accounting.
                </p>
              </div>

              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Cost estimates</strong> are approximate and based on modeled
                    baseCost per region. Actual cloud billing may differ based on instance types, network, storage, and
                    other factors.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">CO2 estimates</strong> depend on Electricity Maps data
                    availability and a static assumption of ~0.1 kW per replica. Real power consumption varies by
                    workload.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Carbon intensity</strong> reflects grid-level data, not the
                    specific energy mix of the data center provider.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Latency scores</strong> are modeled approximations based on
                    geographic proximity, not actual network measurements.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Currency conversion</strong> uses a static FX rate (default 85
                    INR/USD) that may not reflect current exchange rates.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Back to Studio CTA */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-muted-foreground mb-4">Ready to optimize your deployments?</p>
          <Link href="/studio">
            <Button size="lg" className="gradient-green text-primary-foreground">
              <Rocket className="w-5 h-5 mr-2" />
              Launch Planner
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
