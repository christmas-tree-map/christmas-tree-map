import { useEffect, useRef, useState } from 'react';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/map';
import treeImage from '@/assets/tree.png';

const { kakao } = window;

const DEFAULT_ZOOM_LEVEL = 3;

const MARKER_SIZE = new kakao.maps.Size(50, 55);
const MARKER_OPTIONS = { offset: new kakao.maps.Point(25, 55) };
const MARKER_IMAGE: Record<string, string> = {
  TREE_01: treeImage,
};

const useTreeMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [map, setMap] = useState(null);

  const initializeMap = (latitude: number, longitude: number) => {
    const options = { center: new kakao.maps.LatLng(latitude, longitude), level: DEFAULT_ZOOM_LEVEL };
    const map = new kakao.maps.Map(mapRef.current, options);

    setMap(map);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addMarker = (map: any, latitude: number, longitude: number, imageCode: string, onClick?: () => void) => {
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    const markerImage = new kakao.maps.MarkerImage(MARKER_IMAGE[imageCode], MARKER_SIZE, MARKER_OPTIONS);
    const marker = new kakao.maps.Marker({ position: markerPosition, image: markerImage, clickable: true });

    if (onClick) kakao.maps.event.addListener(marker, 'click', onClick);

    marker.setMap(map);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      initializeMap(DEFAULT_LATITUDE, DEFAULT_LONGITUDE);
      return;
    }

    navigator.geolocation.getCurrentPosition((position) =>
      initializeMap(position.coords.latitude, position.coords.longitude),
    );
  }, []);

  return { map, mapRef, addMarker };
};

export default useTreeMap;
