import { useQuery } from '@tanstack/react-query';
import { getGiftBoxing, GiftBoxOption } from '@/shared/api/endpoints';

export function useHeroData() {
  return useQuery<GiftBoxOption[]>({
    queryKey: ['gift-boxing-hero'],
    queryFn: getGiftBoxing,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
