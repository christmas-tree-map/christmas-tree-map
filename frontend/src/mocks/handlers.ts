import { HttpResponse, http } from 'msw';
import { API_URL } from '@/apis/requestAPI';
import mockFeeds from './feeds.json';
import mockTrees from './trees.json';

export const handlers = [
  http.get(`${API_URL}/feeds`, () => {
    return HttpResponse.json({ status: 200, data: mockFeeds });
  }),

  http.post(`${API_URL}/feed`, async ({ request }) => {
    try {
      const formData = await request.formData();
      const imageFile = formData.get('image') as File; //
      const requestData = formData.get('request');

      if (!imageFile || !requestData) {
        return HttpResponse.json({ message: '이미지와 요청 데이터가 필요합니다.' }, { status: 400 });
      }

      const parsedRequest = JSON.parse(requestData as string);
      const { treeId, content, password } = parsedRequest;

      const newFeed = {
        id: mockFeeds.length + 1,
        name: '토끼',
        imageUrl: '',
        content,
        createdAt: new Date().toISOString(),
        likeCount: 0,
        treeId,
        password,
      };

      mockFeeds.push(newFeed);

      return HttpResponse.json({ message: '피드가 성공적으로 추가되었습니다.', data: newFeed }, { status: 200 });
    } catch (error) {
      console.error('MSW 핸들러 에러:', error);

      return HttpResponse.json({ message: '서버 에러가 발생했습니다.' }, { status: 500 });
    }
  }),

  http.post(`${API_URL}/tree`, async () => {
    return HttpResponse.json({ status: 200, data: 1 });
  }),

  http.get(`${API_URL}/tree/filter`, async ({ request }) => {
    const url = new URL(request.url);
    const latitude = url.searchParams.get('latitude');
    const longitude = url.searchParams.get('longitude');

    if (!latitude || !longitude) {
      return HttpResponse.json({ message: '위도와 경도가 필요합니다.' }, { status: 400 });
    }

    return HttpResponse.json({ status: 200, data: mockTrees });
  }),
];
