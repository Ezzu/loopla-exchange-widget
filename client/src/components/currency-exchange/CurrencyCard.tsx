import styled from '@emotion/styled';
import type { CurrencyCardProps } from 'types';
import { formatCurrencyRate, getCurrencySymbol, getCurrencyFlag } from 'utils';
import { ArrowRightIcon, Card, Text } from 'components';
import { COLORS } from 'constants';

const CurrencyCard = ({ fromCurrency, toCurrency, rate }: CurrencyCardProps) => (
  <Card>
    <CurrencyPair>
      <CurrencyInfo>
        <Flag>{getCurrencyFlag(fromCurrency)}</Flag>
        <CurrencyText>
          <Text size="md" weight="semibold">
            {fromCurrency}
          </Text>
          <Text size="sm" weight="medium" color={COLORS.TEXT_LIGHT_GRAY}>
            ({getCurrencySymbol(fromCurrency)})
          </Text>
        </CurrencyText>
      </CurrencyInfo>

      <ArrowIconWrapper>
        <ArrowRightIcon size={20} />
      </ArrowIconWrapper>

      <CurrencyInfo>
        <Flag>{getCurrencyFlag(toCurrency)}</Flag>
        <CurrencyText>
          <Text size="md" weight="semibold">
            {formatCurrencyRate(rate)}
          </Text>
          <Text size="sm" weight="medium" color={COLORS.TEXT_LIGHT_GRAY}>
            {toCurrency} ({getCurrencySymbol(toCurrency)})
          </Text>
        </CurrencyText>
      </CurrencyInfo>
    </CurrencyPair>
  </Card>
);

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

const Flag = styled.span`
  font-size: 2rem;
  line-height: 1;
  display: flex;
  align-items: center;
`;

const CurrencyText = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.375rem;
`;

const ArrowIconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${COLORS.NEUTRAL};
`;

export default CurrencyCard;
