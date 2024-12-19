class ApiError extends Error {
  endpoint: string;
  statusCode: number;

  constructor(endpoint: string, statusCode: number) {
    super(`endpoint = ${endpoint}`);

    this.name = 'ApiError';
    this.endpoint = endpoint;
    this.statusCode = statusCode;
  }
}

export default ApiError;
