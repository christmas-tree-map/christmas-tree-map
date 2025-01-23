/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { Course } from '@/pages/Course/Course.type';
import CourseTooltip from '@/components/Course/CourseTooltip/CourseTooltip';
import { CourseDetails } from '@/apis/course';
import useCourseMap from '@/hooks/Course/useCourseMap';
import * as S from './CourseMap.css';

const { kakao } = window;

interface TooltipState {
  overlay: any;
}

const CourseMap = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isValid: boolean | null = location.state.isValid;
  const courseList: CourseDetails | null = location.state.courseList;

  if (!isValid) {
    navigate(-1);
  }

  const { map, mapRef } = useCourseMap();
  const currentTooltipRef = useRef<TooltipState | null>(null);

  const addMarker = (map: any, type: string, courseItem: Course) => {
    const markerPosition = new kakao.maps.LatLng(courseItem.y, courseItem.x);
    const marker = new kakao.maps.Marker({ position: markerPosition, clickable: true });

    marker.setMap(map);

    const tooltipContainer = document.createElement('div');
    const root = createRoot(tooltipContainer);

    const tooltip = new kakao.maps.CustomOverlay({
      content: tooltipContainer,
      position: marker.getPosition(),
    });

    const openTooltip = () => {
      if (currentTooltipRef.current) {
        currentTooltipRef.current.overlay.setMap(null);
      }

      root.render(<CourseTooltip id={courseItem.id} type={type} title={courseItem.place_name} />);
      tooltip.setMap(map);

      currentTooltipRef.current = { overlay: tooltip };
    };

    kakao.maps.event.addListener(marker, 'click', openTooltip);
  };

  useEffect(() => {
    if (courseList) {
      Object.entries(courseList).forEach(([key, value]) => addMarker(map, key, value));
    }

    return () => {
      if (currentTooltipRef.current) {
        currentTooltipRef.current.overlay.setMap(null);
      }
    };
  }, [map]);

  return <div ref={mapRef} className={S.Layout} />;
};

export default CourseMap;
