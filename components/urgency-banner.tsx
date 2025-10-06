"use client"

import { X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-accent text-accent-foreground py-3 px-4 text-center relative">
      <div className="flex items-center justify-center gap-2 text-sm font-medium">
        <span>🚀</span>
        <span>Limited Time: Get 50% off your first year - Offer ends in 3 days!</span>
        <Button variant="ghost" size="sm" className="text-accent-foreground hover:bg-accent-foreground/10 ml-4">
          Claim Offer
        </Button>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-accent-foreground hover:bg-accent-foreground/10"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
