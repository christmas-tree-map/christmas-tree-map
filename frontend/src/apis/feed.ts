// 아직 API 논의 전이라 임시로 fetch 사용하여 구현
import requestAPI from './requestAPI';

export const getFeeds = async () => {
  const { data } = await requestAPI.get('/feeds');
  return data;
};

interface PostFeedRequest {
  imageUrl: string;
  content: string;
}

export const postFeed = async ({ imageUrl, content }: PostFeedRequest) => {
  await requestAPI.post('/feed', { imageUrl, content });
};
