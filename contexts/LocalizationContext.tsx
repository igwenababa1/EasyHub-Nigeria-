import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CURRENCY_RATES, TRANSLATIONS } from '../constants';

type Locale = 'en-US' | 'de-DE';
type Currency = 'USD' | 'EUR' | 'JPY';

interface LocalizationContextType {
  locale: Locale;
  setLocale: (locale: Locale | string) => void;
  currency: Currency;
  setCurrency: (currency: Currency | string) => void;
  formatPrice: (price: number) => string;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en-US');
  const [currency, setCurrencyState] = useState<Currency>('USD');

  const setLocale = (newLocale: Locale | string) => setLocaleState(newLocale as Locale);
  const setCurrency = (newCurrency: Currency | string) => setCurrencyState(newCurrency as Currency);

  const formatPrice = (price: number) => {
    const rate = CURRENCY_RATES[currency] || 1;
    const convertedPrice = price * rate;
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(convertedPrice);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[locale]?.[key] || key;
  };

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, currency, setCurrency, formatPrice, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
