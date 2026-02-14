import type { Axios, AxiosResponse } from "axios";
import { serverApi } from "./api";
import type { CurrencyData, GetAllCurrenciesResponse } from "../types/currency.type";

const currenciesApi = serverApi('currencies');

export const getAllCurrencies = (): Promise<GetAllCurrenciesResponse> => {
    return currenciesApi.get('/');
}