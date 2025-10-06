"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

const data = [
  { day: "Mon", signups: 120, mrr: 2.1 },
  { day: "Tue", signups: 180, mrr: 2.4 },
  { day: "Wed", signups: 160, mrr: 2.6 },
  { day: "Thu", signups: 220, mrr: 2.9 },
  { day: "Fri", signups: 260, mrr: 3.2 },
  { day: "Sat", signups: 240, mrr: 3.3 },
  { day: "Sun", signups: 280, mrr: 3.6 },
]

export function AnalyticsDashboardSection() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map(item => item.day),
        datasets: [
          {
            label: "Signups",
            data: data.map(item => item.signups),
            borderColor: "hsl(var(--chart-1))",
            tension: 0.4,
            yAxisID: "y",
          },
          {
            label: "MRR (M)",
            data: data.map(item => item.mrr),
            borderColor: "hsl(var(--chart-2))",
            tension: 0.4,
            yAxisID: "y1",
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "hsl(var(--foreground))",
            }
          }
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            grid: {
              color: "hsl(var(--border))",
            },
            ticks: {
              color: "hsl(var(--foreground))",
            }
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              color: "hsl(var(--foreground))",
            }
          },
          x: {
            grid: {
              color: "hsl(var(--border))",
            },
            ticks: {
              color: "hsl(var(--foreground))",
            }
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <section aria-labelledby="analytics" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h2 id="analytics" className="text-3xl md:text-4xl font-semibold text-balance">
            Live Analytics Dashboard
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            Track growth, conversion, and retention at a glance. Real-time charts, cohort analysis, and data export.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>MRR</CardDescription>
              <CardTitle className="text-2xl">$128,400</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">+12.4% MoM</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Active users</CardDescription>
              <CardTitle className="text-2xl">24,903</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">+1,203 last 7 days</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Conversion</CardDescription>
              <CardTitle className="text-2xl">7.3%</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">Steady performance</CardContent>
          </Card>
        </div>

          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Signups and MRR (7 days)</CardTitle>
              <CardDescription>Real-time metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <canvas ref={chartRef} />
              </div>
            </CardContent>
          </Card>        <div className="mt-8">
          <Button className="px-6">Open dashboard</Button>
        </div>
      </div>
    </section>
  )
}
