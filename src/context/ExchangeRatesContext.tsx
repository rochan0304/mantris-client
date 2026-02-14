import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type React from "react";
import { getAllRates } from "../api/exchangeRates.api";
import { getAllCurrencies } from "../api/currencies.api";
import type { CurrencyData, GetAllCurrenciesResponse } from "../types/currency.type";

interface ExchangeRatesProviderProps {
    children: ReactNode;
}

type Rates = Record<string, string>;

type Currency = Record<string, string>;

interface ExchangeRatesContext {
    currencies: Record<string, CurrencyData>;
    rates: Rates;
    convert: (amount: number, from: string, to: string) => string;
}

const RatesContext = createContext<ExchangeRatesContext | null>(null);

export const useRates = () => useContext(RatesContext);

export const ExchangeRatesContext: React.FC<ExchangeRatesProviderProps> = ({ children }) => {
    const [ currencies, setCurrencies ] = useState<any>();
    const [ rates, setRates ] = useState<Rates>({});
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    const convert = (amount: number, from: string, to: string): string => {
        if (!rates[from] || !rates[to]) return String(amount);

        return ( (amount * +rates[from]) / +rates[to] ).toFixed(2);
    }

    const contextValue = {
        currencies,
        rates,
        convert
    };

    useEffect(() => {
        const getRates = async () => {
            try {
                const response = await getAllRates();
                const data = response.data;
                setRates(data);
                localStorage.setItem('app-rates', JSON.stringify(data));
            } catch (error) {
                console.log(error);
            }
        };

        const getCurrencies = async () => {
            try {
                const response = await getAllCurrencies();
                const data = response.data;
                setCurrencies(data);
            } catch (error) {
                console.log(error);
            }
        }

        getRates();
        getCurrencies();
        setIsLoading(false);
    }, []);

    return (
        <RatesContext.Provider value={contextValue}>
            { children }
        </RatesContext.Provider>
    );
};