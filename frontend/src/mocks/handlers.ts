import { HttpResponse, http } from 'msw';
import { API_URL } from '@/apis/requestAPI';
import mockFeeds from './feeds.json';
import mockTrees from './trees.json';

export const handlers = [
  http.get(`${API_URL}/feed`, () => {
    return HttpResponse.json(mockFeeds);
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
      const { content, likeCount } = parsedRequest;

      const newFeed = {
        id: mockFeeds.length + 1,
        treeImageCode: 'TREE_01',
        nickname: '토끼',
        updatedAt: new Date().toISOString(),
        imageUrl: 'https://picsum.photos/id/30/500',
        likeCount,
        content,
      };

      mockFeeds.push(newFeed);

      return HttpResponse.json(
        { message: '피드가 성공적으로 추가되었습니다.', data: newFeedWithRequiredFields },
        { status: 200 },
      );
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

  http.post(`${API_URL}/feed/:id/like`, async ({ request }) => {
    const url = new URL(request.url);
    const feedId = Number(url.pathname.split('/').at(-2));

    if (mockFeeds.some((feed) => feed.id === feedId)) {
      mockFeeds.forEach((feed, index) => {
        if (feed.id === feedId) {
          mockFeeds[index] = {
            ...feed,
            likeCount: feed.likeCount + 1,
          };
        }
      });
    }
    return HttpResponse.json({ status: 200 });
  }),

  http.post(`${API_URL}/feed/:id/like`, async ({ request }) => {
    const url = new URL(request.url);
    const feedId = Number(url.pathname.split('/').at(-2));

    if (mockFeeds.some((feed) => feed.id === feedId)) {
      mockFeeds.forEach((feed, index) => {
        if (feed.id === feedId) {
          mockFeeds[index] = {
            ...feed,
            likeCount: feed.likeCount + 1,
          };
        }
      });
    }
    return HttpResponse.json({ status: 200 });
  }),

  http.delete(`${API_URL}/feed/:id/like`, async ({ request }) => {
    const url = new URL(request.url);
    const feedId = Number(url.pathname.split('/').at(-2));

    if (mockFeeds.some((feed) => feed.id === feedId)) {
      mockFeeds.forEach((feed, index) => {
        if (feed.id === feedId) {
          mockFeeds[index] = {
            ...feed,
            likeCount: Math.max(0, feed.likeCount - 1),
          };
        }
      });
    }
    return HttpResponse.json({ status: 200 });
  }),
];
