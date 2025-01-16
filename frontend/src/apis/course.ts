import { Attraction } from '@/pages/Course/Course.type';
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

interface GetAttractionsRequest {
  latitude: number;
  longitude: number;
}

export const getAttractions = async ({ latitude, longitude }: GetAttractionsRequest) => {
  const { attractions } = await requestAPI.get<{ attractions: Attraction[] }>('/attraction', { latitude, longitude });
  return attractions;
};
