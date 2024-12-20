import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';
import { postFeed, postLikeFeed } from '@/apis/feed';
import { FEED_KEYS } from '../queryKeys';

const useFeedMutation = () => {
  const navigate = useNavigate();

  const { mutateAsync: addFeedMutation } = useMutation({
    mutationFn: postFeed,
    onSuccess: (_, { treeId }) => {
      queryClient.invalidateQueries({ queryKey: [FEED_KEYS.FEEDS, { treeId }] });
      navigate(`/?modal=feeds&treeId=${treeId}`);
    },
  });

  const { mutate: addLikeFeedMutation } = useMutation({
    mutationFn: postLikeFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FEED_KEYS.FEEDS] });
    },
  });

  return { addFeedMutation, addLikeFeedMutation };
};

export default useFeedMutation;
