import { useState } from 'react';
import { CourseDetails } from '@/pages/Course/Course.type';

export interface SavedCourse {
  x: string;
  y: string;
  courseDetails: CourseDetails[];
}

export type SavedCourseMap = Map<string, SavedCourse>;

const STORAGE_KEY = 'SAVED_COURSE';

export const useSavedCourseMap = () => {
  const [savedCourseMap, setSavedCourseMap] = useState<SavedCourseMap>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return new Map();

    try {
      const parsedData = JSON.parse(savedData);
      return new Map(Object.entries(parsedData));
    } catch {
      return new Map();
    }
  });

  const updateStorage = (newMap: SavedCourseMap) => {
    setSavedCourseMap(newMap);
    const obj = Object.fromEntries(newMap);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  };

  const saveCourse = (keyword: string, courseDetails: CourseDetails, x: string, y: string) => {
    if (x === '' || y === '') return;

    const newMap = new Map(savedCourseMap);
    const existingCourse = newMap.get(keyword);

    if (existingCourse) {
      newMap.set(keyword, {
        ...existingCourse,
        courseDetails: [...existingCourse.courseDetails, courseDetails],
      });
    } else {
      newMap.set(keyword, {
        x,
        y,
        courseDetails: [courseDetails],
      });
    }
    updateStorage(newMap);
  };

  const removeCourse = (keyword: string, courseDetails: CourseDetails) => {
    const newMap = new Map(savedCourseMap);
    const savedCourse = newMap.get(keyword);

    if (!savedCourse) return newMap;

    const updatedCourseList = savedCourse.courseDetails.filter(
      (course) =>
        !Object.entries(course).every(([key, value]) => value?.id === courseDetails[key as keyof CourseDetails]?.id),
    );

    if (updatedCourseList.length === 0) {
      newMap.delete(keyword);
    } else {
      newMap.set(keyword, {
        ...savedCourse,
        courseDetails: updatedCourseList,
      });
    }

    updateStorage(newMap);
  };

  const isSaved = (keyword: string, courseDetails: CourseDetails): boolean => {
    const savedCourse = savedCourseMap.get(keyword);
    if (!savedCourse) return false;

    return savedCourse.courseDetails.some((saved) =>
      Object.entries(saved).every(([key, value]) => value?.id === courseDetails[key as keyof CourseDetails]?.id),
    );
  };

  const getSavedCourses = (keyword: string) => {
    return savedCourseMap.get(keyword)?.courseDetails || [];
  };

  const getSavedKeywords = () => {
    return Array.from(savedCourseMap.keys());
  };

  return {
    savedCourseMap,
    saveCourse,
    removeCourse,
    isSaved,
    getSavedCourses,
    getSavedKeywords,
  };
};
