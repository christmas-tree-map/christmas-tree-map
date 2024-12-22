import { useQuery } from '@tanstack/react-query';
import { getTrees } from '@/apis/tree';
import { TREE_KEYS } from '@/queries/queryKeys';

const useTreesQuery = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const { data, isSuccess } = useQuery({
    queryKey: [TREE_KEYS.TREES, latitude, longitude],
    queryFn: () => getTrees({ latitude, longitude }),
  });

  return { trees: data ?? [], isSuccess };
};

export default useTreesQuery;
