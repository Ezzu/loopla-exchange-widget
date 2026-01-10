import { DangerButton, ErrorContainer, ErrorText } from 'components';

interface InlineErrorProps {
  error: string;
  onRetry: () => void;
}

const InlineError = ({ error, onRetry }: InlineErrorProps) => (
  <ErrorContainer>
    <ErrorText>{error}</ErrorText>
    <DangerButton onClick={onRetry}>Retry</DangerButton>
  </ErrorContainer>
);

export default InlineError;
