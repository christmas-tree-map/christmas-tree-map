import { Feed } from '@/types/feed.type';
import requestAPI from './requestAPI';

export const getFeed = async (feedId: string) => {
  return await requestAPI.get<Feed>(`/feed/${feedId}`);
};

export const getFeeds = async (treeId: number) => {
  return await requestAPI.get<Feed[]>('/feed', { treeId });
};

interface FormDataRequest {
  imageFile: File;
  treeId: number;
  content: string;
  password: string;
}

const createFormData = (data: FormDataRequest): FormData => {
  const formData = new FormData();
  const { treeId, content, password, imageFile } = data;
  const value = { treeId, content, password };
  const blob = new Blob([JSON.stringify(value)], { type: 'application/json' });

  formData.append('image', imageFile);
  formData.append('request', blob);

  return formData;
};

export const postFeed = async (data: FormDataRequest) => {
  const formData = createFormData(data);
  await requestAPI.post('/feed', formData);
};

interface UpdateFeedRequest {
  feedId: string;
  imageFile: File | null;
  content: string;
}

export const updateFeed = async ({ feedId, imageFile, content }: UpdateFeedRequest) => {
  if (!imageFile && !content) {
    console.error('imageFile과 content가 없습니다.');
    return;
  }

  const formData = new FormData();

  if (imageFile) {
    formData.append('image', imageFile);
  }

  const value = { content };
  const blob = new Blob([JSON.stringify(value)], { type: 'application/json' });

  formData.append('request', blob);

  await requestAPI.patch(`/feed/${feedId}`, formData);
};

interface DeleteFeedRequest {
  feedId: number;
  password: string;
}

export const deleteFeed = async ({ feedId, password }: DeleteFeedRequest) => {
  return await requestAPI.delete<number>(`/feed/${feedId}`, { password });
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

interface PostFeedPasswordRequest {
  feedId: number;
  password: string;
}

export const postFeedPassword = async ({ feedId, password }: PostFeedPasswordRequest) => {
  return await requestAPI.post<boolean>(`/feed/${feedId}/verify-password`, { password });
};
