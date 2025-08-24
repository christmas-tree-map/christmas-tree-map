import { CourseDetails } from '@/pages/Course/Course.type';
import { useSavedCourseMap } from '@/hooks/Course/useSavedCourseMap';

const useSaveCourse = (keyword: string | null, courseDetails: CourseDetails, coordinates: { x: string; y: string }) => {
  const { saveCourse, removeCourse, isSaved: checkIsSaved } = useSavedCourseMap();

  const isSaved = keyword ? checkIsSaved(keyword, courseDetails) : false;

  const toggleSave = () => {
    if (!keyword) return;

    if (isSaved) {
      removeCourse(keyword, courseDetails);
    } else {
      saveCourse(keyword, courseDetails, coordinates.x, coordinates.y);
    }
  };

  const saveCurrentCourse = () => {
    if (!keyword || isSaved) return;
    saveCourse(keyword, courseDetails, coordinates.x, coordinates.y);
  };

  const removeCurrentCourse = () => {
    if (!keyword || !isSaved) return;
    removeCourse(keyword, courseDetails);
  };

  return {
    isSaved,
    toggleSave,
    saveCurrentCourse,
    removeCurrentCourse,
  };
};

export default useSaveCourse;
