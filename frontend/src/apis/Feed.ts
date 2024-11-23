// 아직 API 논의 전이라 임시로 fetch 사용하여 구현

const API_URL = 'example.com';

export const getFeeds = async () => {
  const data = await fetch(`${API_URL}/feeds`).then((response) => response.json());
  return data;
};