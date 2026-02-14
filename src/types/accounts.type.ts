import type { AxiosInstance } from "axios";

export interface CreateAccountData {
    name: string;
    currentBalance: number;
    currencyId: string;
}

export interface AccountType {
    id: string;
    name: string;
    balance: string;
    currency: string;
}

export interface GetAccountsResponse extends AxiosInstance {
    data: {
        accounts: AccountType[];
        totalByCurrencies: Record<string, string>;
    };    
}

export interface ConvertedBalance {
    amount: string;
    currencyId: string;    
}

export interface BalanceSummary {
    currencyId: string;
    balance: string;
    currencySymbol: string;
    convertedBalance: ConvertedBalance[]
}

export interface GetBalanceSummaryResponse extends AxiosInstance {
    data: BalanceSummary[];
} 