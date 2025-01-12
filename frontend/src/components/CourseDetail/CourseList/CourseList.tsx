import { FaWalking } from '@react-icons/all-files/fa/FaWalking';
import CourseItem from '@/components/CourseDetail/CourseItem/CourseItem';
import { CourseDetails } from '@/apis/course';
import { COURSE_TEXT } from '@/constants/course';
import * as S from './CourseList.css';

interface CourseListProps {
  courseList: CourseDetails;
}

const CourseList = ({ courseList }: CourseListProps) => {
  return (
    <>
      {Object.entries(courseList).map(([key, value]) => (
        <div key={key}>
          {value !== null && (
            <>
              <p className={S.TypeText}>{COURSE_TEXT[key]}</p>
              <CourseItem title={value.place_name} address={value.address_name} phone={value.phone} />
              {key !== 'dinner' && (
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
          )}
        </div>
      ))}
    </>
  );
};

export default CourseList;
