/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { Course, CourseDetails } from '@/pages/Course/Course.type';
import CourseTooltip from '@/components/Course/CourseTooltip/CourseTooltip';
import useCourseMap from '@/hooks/Course/useCourseMap';
import { vars } from '@/styles/theme.css';
import * as S from './CourseMap.css';

const { kakao } = window;

const CourseMap = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isValid: boolean | null = location.state.isValid;
  const courseList: CourseDetails | null = location.state.courseList;

  if (!isValid) {
    navigate(-1);
  }

  const { map, mapRef, currentTooltipRef, addMarker } = useCourseMap();

  const addTooltip = (map: any, type: string, courseItem: Course) => {
    const marker = addMarker(map, type, courseItem.y, courseItem.x);
    const tooltipContainer = document.createElement('div');
    const root = createRoot(tooltipContainer);

    const tooltip = new kakao.maps.CustomOverlay({
      content: tooltipContainer,
      position: marker.getPosition(),
    });

    const openTooltip = () => {
      // 현재 열려 있는 툴팁이 있다면, 열려 있는 툴팁 닫기
      if (currentTooltipRef.current) {
        currentTooltipRef.current.overlay.setMap(null);
      }

      root.render(<CourseTooltip id={courseItem.id} type={type} title={courseItem.place_name} />);
      tooltip.setMap(map);
      currentTooltipRef.current = { overlay: tooltip };
    };

    kakao.maps.event.addListener(marker, 'click', openTooltip);
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
    if (courseList) {
      Object.entries(courseList).forEach(([key, value]: [string, Course]) => {
        addTooltip(map, key, value);
        addPolyline(map, value.pedestrian.route);
      });
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
