import { useEffect, useState } from 'react';
import { CourseDetails } from '@/pages/Course/Course.type';
import { useSavedCourseMap } from '@/hooks/Course/useSavedCourseMap';

const useSaveCourse = (
  keyword: string | null,
  courseDetails: CourseDetails,
  coordinates: { x: string; y: string },
  savedCourseIndex?: number,
) => {
  const { saveCourse, removeCourse, isSaved: checkIsSaved, getSavedCourse } = useSavedCourseMap();

  const [displayCourseDetails, setDisplayCourseDetails] = useState<CourseDetails>(courseDetails);

  const isSaved = keyword ? checkIsSaved(keyword, displayCourseDetails) : false;

  useEffect(() => {
    if (keyword && savedCourseIndex !== undefined) {
      const savedCourseData = getSavedCourse(keyword, savedCourseIndex);
      const hasValidData = Object.keys(savedCourseData).some(
        (key) => savedCourseData[key as keyof CourseDetails] !== null,
      );

      if (hasValidData) {
        setDisplayCourseDetails(savedCourseData);
      }
    } else if (Object.keys(courseDetails).length > 0) {
      setDisplayCourseDetails(courseDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, savedCourseIndex, courseDetails]);

  const toggleSave = () => {
    if (!keyword) return;

    if (isSaved) {
      removeCourse(keyword, displayCourseDetails);
    } else {
      saveCourse(keyword, displayCourseDetails, coordinates.x, coordinates.y);
    }
  };

  const saveCurrentCourse = () => {
    if (!keyword || isSaved) return;
    saveCourse(keyword, displayCourseDetails, coordinates.x, coordinates.y);
  };

  const removeCurrentCourse = () => {
    if (!keyword || !isSaved) return;
    removeCourse(keyword, displayCourseDetails);
  };

  const getSavedCourseByIndex = (keywordParam: string, index: number) => {
    return getSavedCourse(keywordParam, index);
  };

  return {
    isSaved,
    toggleSave,
    saveCurrentCourse,
    removeCurrentCourse,
    getSavedCourse: getSavedCourseByIndex,
    displayCourseDetails,
  };
};

export default useSaveCourse;
