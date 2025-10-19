import { useQuery } from '@tanstack/react-query';
import { getNearTrees } from '@/apis/tree';
import { TREE_KEYS } from '../queryKeys';

interface NearTreesParam {
  latitude: number;
  longitude: number;
}

const useNearTreesQuery = ({ latitude, longitude }: NearTreesParam) => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [TREE_KEYS.TREES, latitude, longitude],
    queryFn: () => getNearTrees({ latitude, longitude }),
  });

  return { trees: data ?? [], isSuccess, isLoading };
};

export default useNearTreesQuery;
