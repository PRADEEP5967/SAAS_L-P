import { API_CONFIG } from "./config";
import { ApiResponse, ErrorResponse } from "./types";

export class ApiError extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly details?: Record<string, unknown>;

  constructor(error: ErrorResponse["error"], status: number = 500) {
    super(error.message);
    this.name = "ApiError";
    this.code = error.code;
    this.status = status;
    this.details = error.details;
  }
}

const defaultHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.error || { code: "UNKNOWN_ERROR", message: "An unknown error occurred" },
      response.status
    );
  }

  if (response.status === 204) {
    return {
      success: true,
      data: undefined as unknown as T,
      timestamp: new Date().toISOString(),
    };
  }

  const data = await response.json();
  return data;
}

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_CONFIG.baseURL}${endpoint}`;
  const timeoutId = setTimeout(() => {
    throw new ApiError({
      code: "TIMEOUT",
      message: "Request timed out",
    });
  }, API_CONFIG.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);
    const result = await handleResponse<T>(response);
    return result.success ? result.data : Promise.reject(result);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError({
      code: "NETWORK_ERROR",
      message: error instanceof Error ? error.message : "Network request failed",
    });
  }
}

export const http = {
  get: <T>(endpoint: string, options?: RequestInit) => 
    apiRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
};