import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Market data hook with optimized caching
export function useMarketData() {
  return useQuery({
    queryKey: ['marketData'],
    queryFn: async () => {
      const response = await fetch('/api/market/data');
      if (!response.ok) throw new Error('Failed to fetch market data');
      return response.json();
    },
    staleTime: 30 * 1000, // 30 seconds for real-time data
    refetchInterval: 60 * 1000, // Auto-refetch every minute
  });
}

// Portfolio data with longer cache
export function usePortfolio() {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const response = await fetch('/api/portfolio');
      if (!response.ok) throw new Error('Failed to fetch portfolio');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Crypto data hook
export function useCryptoData(symbol?: string) {
  return useQuery({
    queryKey: ['crypto', symbol],
    queryFn: async () => {
      const url = symbol ? `/api/crypto/${symbol}` : '/api/crypto';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch crypto data');
      return response.json();
    },
    enabled: !!symbol || symbol === undefined,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });
}

// Predictions hook
export function usePredictions() {
  return useQuery({
    queryKey: ['predictions'],
    queryFn: async () => {
      const response = await fetch('/api/predictions');
      if (!response.ok) throw new Error('Failed to fetch predictions');
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Mutation for updating portfolio
export function useUpdatePortfolio() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update portfolio');
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
}
