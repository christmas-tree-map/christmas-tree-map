import { HttpResponse, http } from 'msw';

import mockFeeds from './feeds.json';

const API_URL = 'https://example.com'; // TODO: 주소 수정하기

export const handlers = [
  http.get(`${API_URL}/feeds`, () => {
    return HttpResponse.json({ status: 200, data: mockFeeds });
  }),

  http.post(`${API_URL}/feed`, async ({ request }) => {
    const data = (await request.json()) as { imageUrl: string; content: string };
    const newData = {
      id: mockFeeds.length + 1,
      name: '토끼',
      imageUrl: data.imageUrl,
      content: data.content,
      createdAt: new Date().toISOString(),
      likeCount: 0,
    };

    mockFeeds.push(newData);
    return HttpResponse.json({ status: 200 });
  }),
];
