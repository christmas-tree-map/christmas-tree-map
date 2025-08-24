import { useEffect, useState } from 'react';
import { CourseDetails, CourseType } from '@/pages/Course/Course.type';

interface SavedCourse {
  [key: string]: CourseDetails[];
}

const useSaveCourse = (keyword: string | null, courseDetails: CourseDetails) => {
  const [isSaved, setIsSaved] = useState(false);

  const checkIsSaved = (keyword: string, courseDetails: CourseDetails): boolean => {
    const savedCourse = JSON.parse(localStorage.getItem('savedCourse') || '{}') as SavedCourse;

    return savedCourse[keyword]
      ? savedCourse[keyword].some((savedCourseDetails: CourseDetails) =>
          Object.entries(savedCourseDetails).every(
            ([key, value]) => value?.id === courseDetails[key as CourseType]?.id,
          ),
        )
      : false;
  };

  const handleSaveCourse = () => {
    if (!keyword) return;

    const savedCourse = JSON.parse(localStorage.getItem('savedCourse') || '{}') as SavedCourse;
    const currentIsSaved = checkIsSaved(keyword, courseDetails);

    if (currentIsSaved) {
      const updatedCourseList = savedCourse[keyword].filter(
        (course: CourseDetails) =>
          !Object.entries(course).every(([key, value]) => value?.id === courseDetails[key as CourseType]?.id),
      );

      if (updatedCourseList.length === 0) {
        delete savedCourse[keyword];
      } else {
        savedCourse[keyword] = updatedCourseList;
      }

      localStorage.setItem('savedCourse', JSON.stringify(savedCourse));
      setIsSaved(false);
    } else {
      savedCourse[keyword] = [...(savedCourse[keyword] || []), courseDetails];

      localStorage.setItem('savedCourse', JSON.stringify(savedCourse));
      setIsSaved(true);
    }
  };

  useEffect(() => {
    if (keyword && courseDetails) {
      setIsSaved(checkIsSaved(keyword, courseDetails));
    }
  }, [keyword, courseDetails]);

  return { isSaved, handleSaveCourse };
};

export default useSaveCourse;
