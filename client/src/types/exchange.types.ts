export interface ExchangeRate {
  currency: string;
  rate: number;
  change?: number;
}

export interface CurrencyExchangeListProps {
  baseCurrency?: string;
  targetCurrencies?: string[];
  refreshInterval?: number;
}

export interface CurrencyCardProps {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  change?: number;
}
