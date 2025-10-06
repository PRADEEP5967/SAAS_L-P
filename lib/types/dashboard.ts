export interface DashboardMetrics {
  overview: {
    totalUsers: number;
    activeUsers: number;
    totalRevenue: number;
    monthlyGrowth: number;
    newUsersToday: number;
    averageSessionTime: number;
  };
  usage: {
    current: number;
    limit: number;
    percentage: number;
    peakUsage: number;
    averageUsage: number;
    usageByRegion: Record<string, number>;
  };
  performance: {
    apiLatency: number;
    uptime: number;
    errors: number;
    errorRate: number;
    responseTime: {
      p50: number;
      p90: number;
      p99: number;
    };
    systemLoad: {
      cpu: number;
      memory: number;
      disk: number;
    };
  };
  engagement: {
    dailyActiveUsers: number;
    monthlyActiveUsers: number;
    averageSessionsPerUser: number;
    retentionRate: number;
    churnRate: number;
  };
  revenue: {
    mrr: number;
    arr: number;
    customerLifetimeValue: number;
    revenueByPlan: Record<string, number>;
    subscriptionGrowth: number;
  };
  trends: {
    daily: MetricPoint[];
    weekly: MetricPoint[];
    monthly: MetricPoint[];
    quarterly: MetricPoint[];
  };
}

export interface MetricPoint {
  timestamp: string;
  value: number;
}

export interface TimeRange {
  start: string;
  end: string;
}

export type MetricPeriod = 'hour' | 'day' | 'week' | 'month' | 'year';
export type MetricType = 'users' | 'revenue' | 'usage' | 'performance';

export interface MetricsFilter {
  period: MetricPeriod;
  type: MetricType;
  timeRange?: TimeRange;
}