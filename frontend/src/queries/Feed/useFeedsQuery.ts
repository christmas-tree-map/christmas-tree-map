import { useQuery } from '@tanstack/react-query';
import { getFeeds } from '@/apis/feed';
import { FEED_KEYS } from '@/queries/queryKeys';

const useFeedsQuery = () => {
  const { data, ...rest } = useQuery({
    queryKey: [FEED_KEYS.FEEDS],
    queryFn: getFeeds
  });

  return { feeds: data ?? [], ...rest };
};

export default useFeedsQuery;
