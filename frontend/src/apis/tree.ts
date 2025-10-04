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
  tr_latitude: number;
  tr_longitude: number;
  bl_latitude: number;
  bl_longitude: number;
}

interface GetTreeByClusterResponse {
  latitude: number;
  longitude: number;
  count: number;
}

export const getTreeByCluster = async ({
  zoom,
  tr_latitude,
  tr_longitude,
  bl_latitude,
  bl_longitude,
}: GetTreeByClusterRequest) => {
  return await requestAPI.get<GetTreeByClusterResponse[]>(
    `/tree/cluster?zoom=${zoom}&tr_latitude=${tr_latitude}&tr_longitude=${tr_longitude}&bl_latitude=${bl_latitude}&bl_longitude=${bl_longitude}`,
  );
};
