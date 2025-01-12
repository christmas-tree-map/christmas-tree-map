import { useSearchParams } from 'react-router-dom';
import { IoRefresh } from '@react-icons/all-files/io5/IoRefresh';
import CourseList from '@/components/CourseDetail/CourseList/CourseList';
import useCourseDetailsQuery from '@/queries/CourseDetail/useCourseDetailsQuery';
import { vars } from '@/styles/theme.css';
import * as S from './CourseDetail.css';

const CourseDetail = () => {
  const [searchParams] = useSearchParams();

  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');

  const { courseDetails } = useCourseDetailsQuery(latitude || '', longitude || '');

  return (
    <div className={S.Layout}>
      <h1 className={S.Title}>검색어 맞춤 코스</h1>
      <div className={S.MapContainer} />
      <CourseList courseList={courseDetails} />
      <button className={S.RefreshButton}>
        <IoRefresh size="18px" color={vars.colors.secondary[700]} />
        <p className={S.RefreshText}>다시 추천 받기</p>
      </button>
    </div>
  );
};

export default CourseDetail;
