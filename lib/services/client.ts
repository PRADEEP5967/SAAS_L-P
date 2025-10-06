import { API_CONFIG } from "@/lib/api/config";
import { ExtendedRequestInit } from "./types";

export const http = {
  get: async <T>(endpoint: string, options: ExtendedRequestInit = {}): Promise<T> => {
    const url = new URL(endpoint, API_CONFIG.baseURL);
    if (options.params) {
      url.search = new URLSearchParams(options.params).toString();
      const { params, ...rest } = options;
      options = rest;
    }
    const response = await fetch(url.toString(), {
      ...options,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if (!response.ok) throw new Error("API request failed");
    return response.json();
  },

  post: async <T>(endpoint: string, data?: unknown, options: RequestInit = {}): Promise<T> => {
    const url = new URL(endpoint, API_CONFIG.baseURL);
    const response = await fetch(url.toString(), {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("API request failed");
    return response.json();
  },

  patch: async <T>(endpoint: string, data?: unknown, options: RequestInit = {}): Promise<T> => {
    const url = new URL(endpoint, API_CONFIG.baseURL);
    const response = await fetch(url.toString(), {
      ...options,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("API request failed");
    return response.json();
  },

  delete: async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const url = new URL(endpoint, API_CONFIG.baseURL);
    const response = await fetch(url.toString(), {
      ...options,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if (!response.ok) throw new Error("API request failed");
    return response.json();
  },
};