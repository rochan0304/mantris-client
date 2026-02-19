import type { AxiosInstance, AxiosResponse } from "axios";
import type { AccountType, CreateAccountData, GetAccountsResponse, GetBalanceSummaryResponse } from "../types/accounts.type";
import { serverApi } from "./api";

const accountsApi = serverApi('accounts');

export const getAccounts = (): Promise<GetAccountsResponse> => {
    return accountsApi.get('/');
}

export const createAccount = (data: CreateAccountData) => {
    return accountsApi.post('/', data);
}

export const getBalanceSummary = (): Promise<GetBalanceSummaryResponse> => {
    return accountsApi.get('/summary');
}

export const deleteAccount = (id: string) => {
    return accountsApi.delete(`/${id}`);
}