import { IoRefresh } from '@react-icons/all-files/io5/IoRefresh';
import CourseList from '@/components/CourseDetail/CourseList/CourseList';
import { vars } from '@/styles/theme.css';
import * as S from './CourseDetail.css';

const data = [
  {
    type: 'lunch',
    title: '농민백암순대',
    address: '서울 강남구 선릉로86길 40-4 알앤지타운 1층',
    phone: '02-555-9603',
  },
  {
    type: 'entertainment',
    title: '농민백암순대',
    address: '서울 강남구 선릉로86길 40-4 알앤지타운 1층',
    phone: '02-555-9603',
  },
  {
    type: 'cafe',
    title: '농민백암순대',
    address: '서울 강남구 선릉로86길 40-4 알앤지타운 1층',
    phone: '02-555-9603',
  },
  {
    type: 'dinner',
    title: '농민백암순대',
    address: '서울 강남구 선릉로86길 40-4 알앤지타운 1층',
    phone: '02-555-9603',
  },
];

const CourseDetail = () => {
  return (
    <div className={S.Layout}>
      <h1 className={S.Title}>검색어 맞춤 코스</h1>
      <div className={S.MapContainer} />
      <CourseList courseList={data} />
      <button className={S.RefreshButton}>
        <IoRefresh size="18px" color={vars.colors.secondary[700]} />
        <p className={S.RefreshText}>다시 추천 받기</p>
      </button>
    </div>
  );
};

export default CourseDetail;
