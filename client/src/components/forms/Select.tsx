import styled from '@emotion/styled';
import type { SelectProps } from 'types';
import { COLORS } from 'constants';

const Select = ({ value, options, onChange, label }: SelectProps) => (
  <SelectWrapper>
    {label && <Label>{label}</Label>}
    <StyledSelect value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  </SelectWrapper>
);

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.TEXT_PRIMARY};
  white-space: nowrap;
`;

const StyledSelect = styled.select`
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.TEXT_PRIMARY};
  background: ${COLORS.BG_WHITE};
  border: 1px solid ${COLORS.BORDER};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${COLORS.PRIMARY};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

export default Select;
