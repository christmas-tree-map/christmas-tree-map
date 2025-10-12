import { useQuery } from '@tanstack/react-query';
import { getAroundTrees } from '@/apis/tree';
import { TREE_KEYS } from '../queryKeys';

interface AroundTreesParam {
  latitude: number;
  longitude: number;
}

const useAroundTreesQuery = ({ latitude, longitude }: AroundTreesParam) => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [TREE_KEYS.TREES, latitude, longitude],
    queryFn: () => getAroundTrees({ latitude, longitude }),
  });

  return { trees: data ?? [], isSuccess, isLoading };
};

export default useAroundTreesQuery;
