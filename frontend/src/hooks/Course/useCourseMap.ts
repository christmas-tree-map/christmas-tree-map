/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { Course, CourseDetails, CourseType } from '@/pages/Course/Course.type';
import { COURSE_MARKER } from '@/constants/course';

const { kakao } = window;

interface TooltipState {
  overlay: any;
}

interface UseCourseMapProps {
  courseList: CourseDetails;
  mapLevel?: number;
  isStaticMap?: boolean;
}

const MARKER_CONFIG = {
  SIZE: new kakao.maps.Size(36, 36),
  OPTIONS: { offset: new kakao.maps.Point(18, 36) },
} as const;

const useCourseMap = ({ courseList, mapLevel = 5, isStaticMap = false }: UseCourseMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const currentTooltipRef = useRef<TooltipState | null>(null);
  const [map, setMap] = useState(null);

  const calculateCenterCoordinates = (courses: Course[]) => {
    if (courses.length === 0) {
      return null;
    }

    const totalLatitude = courses.reduce((sum, course) => sum + Number(course.y), 0);
    const totalLongitude = courses.reduce((sum, course) => sum + Number(course.x), 0);

    return {
      latitude: totalLatitude / courses.length,
      longitude: totalLongitude / courses.length,
    };
  };

  const initializeMap = () => {
    if (!mapRef.current || !kakao?.maps) {
      return;
    }

    const validCourses = Object.values(courseList).filter((course): course is Course => course !== null);
    const centerCoordinates = calculateCenterCoordinates(validCourses);

    if (!centerCoordinates) {
      return;
    }

    const mapOptions = {
      center: new kakao.maps.LatLng(centerCoordinates.latitude, centerCoordinates.longitude),
      level: mapLevel,
      draggable: !isStaticMap,
      disableDoubleClick: isStaticMap,
    };
    const newMap = new kakao.maps.Map(mapRef.current, mapOptions);

    setMap(newMap);
  };

  const addMarker = (map: any, type: CourseType, latitude: string, longitude: string, clickable: boolean) => {
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    const markerImage = new kakao.maps.MarkerImage(COURSE_MARKER[type], MARKER_CONFIG.SIZE, MARKER_CONFIG.OPTIONS);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
      clickable,
    });

    marker.setMap(map);
    return marker;
  };

  useEffect(() => {
    initializeMap();
  }, [courseList]);

  return { map, mapRef, currentTooltipRef, addMarker };
};

export default useCourseMap;
