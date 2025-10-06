import { useEffect } from 'react';
import { createClusterMarkerHTML } from '@/components/Tree/ClusterMarker';
import useTreeMap from '@/hooks/TreeMap/useTreeMap';

interface Tree {
  id: number;
  latitude: number;
  longitude: number;
  imageCode: string;
}

interface TreeCluster {
  count: number;
  latitude: number;
  longitude: number;
}

interface UseMapMarkersParams {
  map: ReturnType<typeof useTreeMap>['map'];
  isClusterView: boolean;
  trees: Tree[];
  treeClusters: TreeCluster[];
  onMarkerClick: (treeId: number) => void;
}

const useMapMarkers = ({ map, isClusterView, trees, treeClusters, onMarkerClick }: UseMapMarkersParams) => {
  const { addMarker, addCustomOverlay, clearMarkers } = useTreeMap();

  useEffect(() => {
    if (!map) return;

    clearMarkers();

    if (isClusterView) {
      renderClusterMarkers(treeClusters);
    } else {
      renderTreeMarkers(trees);
    }
  }, [map, trees, treeClusters, isClusterView]);

  const renderClusterMarkers = (clusters: TreeCluster[]) => {
    clusters.forEach((cluster) => {
      const markerHTML = createClusterMarkerHTML(cluster.count);
      addCustomOverlay(map!, cluster.latitude, cluster.longitude, markerHTML, undefined);
    });
  };

  const renderTreeMarkers = (treeList: Tree[]) => {
    treeList.forEach((tree) => {
      addMarker(map!, tree.latitude, tree.longitude, tree.imageCode, () => onMarkerClick(tree.id));
    });
  };
};

export default useMapMarkers;
