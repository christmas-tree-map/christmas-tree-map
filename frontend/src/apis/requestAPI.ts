/* eslint-disable @typescript-eslint/no-explicit-any */
export const API_URL = '/api'; // TODO: 주소 수정하기

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface ApiMethodsProps {
  method: HttpMethod;
  endpoint: string;
  body?: Record<string, any> | FormData;
}

const requestAPI = {
  async apiMethods<T>({ method, endpoint, body }: ApiMethodsProps): Promise<T> {
    const isFormData = body instanceof FormData;
    const options: RequestInit = {
      method,
      headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
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
  },

  get<T>(endpoint: string): Promise<T> {
    return this.apiMethods<T>({ method: 'GET', endpoint });
  },

  post<T>(endpoint: string, body?: Record<string, any> | FormData): Promise<T> {
    return this.apiMethods<T>({ method: 'POST', endpoint, body });
  },

  patch<T>(endpoint: string, body?: Record<string, any>): Promise<T> {
    return this.apiMethods<T>({ method: 'PATCH', endpoint, body });
  },

  delete(endpoint: string): Promise<void> {
    return this.apiMethods({ method: 'DELETE', endpoint });
  },
};

export default requestAPI;
