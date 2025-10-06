import { DashboardMetrics } from "./dashboard";

export type MetricPeriod = 'hour' | 'day' | 'week' | 'month' | 'year';
export type MetricType = 'users' | 'revenue' | 'usage' | 'performance';

export interface TimeRange {
  start: string;
  end: string;
}

export interface MetricsFilter {
  period: MetricPeriod;
  type: MetricType;
  timeRange?: TimeRange;
}

// Type guard for MetricPeriod
export function isMetricPeriod(value: string): value is MetricPeriod {
  return ['hour', 'day', 'week', 'month', 'year'].includes(value);
}

// Type guard for MetricType
export function isMetricType(value: string): value is MetricType {
  return ['users', 'revenue', 'usage', 'performance'].includes(value);
}

// Validator for MetricsFilter
export function validateMetricsFilter(filter: Partial<MetricsFilter>): MetricsFilter {
  if (!filter.period || !isMetricPeriod(filter.period)) {
    throw new Error('Invalid metric period');
  }
  if (!filter.type || !isMetricType(filter.type)) {
    throw new Error('Invalid metric type');
  }
  return filter as MetricsFilter;
}