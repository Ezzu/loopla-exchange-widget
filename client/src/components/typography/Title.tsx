import styled from '@emotion/styled';
import { COLORS } from 'constants';
import type { TitleProps } from 'types';

const Title = styled.h2<TitleProps>`
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ color }) => color || COLORS.TEXT_PRIMARY};
`;

export default Title;
