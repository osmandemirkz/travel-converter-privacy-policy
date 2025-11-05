import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import { Currency, ExchangeRates, ALL_CURRENCIES } from '@/types/currency';

const CACHE_KEY = 'exchange_rates_cache';
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export function useCurrencyData() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCachedRates = async () => {
    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached) {
        const data = JSON.parse(cached);
        setRates(data.rates);
        setLastUpdated(new Date(data.timestamp));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to load cached rates:', err);
      return false;
    }
  };

  const saveRatesToCache = async (ratesData: Record<string, number>) => {
    try {
      await AsyncStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          rates: ratesData,
          timestamp: new Date().toISOString(),
        })
      );
    } catch (err) {
      console.error('Failed to cache rates:', err);
    }
  };

  const fetchRatesFromDB = async () => {
    try {
      const { data, error: dbError } = await supabase
        .from('exchange_rates')
        .select('*')
        .order('last_updated', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (dbError) throw dbError;

      if (data) {
        setRates(data.rates);
        setLastUpdated(new Date(data.last_updated));
        await saveRatesToCache(data.rates);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to fetch rates from DB:', err);
      return false;
    }
  };

  const fetchRatesFromAPI = async () => {
    try {
      const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/functions/v1/fetch-exchange-rates`,
        {
          headers: {
            Authorization: `Bearer ${supabaseKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch from API');
      }

      const result = await response.json();

      if (result.success && result.data.rates) {
        setRates(result.data.rates);
        setLastUpdated(new Date());
        await saveRatesToCache(result.data.rates);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to fetch rates from API:', err);
      return false;
    }
  };

  const refreshRates = async () => {
    setIsLoading(true);
    setError(null);

    let success = await fetchRatesFromDB();

    if (!success) {
      success = await fetchRatesFromAPI();
    }

    if (!success) {
      success = await loadCachedRates();
      if (success) {
        setError('Using cached rates (offline mode)');
      } else {
        setError('Failed to load exchange rates');
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const initializeRates = async () => {
      const hasCached = await loadCachedRates();
      if (hasCached) {
        setIsLoading(false);
      }
      await refreshRates();
    };

    initializeRates();

    const interval = setInterval(refreshRates, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const convert = (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): number => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return 0;

    const amountInUSD = amount / rates[fromCurrency];
    return amountInUSD * rates[toCurrency];
  };

  return {
    rates,
    lastUpdated,
    isLoading,
    error,
    refreshRates,
    convert,
  };
}

export function useAvailableCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const { data, error } = await supabase
          .from('currencies')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) {
          console.error('Failed to fetch currencies from DB:', error);
          const allCurrencies = ALL_CURRENCIES.map((curr, index) => ({
            ...curr,
            is_active: false,
            sort_order: index,
          }));
          setCurrencies(allCurrencies);
        } else if (data && data.length > 0) {
          setCurrencies(data as Currency[]);
        } else {
          const allCurrencies = ALL_CURRENCIES.map((curr, index) => ({
            ...curr,
            is_active: false,
            sort_order: index,
          }));
          setCurrencies(allCurrencies);
        }
      } catch (err) {
        console.error('Error fetching currencies:', err);
        const allCurrencies = ALL_CURRENCIES.map((curr, index) => ({
          ...curr,
          is_active: false,
          sort_order: index,
        }));
        setCurrencies(allCurrencies);
      }
    };

    fetchCurrencies();
  }, []);

  return currencies;
}
