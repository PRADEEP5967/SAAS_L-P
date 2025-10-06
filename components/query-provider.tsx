"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30 * 1000, // Data is fresh for 30 seconds
          gcTime: 5 * 60 * 1000, // Keep unused data in cache for 5 minutes
          retry: (failureCount, error) => {
            if (error instanceof Error && error.message.includes('404')) {
              return false;
            }
            return failureCount < 3;
          },
          refetchOnWindowFocus: true,
          refetchOnReconnect: true,
          refetchOnMount: true,
        },
      },
    });

    // Global error handler
    client.setDefaultOptions({
      mutations: {
        onError: (error: unknown) => {
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : "An error occurred",
            variant: "destructive",
          });
        },
      },
    });

    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}