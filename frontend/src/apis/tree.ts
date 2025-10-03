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
  distance: number;
}

export const getTrees = async ({ latitude, longitude }: GetTreesRequest) => {
  return await requestAPI.get<GetTreesResponse[]>('/tree', { latitude, longitude });
};

interface GetTreeByClusterRequest {
  zoom: number;
  tl_latitude: number;
  tl_longitude: number;
  br_latitude: number;
  br_longitude: number;
}

interface GetTreeByClusterResponse {
  latitude: number;
  longitude: number;
  count: number;
}

export const getTreeByCluster = async ({
  zoom,
  tl_latitude,
  tl_longitude,
  br_latitude,
  br_longitude,
}: GetTreeByClusterRequest) => {
  return await requestAPI.get<GetTreeByClusterResponse[]>(
    `/tree/cluster?zoom=${zoom}&tl_latitude=${tl_latitude}&tl_longitude=${tl_longitude}&br_latitude=${br_latitude}&br_longitude=${br_longitude}`,
  );
};
