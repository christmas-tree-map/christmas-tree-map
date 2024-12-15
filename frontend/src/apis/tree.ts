import requestAPI from './requestAPI';

interface PostTreeRequest {
  latitude: number;
  longitude: number;
  imageCode: string;
}

export const postTree = async ({ latitude, longitude, imageCode }: PostTreeRequest) => {
  const { data } = await requestAPI.post<{ data: number }>('/tree', { latitude, longitude, imageCode });
  return data;
};
