import { useState, useMemo, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
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
  Text,
  EmptyMessage,
  MainContent,
} from 'components';
import { CURRENCY_LIST, DEFAULT_TARGET_CURRENCY, COLORS, type CurrencyCode } from 'constants';
import { getTimeAgo } from 'utils';

const CurrencyExchangeList = () => {
  const intl = useIntl();
  const [targetCurrency, setTargetCurrency] = useState<CurrencyCode>(DEFAULT_TARGET_CURRENCY);

  const handleCurrencyChange = useCallback(
    (value: string) => setTargetCurrency(value as CurrencyCode),
    []
  );

  const { rates, loading, error, refetch, lastUpdated } = useExchangeRates({
    baseCurrency: targetCurrency,
  });

  const currencyOptions = useMemo(
    () =>
      CURRENCY_LIST.map((currency) => ({
        value: currency.code,
        label: `${currency.flag} ${currency.code} - ${currency.name}`,
      })),
    []
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <InlineError error={error} onRetry={refetch} />;
  }

  if (rates.length === 0) {
    return (
      <EmptyMessage>
        <FormattedMessage id="exchangeRates.noRates" />
      </EmptyMessage>
    );
  }

  return (
    <>
      <Header>
        <Title>
          <FormattedMessage id="exchangeRates.title" />
        </Title>
        <Select
          label={intl.formatMessage({ id: 'exchangeRates.convertTo' })}
          value={targetCurrency}
          options={currencyOptions}
          onChange={handleCurrencyChange}
        />
      </Header>

      <CardContainer>
        {rates.map(({ currency, rate }) => (
          <CurrencyCard key={currency} currency={currency} rate={rate} />
        ))}
      </CardContainer>
      <Footer>
        <Button onClick={() => refetch(true)}>
          <FormattedMessage id="exchangeRates.refreshButton" />
        </Button>
        <MainContent>
          {lastUpdated && (
            <Text size="sm" color={COLORS.TEXT_GRAY}>
              <FormattedMessage
                id="exchangeRates.lastUpdated"
                values={{ time: getTimeAgo(lastUpdated) }}
              />
            </Text>
          )}
        </MainContent>
      </Footer>
    </>
  );
};

export default CurrencyExchangeList;
