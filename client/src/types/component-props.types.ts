import type { IconType } from 'react-icons';

// Typography Component Props
export interface TitleProps {
  color?: string;
}

export interface SubtitleProps {
  color?: string;
}

export interface FooterTextProps {
  color?: string;
}

// Icon Component Props
export interface IconProps {
  icon: IconType;
  size?: number;
}

// Error Component Props
export interface InlineErrorProps {
  error: string;
  onRetry?: () => void;
}

// Currency Exchange Component Props
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
