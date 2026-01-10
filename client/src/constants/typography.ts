export const FONT_SIZES = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '1.5rem',
} as const;

export const FONT_WEIGHTS = {
  light: '400',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export type FontSize = keyof typeof FONT_SIZES;
export type FontWeight = keyof typeof FONT_WEIGHTS;
