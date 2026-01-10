import styled from '@emotion/styled';

interface FooterTextProps {
  color?: string;
}

const FooterText = styled.p<FooterTextProps>`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 300;
  color: ${({ color }) => color || 'inherit'};
`;

export default FooterText;
