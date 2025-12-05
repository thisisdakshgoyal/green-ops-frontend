"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { checkHealth } from "@/lib/api/client"
import { Button } from "@/components/ui/button"
import { Leaf, Server, Zap, BarChart3, BookOpen } from "lucide-react"

interface HeaderProps {
  electricityMapsEnabled?: boolean | null
  showNavLinks?: boolean
}

export function Header({ electricityMapsEnabled, showNavLinks }: HeaderProps) {
  const [healthStatus, setHealthStatus] = useState<"unknown" | "ok" | "error">("unknown")

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        await checkHealth()
        setHealthStatus("ok")
      } catch {
        setHealthStatus("error")
      }
    }
    checkBackendHealth()
    const interval = setInterval(checkBackendHealth, 30000)
    return () => clearInterval(interval)
  }, [])

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
              <p className="text-xs text-muted-foreground">Click. Deploy. Decarbonize.</p>
            </div>
          </Link>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Multi-Objective Cloud Planner</span>
        </div>

        <div className="flex items-center gap-3">
          {showNavLinks && (
            <>
              <Link href="/docs" className="hidden md:block">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Docs
                </Button>
              </Link>
              <Link href="/analytics" className="hidden md:block">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </Link>
            </>
          )}

          {electricityMapsEnabled !== null && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border">
              <Zap className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Live CO2 data:</span>
              {electricityMapsEnabled ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-xs text-success font-medium">ON</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-xs text-warning font-medium">OFF</span>
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border">
            <Server className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Backend:</span>
            {healthStatus === "unknown" && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                <span className="text-xs text-warning">Checking...</span>
              </span>
            )}
            {healthStatus === "ok" && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span className="text-xs text-success">Healthy</span>
              </span>
            )}
            {healthStatus === "error" && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-destructive" />
                <span className="text-xs text-destructive">Offline</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
