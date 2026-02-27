# TanStack Query Usage Guide

## Overview
This project uses TanStack Query (React Query) for efficient data fetching, caching, and state management.

## Benefits
- ⚡ Automatic caching and background refetching
- 🔄 Optimistic updates
- 📦 Reduced bundle size (no need for Redux/Zustand for server state)
- 🎯 Better performance with smart refetching strategies
- 🛠️ Built-in loading and error states

## Configuration
Query client is configured in `components/providers.tsx` with:
- **staleTime**: 5 minutes (data considered fresh)
- **gcTime**: 10 minutes (cache garbage collection)
- **refetchOnWindowFocus**: false (don't refetch on tab switch)
- **retry**: 1 attempt with exponential backoff

## Available Hooks

### Market Data
```typescript
import { useMarketData, usePortfolio, useCryptoData } from '@/hooks';

// Market indices with 30s cache
const { data, isLoading, error } = useMarketData();

// Portfolio data with 5min cache
const { data: portfolio } = usePortfolio();

// Crypto data with symbol
const { data: btc } = useCryptoData('BTC');
```

### User Data
```typescript
import { useUserProfile, useTransactions, useGoals } from '@/hooks';

const { data: profile } = useUserProfile();
const { data: transactions } = useTransactions(10);
const { data: goals } = useGoals();
```

### AI Advisor
```typescript
import { useChatHistory, useSendMessage, useAIRecommendations } from '@/hooks';

const { data: history } = useChatHistory();
const sendMessage = useSendMessage();
const { data: recommendations } = useAIRecommendations();

// Send message
sendMessage.mutate('What should I invest in?');
```

### Mutations
```typescript
import { useUpdatePortfolio, useCreateGoal } from '@/hooks';

const updatePortfolio = useUpdatePortfolio();
const createGoal = useCreateGoal();

// Update portfolio
updatePortfolio.mutate({ 
  symbol: 'AAPL', 
  quantity: 10 
});

// Create goal
createGoal.mutate({ 
  name: 'Retirement', 
  target: 10000000 
});
```

## Cache Strategies

### Real-time Data (30s-1min)
- Market indices
- Crypto prices
- Live portfolio values

### Medium-term Data (5-10min)
- Portfolio holdings
- User profile
- Transaction history

### Long-term Data (15-30min)
- AI recommendations
- Risk analysis
- Historical data

## Best Practices

1. **Use hooks in components**
```typescript
function Dashboard() {
  const { data, isLoading } = useMarketData();
  
  if (isLoading) return <Spinner />;
  return <div>{data.value}</div>;
}
```

2. **Optimistic updates**
```typescript
const updatePortfolio = useUpdatePortfolio();

updatePortfolio.mutate(newData, {
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['portfolio'] });
    
    // Snapshot previous value
    const previous = queryClient.getQueryData(['portfolio']);
    
    // Optimistically update
    queryClient.setQueryData(['portfolio'], newData);
    
    return { previous };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(['portfolio'], context?.previous);
  },
});
```

3. **Prefetching**
```typescript
const queryClient = useQueryClient();

// Prefetch on hover
<Link 
  onMouseEnter={() => {
    queryClient.prefetchQuery({
      queryKey: ['portfolio'],
      queryFn: fetchPortfolio,
    });
  }}
>
  Portfolio
</Link>
```

## Performance Tips

1. Use `staleTime` appropriately based on data freshness needs
2. Enable `refetchInterval` only for real-time data
3. Use `enabled` option to conditionally fetch
4. Implement pagination with `useInfiniteQuery`
5. Use `select` to transform data and prevent unnecessary re-renders

## DevTools
React Query DevTools are enabled in development mode. Press the floating icon to inspect queries, mutations, and cache.
