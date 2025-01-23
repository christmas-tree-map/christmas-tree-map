import { Course, CourseDetails } from '@/pages/Course/Course.type';
import requestAPI from '@/apis/requestAPI';

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
