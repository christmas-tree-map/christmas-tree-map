import { useQuery } from '@tanstack/react-query';
import { getFeeds } from '@/apis/feed';

const useFeeds = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['feeds'],
    queryFn: () => getFeeds(),
  });

  return { feeds: data ?? [], ...rest };
};

export default useFeeds;
