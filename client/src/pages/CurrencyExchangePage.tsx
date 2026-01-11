import { FormattedMessage } from 'react-intl';
import {
  Container,
  CurrencyExchangeList,
  Footer,
  FooterText,
  Header,
  MainContent,
  PageWrapper,
  Subtitle,
  Title,
} from 'components';
import { COLORS } from 'constants';

const CurrencyExchangePage = () => (
  <PageWrapper>
    <Header>
      <Title color={COLORS.TEXT_WHITE}>
        <FormattedMessage id="app.title" />
      </Title>
      <Subtitle color={COLORS.TEXT_WHITE}>
        <FormattedMessage id="app.subtitle" />
      </Subtitle>
    </Header>

    <MainContent>
      <Container>
        <CurrencyExchangeList />
      </Container>
    </MainContent>

    <Footer>
      <FooterText color={COLORS.TEXT_WHITE}>
        <FormattedMessage id="app.footer" />
      </FooterText>
    </Footer>
  </PageWrapper>
);

export default CurrencyExchangePage;
