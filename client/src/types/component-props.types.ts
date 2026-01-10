import type { IconType } from 'react-icons';
import type { ReactNode } from 'react';

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

export interface TextProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
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

// Form Component Props
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  label?: string;
}

export interface CurrencyCardProps {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  change?: number;
}
