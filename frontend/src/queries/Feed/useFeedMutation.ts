import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';
import { postFeed } from '@/apis/feed';
import { FEED_KEYS } from '../queryKeys';

const useFeedMutation = () => {
  const navigate = useNavigate();

  const { mutateAsync: addFeedMutation } = useMutation({
    mutationFn: postFeed,
    onSuccess: (_, { treeId }) => {
      queryClient.invalidateQueries({ queryKey: [FEED_KEYS.FEEDS] });
      navigate(`/map?modal=feeds&treeId=${treeId}`);
    },
  });

  return { addFeedMutation };
};

export default useFeedMutation;
