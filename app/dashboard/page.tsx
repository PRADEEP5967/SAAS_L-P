"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import dynamic from "next/dynamic";
import { useAuth } from "@/lib/auth";

// Dynamically import components to avoid SSR issues with charts and D3
const DashboardMetrics = dynamic(() => import("@/app/dashboard/components/metrics").then(mod => ({ default: mod.DashboardMetrics })), {
  loading: () => <div className="h-[200px] animate-pulse bg-muted rounded-lg" />,
  ssr: false
});

const DashboardCharts = dynamic(() => import("@/app/dashboard/components/charts").then(mod => ({ default: mod.DashboardCharts })), {
  loading: () => <div className="h-[400px] animate-pulse bg-muted rounded-lg" />,
  ssr: false
});

const DashboardMap = dynamic(() => import("@/app/dashboard/components/map").then(mod => ({ default: mod.DashboardMap })), {
  loading: () => <div className="h-[400px] animate-pulse bg-muted rounded-lg" />,
  ssr: false
});

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-[200px] animate-pulse bg-muted rounded-lg w-[200px]" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Real-time insights into your business performance
          </p>
        </div>

        <div className="space-y-8">
          <Suspense 
            fallback={<div className="h-[200px] animate-pulse bg-muted rounded-lg" />}
          >
            <section>
              <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
              <DashboardMetrics />
            </section>
          </Suspense>

          <Suspense 
            fallback={<div className="h-[400px] animate-pulse bg-muted rounded-lg" />}
          >
            <section>
              <h2 className="text-xl font-semibold mb-4">Performance Trends</h2>
              <DashboardCharts />
            </section>
          </Suspense>

          <Suspense 
            fallback={<div className="h-[400px] animate-pulse bg-muted rounded-lg" />}
          >
            <section>
              <h2 className="text-xl font-semibold mb-4">Geographic Distribution</h2>
              <DashboardMap />
            </section>
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}