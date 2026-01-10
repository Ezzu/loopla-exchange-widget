import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CurrencyCard from './CurrencyCard';

describe('CurrencyCard', () => {
  it('should render currency code and rate', () => {
    render(<CurrencyCard currency="USD" rate={1.163462} />);

    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('1.1635')).toBeInTheDocument();
  });

  it('should display flag emoji for currency', () => {
    const { container } = render(<CurrencyCard currency="GBP" rate={0.867802} />);

    // Flag should be rendered (🇬🇧 for GBP)
    expect(container.textContent).toContain('🇬🇧');
  });

  it('should format rate to 4 decimal places', () => {
    render(<CurrencyCard currency="EUR" rate={1.0} />);

    expect(screen.getByText('1.0000')).toBeInTheDocument();
  });

  it('should render with different currencies', () => {
    const { rerender } = render(<CurrencyCard currency="USD" rate={1.163462} />);
    expect(screen.getByText('USD')).toBeInTheDocument();

    rerender(<CurrencyCard currency="CHF" rate={0.931845} />);
    expect(screen.getByText('CHF')).toBeInTheDocument();
    expect(screen.getByText('0.9318')).toBeInTheDocument();
  });

  it('should display arrow icon between currency and rate', () => {
    const { container } = render(<CurrencyCard currency="AUD" rate={1.737028} />);

    // Check that the arrow icon is rendered
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should handle currency without flag gracefully', () => {
    // Test with unknown currency code
    render(<CurrencyCard currency="XXX" rate={1.5} />);

    expect(screen.getByText('XXX')).toBeInTheDocument();
    expect(screen.getByText('1.5000')).toBeInTheDocument();
  });

  it('should handle very small rates', () => {
    render(<CurrencyCard currency="JPY" rate={0.0087} />);

    expect(screen.getByText('0.0087')).toBeInTheDocument();
  });

  it('should handle very large rates', () => {
    render(<CurrencyCard currency="IDR" rate={19595.776155} />);

    expect(screen.getByText('19595.7762')).toBeInTheDocument();
  });
});
