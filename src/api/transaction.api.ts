import axios from "axios";
import type { CreateSpentData, CreateIncomeData, TransferAccountData } from "../types/transactions.type";

const transactionApi = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/transactions`,
    headers: { 'Content-Type': 'application/json' }
});

transactionApi.interceptors.request.use(config => {
    const token = localStorage.getItem('user-token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export const createIncome = (data: CreateIncomeData) => {
    return transactionApi.post('/income', data);
}

export const createSpent = (data: CreateSpentData) => {
    return transactionApi.post('/spent', data);
}

export const createTransferAccount = (data: TransferAccountData) => {
    return transactionApi.post('/transfer/accounts', data);
};

export const createTransferAssignment = (data: any) => {
    return transactionApi.patch('/transfer/assignments', data);
};