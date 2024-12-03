/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = '/api'; // TODO: 주소 수정하기

interface ApiMethodsProps {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  endpoint: string;
  body?: object;
}

const apiMethods = async <T>({ method, endpoint, body }: ApiMethodsProps): Promise<T> => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Status: ${response.status}`); // TODO: message를 서버에서 받아올지, 아니면 따로 정의할지 논의
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Http error! ${error.message}`);
    }

    throw error;
  }
};

const requestAPI = {
  get: <T>(endpoint: string): Promise<T> => apiMethods<T>({ method: 'GET', endpoint }),
  post: <T>(endpoint: string, body: Record<string, any>): Promise<T> =>
    apiMethods<T>({ method: 'POST', endpoint, body }),
  patch: <T>(endpoint: string, body: Record<string, any>): Promise<T> =>
    apiMethods<T>({ method: 'PATCH', endpoint, body }),
  delete: (endpoint: string): Promise<void> => apiMethods({ method: 'DELETE', endpoint }),
};

export default requestAPI;
