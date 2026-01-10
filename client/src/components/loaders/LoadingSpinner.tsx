import { CenteredContainer, LoadingText, Spinner } from 'components';

const LoadingSpinner = () => (
  <CenteredContainer>
    <Spinner />
    <LoadingText>Loading exchange rates...</LoadingText>
  </CenteredContainer>
);

export default LoadingSpinner;
