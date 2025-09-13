import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/main';
import { Feed } from '@/types/feed.type';
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
    onMutate: ({ feedId, treeId }) => {
      const previousFeeds = queryClient.getQueryData<Feed[]>([FEED_KEYS.FEEDS, { treeId }]);
      queryClient.setQueryData<Feed[]>(
        [FEED_KEYS.FEEDS, { treeId }],
        (oldFeeds?: Feed[]) =>
          oldFeeds?.map((feed) => (feed.id === feedId ? { ...feed, likeCount: feed.likeCount + 1 } : feed)) ?? oldFeeds,
      );
      return { ...previousFeeds };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FEED_KEYS.FEEDS] });
    },
  });

  const { mutate: deleteLikeFeedMutation } = useMutation({
    mutationFn: deleteLikeFeed,
    onMutate: ({ feedId, treeId }) => {
      const previousFeeds = queryClient.getQueryData<Feed[]>([FEED_KEYS.FEEDS, { treeId }]);
      queryClient.setQueryData<Feed[]>(
        [FEED_KEYS.FEEDS, { treeId }],
        (oldFeeds?: Feed[]) =>
          oldFeeds?.map((feed) =>
            feed.id === feedId ? { ...feed, likeCount: Math.max(0, feed.likeCount - 1) } : feed,
          ) ?? oldFeeds,
      );
      return { ...previousFeeds };
    },
    onSuccess: (treeId) => {
      queryClient.invalidateQueries({ queryKey: [FEED_KEYS.FEEDS, { treeId }] });
    },
  });

  const { mutate: postFeedPasswordMutation } = useMutation({
    mutationFn: postFeedPassword,
  });

  const { mutate: deleteFeedMutation } = useMutation({
    mutationFn: deleteFeed,
    onSuccess: ({ treeId }) => {
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
