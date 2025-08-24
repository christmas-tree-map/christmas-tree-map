import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaRegStar } from '@react-icons/all-files/fa/FaRegStar';
import { FaStar } from '@react-icons/all-files/fa/FaStar';
import { IoRefresh } from '@react-icons/all-files/io5/IoRefresh';
import EmptyCourseList from '@/pages/Course/CourseDetail/EmptyCourseDetail';
import Loading from '@/components/_common/Loading/Loading';
import ScreenOverlay from '@/components/_common/ScreenOverlay/ScreenOverlay';
import CourseList from '@/components/Course/CourseList/CourseList';
import CourseMap from '@/components/Course/CourseMap/CourseMap';
import useSaveCourse from '@/hooks/Course/useSaveCourse';
import useCourseDetailsQuery from '@/queries/Course/useCourseDetailsQuery';
import { vars } from '@/styles/theme.css';
import * as S from './CourseDetail.css';

const CourseDetail = () => {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');
  const savedNum = searchParams.get('savedNum');

  const { courseDetails, refetch, isLoading } = useCourseDetailsQuery(latitude || '', longitude || '', savedNum);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(false);

  const { isSaved, toggleSave, displayCourseDetails } = useSaveCourse(
    keyword,
    courseDetails,
    {
      x: latitude || '',
      y: longitude || '',
    },
    savedNum ? Number(savedNum) : undefined,
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsButtonOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading variant="secondary" fullScreen />;
  if (!keyword) throw new Error('keyword가 없습니다.');
  if (Object.keys(courseDetails).length === 0) return <EmptyCourseList />;

  return (
    <div className={S.Layout}>
      <div className={S.TitleContainer}>
        <h1 className={S.Title}>{keyword} 맞춤 코스 ✨</h1>
        <button className={S.SaveButton} onClick={toggleSave}>
          {isSaved ? <FaStar size={20} color="#E8DE4C" /> : <FaRegStar size={20} color={vars.colors.grey[500]} />}
        </button>
      </div>
      <div className={S.MapContainer}>
        <button className={S.DetailButton} type="button" onClick={() => setIsMapOpen(true)}>
          자세히 보기
        </button>
        <div className={S.CourseMapContainer}>
          <CourseMap courseList={savedNum ? displayCourseDetails : courseDetails} mapLevel={7} isStaticMap={true} />
        </div>
      </div>
      <CourseList courseList={savedNum ? displayCourseDetails : courseDetails} />
      {isButtonOpen && (
        <button className={S.RefreshButton} onClick={() => refetch()}>
          <IoRefresh size="18px" color={vars.colors.secondary[700]} />
          <p className={S.RefreshText}>다시 추천 받기</p>
        </button>
      )}
      {isMapOpen && (
        <ScreenOverlay title="맞춤 코스 추천" isOpen={isMapOpen} closeOverlay={() => setIsMapOpen(false)}>
          <CourseMap courseList={displayCourseDetails} />
        </ScreenOverlay>
      )}
    </div>
  );
};

export default CourseDetail;
