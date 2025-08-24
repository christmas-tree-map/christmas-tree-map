import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';
import { useSavedCourseMap } from '@/hooks/Course/useSavedCourseMap';
import { vars } from '@/styles/theme.css';
import { CourseDetails } from '../Course.type';
import EmptySavedCourse from './EmptySavedCourse';
import * as S from './SavedCourse.css';

const SavedCourse = () => {
  const { savedCourseMap, getSavedKeywords } = useSavedCourseMap();
  const navigate = useNavigate();

  const savedKeywords = getSavedKeywords();

  const handleClickCourse = (key: string, latitude: string, longitude: string, savedNum: number) => {
    navigate(`/course/detail?keyword=${key}&latitude=${latitude}&longitude=${longitude}&savedNum=${savedNum}`);
  };

  if (savedKeywords.length === 0) return <EmptySavedCourse />;

  return (
    <div className={S.Layout}>
      <div className={S.CoursesContainer}>
        {savedKeywords.map((key) => {
          const savedCourse = savedCourseMap.get(key);
          if (!savedCourse) return null;

          return (
            <div className={S.CourseContainer} key={key}>
              <p className={S.CourseDetailTitle}>{key}</p>
              {savedCourse.courseDetails.map((course: CourseDetails, index) => (
                <div
                  key={index}
                  onClick={() => handleClickCourse(key, savedCourse.y, savedCourse.x, index)}
                  className={S.CourseDetailContainer}
                >
                  <div>
                    <p className={S.CourseDetailSubTitle}>코스 {index + 1}</p>
                    <p className={S.CourseDetailText}>
                      {Object.values(course)
                        .map((value) => value.place_name)
                        .join(' • ')}
                    </p>
                  </div>
                  <IoIosArrowForward size={24} color={vars.colors.grey[700]} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedCourse;
