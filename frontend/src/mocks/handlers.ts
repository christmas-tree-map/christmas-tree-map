import { HttpResponse, http } from 'msw';

import mockFeeds from './feeds.json';

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('https://example.com/user', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    });
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
