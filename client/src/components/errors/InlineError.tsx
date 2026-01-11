import { FormattedMessage } from 'react-intl';
import { DangerButton, ErrorContainer, ErrorText } from 'components';
import type { InlineErrorProps } from 'types';

const InlineError = ({ error, onRetry }: InlineErrorProps) => (
  <ErrorContainer>
    <ErrorText>{error}</ErrorText>
    <DangerButton onClick={onRetry}>
      <FormattedMessage id="error.tryAgain" />
    </DangerButton>
  </ErrorContainer>
);

export default InlineError;
