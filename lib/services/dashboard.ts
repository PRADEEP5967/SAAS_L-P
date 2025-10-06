import { DashboardMetrics, MetricsFilter } from "@/lib/types/dashboard";
import { getTimeRangeForPeriod } from "@/lib/utils/metrics";
import { http } from "./client";

const ENDPOINTS = {
  dashboard: {
    metrics: "/api/metrics/dashboard",
    analytics: "/api/metrics/analytics",
    export: "/api/metrics/export",
  },
} as const;

export class DashboardService {
  static async getMetrics(filter?: MetricsFilter): Promise<DashboardMetrics> {
    const timeRange = filter?.timeRange || 
      (filter?.period ? getTimeRangeForPeriod(filter.period) : undefined);

    const params = new URLSearchParams({
      ...(timeRange && {
        start: timeRange.start,
        end: timeRange.end,
      }),
      ...(filter?.type && { type: filter.type }),
      ...(filter?.period && { period: filter.period }),
    });

    return http.get<DashboardMetrics>(
      `${ENDPOINTS.dashboard.metrics}?${params.toString()}`
    );
  }

  static async exportMetrics(filter: MetricsFilter): Promise<Blob> {
    const timeRange = filter.timeRange || getTimeRangeForPeriod(filter.period);
    const params = new URLSearchParams({
      start: timeRange.start,
      end: timeRange.end,
      type: filter.type,
      period: filter.period,
    });

    const response = await fetch(
      `${ENDPOINTS.dashboard.export}?${params.toString()}`,
      {
        headers: {
          Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to export metrics');
    }

    return response.blob();
  }
}