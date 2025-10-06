import { NextResponse } from "next/server";
import { DashboardMetrics, MetricPeriod, MetricType } from "@/lib/types/dashboard";
import { getTimeRangeForPeriod } from "@/lib/utils/metrics";

// Simulated data store - replace with your actual database
const mockData = {
  users: {
    total: 12500,
    active: 8750,
    growth: 15.3,
  },
  revenue: {
    total: 850000,
    monthly: 75000,
    growth: 22.5,
  },
  performance: {
    uptime: 99.98,
    latency: 45, // ms
    errors: 12,
  }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = (searchParams.get("period") as MetricPeriod) || "day";
    const type = (searchParams.get("type") as MetricType) || "users";
    
    // Get time range based on period
    const timeRange = getTimeRangeForPeriod(period);
    
    // Simulate fetching data for the time range
    const metrics: DashboardMetrics = {
      overview: {
        totalUsers: mockData.users.total,
        activeUsers: mockData.users.active,
        totalRevenue: mockData.revenue.total,
        monthlyGrowth: mockData.users.growth,
        newUsersToday: Math.round(mockData.users.total * 0.01), // 1% of total users
        averageSessionTime: 1800, // 30 minutes in seconds
      },
      engagement: {
        dailyActiveUsers: 4500,
        monthlyActiveUsers: 8750,
        retentionRate: 0.85,
        averageSessionsPerUser: 5.2,
        churnRate: 0.03,
      },
      revenue: {
        mrr: mockData.revenue.monthly,
        arr: mockData.revenue.monthly * 12,
        customerLifetimeValue: 2500,
        revenueByPlan: {
          basic: mockData.revenue.monthly * 0.3,
          pro: mockData.revenue.monthly * 0.5,
          enterprise: mockData.revenue.monthly * 0.2,
        },
        subscriptionGrowth: mockData.revenue.growth / 100,
      },
      usage: {
        current: 8500,
        limit: 10000,
        percentage: 85,
        peakUsage: 9200,
        averageUsage: 7500,
        usageByRegion: {
          "us-east": 3500,
          "us-west": 2000,
          "eu-west": 2000,
          "ap-south": 1000,
        },
      },
      performance: {
        apiLatency: mockData.performance.latency,
        uptime: mockData.performance.uptime,
        errors: mockData.performance.errors,
        errorRate: mockData.performance.errors / 1000, // errors per 1000 requests
        responseTime: {
          p50: 35,
          p90: 85,
          p99: 150,
        },
        systemLoad: {
          cpu: 45,
          memory: 60,
          disk: 35,
        },
      },
      trends: {
        daily: generateTrendData(30, type),
        weekly: generateTrendData(12, type),
        monthly: generateTrendData(12, type),
        quarterly: generateTrendData(4, type),
      },
    };

    return NextResponse.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Dashboard Metrics Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "DASHBOARD_ERROR",
          message: "Failed to fetch dashboard metrics",
          details: error instanceof Error ? { message: error.message } : undefined,
        },
      },
      { status: 500 }
    );
  }
}

// Helper function to generate trend data
function generateTrendData(points: number, type: MetricType) {
  const now = new Date();
  return Array.from({ length: points }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (points - i));
    
    let baseValue = 0;
    switch (type) {
      case "users":
        baseValue = mockData.users.total / points;
        break;
      case "revenue":
        baseValue = mockData.revenue.monthly / points;
        break;
      case "usage":
        baseValue = 8500 / points;
        break;
      case "performance":
        baseValue = mockData.performance.uptime;
        break;
    }

    return {
      timestamp: date.toISOString(),
      value: baseValue * (0.8 + Math.random() * 0.4), // Add some variation
    };
  });
}