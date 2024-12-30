import { HttpResponse, http } from 'msw';
import { API_URL } from '@/apis/requestAPI';
import mockTrees from '../data/trees.json';

export const handlers = [
  http.get(`${API_URL}/tree`, async () => {
    return HttpResponse.json(mockTrees);
  }),

  http.post(`${API_URL}/tree`, async () => {
    return HttpResponse.json(1);
  }),
];
