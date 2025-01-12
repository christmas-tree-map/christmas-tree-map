import requestAPI from '@/apis/requestAPI';

export interface CourseDetail {
  id: number;
  place_name: string;
  address_name: string;
  phone: string;
}

export interface CourseDetails {
  lunch: CourseDetail | null;
  cafe: CourseDetail | null;
  attraction: CourseDetail | null;
  dinner: CourseDetail | null;
}

export const getCourseDetails = async (latitude: string, longitude: string) => {
  return await requestAPI.get<CourseDetails>('/course', { latitude, longitude });
};
