import styled from '@emotion/styled';
import type { TextProps } from 'types';
import { COLORS, FONT_SIZES, FONT_WEIGHTS } from 'constants';

const Text = ({ children, size = 'md', weight = 'normal', color }: TextProps) => (
  <StyledText size={size} weight={weight} color={color}>
    {children}
  </StyledText>
);

const StyledText = styled.span<{ size: string; weight: string; color?: string }>`
  font-size: ${({ size }) => FONT_SIZES[size as keyof typeof FONT_SIZES]};
  font-weight: ${({ weight }) => FONT_WEIGHTS[weight as keyof typeof FONT_WEIGHTS]};
  color: ${({ color }) => color || COLORS.TEXT_PRIMARY};
`;

export default Text;
