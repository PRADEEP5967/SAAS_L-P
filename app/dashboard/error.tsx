"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-block p-4 bg-destructive/10 rounded-full">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          An error occurred while loading the dashboard. Please try again or contact support if the problem persists.
        </p>
        <Button
          onClick={reset}
          variant="outline"
          className="mt-4"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}