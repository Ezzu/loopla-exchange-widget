import styled from '@emotion/styled';
import { COLORS } from 'constants';
import { Button } from 'components';

const DangerButton = styled(Button)`
  background: ${COLORS.DANGER};

  &:hover {
    background: #c0392b;
  }
`;

export default DangerButton;
