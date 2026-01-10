import { ExternalApiError } from './external-api-error';

export class MissingAccessKeyError extends ExternalApiError {
  constructor() {
    super('Missing API access key', 'missing_access_key');
    this.name = 'MissingAccessKeyError';
  }
}
