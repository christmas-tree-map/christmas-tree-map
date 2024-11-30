const API_URL = 'https://example.com'; // TODO: 주소 수정하기

interface ApiMethodsProps {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  endpoint: string;
  body?: object;
}

const apiMethods = async ({ method, endpoint, body }: ApiMethodsProps) => {
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
      throw new Error(`Status: ${response.status}`);
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
  get: (endpoint: string) => apiMethods({ method: 'GET', endpoint }),
  post: (endpoint: string, body: object) => apiMethods({ method: 'POST', endpoint, body }),
  patch: (endpoint: string, body: object) => apiMethods({ method: 'PATCH', endpoint, body }),
  delete: (endpoint: string) => apiMethods({ method: 'DELETE', endpoint }),
};

export default requestAPI;
