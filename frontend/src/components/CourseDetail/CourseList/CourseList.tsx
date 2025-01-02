import { FaWalking } from '@react-icons/all-files/fa/FaWalking';
import CourseItem from '@/components/CourseDetail/CourseItem/CourseItem';
import * as S from './CourseList.css';

const COURSE_TEXT: Record<string, string> = {
  lunch: '점심',
  entertainment: '놀거리',
  cafe: '카페',
  dinner: '저녁',
};

interface Course {
  type: string;
  title: string;
  address: string;
  phone: string;
}

interface CourseListProps {
  courseList: Course[];
}

const CourseList = ({ courseList }: CourseListProps) => {
  return (
    <div>
      {courseList.map(({ type, title, address, phone }, index) => (
        <>
          <p className={S.TypeText}>{COURSE_TEXT[type]}</p>
          <CourseItem title={title} address={address} phone={phone} />
          {index !== courseList.length - 1 && (
            <div className={S.TimeContainer}>
              <div className={S.LineContainer}>
                <div className={S.Line} />
                <div className={S.Icon}>
                  <FaWalking size="15px" />
                </div>
              </div>
              걸어서 10분
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default CourseList;
