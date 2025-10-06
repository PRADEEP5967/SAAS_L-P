"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart, ChartConfiguration } from "chart.js/auto";

const monthlyData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: {
    revenue: [3100, 4200, 3800, 5100, 4800, 5800, 6300],
    users: [1200, 1900, 2100, 2400, 2800, 3100, 3400],
  },
};

export function DashboardCharts() {
  const revenueChartRef = useRef<HTMLCanvasElement>(null);
  const usersChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!revenueChartRef.current || !usersChartRef.current) return;

    // Revenue Chart
    const revenueChart = new Chart(revenueChartRef.current, {
      type: "line",
      data: {
        labels: monthlyData.labels,
        datasets: [{
          label: "Revenue",
          data: monthlyData.datasets.revenue,
          borderColor: "rgb(99, 102, 241)",
          tension: 0.4,
          fill: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `$${value}`
            }
          }
        }
      }
    });

    // Users Chart
    const usersChart = new Chart(usersChartRef.current, {
      type: "line",
      data: {
        labels: monthlyData.labels,
        datasets: [{
          label: "Users",
          data: monthlyData.datasets.users,
          borderColor: "rgb(34, 197, 94)",
          tension: 0.4,
          fill: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });

    return () => {
      revenueChart.destroy();
      usersChart.destroy();
    };
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Revenue Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <canvas ref={revenueChartRef} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <canvas ref={usersChartRef} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}