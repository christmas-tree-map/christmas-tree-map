/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE, DEFAULT_ZOOM_LEVEL } from '@/constants/map';
import { vars } from '@/styles/theme.css';

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

  const addMarker = (map: any, latitude: string, longitude: string) => {
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    const marker = new kakao.maps.Marker({ position: markerPosition, clickable: true });

    marker.setMap(map);

    return marker;
  };

  const addPolyline = (map: any, routes: [number, number][]) => {
    const linePath = routes.map((route) => new kakao.maps.LatLng(route[1], route[0]));

    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 3,
      strokeColor: vars.colors.grey[600],
      strokeOpacity: 1,
      strokeStyle: 'solid',
    });

    polyline.setMap(map);
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
