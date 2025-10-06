"use client";

import { Card } from "@/components/ui/card";

export function MetricsLoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-4 space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
            <div className="h-8 bg-muted animate-pulse rounded" />
            <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="p-4 space-y-4">
            <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
            <div className="h-[200px] bg-muted animate-pulse rounded" />
          </Card>
        ))}
      </div>
    </div>
  );
}

export function CardLoadingState() {
  return (
    <Card className="p-4 space-y-3">
      <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
      <div className="h-8 bg-muted animate-pulse rounded" />
      <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
    </Card>
  );
}