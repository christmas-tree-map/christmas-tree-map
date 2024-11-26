import { useEffect, useRef } from 'react';

import treeImage from '@/assets/tree.png';

import * as S from './TreeMap.css';

const { kakao } = window;

const DEFAULT_LATITUDE = 37.5503;
const DEFAULT_LONGITUDE = 126.9971;
const DEFAULT_ZOOM_LEVEL = 3;

const IMAGE_SIZE = new kakao.maps.Size(50, 55);
const IMAGE_OPTIONS = { offset: new kakao.maps.Point(25, 55) };

const TreeMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const treeImageMarker = new kakao.maps.MarkerImage(treeImage, IMAGE_SIZE, IMAGE_OPTIONS);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addMarker = (map: any, latitude: number, longitude: number) => {
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    const marker = new kakao.maps.Marker({ position: markerPosition, image: treeImageMarker });

    marker.setMap(map);
  };

  const initializeMap = (latitude: number, longitude: number) => {
    const options = { center: new kakao.maps.LatLng(latitude, longitude), level: DEFAULT_ZOOM_LEVEL };
    const map = new kakao.maps.Map(mapRef.current, options);

    addMarker(map, latitude, longitude);
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

  return <div ref={mapRef} className={S.Layout} />;
};

export default TreeMap;
