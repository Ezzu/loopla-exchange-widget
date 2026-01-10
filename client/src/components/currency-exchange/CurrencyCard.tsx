import styled from '@emotion/styled';
import type { CurrencyCardProps } from 'types';
import { formatCurrencyRate, getCurrencyFlag } from 'utils';
import { ArrowRightIcon, Card, Text } from 'components';
import { COLORS } from 'constants';

const CurrencyCard = ({ currency, rate }: CurrencyCardProps) => (
  <Card>
    <CurrencyRow>
      <LeftSection>
        <Flag>{getCurrencyFlag(currency)}</Flag>
        <Text size="md" weight="semibold">
          {currency}
        </Text>
      </LeftSection>

      <CenterSection>
        <ArrowRightIcon size={20} />
      </CenterSection>

      <RightSection>
        <Text size="md" weight="semibold">
          {formatCurrencyRate(rate)}
        </Text>
      </RightSection>
    </CurrencyRow>
  </Card>
);

const CurrencyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 120px;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  color: ${COLORS.NEUTRAL};
  padding: 0 1rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 100px;
  text-align: right;
`;

const Flag = styled.span`
  font-size: 1.75rem;
  line-height: 1;
  display: flex;
  align-items: center;
`;

export default CurrencyCard;
