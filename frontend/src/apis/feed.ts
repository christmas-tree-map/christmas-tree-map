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
  const { data } = await requestAPI.get<{ data: Feeds[] }>('/feeds');
  return data;
};

interface PostFeedRequest {
  imageFile: File;
  treeId: number;
  content: string;
  password: string;
}

export const postFeed = async ({ imageFile, treeId, content, password }: PostFeedRequest) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('request', JSON.stringify({ treeId, content, password }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await requestAPI.post<{ data: any }>('/feed', formData);
};
