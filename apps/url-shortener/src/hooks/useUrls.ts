import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import type { CreateUrlRequest, UrlResponse, ListUrlsResponse } from '@/lib/types';

// Query keys
export const urlKeys = {
  all: ['urls'] as const,
  lists: () => [...urlKeys.all, 'list'] as const,
  list: (limit: number, cursor?: string) => [...urlKeys.lists(), { limit, cursor }] as const,
  details: () => [...urlKeys.all, 'detail'] as const,
  detail: (shortCode: string) => [...urlKeys.details(), shortCode] as const,
};

// Get user's URLs
export function useUrls(limit = 10, cursor?: string) {
  return useQuery({
    queryKey: urlKeys.list(limit, cursor),
    queryFn: () => apiClient.getUrls(limit, cursor),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get specific URL
export function useUrl(shortCode: string) {
  return useQuery({
    queryKey: urlKeys.detail(shortCode),
    queryFn: () => apiClient.getUrl(shortCode),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Create URL
export function useCreateUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUrlRequest) => apiClient.createUrl(data),
    onSuccess: (newUrl: UrlResponse) => {
      // Invalidate and refetch URLs list
      queryClient.invalidateQueries({ queryKey: urlKeys.lists() });
      
      // Add the new URL to the cache
      queryClient.setQueryData(urlKeys.detail(newUrl.shortCode), newUrl);
    },
  });
}

// Update URL
export function useUpdateUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      shortCode, 
      data 
    }: { 
      shortCode: string; 
      data: { originalUrl?: string; isActive?: boolean } 
    }) => apiClient.updateUrl(shortCode, data),
    onSuccess: (_, { shortCode }) => {
      // Invalidate the specific URL and the list
      queryClient.invalidateQueries({ queryKey: urlKeys.detail(shortCode) });
      queryClient.invalidateQueries({ queryKey: urlKeys.lists() });
    },
  });
}

// Delete URL
export function useDeleteUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shortCode: string) => apiClient.deleteUrl(shortCode),
    onSuccess: (_, shortCode) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: urlKeys.detail(shortCode) });
      
      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: urlKeys.lists() });
    },
  });
}