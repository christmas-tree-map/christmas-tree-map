import { useQuery } from '@tanstack/react-query';
import { getTrees } from '@/apis/tree';
import { TREE_KEYS } from '@/queries/queryKeys';

interface TreesParams {
  latitude: number;
  longitude: number;
  tr_latitude: number;
  tr_longitude: number;
  bl_latitude: number;
  bl_longitude: number;
  enabled?: boolean;
}

const useTreesQuery = ({
  latitude,
  longitude,
  tr_latitude,
  tr_longitude,
  bl_latitude,
  bl_longitude,
  enabled = true,
}: TreesParams) => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [TREE_KEYS.TREES, latitude, longitude],
    queryFn: () => getTrees({ latitude, longitude, tr_latitude, tr_longitude, bl_latitude, bl_longitude }),
    enabled,
  });

  return { trees: data ?? [], isSuccess, isLoading };
};

export default useTreesQuery;
