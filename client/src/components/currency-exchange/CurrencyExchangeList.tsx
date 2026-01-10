import styled from '@emotion/styled';
import type { CurrencyExchangeListProps } from 'types';
import { useExchangeRates } from 'hooks';
import {
  Button,
  CardContainer,
  CurrencyCard,
  Footer,
  Header,
  InlineError,
  LoadingSpinner,
  Title,
} from 'components';
import { EmptyMessage } from '../messages';
import { COLORS } from 'constants';

const CurrencyExchangeList = ({
  baseCurrency = 'GBP',
  targetCurrencies = ['USD', 'EUR', 'CHF', 'AUD', 'CAD'],
  refreshInterval,
}: CurrencyExchangeListProps) => {
  const { rates, loading, error, refetch } = useExchangeRates({
    baseCurrency,
    targetCurrencies,
    refreshInterval,
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <InlineError error={error} onRetry={refetch} />;
  }

  if (rates.length === 0) {
    return <EmptyMessage>No exchange rates available</EmptyMessage>;
  }

  return (
    <>
      <Header>
        <Title>Exchange Rates</Title>
        <BaseCurrency>Base: {baseCurrency}</BaseCurrency>
      </Header>

      <CardContainer>
        {rates.map(({ currency, rate, change }) => (
          <CurrencyCard
            key={currency}
            fromCurrency={baseCurrency}
            toCurrency={currency}
            rate={rate}
            change={change}
          />
        ))}
      </CardContainer>

      <Footer>
        <Button onClick={refetch}>Refresh Rates</Button>
      </Footer>
    </>
  );
};

const BaseCurrency = styled.p`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.TEXT_LIGHT_GRAY};
`;

export default CurrencyExchangeList;
