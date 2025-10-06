"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play } from "lucide-react"
import { useState } from "react"

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const tabs = [
    { id: "dashboard", label: "Analytics Dashboard", image: "/analytics-dashboard.png" },
    { id: "automation", label: "Workflow Automation", image: "/workflow-automation-interface.png" },
    { id: "collaboration", label: "Team Collaboration", image: "/team-collaboration-tools.png" },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">See SaaSFlow in Action</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Explore our powerful features through interactive demos and real-world examples.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className="px-6 py-3"
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Product Demo */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={tabs.find((tab) => tab.id === activeTab)?.image || "/placeholder.svg"}
                  alt="Product showcase"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="lg" className="bg-white/90 text-black hover:bg-white">
                    <Play className="mr-2 h-5 w-5" />
                    Play Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
