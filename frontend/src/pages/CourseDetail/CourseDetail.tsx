import { IoRefresh } from '@react-icons/all-files/io5/IoRefresh';
import { vars } from '@/styles/theme.css';
import * as S from './CourseDetail.css';

const CourseDetail = () => {
  return (
    <div className={S.Layout}>
      <h1 className={S.Title}>검색어 맞춤 코스</h1>
      <div className={S.MapContainer} />
      <button className={S.RefreshButton}>
        <IoRefresh size="18px" color={vars.colors.secondary[700]} />
        <p className={S.RefreshText}>다시 추천 받기</p>
      </button>
    </div>
  );
};

export default CourseDetail;
