import { http } from "./client";
import { ENDPOINTS } from "./config";
import type {
  User,
  UpdateUserInput,
  Integration,
  CreateIntegrationInput,
  Metrics,
  PaginatedResponse,
  PaginationParams,
} from "./types";

export const api = {
  users: {
    list: (params?: PaginationParams) => {
      const query = params ? new URLSearchParams(params as Record<string, string>) : new URLSearchParams();
      return http.get<PaginatedResponse<User>>(`${ENDPOINTS.users.list}?${query.toString()}`);
    },

    getById: (id: string) =>
      http.get<User>(ENDPOINTS.users.detail(id)),

    update: (id: string, data: UpdateUserInput) =>
      http.patch<User>(ENDPOINTS.users.update(id), data),

    delete: (id: string) =>
      http.delete(ENDPOINTS.users.delete(id)),
  },

  integrations: {
    list: () =>
      http.get<Integration[]>(ENDPOINTS.integrations.list),

    create: (data: CreateIntegrationInput) =>
      http.post<Integration>(ENDPOINTS.integrations.list, data),

    connect: (id: string) =>
      http.post(ENDPOINTS.integrations.connect(id)),

    disconnect: (id: string) =>
      http.post(ENDPOINTS.integrations.disconnect(id)),
  },

  metrics: {
    getDashboard: (filter?: { period?: string; type?: string; startDate?: string; endDate?: string }) => {
      const params = filter ? new URLSearchParams(filter as Record<string, string>) : new URLSearchParams();
      return http.get<Metrics>(`${ENDPOINTS.metrics.dashboard}?${params.toString()}`);
    },

    getAnalytics: (startDate: string, endDate: string) => {
      const params = new URLSearchParams({ startDate, endDate });
      return http.get<Metrics>(`${ENDPOINTS.metrics.analytics}?${params.toString()}`);
    },
  },
} as const;