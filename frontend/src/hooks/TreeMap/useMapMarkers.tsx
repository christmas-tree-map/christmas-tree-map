import { useEffect, useRef } from 'react';
import { Root, createRoot } from 'react-dom/client';
import ClusterOverlay from '@/components/Tree/ClusterOverlay';
import useTreeMap from '@/hooks/TreeMap/useTreeMap';
import treeImage from '@/assets/TREE_01.png';

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
  onClusterClick: ({ latitude, longitude }: { latitude: number; longitude: number }) => void;
}

const { kakao } = window;

const MARKER_IMAGE: Record<string, string> = {
  TREE_01: treeImage,
};

const useMapMarkers = ({
  map,
  isClusterView,
  trees,
  treeClusters,
  onMarkerClick,
  onClusterClick,
}: UseMapMarkersParams) => {
  const markersRef = useRef<(typeof kakao.maps.Marker | typeof kakao.maps.CustomOverlay)[]>([]);

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

  const addCustomOverlay = (
    targetMap: typeof kakao.maps.Map,
    latitude: number,
    longitude: number,
    content: HTMLElement,
    onClick?: () => void,
  ) => {
    if (!targetMap) return;

    const position = new kakao.maps.LatLng(latitude, longitude);

    const overlay = new kakao.maps.CustomOverlay({
      position,
      content,
      clickable: true,
    });

    if (onClick) {
      kakao.maps.event.addListener(overlay, 'click', onClick);
    }

    overlay.setMap(targetMap);
    markersRef.current.push(overlay);
  };

  const createMarkerImage = (imageCode: string) => {
    return new kakao.maps.MarkerImage(MARKER_IMAGE[imageCode], new kakao.maps.Size(50, 55), {
      offset: new kakao.maps.Point(25, 55),
    });
  };

  const addMarker = (
    targetMap: typeof kakao.maps.Map,
    latitude: number,
    longitude: number,
    imageCode: string,
    onClick?: () => void,
  ) => {
    if (!targetMap) return;

    const position = new kakao.maps.LatLng(latitude, longitude);
    const image = createMarkerImage(imageCode);

    const marker = new kakao.maps.Marker({
      position,
      image,
      clickable: true,
    });

    if (onClick) {
      kakao.maps.event.addListener(marker, 'click', onClick);
    }

    marker.setMap(targetMap);
    markersRef.current.push(marker);
  };

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };
};

export default useMapMarkers;
