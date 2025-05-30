import ApiError from './apiError';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const API_URL = import.meta.env.VITE_API_URL;

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface ApiMethodsProps {
  method: HttpMethod;
  endpoint: string;
  queryParams?: Record<string, string | number | boolean>;
  body?: Record<string, any> | FormData;
}

const requestAPI = {
  async apiMethods<T>({ method, endpoint, queryParams, body }: ApiMethodsProps): Promise<T> {
    const url = new URL(`${API_URL}${endpoint}`);
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const isFormData = body instanceof FormData;
    const options: RequestInit = {
      method,
      headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await fetch(url.toString(), options);

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

  get<T>(endpoint: string, queryParams?: Record<string, string | number | boolean>): Promise<T> {
    return this.apiMethods<T>({ method: 'GET', endpoint, queryParams });
  },

  post<T>(
    endpoint: string,
    body?: Record<string, any> | FormData,
    queryParams?: Record<string, string | number | boolean>,
  ): Promise<T> {
    return this.apiMethods<T>({ method: 'POST', endpoint, body, queryParams });
  },

  patch<T>(
    endpoint: string,
    body?: Record<string, any>,
    queryParams?: Record<string, string | number | boolean>,
  ): Promise<T> {
    return this.apiMethods<T>({ method: 'PATCH', endpoint, body, queryParams });
  },

  delete(endpoint: string, queryParams?: Record<string, string | number | boolean>): Promise<void> {
    return this.apiMethods({ method: 'DELETE', endpoint, queryParams });
  },
};

export default requestAPI;
