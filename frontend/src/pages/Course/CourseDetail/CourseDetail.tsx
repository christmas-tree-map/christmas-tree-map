import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { IoRefresh } from '@react-icons/all-files/io5/IoRefresh';
import CourseList from '@/components/Course/CourseList/CourseList';
import useCourseDetailsQuery from '@/queries/Course/useCourseDetailsQuery';
import { vars } from '@/styles/theme.css';
import * as S from './CourseDetail.css';

const CourseDetail = () => {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');

  const { courseDetails, refetch } = useCourseDetailsQuery(latitude || '', longitude || '');

  const [isButtonOpen, setIsButtonOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsButtonOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={S.Layout}>
      <h1 className={S.Title}>{keyword} 맞춤 코스 ✨</h1>
      <div className={S.MapContainer}>
        <Link to="map" state={{ isValid: true, courseList: courseDetails }}>
          자세히 보기
        </Link>
      </div>
      <CourseList courseList={courseDetails} />
      {isButtonOpen && (
        <button className={S.RefreshButton} onClick={() => refetch()}>
          <IoRefresh size="18px" color={vars.colors.secondary[700]} />
          <p className={S.RefreshText}>다시 추천 받기</p>
        </button>
      )}
    </div>
  );
};

export default CourseDetail;
