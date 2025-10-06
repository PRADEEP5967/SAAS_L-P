"use client";

import { useEffect } from "react";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { formatMetricValue } from "@/lib/utils/metrics";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricPeriod, MetricType } from "@/lib/types/dashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DashboardMetrics() {
  const {
    metrics,
    isLoading,
    isExporting,
    error,
    filter,
    setFilter,
    refetch,
    exportMetrics,
  } = useDashboardMetrics();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-destructive">Error: {error.message}</div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select
            value={filter.period}
            onValueChange={(value: string) => 
              setFilter({ ...filter, period: value as MetricPeriod })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hour">Last Hour</SelectItem>
              <SelectItem value="day">Last Day</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filter.type}
            onValueChange={(value: string) => 
              setFilter({ ...filter, type: value as MetricType })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="users">Users</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="usage">Usage</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            Refresh
          </Button>
          <Button
            variant="secondary"
            onClick={() => exportMetrics()}
            disabled={isExporting}
          >
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Users</div>
          <div className="text-2xl font-bold">
            {isLoading ? (
              "Loading..."
            ) : (
              formatMetricValue(metrics?.overview.totalUsers || 0, "number")
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {metrics?.overview.monthlyGrowth && (
              <span className={metrics.overview.monthlyGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                {formatMetricValue(metrics.overview.monthlyGrowth, "percentage")}
              </span>
            )}
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Active Users</div>
          <div className="text-2xl font-bold">
            {isLoading ? (
              "Loading..."
            ) : (
              formatMetricValue(metrics?.overview.activeUsers || 0, "number")
            )}
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Revenue</div>
          <div className="text-2xl font-bold">
            {isLoading ? (
              "Loading..."
            ) : (
              formatMetricValue(metrics?.overview.totalRevenue || 0, "currency")
            )}
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-muted-foreground">System Performance</div>
          <div className="text-2xl font-bold">
            {isLoading ? (
              "Loading..."
            ) : (
              `${formatMetricValue(metrics?.performance.uptime || 0, "percentage")}`
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Uptime
          </div>
        </Card>
      </div>
    </div>
  );
}