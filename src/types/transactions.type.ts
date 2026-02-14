export interface CreateIncomeData {
    amount: number;
    type: string;
    currencyId: string;
    accountId: string;
    baseAmount: number;
}

export interface CreateSpentData extends CreateIncomeData {
    assignmentId: string;
}

export interface TransferAccountData {
    originAmount: number;
    originCurrencyId: string;
    originAccountId: string;
    destinationAmount: number;
    destinationCurrencyId: string;
    destinationAccountId: string;
    type: string;
}