import { useQuery } from '@tanstack/react-query';
import { getFeeds } from '@/apis/feed';
import { FEED_KEYS } from '@/hooks/queryKeys';

const useFeeds = () => {
  const { data, ...rest } = useQuery({
    queryKey: [FEED_KEYS.FEEDS],
    queryFn: () => getFeeds(),
  });

  return { feeds: data ?? [], ...rest };
};

export default useFeeds;
