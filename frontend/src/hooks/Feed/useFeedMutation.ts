import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';
import { postFeed } from '@/apis/feed';

const useFeedMutation = () => {
  const { mutate: addFeedMutation } = useMutation({
    mutationFn: postFeed,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['feeds'] }),
  });

  return { addFeedMutation };
};

export default useFeedMutation;
