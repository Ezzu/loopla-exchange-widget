import { useState } from 'react';
import type { SelectOption } from 'types';
import { useExchangeRates } from 'hooks';
import {
  Button,
  CardContainer,
  CurrencyCard,
  Footer,
  Header,
  InlineError,
  LoadingSpinner,
  Select,
  Title,
} from 'components';
import { EmptyMessage } from '../messages';
import { CURRENCY_LIST, DEFAULT_TARGET_CURRENCY, type CurrencyCode } from 'constants';

const CurrencyExchangeList = () => {
  const [targetCurrency, setTargetCurrency] = useState<CurrencyCode>(DEFAULT_TARGET_CURRENCY);

  const handleCurrencyChange = (value: string) => setTargetCurrency(value as CurrencyCode);

  const { rates, loading, error, refetch } = useExchangeRates({
    baseCurrency: targetCurrency,
  });

  const currencyOptions: SelectOption[] = CURRENCY_LIST.map((currency) => ({
    value: currency.code,
    label: `${currency.flag} ${currency.code} - ${currency.name}`,
  }));

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
        <Select
          label="Convert to:"
          value={targetCurrency}
          options={currencyOptions}
          onChange={handleCurrencyChange}
        />
      </Header>

      <CardContainer>
        {rates.map(({ currency, rate }) => (
          <CurrencyCard
            key={currency}
            fromCurrency={currency}
            toCurrency={targetCurrency}
            rate={rate}
          />
        ))}
      </CardContainer>
      <Footer>
        <Button onClick={refetch}>Refresh Rates</Button>
      </Footer>
    </>
  );
};

export default CurrencyExchangeList;
