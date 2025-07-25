import { FaWalking } from '@react-icons/all-files/fa/FaWalking';
import { Course, CourseDetails, CourseType } from '@/pages/Course/Course.type';
import CourseItem from '@/components/Course/CourseItem/CourseItem';
import { COURSE_TEXT } from '@/constants/course';
import * as S from './CourseList.css';

interface CourseListProps {
  courseList: CourseDetails;
}

const CourseList = ({ courseList }: CourseListProps) => {
  return (
    <>
      {Object.entries(courseList).map(([key, value]: [string, Course | null]) => (
        <div key={key}>
          {value !== null && (
            <>
              <p className={S.TypeText}>{COURSE_TEXT[key as CourseType]}</p>
              <CourseItem
                id={value.id}
                title={value.place_name}
                address={value.road_address_name}
                phone={value.phone}
                backgroundColor="grey"
                imgSrc={value.image_url}
              />
              {key !== 'dinner' && (
                <div className={S.TimeContainer}>
                  <div className={S.LineContainer}>
                    <div className={S.Line} />
                    <div className={S.Icon}>
                      <FaWalking size="15px" />
                    </div>
                  </div>
                  걸어서 {value.pedestrian.duration_minutes}분
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
