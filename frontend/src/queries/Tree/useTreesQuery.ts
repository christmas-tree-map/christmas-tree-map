import { useQuery } from '@tanstack/react-query';
import { getTrees } from '@/apis/tree';
import { TREE_KEYS } from '@/queries/queryKeys';

interface TreesParams {
  latitude: number;
  longitude: number;
  enabled: boolean;
}

const useTreesQuery = ({ latitude, longitude, enabled }: TreesParams) => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [TREE_KEYS.TREES, latitude, longitude],
    queryFn: () => getTrees({ latitude, longitude }),
    enabled,
  });

  return { trees: data ?? [], isSuccess, isLoading };
};

export default useTreesQuery;
