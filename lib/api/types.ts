export interface BaseResponse {
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface ErrorResponse extends BaseResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface SuccessResponse<T> extends BaseResponse {
  success: true;
  data: T;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> extends SuccessResponse<T[]> {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// Entity Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected';
  config: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Metrics {
  totalUsers: number;
  activeUsers: number;
  revenue: {
    current: number;
    previous: number;
    growth: number;
  };
  usage: {
    current: number;
    limit: number;
    percentage: number;
  };
}

// Input Types
export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: User['role'];
  status?: User['status'];
}

export interface CreateIntegrationInput {
  name: string;
  type: string;
  config: Record<string, unknown>;
}