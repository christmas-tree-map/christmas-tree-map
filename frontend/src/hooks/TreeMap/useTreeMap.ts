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
  const currentMarkers = useRef<(typeof kakao.maps.Marker)[]>([]);
  const bounds = useMemo(() => {
    const mapBounds = map?.getBounds();
    if (!mapBounds) return null;

    const sw = mapBounds.getSouthWest();
    const ne = mapBounds.getNorthEast();

    return {
      sw: {
        latitude: sw.getLat(),
        longitude: sw.getLng(),
      },
      ne: {
        latitude: ne.getLat(),
        longitude: ne.getLng(),
      },
    };
  }, [map]);
  const [zoom, setZoom] = useState<number>(map?.getLevel());

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
      setZoom(mapInstance.getLevel());

      kakao.maps.event.addListener(mapInstance, 'zoom_changed', () => {
        setZoom(mapInstance.getLevel());
      });
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
    currentMarkers.current.push(marker);
  };

  const addCustomOverlay = (
    map: typeof kakao.maps.Map,
    latitude: number,
    longitude: number,
    overlay: string,
    onClick?: () => void,
  ) => {
    const customOverlayPosition = new kakao.maps.LatLng(latitude, longitude);
    const customOverlay = new kakao.maps.CustomOverlay({
      position: customOverlayPosition,
      content: overlay,
      clickable: true,
    });

    if (onClick) kakao.maps.event.addListener(customOverlay, 'click', onClick);

    customOverlay.setMap(map);
    currentMarkers.current.push(customOverlay);
  };

  const clearMarkers = () => {
    currentMarkers.current.forEach((marker) => marker.setMap(null));
    currentMarkers.current = [];
  };

  const updateCenterPosition = () => {
    const center = map?.getCenter();
    if (!center) return;
    const latitude = center.getLat();
    const longitude = center.getLng();
    sessionStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }));
    setCenterPosition({ latitude, longitude });
  };

  useEffect(() => {
    initializeMap(initialCenter.latitude, initialCenter.longitude);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCenter.latitude, initialCenter.longitude]);

  return {
    map,
    mapRef,
    centerPosition,
    addMarker,
    addCustomOverlay,
    clearMarkers,
    updateCenterPosition,
    bounds,
    zoom,
  };
};

export default useTreeMap;
