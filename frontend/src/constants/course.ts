import { CourseType } from '@/pages/Course/Course.type';
import courseMarker1 from '@/assets/course/courseMarker1.png';
import courseMarker2 from '@/assets/course/courseMarker2.png';
import courseMarker3 from '@/assets/course/courseMarker3.png';
import courseMarker4 from '@/assets/course/courseMarker4.png';

export const COURSE_TEXT: Record<CourseType, string> = {
  lunch: '점심',
  cafe: '카페',
  attraction: '놀거리',
  dinner: '저녁',
};

export const COURSE_MARKER: Record<CourseType, string> = {
  lunch: courseMarker1,
  cafe: courseMarker2,
  attraction: courseMarker3,
  dinner: courseMarker4,
};

export const DEFAULT_COURSE_DETAILS: Record<CourseType, null> = {
  lunch: null,
  cafe: null,
  attraction: null,
  dinner: null,
};
