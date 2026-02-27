import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Chat history
export function useChatHistory() {
  return useQuery({
    queryKey: ['chatHistory'],
    queryFn: async () => {
      const response = await fetch('/api/advisor/history');
      if (!response.ok) throw new Error('Failed to fetch chat history');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Send message to AI advisor
export function useSendMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch('/api/advisor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) throw new Error('Failed to send message');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatHistory'] });
    },
  });
}

// Get AI recommendations
export function useAIRecommendations() {
  return useQuery({
    queryKey: ['aiRecommendations'],
    queryFn: async () => {
      const response = await fetch('/api/advisor/recommendations');
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      return response.json();
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Risk analysis
export function useRiskAnalysis() {
  return useQuery({
    queryKey: ['riskAnalysis'],
    queryFn: async () => {
      const response = await fetch('/api/advisor/risk-analysis');
      if (!response.ok) throw new Error('Failed to fetch risk analysis');
      return response.json();
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}
