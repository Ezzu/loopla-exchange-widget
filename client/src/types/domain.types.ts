// Domain/Business Models
export interface ExchangeRate {
  currency: string;
  rate: number;
  change?: number;
}
