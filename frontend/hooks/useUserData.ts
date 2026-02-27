import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// User profile hook
export function useUserProfile() {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response = await fetch('/api/user/profile');
      if (!response.ok) throw new Error('Failed to fetch user profile');
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// User transactions
export function useTransactions(limit = 10) {
  return useQuery({
    queryKey: ['transactions', limit],
    queryFn: async () => {
      const response = await fetch(`/api/transactions?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch transactions');
      return response.json();
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// User goals
export function useGoals() {
  return useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      const response = await fetch('/api/goals');
      if (!response.ok) throw new Error('Failed to fetch goals');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Update user profile mutation
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
}

// Create goal mutation
export function useCreateGoal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create goal');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
}
