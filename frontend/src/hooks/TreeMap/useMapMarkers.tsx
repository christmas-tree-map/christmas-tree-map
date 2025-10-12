import { useEffect } from 'react';
import { Root, createRoot } from 'react-dom/client';
import ClusterOverlay from '@/components/Tree/ClusterOverlay';
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
  addCustomOverlay: ReturnType<typeof useTreeMap>['addCustomOverlay'];
  clearMarkers: ReturnType<typeof useTreeMap>['clearMarkers'];
  addMarker: ReturnType<typeof useTreeMap>['addMarker'];
  onMarkerClick: (treeId: number) => void;
  onClusterClick: ({ latitude, longitude }: { latitude: number; longitude: number }) => void;
}

const useMapMarkers = ({
  map,
  isClusterView,
  trees,
  treeClusters,
  addCustomOverlay,
  clearMarkers,
  addMarker,
  onMarkerClick,
  onClusterClick,
}: UseMapMarkersParams) => {
  useEffect(() => {
    if (!map) return;

    clearMarkers();

    const roots: Root[] = [];

    if (isClusterView) {
      treeClusters.forEach((cluster) => {
        const container = document.createElement('div');
        const root = createRoot(container);
        root.render(
          <ClusterOverlay
            count={cluster.count}
            onClick={() => onClusterClick({ latitude: cluster.latitude, longitude: cluster.longitude })}
          />,
        );
        roots.push(root);
        addCustomOverlay(map, cluster.latitude, cluster.longitude, container);
      });
    } else {
      const renderTreeMarkers = (treeList: Tree[]) => {
        treeList.forEach((tree) => {
          addMarker(map!, tree.latitude, tree.longitude, tree.imageCode, () => onMarkerClick(tree.id));
        });
      };

      renderTreeMarkers(trees);
    }

    return () => {
      roots.forEach((root) => root.unmount());
    };
  }, [map, trees, treeClusters, isClusterView]);
};

export default useMapMarkers;
