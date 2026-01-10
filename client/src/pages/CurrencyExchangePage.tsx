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
      <Title color={COLORS.TEXT_WHITE}>Loopla Exchange Widget</Title>
      <Subtitle color={COLORS.TEXT_WHITE}>Real-time currency exchange rates</Subtitle>
    </Header>

    <MainContent>
      <Container>
        <CurrencyExchangeList />
      </Container>
    </MainContent>

    <Footer>
      <FooterText color={COLORS.TEXT_WHITE}>Powered by Exchange Rates API</FooterText>
    </Footer>
  </PageWrapper>
);

export default CurrencyExchangePage;
