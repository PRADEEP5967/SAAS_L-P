"use client";

import { Card } from "@/components/ui/card";
import { formatMetricValue } from "@/lib/utils/metrics";
import { DashboardMetrics } from "@/lib/types/dashboard";

interface MetricCardProps {
  title: string;
  value: number;
  change?: number;
  format?: "number" | "currency" | "percentage";
  description?: string;
}

export function MetricCard({
  title,
  value,
  change,
  format = "number",
  description,
}: MetricCardProps) {
  return (
    <Card className="p-4">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-2xl font-bold">
        {formatMetricValue(value, format)}
      </div>
      {change != null && (
        <div className={`text-xs ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
          {change > 0 ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%
        </div>
      )}
      {description && (
        <div className="text-xs text-muted-foreground mt-1">{description}</div>
      )}
    </Card>
  );
}

interface MetricChartCardProps {
  title: string;
  data: Array<{ timestamp: string; value: number }>;
  format?: "number" | "currency" | "percentage";
}

export function MetricChartCard({ title, data, format = "number" }: MetricChartCardProps) {
  // Here you would integrate with your preferred charting library
  // For example: Recharts, Chart.js, or D3.js
  return (
    <Card className="p-4">
      <div className="text-sm text-muted-foreground mb-4">{title}</div>
      <div className="h-[200px]">
        {/* Chart would go here */}
        <div className="text-center text-muted-foreground">
          Chart visualization coming soon...
        </div>
      </div>
    </Card>
  );
}

interface HealthScoreCardProps {
  score: number;
  metrics: {
    label: string;
    value: number;
    target: number;
  }[];
}

export function HealthScoreCard({ score, metrics }: HealthScoreCardProps) {
  return (
    <Card className="p-4">
      <div className="text-sm text-muted-foreground">System Health</div>
      <div className="text-3xl font-bold mb-4">
        {score.toFixed(1)}%
      </div>
      <div className="space-y-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="grid grid-cols-2 text-sm">
            <div>{metric.label}</div>
            <div className="text-right">
              {metric.value.toFixed(1)} / {metric.target.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

interface RegionMapCardProps {
  title: string;
  data: Record<string, number>;
  format?: "number" | "currency" | "percentage";
}

export function RegionMapCard({ title, data, format = "number" }: RegionMapCardProps) {
  return (
    <Card className="p-4">
      <div className="text-sm text-muted-foreground mb-4">{title}</div>
      <div className="space-y-2">
        {Object.entries(data)
          .sort(([, a], [, b]) => b - a)
          .map(([region, value]) => (
            <div key={region} className="grid grid-cols-2 text-sm">
              <div>{region}</div>
              <div className="text-right">{formatMetricValue(value, format)}</div>
            </div>
          ))}
      </div>
    </Card>
  );
}