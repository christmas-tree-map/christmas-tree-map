import requestAPI from './requestAPI';

interface PostTreeRequest {
  latitude: number;
  longitude: number;
  imageCode: string;
}

export const postTree = async ({ latitude, longitude, imageCode }: PostTreeRequest) => {
  return await requestAPI.post<number>('/tree', { latitude, longitude, imageCode });
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
  return await requestAPI.get<GetTreesResponse[]>('/tree', { latitude, longitude });
};
