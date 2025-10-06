export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  version: "v1",
  timeout: 10000, // 10 seconds
} as const;

export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  users: {
    list: "/users",
    detail: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },
  metrics: {
    dashboard: "/metrics/dashboard",
    analytics: "/metrics/analytics",
  },
  integrations: {
    list: "/integrations",
    connect: (id: string) => `/integrations/${id}/connect`,
    disconnect: (id: string) => `/integrations/${id}/disconnect`,
  },
} as const;