import { ApiError } from './api-error';

export class ExternalApiError extends ApiError {
  constructor(message: string, code?: string) {
    super(message, 424, code);
    this.name = 'ExternalApiError';
  }
}
