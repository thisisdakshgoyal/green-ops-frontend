"use client"

import type { ComponentDef } from "@/lib/api/client"
import { COMPONENT_TYPES } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Box, Inbox } from "lucide-react"

interface ComponentListProps {
  components: ComponentDef[]
  onRemoveComponent: (index: number) => void
}

export function ComponentList({ components, onRemoveComponent }: ComponentListProps) {
  const getTypeInfo = (type: string) => {
    return COMPONENT_TYPES.find((t) => t.value === type) || { label: type, icon: "📦" }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Box className="w-4 h-4 text-primary" />
          Components ({components.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {components.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
              <Inbox className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No components added yet</p>
            <p className="text-xs text-muted-foreground mt-1">Add your first component above</p>
          </div>
        ) : (
          <ScrollArea className="max-h-[280px]">
            <div className="space-y-2">
              {components.map((component, index) => {
                const typeInfo = getTypeInfo(component.type)
                return (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-all duration-200 hover:scale-[1.01]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md gradient-green-subtle flex items-center justify-center text-sm">
                        {typeInfo.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{component.name}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {typeInfo.label}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => onRemoveComponent(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
