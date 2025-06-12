import { HttpResponse, http } from 'msw';
import { API_URL } from '@/apis/requestAPI';
import mockFeeds from '../data/feeds.json';

// eslint-disable-next-line prefer-const
let feeds = [...mockFeeds];

export const handlers = [
  http.get(`${API_URL}/feed`, () => {
    return HttpResponse.json(feeds);
  }),

  http.post(`${API_URL}/feed`, async ({ request }) => {
    try {
      const formData = await request.formData();
      const imageFile = formData.get('image') as File;
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
      return HttpResponse.json(newFeed.id);
    } catch (error) {
      console.error('MSW 핸들러 에러:', error);

      return HttpResponse.json({ message: '서버 에러가 발생했습니다.' }, { status: 500 });
    }
  }),

  http.patch(`${API_URL}/feed/:id`, async ({ request }) => {
    try {
      const url = new URL(request.url);
      const feedId = Number(url.pathname.split('/').at(-1));

      const formData = await request.formData();
      const imageFile = formData.get('image') as File;
      const requestData = formData.get('request');

      if (!imageFile || !requestData) {
        return HttpResponse.json({ message: '이미지와 요청 데이터가 필요합니다.' }, { status: 400 });
      }
      if (!feedId) {
        return HttpResponse.json({ message: 'feedId가 없습니다.' }, { status: 400 });
      }

      const parsedRequest = JSON.parse(requestData as string);
      const { content }: { content: string } = parsedRequest;

      const previousFeed = mockFeeds.find((feed) => feed.id === feedId);

      if (!previousFeed) {
        return HttpResponse.json({ message: '피드를 찾을 수 없습니다.' }, { status: 404 });
      }

      const newFeed = {
        ...previousFeed,
        updatedAt: '2024-11-25T03:11:24.851Z',
        content,
      };

      const feedIndex = mockFeeds.findIndex((feed) => feed.id === feedId);
      mockFeeds[feedIndex] = newFeed;

      return HttpResponse.json(newFeed.id);
    } catch (error) {
      console.error('MSW 핸들러 에러:', error);

      return HttpResponse.json({ message: '서버 에러가 발생했습니다.' }, { status: 500 });
    }
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

  http.post(`${API_URL}/feed/:feedId/verify-password`, async () => {
    return HttpResponse.json(true);
  }),

  http.delete(`${API_URL}/feed/:feedId`, async ({ request }) => {
    const url = new URL(request.url);
    const feedId = Number(url.pathname.split('/').at(-1));
    feeds = feeds.filter((feed) => feed.id !== feedId);
    return HttpResponse.json({ status: 200, feedId });
  }),
];
