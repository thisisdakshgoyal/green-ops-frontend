"use client"

import { useState } from "react"
import type { ComponentDef } from "@/lib/api/client"
import { COMPONENT_TYPES } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, AlertCircle } from "lucide-react"

interface ComponentBuilderProps {
  onAddComponent: (component: ComponentDef) => void
}

export function ComponentBuilder({ onAddComponent }: ComponentBuilderProps) {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [error, setError] = useState("")

  const handleAdd = () => {
    if (!name.trim()) {
      setError("Component name is required")
      return
    }
    if (!type) {
      setError("Please select a component type")
      return
    }
    setError("")
    onAddComponent({ name: name.trim(), type })
    setName("")
    setType("")
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" />
          Add Component
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="component-name" className="text-sm text-muted-foreground">
            Component Name
          </Label>
          <Input
            id="component-name"
            placeholder="e.g., auth-service, payments-db"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-input border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="component-type" className="text-sm text-muted-foreground">
            Component Type
          </Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue placeholder="Select type..." />
            </SelectTrigger>
            <SelectContent>
              {COMPONENT_TYPES.map((ct) => (
                <SelectItem key={ct.value} value={ct.value}>
                  <span className="flex items-center gap-2">
                    <span>{ct.icon}</span>
                    <span>{ct.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
        <Button
          onClick={handleAdd}
          className="w-full gradient-green text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Component
        </Button>
      </CardContent>
    </Card>
  )
}
