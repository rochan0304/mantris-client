import { serverApi } from "./api";

const exchangeRatesApi = serverApi('exchange-rates');

export const getAllRates = () => {
    return exchangeRatesApi.get('/');
};