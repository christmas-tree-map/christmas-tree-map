import { CourseType } from '@/pages/Course/Course.type';
import { COURSE_TEXT } from '@/constants/course';
import * as S from './CourseTooltip.css';

interface CourseTooltipProps {
  id: string;
  type: CourseType;
  title: string;
}

const CourseTooltip = ({ id, type, title }: CourseTooltipProps) => {
  return (
    <div className={S.Layout}>
      <div className={S.Container}>
        <p className={S.TypeText}>{COURSE_TEXT[type]}</p>
        <p>{title}</p>
        <a className={S.Link} href={`https://map.kakao.com/link/map/${id}`} target="_blank">
          카카오맵 이동하기
        </a>
      </div>
      <div className={S.Arrow} />
    </div>
  );
};

export default CourseTooltip;
