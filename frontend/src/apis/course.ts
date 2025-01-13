import { Attraction } from '@/pages/Course/Course.type';
import requestAPI from './requestAPI';

interface GetAttractionsRequest {
  latitude: number;
  longitude: number;
}

export const getAttractions = async ({ latitude, longitude }: GetAttractionsRequest) => {
  const { attractions } = await requestAPI.get<{ attractions: Attraction[] }>('/attraction', { latitude, longitude });
  return attractions;
};
