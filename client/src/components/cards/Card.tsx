import styled from '@emotion/styled';
import { COLORS } from 'constants';

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: ${COLORS.BG_WHITE};
  border: 1px solid ${COLORS.BORDER};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-color: ${COLORS.PRIMARY};
  }
`;

export default Card;
