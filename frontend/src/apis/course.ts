import { Course } from '@/pages/Course/Course.type';
import requestAPI from '@/apis/requestAPI';

export interface CourseDetails {
  lunch: Course | null;
  cafe: Course | null;
  attraction: Course | null;
  dinner: Course | null;
}

export const getCourseDetails = async (latitude: string, longitude: string) => {
  return await requestAPI.get<CourseDetails>('/course', { latitude, longitude });
};

interface GetAttractionsRequest {
  latitude: number;
  longitude: number;
}

export const getAttractions = async ({ latitude, longitude }: GetAttractionsRequest) => {
  const { attractions } = await requestAPI.get<{ attractions: Course[] }>('/attraction', { latitude, longitude });
  return attractions;
};
