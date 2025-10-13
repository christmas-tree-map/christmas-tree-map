import { useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/map';
import treeImage from '@/assets/TREE_01.png';

const { kakao } = window;
const DEFAULT_ZOOM_LEVEL = 3;
const USER_LOCATION_STORAGE_KEY = 'userLocation';

const MARKER_IMAGE: Record<string, string> = {
  TREE_01: treeImage,
};

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Bounds {
  sw: Coordinates;
  ne: Coordinates;
}

const locationStorage = {
  get: (): Coordinates => {
    const saved = sessionStorage.getItem(USER_LOCATION_STORAGE_KEY);
    return saved ? JSON.parse(saved) : { latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE };
  },

  set: (coordinates: Coordinates): void => {
    sessionStorage.setItem(USER_LOCATION_STORAGE_KEY, JSON.stringify(coordinates));
  },
};

const calculateMapBounds = (map: typeof kakao.maps.Map | null): Bounds => {
  const mapBounds = map?.getBounds();
  if (!mapBounds)
    return {
      sw: { latitude: DEFAULT_LATITUDE - 0.1, longitude: DEFAULT_LONGITUDE - 0.1 },
      ne: { latitude: DEFAULT_LATITUDE + 0.1, longitude: DEFAULT_LONGITUDE + 0.1 },
    };

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
};

const createMarkerImage = (imageCode: string) => {
  return new kakao.maps.MarkerImage(MARKER_IMAGE[imageCode], new kakao.maps.Size(50, 55), {
    offset: new kakao.maps.Point(25, 55),
  });
};

const useTreeMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<typeof kakao.maps.Map | null>(null);
  const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM_LEVEL);
  const [centerPosition, setCenterPosition] = useState<Coordinates>(locationStorage.get);
  const [bounds, setBounds] = useState<Bounds>(() => calculateMapBounds(null));
  const markersRef = useRef<(typeof kakao.maps.Marker | typeof kakao.maps.CustomOverlay)[]>([]);

  useEffect(() => {
    if (!mapRef.current || !kakao?.maps) return;

    const initialCoordinates = locationStorage.get();
    const mapInstance = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(initialCoordinates.latitude, initialCoordinates.longitude),
      level: DEFAULT_ZOOM_LEVEL,
    });

    setMap(mapInstance);
    setZoom(mapInstance.getLevel());
    setBounds(calculateMapBounds(mapInstance));

    const handleZoomChange = () => {
      setZoom(mapInstance.getLevel());
      setBounds(calculateMapBounds(mapInstance));
    };

    kakao.maps.event.addListener(mapInstance, 'zoom_changed', handleZoomChange);

    return () => {
      kakao.maps.event.removeListener(mapInstance, 'zoom_changed', handleZoomChange);
    };
  }, []);

  const addMarker = useCallback(
    (
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
    },
    [],
  );

  const addCustomOverlay = useCallback(
    (
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
    },
    [],
  );

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  }, []);

  const updateCenterPosition = () => {
    if (!map) return;

    const center = map.getCenter();
    const coordinates: Coordinates = {
      latitude: center.getLat(),
      longitude: center.getLng(),
    };

    locationStorage.set(coordinates);
    setCenterPosition(coordinates);
  };

  const updateBounds = () => {
    if (!map) return;
    setBounds(calculateMapBounds(map));
  };

  const updatePosition = () => {
    updateBounds();
    updateCenterPosition();
  };

  const zoomIn = () => {
    if (!map) return;

    const currentLevel = map.getLevel();
    map.setLevel(currentLevel - 1);
  };

  const zoomOut = () => {
    if (!map) return;

    const currentLevel = map.getLevel();
    map.setLevel(currentLevel + 1);
  };

  return {
    map,
    mapRef,
    centerPosition,
    bounds,
    zoom,
    addMarker,
    addCustomOverlay,
    clearMarkers,
    updateCenterPosition,
    updateBounds,
    updatePosition,
    zoomIn,
    zoomOut,
  };
};

export default useTreeMap;
