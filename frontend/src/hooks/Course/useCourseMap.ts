/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { COURSE_MARKER } from '@/constants/course';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE, DEFAULT_ZOOM_LEVEL } from '@/constants/map';

const { kakao } = window;

interface TooltipState {
  overlay: any;
}

const useCourseMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const currentTooltipRef = useRef<TooltipState | null>(null);

  const [map, setMap] = useState(null);

  const initializeMap = (latitude: number, longitude: number) => {
    if (mapRef.current && kakao && kakao.maps) {
      const options = { center: new kakao.maps.LatLng(latitude, longitude), level: DEFAULT_ZOOM_LEVEL };
      const map = new kakao.maps.Map(mapRef.current, options);

      setMap(map);
    }
  };

  const MARKER_SIZE = new kakao.maps.Size(36, 36);
  const MARKER_OPTIONS = { offset: new kakao.maps.Point(18, 36) };

  const addMarker = (map: any, type: string, latitude: string, longitude: string) => {
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    const markerImage = new kakao.maps.MarkerImage(COURSE_MARKER[type], MARKER_SIZE, MARKER_OPTIONS);
    const marker = new kakao.maps.Marker({ position: markerPosition, image: markerImage, clickable: true });

    marker.setMap(map);

    return marker;
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

  return { map, mapRef, currentTooltipRef, addMarker };
};

export default useCourseMap;
