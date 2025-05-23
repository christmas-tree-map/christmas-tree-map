import requestAPI from './requestAPI';

interface Feeds {
  id: number;
  treeImageCode: string;
  nickname: string;
  updatedAt: string;
  imageUrl: string;
  content: string;
  likeCount: number;
}

export const getFeeds = async (treeId: number) => {
  return await requestAPI.get<Feeds[]>('/feed', { treeId });
};

interface PostFeedRequest {
  imageFile: File;
  treeId: number;
  content: string;
  password: string;
}

export const postFeed = async ({ imageFile, treeId, content, password }: PostFeedRequest) => {
  const formData = new FormData();
  const value = { treeId, content, password };
  const blob = new Blob([JSON.stringify(value)], { type: 'application/json' });

  formData.append('image', imageFile);
  formData.append('request', blob);

  await requestAPI.post('/feed', formData);
};

interface PostLikeFeedRequest {
  feedId: number;
}

export const postLikeFeed = async ({ feedId }: PostLikeFeedRequest) => {
  await requestAPI.post<number>(`/feed/${feedId}/like`);
};

interface DeleteLikeFeedRequest {
  feedId: number;
}

export const deleteLikeFeed = async ({ feedId }: DeleteLikeFeedRequest) => {
  await requestAPI.delete(`/feed/${feedId}/like`);
};
