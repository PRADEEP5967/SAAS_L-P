"use client";

import { useState, useCallback } from "react";
import { ApiError } from "@/lib/api/client";
import { toast } from "@/hooks/use-toast";

interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
}

interface UseFetchOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  initialData?: T | null;
}

export function useFetch<T>({ onSuccess, onError, initialData = null }: UseFetchOptions<T> = {}) {
  const [state, setState] = useState<UseFetchState<T>>({
    data: initialData,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(async (promise: Promise<T>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await promise;
      setState({ data, isLoading: false, error: null });
      onSuccess?.(data);
      return data;
    } catch (err) {
      const error = err instanceof ApiError ? err : new ApiError({
        code: "UNKNOWN_ERROR",
        message: err instanceof Error ? err.message : "An unknown error occurred",
      });

      setState(prev => ({ ...prev, error, isLoading: false }));
      onError?.(error);
      
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });

      return null;
    }
  }, [onSuccess, onError]);

  return {
    ...state,
    execute,
  };
}