import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';
import { postFeed } from '@/apis/feed';
import { FEED_KEYS } from '../queryKeys';

const useFeedMutation = () => {
  const { mutate: addFeedMutation } = useMutation({
    mutationFn: postFeed,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [FEED_KEYS.FEEDS] }),
  });

  return { addFeedMutation };
};

export default useFeedMutation;
