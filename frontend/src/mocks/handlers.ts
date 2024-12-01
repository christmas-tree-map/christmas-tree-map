import { HttpResponse, http } from 'msw';
import mockFeeds from './feeds.json';

import mockFeeds from './feeds.json';

export const handlers = [
  http.get('/api/feeds', () => {
    return HttpResponse.json(mockFeeds);
  }),

  http.post('/api/feed', async ({ request }) => {
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

  http.get('example.com/feeds', () => {
    return HttpResponse.json(mockFeeds);
  }),

  http.post('example.com/feed', async ({ request }) => {
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
