import { ExternalApiError } from './external-api-error';

export class BaseCurrencyRestrictedError extends ExternalApiError {
  constructor() {
    super('Base currency access is restricted', 'base_currency_access_restricted');
    this.name = 'BaseCurrencyRestrictedError';
  }
}
