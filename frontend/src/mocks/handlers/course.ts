import { HttpResponse } from 'msw';
import { http } from 'msw';
import { API_URL } from '@/apis/requestAPI';
import mockAttractions from '@/mocks/data/attractions.json';

export const handlers = [
  http.get(`${API_URL}/attraction`, () => {
    return HttpResponse.json(mockAttractions);
  }),
];
