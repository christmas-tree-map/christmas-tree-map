import { useSuspenseQuery } from '@tanstack/react-query';
import { getFeed } from '@/apis/feed';
import { FEED_KEYS } from '@/queries/queryKeys';

const useFeedQuery = (feedId: string) => {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: [FEED_KEYS.FEED, { feedId }],
    queryFn: () => getFeed(feedId),
  });

  return { feed: data, ...rest };
};

export default useFeedQuery;
