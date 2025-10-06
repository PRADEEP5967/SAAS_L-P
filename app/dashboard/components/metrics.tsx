"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Metric = {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
};

const metrics: Metric[] = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
  },
  {
    id: "subscriptions",
    title: "Subscriptions",
    value: "2,350",
    change: "+180",
    trend: "up",
  },
  {
    id: "conversions",
    title: "Conversion Rate",
    value: "3.6%",
    change: "+0.3%",
    trend: "up",
  },
  {
    id: "active-users",
    title: "Active Users",
    value: "1,429",
    change: "-10",
    trend: "down",
  },
];

export function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span 
                className={
                  metric.trend === "up" 
                    ? "text-green-500"
                    : metric.trend === "down"
                    ? "text-red-500"
                    : "text-gray-500"
                }
              >
                {metric.change}
              </span>
              {" "}from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}