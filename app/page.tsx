import type React from "react"
import Link from "next/link"
import { Leaf, Zap, MapPin, BarChart3, Rocket, ArrowRight, Layers, Target, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">GreenOps Studio</h1>
              <p className="text-xs text-muted-foreground">Click. Deploy. Decarbonize.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/docs">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <BookOpen className="w-4 h-4 mr-2" />
                Docs
              </Button>
            </Link>
            <Link href="/analytics">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
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

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary">
            <Zap className="w-4 h-4" />
            Carbon-aware Kubernetes deployments
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance leading-tight">
            GreenOps Studio
            <span className="block text-primary mt-2">Multi-Objective Cloud Deployment</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Optimize your Kubernetes deployments for carbon efficiency, latency, and cost. Powered by live grid carbon
            intensity data and intelligent multi-objective planning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/studio">
              <Button size="lg" className="gradient-green text-primary-foreground px-8 h-12 text-base">
                <Rocket className="w-5 h-5 mr-2" />
                Launch Planner
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/analytics">
              <Button
                size="lg"
                variant="outline"
                className="px-8 h-12 text-base border-border text-foreground hover:bg-secondary bg-transparent"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Carbon Analytics
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-24 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              GreenOps transforms your architecture into an optimization problem and finds the best deployment strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HowItWorksCard
              step={1}
              icon={<Layers className="w-6 h-6" />}
              title="Model Your App"
              description="Describe your microservices, gateways, databases and latency tolerance. GreenOps turns your design into an optimization problem."
            />
            <HowItWorksCard
              step={2}
              icon={<Target className="w-6 h-6" />}
              title="Optimize for CO2, Latency, Cost"
              description="Our planner normalizes CO2, cost, and latency into scores and computes a weighted multi-objective score for each region and strategy."
            />
            <HowItWorksCard
              step={3}
              icon={<Rocket className="w-6 h-6" />}
              title="One-click Deploy to Kubernetes"
              description="GreenOps generates Kubernetes YAML and applies it directly to your Kubernetes cluster via kubectl."
            />
            <HowItWorksCard
              step={4}
              icon={<BarChart3 className="w-6 h-6" />}
              title="Track Carbon & Cost Impact"
              description="Each deployment is recorded with estimated energy, CO2, and cost in INR, so you can compare strategies over time."
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Real-time Carbon Awareness"
            description="Integration with Electricity Maps for live grid carbon intensity data across cloud regions."
          />
          <FeatureCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Multi-Objective Optimization"
            description="Balance CO2 emissions, network latency, and cost with intelligent plan generation."
          />
          <FeatureCard
            icon={<Rocket className="w-6 h-6" />}
            title="One-Click Deployment"
            description="Deploy directly to Kubernetes clusters with generated YAML configurations."
          />
          <FeatureCard
            icon={<MapPin className="w-6 h-6" />}
            title="Carbon Impact Analytics"
            description="Track and visualize the environmental impact of your deployments over time."
          />
        </div>

        <div className="mt-24 max-w-2xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 text-center">
            <BookOpen className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Curious about the math, formulas, and APIs behind GreenOps?
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore our detailed technical documentation covering the optimization algorithms, scoring functions, and
              API integrations.
            </p>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Open Documentation
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

function HowItWorksCard({
  step,
  icon,
  title,
  description,
}: { step: number; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-green flex items-center justify-center text-primary-foreground text-sm font-bold">
        {step}
      </div>
      <div className="w-12 h-12 rounded-lg gradient-green-subtle flex items-center justify-center text-primary mb-4 mt-2">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <div className="w-12 h-12 rounded-lg gradient-green-subtle flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
