import { useState } from 'react';
import { CourseDetails, CourseType } from '@/pages/Course/Course.type';

type SavedCourseMap = Map<string, CourseDetails[]>;

const useSaveCourse = () => {
  const [isSaved, setIsSaved] = useState(false);

  const getSavedCourseMap = (): SavedCourseMap => {
    const savedData = localStorage.getItem('savedCourse');
    if (!savedData) return new Map();

    try {
      const parsedData = JSON.parse(savedData);
      return new Map(Object.entries(parsedData));
    } catch {
      return new Map();
    }
  };

  const saveCourseMap = (map: SavedCourseMap): void => {
    localStorage.setItem('savedCourse', JSON.stringify(Object.fromEntries(map)));
  };

  const checkIsSaved = (keyword: string, courseDetails: CourseDetails): boolean => {
    const savedCourseMap = getSavedCourseMap();
    const courseList = savedCourseMap.get(keyword);

    if (!courseList) return false;

    return courseList.some((savedCourseDetails: CourseDetails) =>
      Object.entries(savedCourseDetails).every(([key, value]) => value?.id === courseDetails[key as CourseType]?.id),
    );
  };

  const handleSaveCourse = (keyword: string | null, courseDetails: CourseDetails) => {
    if (!keyword) return;

    const savedCourseMap = getSavedCourseMap();
    const currentIsSaved = checkIsSaved(keyword, courseDetails);

    if (currentIsSaved) {
      const courseList = savedCourseMap.get(keyword) || [];
      const updatedCourseList = courseList.filter(
        (course: CourseDetails) =>
          !Object.entries(course).every(([key, value]) => value?.id === courseDetails[key as CourseType]?.id),
      );

      if (updatedCourseList.length === 0) {
        savedCourseMap.delete(keyword);
      } else {
        savedCourseMap.set(keyword, updatedCourseList);
      }

      saveCourseMap(savedCourseMap);
      setIsSaved(false);
    } else {
      const existingCourses = savedCourseMap.get(keyword) || [];
      savedCourseMap.set(keyword, [...existingCourses, courseDetails]);

      saveCourseMap(savedCourseMap);
      setIsSaved(true);
    }
  };

  const updateSavedStatus = (keyword: string | null, courseDetails: CourseDetails) => {
    if (!keyword) return;

    const currentIsSaved = checkIsSaved(keyword, courseDetails);
    setIsSaved(currentIsSaved);
  };

  return {
    isSaved,
    savedCourseMap: getSavedCourseMap(),
    handleSaveCourse,
    updateSavedStatus,
  };
};

export default useSaveCourse;
