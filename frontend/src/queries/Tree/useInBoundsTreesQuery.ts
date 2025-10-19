import { useQuery } from '@tanstack/react-query';
import { getInBoundsTrees } from '@/apis/tree';
import { TREE_KEYS } from '@/queries/queryKeys';

interface InBoundsTreesParams {
  latitude: number;
  longitude: number;
  tr_latitude: number;
  tr_longitude: number;
  bl_latitude: number;
  bl_longitude: number;
  enabled?: boolean;
}

const useInBoundsTreesQuery = ({
  latitude,
  longitude,
  tr_latitude,
  tr_longitude,
  bl_latitude,
  bl_longitude,
  enabled = true,
}: InBoundsTreesParams) => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [TREE_KEYS.TREES, latitude, longitude],
    queryFn: () => getInBoundsTrees({ latitude, longitude, tr_latitude, tr_longitude, bl_latitude, bl_longitude }),
    enabled,
  });

  return { trees: data ?? [], isSuccess, isLoading };
};

export default useInBoundsTreesQuery;
