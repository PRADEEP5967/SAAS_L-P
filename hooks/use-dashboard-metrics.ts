"use client";

import { useState, useCallback } from "react";
import { useFetch } from "./use-fetch";
import { DashboardService } from "@/lib/services/dashboard";
import type { DashboardMetrics, MetricsFilter } from "@/lib/types/dashboard";

export function useDashboardMetrics() {
  const [filter, setFilter] = useState<MetricsFilter>({
    period: 'day',
    type: 'users',
  });

  const {
    data: metrics,
    isLoading,
    error,
    execute: fetchMetrics,
  } = useFetch<DashboardMetrics>();

  const {
    isLoading: isExporting,
    execute: executeExport,
  } = useFetch<Blob>();

  const refetch = useCallback(async (newFilter?: MetricsFilter) => {
    const currentFilter = newFilter || filter;
    if (newFilter) {
      setFilter(newFilter);
    }
    return fetchMetrics(DashboardService.getMetrics(currentFilter));
  }, [filter, fetchMetrics]);

  const exportMetrics = useCallback(async (exportFilter?: MetricsFilter) => {
    const blob = await executeExport(
      DashboardService.exportMetrics(exportFilter || filter)
    );

    if (blob) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `metrics-export-${new Date().toISOString()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  }, [filter, executeExport]);

  return {
    metrics,
    isLoading,
    isExporting,
    error,
    filter,
    setFilter,
    refetch,
    exportMetrics,
  };
}
