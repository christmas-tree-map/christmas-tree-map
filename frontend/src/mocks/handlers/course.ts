import { HttpResponse, http } from 'msw';
import { API_URL } from '@/apis/requestAPI';
import mockCourses from '../data/courses.json';

export const handlers = [
  http.get(`${API_URL}/course`, async () => {
    return HttpResponse.json(mockCourses);
  }),
];
