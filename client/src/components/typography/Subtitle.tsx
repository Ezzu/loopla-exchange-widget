import styled from '@emotion/styled';
import type { SubtitleProps } from 'types';

const Subtitle = styled.p<SubtitleProps>`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 300;
  opacity: 0.95;
  color: ${({ color }) => color || 'inherit'};
`;

export default Subtitle;
