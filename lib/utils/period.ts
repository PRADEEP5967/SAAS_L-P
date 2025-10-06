import { MetricPeriod } from "@/lib/types/metrics";

export function getNextPeriod(period: MetricPeriod): MetricPeriod | null {
  const periods: MetricPeriod[] = ['hour', 'day', 'week', 'month', 'year'];
  const currentIndex = periods.indexOf(period);
  if (currentIndex < periods.length - 1) {
    return periods[currentIndex + 1];
  }
  return null;
}

export function getPreviousPeriod(period: MetricPeriod): MetricPeriod | null {
  const periods: MetricPeriod[] = ['hour', 'day', 'week', 'month', 'year'];
  const currentIndex = periods.indexOf(period);
  if (currentIndex > 0) {
    return periods[currentIndex - 1];
  }
  return null;
}