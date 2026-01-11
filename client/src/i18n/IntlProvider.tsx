import type { ReactNode } from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { en } from './locales';

interface IntlProviderProps {
  children: ReactNode;
  locale?: string;
}

export const IntlProvider = ({ children, locale = 'en' }: IntlProviderProps) => {
  const messages = { en };

  return (
    <ReactIntlProvider locale={locale} messages={messages[locale as keyof typeof messages]}>
      {children}
    </ReactIntlProvider>
  );
};
