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

interface GetTreesRequest {
  latitude: number;
  longitude: number;
}

interface GetTreesResponse extends GetTreesRequest {
  id: number;
  imageCode: string;
}

export const getTrees = async ({ latitude, longitude }: GetTreesRequest) => {
  const { data } = await requestAPI.get<{ data: GetTreesResponse[] }>('/tree/filter', { latitude, longitude });
  return data;
};
