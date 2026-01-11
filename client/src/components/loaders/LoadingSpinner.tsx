import { FormattedMessage } from 'react-intl';
import { CenteredContainer, LoadingText, Spinner } from 'components';

const LoadingSpinner = () => (
  <CenteredContainer>
    <Spinner />
    <LoadingText>
      <FormattedMessage id="loading.text" />
    </LoadingText>
  </CenteredContainer>
);

export default LoadingSpinner;
