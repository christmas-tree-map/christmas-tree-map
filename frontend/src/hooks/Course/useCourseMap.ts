/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { Course, CourseDetails } from '@/pages/Course/Course.type';
import { COURSE_MARKER } from '@/constants/course';

const { kakao } = window;

interface TooltipState {
  overlay: any;
}

const useCourseMap = (courseList: CourseDetails) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const currentTooltipRef = useRef<TooltipState | null>(null);

  const [map, setMap] = useState(null);

  const initializeMap = () => {
    const courses = Object.values(courseList);
    const latitude = courses.reduce((acc: number, cur: Course) => (acc += Number(cur.y)), 0) / courses.length;
    const longitude = courses.reduce((acc: number, cur: Course) => (acc += Number(cur.x)), 0) / courses.length;

    if (mapRef.current && kakao && kakao.maps) {
      const options = { center: new kakao.maps.LatLng(latitude, longitude), level: 5 };
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
    initializeMap();
  }, []);

  return { map, mapRef, currentTooltipRef, addMarker };
};

export default useCourseMap;
