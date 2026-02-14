import type { AxiosInstance } from "axios";

export interface CurrencyData {
    id: string;
    name: string;
    symbol: string;
}

export interface GetAllCurrenciesResponse extends AxiosInstance {
    data: Record<string, CurrencyData>;
} 