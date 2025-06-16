import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';
import { deleteFeed, deleteLikeFeed, postFeed, postFeedPassword, postLikeFeed, updateFeed } from '@/apis/feed';
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
    onSuccess: (feedId, { treeId }) => {
      queryClient.invalidateQueries({ queryKey: [FEED_KEYS.FEEDS, { treeId }] });
      queryClient.invalidateQueries({ queryKey: [FEED_KEYS.FEED, { feedId }] });
      navigate(`/map/${treeId}?modal=feeds`);
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
    onSuccess: (treeId) => {
      queryClient.invalidateQueries({ queryKey: [FEED_KEYS.FEEDS, { treeId }] });
    },
  });

  const { mutate: postFeedPasswordMutation } = useMutation({
    mutationFn: postFeedPassword,
  });

  const { mutate: deleteFeedMutation } = useMutation({
    mutationFn: deleteFeed,
    onSuccess: (treeId) => {
      queryClient.invalidateQueries({ queryKey: [FEED_KEYS.FEEDS, { treeId }] });
    },
  });

  return {
    addFeedMutation,
    updateFeedMutation,
    addLikeFeedMutation,
    deleteLikeFeedMutation,
    postFeedPasswordMutation,
    deleteFeedMutation,
  };
};

export default useFeedMutation;
