import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/map';
import treeImage from '@/assets/TREE_01.png';

const { kakao } = window;
const DEFAULT_ZOOM_LEVEL = 3;

const MARKER_IMAGE: Record<string, string> = {
  TREE_01: treeImage,
};

const useTreeMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<typeof kakao.maps.Map | null>(null);

  const initialCenter = useMemo(() => {
    const saved = sessionStorage.getItem('userLocation');
    return saved ? JSON.parse(saved) : { latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE };
  }, []);
  const [centerPosition, setCenterPosition] = useState(initialCenter);

  const initializeMap = useCallback((latitude: number, longitude: number) => {
    if (mapRef.current && kakao && kakao.maps) {
      const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: DEFAULT_ZOOM_LEVEL,
      };
      const mapInstance = new kakao.maps.Map(mapRef.current, options);
      setMap(mapInstance);
    }
  }, []);

  const addMarker = (
    map: typeof kakao.maps.Map,
    latitude: number,
    longitude: number,
    imageCode: string,
    onClick?: () => void,
  ) => {
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    const markerImage = new kakao.maps.MarkerImage(MARKER_IMAGE[imageCode], new kakao.maps.Size(50, 55), {
      offset: new kakao.maps.Point(25, 55),
    });
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
      clickable: true,
    });
    if (onClick) kakao.maps.event.addListener(marker, 'click', onClick);
    marker.setMap(map);
  };

  const handleCenterChanged = useCallback(() => {
    if (!map) return;
    const center = map.getCenter();
    setCenterPosition({ latitude: center.getLat(), longitude: center.getLng() });
  }, [map]);

  useEffect(() => {
    initializeMap(initialCenter.latitude, initialCenter.longitude);
  }, []);

  useEffect(() => {
    if (!map) return;
    kakao.maps.event.addListener(map, 'dragend', handleCenterChanged);
    return () => {
      kakao.maps.event.removeListener(map, 'dragend', handleCenterChanged);
    };
  }, [map]);

  return {
    map,
    mapRef,
    centerPosition,
    addMarker,
  };
};

export default useTreeMap;
