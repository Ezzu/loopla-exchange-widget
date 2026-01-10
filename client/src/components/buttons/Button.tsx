import styled from '@emotion/styled';
import { COLORS } from 'constants';

const Button = styled.button`
  padding: 0.75rem 2rem;
  background: ${COLORS.PRIMARY};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2980b9;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default Button;
