import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';
import { deleteLikeFeed, postFeed, postLikeFeed, updateFeed } from '@/apis/feed';
import { FEED_KEYS } from '../queryKeys';

const useFeedMutation = () => {
  const navigate = useNavigate();

  const { mutateAsync: addFeedMutation } = useMutation({
    mutationFn: postFeed,
    onSuccess: (_, { treeId }) => {
      queryClient.invalidateQueries({ queryKey: [FEED_KEYS.FEEDS, { treeId }] });
      navigate(`/map/${treeId}?modal=feeds`);
    },
  });

  const { mutateAsync: updateFeedMutation } = useMutation({
    mutationFn: updateFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FEED_KEYS.FEEDS] });
      // queryClient.invalidateQueries({ queryKey: [FEED_KEYS.FEEDS, { treeId }] });
      // navigate(`/map/${treeId}?modal=feeds`);
    },
  });

  const { mutate: addLikeFeedMutation } = useMutation({
    mutationFn: postLikeFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FEED_KEYS.FEEDS] });
    },
  });

  const { mutate: deleteLikeFeedMutation } = useMutation({
    mutationFn: deleteLikeFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FEED_KEYS.FEEDS] });
    },
  });

  return { addFeedMutation, updateFeedMutation, addLikeFeedMutation, deleteLikeFeedMutation };
};

export default useFeedMutation;
