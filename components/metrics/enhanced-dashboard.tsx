"use client";

import { useState } from "react";
import { MetricCard, MetricChartCard, HealthScoreCard, RegionMapCard } from "./cards";
import { DashboardMetrics, MetricsFilter } from "@/lib/types/dashboard";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { calculateHealthScore, calculateEngagementScore } from "@/lib/utils/metrics";

export function EnhancedDashboardMetrics() {
  const [filter, setFilter] = useState<MetricsFilter>({
    period: "day",
    type: "users"
  });

  const { metrics, isLoading, error, refetch } = useDashboardMetrics(filter);

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-destructive">Error loading metrics</div>
      </Card>
    );
  }

  if (!metrics && isLoading) {
    return (
      <Card className="p-6">
        <div>Loading metrics...</div>
      </Card>
    );
  }

  if (!metrics) return null;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select 
            value={filter.period}
            onValueChange={(value) => setFilter({ ...filter, period: value as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hour">Last Hour</SelectItem>
              <SelectItem value="day">Last Day</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => refetch()}>Refresh</Button>
        </div>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Users"
          value={metrics.overview.totalUsers}
          change={metrics.overview.monthlyGrowth}
          format="number"
        />
        <MetricCard
          title="Active Users"
          value={metrics.overview.activeUsers}
          description={`${metrics.overview.activeUsers} active in last 24h`}
          format="number"
        />
        <MetricCard
          title="Total Revenue"
          value={metrics.revenue.mrr}
          change={(metrics.revenue.mrr - metrics.revenue.arr / 12) / (metrics.revenue.arr / 12) * 100}
          format="currency"
        />
        <MetricCard
          title="Customer LTV"
          value={metrics.revenue.customerLifetimeValue}
          format="currency"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MetricChartCard
          title="User Growth"
          data={metrics.trends.daily}
          format="number"
        />
        <MetricChartCard
          title="Revenue Growth"
          data={metrics.trends.daily}
          format="currency"
        />
      </div>

      {/* Health & Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <HealthScoreCard
          score={calculateHealthScore(metrics.performance)}
          metrics={[
            { label: "Uptime", value: metrics.performance.uptime, target: 99.9 },
            { label: "Error Rate", value: metrics.performance.errorRate * 100, target: 1 },
            { label: "Response Time", value: metrics.performance.responseTime.p90, target: 200 },
          ]}
        />
        <RegionMapCard
          title="Usage by Region"
          data={metrics.usage.usageByRegion}
          format="percentage"
        />
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-4">System Load</div>
          <div className="space-y-2">
            <div className="grid grid-cols-2 text-sm">
              <div>CPU Usage</div>
              <div className="text-right">{metrics.performance.systemLoad.cpu}%</div>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div>Memory Usage</div>
              <div className="text-right">{metrics.performance.systemLoad.memory}%</div>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div>Disk Usage</div>
              <div className="text-right">{metrics.performance.systemLoad.disk}%</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Daily Active Users"
          value={metrics.engagement.dailyActiveUsers}
          format="number"
        />
        <MetricCard
          title="Retention Rate"
          value={metrics.engagement.retentionRate * 100}
          format="percentage"
        />
        <MetricCard
          title="Avg. Session Time"
          value={metrics.overview.averageSessionTime / 60}
          description="minutes per session"
          format="number"
        />
        <MetricCard
          title="Churn Rate"
          value={metrics.engagement.churnRate * 100}
          format="percentage"
        />
      </div>
    </div>
  );
}