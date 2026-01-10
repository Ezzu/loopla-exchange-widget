import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { COLORS } from 'constants';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${COLORS.PRIMARY};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default Spinner;
