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
    onSuccess: (_, { treeId, feedId, content }) => {
      queryClient.setQueryData<Feed[]>([FEED_KEYS.FEEDS, { treeId: Number(treeId) }], (oldFeeds?: Feed[]) =>
        oldFeeds?.map((feed: Feed) => (feed.id === Number(feedId) ? { ...feed, content } : feed) ?? oldFeeds),
      );
      queryClient.setQueryData<Feed>([FEED_KEYS.FEED, { feedId }], (oldFeed?: Feed) =>
        oldFeed ? { ...oldFeed, content } : oldFeed,
      );
      navigate(`/map/${treeId}?modal=feeds`);
    },
  });

  const { mutate: addLikeFeedMutation } = useMutation<
    number,
    Error,
    { feedId: number; treeId: number },
    { previousFeeds?: Feed[] }
  >({
    mutationFn: postLikeFeed,
    onMutate: ({ feedId, treeId }) => {
      const previousFeeds = queryClient.getQueryData<Feed[]>([FEED_KEYS.FEEDS, { treeId }]);
      queryClient.setQueryData<Feed[]>(
        [FEED_KEYS.FEEDS, { treeId }],
        (oldFeeds?: Feed[]) =>
          oldFeeds?.map((feed) => (feed.id === feedId ? { ...feed, likeCount: feed.likeCount + 1 } : feed)) ?? oldFeeds,
      );
      return { previousFeeds };
    },
    onSuccess: (newLikeCount, { feedId, treeId }) => {
      queryClient.setQueryData<Feed[]>([FEED_KEYS.FEEDS, { treeId }], (oldFeeds?: Feed[]) =>
        oldFeeds?.map((feed: Feed) => (feed.id === feedId ? { ...feed, likeCount: newLikeCount } : feed) ?? oldFeeds),
      );
    },
    onError: (_err, { treeId }, context) => {
      if (context?.previousFeeds) {
        queryClient.setQueryData([FEED_KEYS.FEEDS, { treeId }], context.previousFeeds);
      }
    },
  });

  const { mutate: deleteLikeFeedMutation } = useMutation<
    number,
    Error,
    { feedId: number; treeId: number },
    { previousFeeds?: Feed[] }
  >({
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
      return { previousFeeds };
    },
    onSuccess: (newLikeCount, { feedId, treeId }) => {
      queryClient.setQueryData<Feed[]>([FEED_KEYS.FEEDS, { treeId }], (oldFeeds?: Feed[]) =>
        oldFeeds?.map((feed: Feed) => (feed.id === feedId ? { ...feed, likeCount: newLikeCount } : feed) ?? oldFeeds),
      );
    },
    onError: (_err, { treeId }, context) => {
      if (context?.previousFeeds) {
        queryClient.setQueryData([FEED_KEYS.FEEDS, { treeId }], context.previousFeeds);
      }
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
