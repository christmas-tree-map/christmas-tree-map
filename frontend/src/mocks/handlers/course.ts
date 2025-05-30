import { HttpResponse, http } from 'msw';
import { API_URL } from '@/apis/requestAPI';
import mockAttractions from '@/mocks/data/attractions.json';
import mockCourses from '../data/courses.json';

export const handlers = [
  http.get(`${API_URL}/course`, async () => {
    return HttpResponse.json(mockCourses);
  }),

  http.get(`${API_URL}/attraction`, () => {
    return HttpResponse.json(mockAttractions);
  }),
];
