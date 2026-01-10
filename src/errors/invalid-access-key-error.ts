import { ExternalApiError } from './external-api-error';

export class InvalidAccessKeyError extends ExternalApiError {
  constructor() {
    super('Invalid API access key', 'invalid_access_key');
    this.name = 'InvalidAccessKeyError';
  }
}
