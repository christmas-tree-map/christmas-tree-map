import requestAPI from './requestAPI';

interface Feeds {
  id: number;
  name: string;
  createdAt: string;
  imageUrl: string;
  likeCount: number;
  content: string;
}

export const getFeeds = async () => {
  const { data } = await requestAPI.get('/feeds');
  return data as Feeds[];
};

interface PostFeedRequest {
  imageUrl: string;
  content: string;
}

export const postFeed = async ({ imageUrl, content }: PostFeedRequest) => {
  await requestAPI.post('/feed', { imageUrl, content });
};
