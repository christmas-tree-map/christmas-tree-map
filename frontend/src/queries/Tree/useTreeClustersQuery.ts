import { useQuery } from '@tanstack/react-query';
import { getTreeByCluster } from '@/apis/tree';
import { TREE_KEYS } from '@/queries/queryKeys';

interface TreeClusterParams {
  zoom: number;
  tr_latitude: number;
  tr_longitude: number;
  bl_latitude: number;
  bl_longitude: number;
  enabled: boolean;
}

const useTreeClustersQuery = ({
  zoom,
  tr_latitude,
  tr_longitude,
  bl_latitude,
  bl_longitude,
  enabled,
}: TreeClusterParams) => {
  const { data, ...rest } = useQuery({
    queryKey: [TREE_KEYS.TREE_CLUSTER, zoom, tr_latitude, tr_longitude, bl_latitude, bl_longitude],
    queryFn: () =>
      getTreeByCluster({
        zoom,
        tr_latitude,
        tr_longitude,
        bl_latitude,
        bl_longitude,
      }),
    enabled,
  });

  return { treeClusters: data ?? [], ...rest };
};

export default useTreeClustersQuery;
