import { HttpResponse, http } from 'msw';
import { API_URL } from '@/apis/requestAPI';
import mockClusters from '../data/clusters.json';
import mockTrees from '../data/trees.json';

export const handlers = [
  http.get(`${API_URL}/tree/in-bounds`, async () => {
    return HttpResponse.json(mockTrees);
  }),

  http.get(`${API_URL}/tree/near`, async () => {
    return HttpResponse.json(mockTrees);
  }),

  http.post(`${API_URL}/tree`, async () => {
    return HttpResponse.json(1);
  }),

  // 클러스터링
  http.get(`${API_URL}/tree/cluster`, async () => {
    return HttpResponse.json(mockClusters);
  }),
];
