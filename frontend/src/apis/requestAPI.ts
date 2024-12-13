import ApiError from './apiError';

/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = '/api'; // TODO: 주소 수정하기

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface ApiMethodsProps {
  method: HttpMethod;
  endpoint: string;
  body?: Record<string, any>;
}

const requestAPI = {
  async apiMethods<T>({ method, endpoint, body }: ApiMethodsProps): Promise<T> {
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
        throw new ApiError(endpoint, response.status);
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Http error! ${error.message}`);
      }

      throw error;
    }
  },

  get<T>(endpoint: string): Promise<T> {
    return this.apiMethods<T>({ method: 'GET', endpoint });
  },

  post<T>(endpoint: string, body?: Record<string, any>): Promise<T> {
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
