import { MetricPeriod, TimeRange, DashboardMetrics } from "@/lib/types/dashboard";

export function calculateHealthScore(performance: DashboardMetrics['performance']) {
  const uptimeScore = (performance.uptime / 100) * 0.4;
  const errorScore = (1 - performance.errorRate) * 0.3;
  const latencyScore = Math.max(0, 1 - (performance.responseTime.p90 / 1000)) * 0.3;
  return Math.min(100, Math.max(0, (uptimeScore + errorScore + latencyScore) * 100));
}

export function calculateEngagementScore(engagement: DashboardMetrics['engagement']) {
  const retentionScore = engagement.retentionRate * 0.4;
  const activeUsersScore = (engagement.dailyActiveUsers / engagement.monthlyActiveUsers) * 0.3;
  const sessionsScore = Math.min(1, engagement.averageSessionsPerUser / 10) * 0.3;
  return Math.min(100, Math.max(0, (retentionScore + activeUsersScore + sessionsScore) * 100));
}

export function formatMetricValue(value: number, type: string): string {
  switch (type) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    
    case 'percentage':
      return `${value.toFixed(1)}%`;
    
    case 'number':
      return new Intl.NumberFormat('en-US', {
        notation: value >= 1000000 ? 'compact' : 'standard',
        maximumFractionDigits: 1,
      }).format(value);
    
    default:
      return value.toString();
  }
}

export function calculateGrowth(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function getTimeRangeForPeriod(period: MetricPeriod): TimeRange {
  const now = new Date();
  let start = new Date();

  switch (period) {
    case 'hour':
      start.setHours(now.getHours() - 1);
      break;
    case 'day':
      start.setDate(now.getDate() - 1);
      break;
    case 'week':
      start.setDate(now.getDate() - 7);
      break;
    case 'month':
      start.setMonth(now.getMonth() - 1);
      break;
    case 'year':
      start.setFullYear(now.getFullYear() - 1);
      break;
  }

  return {
    start: start.toISOString(),
    end: now.toISOString(),
  };
}

export function aggregateMetrics<T extends { timestamp: string; value: number }>(
  data: T[],
  period: MetricPeriod
): T[] {
  if (!data.length) return [];

  const groupedData = new Map<string, T[]>();
  
  data.forEach(point => {
    const date = new Date(point.timestamp);
    let key: string;

    switch (period) {
      case 'hour':
        key = date.toISOString().slice(0, 13); // Group by hour
        break;
      case 'day':
        key = date.toISOString().slice(0, 10); // Group by day
        break;
      case 'week':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().slice(0, 10);
        break;
      case 'month':
        key = date.toISOString().slice(0, 7); // Group by month
        break;
      default:
        key = date.toISOString().slice(0, 10);
    }

    if (!groupedData.has(key)) {
      groupedData.set(key, []);
    }
    groupedData.get(key)!.push(point);
  });

  return Array.from(groupedData.values()).map(group => ({
    ...group[0],
    value: group.reduce((sum, point) => sum + point.value, 0) / group.length,
  }));
}