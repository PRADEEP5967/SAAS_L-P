"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DashboardService } from "@/lib/services/dashboard";
import type { DashboardMetrics, MetricsFilter } from "@/lib/types/dashboard";
import { isMetricPeriod, isMetricType, validateMetricsFilter } from "@/lib/types/metrics";
import { getNextPeriod } from "@/lib/utils/period";

const METRICS_CACHE_KEY = 'dashboard-metrics';

export function useDashboardMetrics(filter: MetricsFilter) {
  const queryClient = useQueryClient();
  const validFilter = validateMetricsFilter(filter);
  const queryKey = [METRICS_CACHE_KEY, validFilter];

  const {
    data: metrics,
    isLoading,
    error,
    refetch,
  } = useQuery<DashboardMetrics>({
    queryKey,
    queryFn: () => DashboardService.getMetrics(validFilter),
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep unused data for 5 minutes
    select: (data) => ({
      ...data,
      overview: {
        ...data.overview,
        activeUsersPercentage: (data.overview.activeUsers / data.overview.totalUsers) * 100,
      },
      usage: {
        ...data.usage,
        remainingCapacity: data.usage.limit - data.usage.current,
      },
      performance: {
        ...data.performance,
        healthScore: calculateHealthScore(data.performance),
      },
      engagement: {
        ...data.engagement,
        engagementScore: calculateEngagementScore(data.engagement),
      },
    }),
  });

  // Prefetch next period's data when current data is available
  useEffect(() => {
    if (metrics) {
      const nextPeriod = getNextPeriod(validFilter.period);
      if (nextPeriod) {
        const nextFilter = { ...validFilter, period: nextPeriod };
        queryClient.prefetchQuery({
          queryKey: [METRICS_CACHE_KEY, nextFilter],
          queryFn: () => DashboardService.getMetrics(nextFilter),
        });
      }
    }
  }, [metrics, validFilter, queryClient]);

  return {
    metrics,
    isLoading,
    error,
    refetch,
  };
}

function calculateHealthScore(performance: DashboardMetrics['performance']) {
  const uptimeScore = performance.uptime * 0.4;
  const errorScore = (1 - performance.errorRate) * 0.3;
  const latencyScore = (1 - performance.apiLatency / 1000) * 0.3;
  return Math.min(100, Math.max(0, (uptimeScore + errorScore + latencyScore) * 100));
}

function calculateEngagementScore(engagement: DashboardMetrics['engagement']) {
  const retentionScore = engagement.retentionRate * 0.4;
  const activeUsersScore = (engagement.dailyActiveUsers / engagement.monthlyActiveUsers) * 0.3;
  const sessionsScore = Math.min(1, engagement.averageSessionsPerUser / 10) * 0.3;
  return Math.min(100, Math.max(0, (retentionScore + activeUsersScore + sessionsScore) * 100));
}