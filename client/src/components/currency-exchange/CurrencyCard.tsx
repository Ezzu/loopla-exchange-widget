import styled from '@emotion/styled';
import type { CurrencyCardProps } from 'types';
import {
  formatCurrencyRate,
  formatPercentageChange,
  getChangeIndicator,
  getCurrencySymbol,
} from 'utils';
import { ArrowRightIcon, Card } from 'components';
import { COLORS } from 'constants';

const CurrencyCard = ({ fromCurrency, toCurrency, rate, change }: CurrencyCardProps) => {
  const changeVariant = change
    ? change > 0
      ? 'positive'
      : change < 0
        ? 'negative'
        : 'neutral'
    : 'neutral';

  return (
    <Card>
      <CurrencyPair>
        <CurrencyInfo>
          <CurrencySymbol>{getCurrencySymbol(fromCurrency)}</CurrencySymbol>
          <CurrencyCode>{fromCurrency}</CurrencyCode>
        </CurrencyInfo>
        <ArrowIconWrapper>
          <ArrowRightIcon size={20} />
        </ArrowIconWrapper>
        <CurrencyInfo>
          <CurrencySymbol>{getCurrencySymbol(toCurrency)}</CurrencySymbol>
          <CurrencyCode>{toCurrency}</CurrencyCode>
        </CurrencyInfo>
      </CurrencyPair>

      <RateInfo>
        <RateValue>{formatCurrencyRate(rate)}</RateValue>
        {change !== undefined && (
          <RateChange variant={changeVariant}>
            <ChangeIndicator>{getChangeIndicator(change)}</ChangeIndicator>
            <span>{formatPercentageChange(change)}</span>
          </RateChange>
        )}
      </RateInfo>
    </Card>
  );
};

const CurrencyPair = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CurrencyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CurrencySymbol = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${COLORS.TEXT_PRIMARY};
`;

const CurrencyCode = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.TEXT_LIGHT_GRAY};
  text-transform: uppercase;
`;

const ArrowIconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${COLORS.NEUTRAL};
`;

const RateInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;

const RateValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLORS.TEXT_PRIMARY};
`;

const RateChange = styled.div<{ variant: 'positive' | 'negative' | 'neutral' }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ variant }) =>
    variant === 'positive'
      ? COLORS.SUCCESS
      : variant === 'negative'
        ? COLORS.DANGER
        : COLORS.NEUTRAL};
`;

const ChangeIndicator = styled.span`
  font-size: 1rem;
`;

export default CurrencyCard;
