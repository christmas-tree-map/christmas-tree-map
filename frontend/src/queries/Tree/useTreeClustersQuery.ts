import { useQuery } from '@tanstack/react-query';
import { getTreeByCluster } from '@/apis/tree';
import { TREE_KEYS } from '@/queries/queryKeys';

interface TreeClusterParams {
  zoom: number;
  tl_latitude: number;
  tl_longitude: number;
  br_latitude: number;
  br_longitude: number;
  enabled: boolean;
}

const useTreeClustersQuery = ({
  zoom,
  tl_latitude,
  tl_longitude,
  br_latitude,
  br_longitude,
  enabled,
}: TreeClusterParams) => {
  const { data, ...rest } = useQuery({
    queryKey: [TREE_KEYS.TREE_CLUSTER, zoom, tl_latitude, tl_longitude, br_latitude, br_longitude],
    queryFn: () =>
      getTreeByCluster({
        zoom,
        tl_latitude,
        tl_longitude,
        br_latitude,
        br_longitude,
      }),
    enabled,
  });

  return { treeClusters: data ?? [], ...rest };
};

export default useTreeClustersQuery;
