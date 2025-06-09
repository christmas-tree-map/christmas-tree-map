import requestAPI from './requestAPI';

interface Feed {
  id: number;
  treeImageCode: string;
  nickname: string;
  updatedAt: string;
  imageUrl: string;
  content: string;
  likeCount: number;
}

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
  feedId: number;
  data: FormDataRequest;
}

export const updateFeed = async ({ feedId, data }: UpdateFeedRequest) => {
  const formData = createFormData(data);
  await requestAPI.patch(`/feed/${feedId}`, formData);
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
