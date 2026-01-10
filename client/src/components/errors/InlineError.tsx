import { DangerButton, ErrorContainer, ErrorText } from 'components';
import type { InlineErrorProps } from 'types';

const InlineError = ({ error, onRetry }: InlineErrorProps) => (
  <ErrorContainer>
    <ErrorText>{error}</ErrorText>
    <DangerButton onClick={onRetry}>Retry</DangerButton>
  </ErrorContainer>
);

export default InlineError;
