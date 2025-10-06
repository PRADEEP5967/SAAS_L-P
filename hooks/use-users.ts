"use client";

import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { User, UpdateUserInput, PaginatedResponse, PaginationParams } from "@/lib/api/types";

const USERS_CACHE_KEY = "users";

export function useUsers(params?: PaginationParams) {
  const queryClient = useQueryClient();

  const { 
    data: usersData,
    isLoading,
    error
  } = useQuery<PaginatedResponse<User>>({
    queryKey: [USERS_CACHE_KEY, params],
    queryFn: () => api.users.list(params),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserInput }) => 
      api.users.update(id, data),
    onSuccess: (updatedUser, { id }) => {
      queryClient.setQueryData<PaginatedResponse<User>>([USERS_CACHE_KEY, params], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((user) => user.id === id ? updatedUser : user),
        };
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.users.delete(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<PaginatedResponse<User>>([USERS_CACHE_KEY, params], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((user) => user.id !== id),
        };
      });
    }
  });

  const updateUser = useCallback((id: string, data: UpdateUserInput) => {
    return updateMutation.mutateAsync({ id, data });
  }, [updateMutation]);

  const deleteUser = useCallback((id: string) => {
    return deleteMutation.mutateAsync(id);
  }, [deleteMutation]);

  const fetchUsers = useCallback((newParams?: PaginationParams) => {
    return queryClient.fetchQuery({
      queryKey: [USERS_CACHE_KEY, newParams],
      queryFn: () => api.users.list(newParams)
    });
  }, [queryClient]);

  return {
    users: usersData?.data ?? [],
    pagination: usersData?.pagination,
    isLoading,
    error,
    fetchUsers,
    updateUser,
    deleteUser,
  };
}