import React, { useEffect, useState } from "react";
import { useTitleContext } from "../../../layouts/ModuleLayout";
import AccountCard from "../../../components/ui/AccountCard";
import { useLocation, useNavigate } from "react-router-dom";
import type { AccountType } from "../../../types/accounts.type";
import { GoPlus } from "react-icons/go";
import MyInput from "../../../components/ui/MyInput";
import MyButton from "../../../components/ui/MyButton";
import CheckBoxInput from "../../../components/ui/CheckboxInput";
import AccountSelector from "../../../components/ui/AccountSelector";
import type { TransferAccountData } from "../../../types/transactions.type";
import { createTransferAccount } from "../../../api/transaction.api";

function TransferAccount() {
    const useTitle = useTitleContext();
    const location = useLocation();
    const navigate = useNavigate();

    const accounts: AccountType[] = location.state[0];
    const currencies = location.state[1];

    const [currentOriginAccount, setCurrentOriginAccount] = useState<AccountType | null>(null);
    const [currentDestinationAccount, setCurrentDestinationAccount] = useState<AccountType | null>(null);

    const [clicked, setClicked] = useState<boolean>(false);
    const [clickedOrigin, setClickedOrigin] = useState<boolean>(false);
    const [clickedDestination, setClickedDestination] = useState<boolean>(false);

    const [ shownAccounts, setShownAccounts ] = useState<AccountType[]>();

    const [ currentCurrency, setCurrentCurrency ] = useState<string>(location.state[2]);

    const [ formData, setFormData ] = useState<TransferAccountData>({
        originAmount: 0,
        originAccountId: '',
        originCurrencyId: '',
        destinationAccountId: '',
        destinationAmount: 0,
        destinationCurrencyId: '',
        type: 'TRANSFERENCIA'
    });

    const handleClicked = (click?: string) => {
        filterAccounts(currentCurrency);
        setClicked(prev => !prev);

        if (click === 'destination') {
            setClickedDestination(prev => !prev);
        } else if (click === 'origin') {
            setClickedOrigin(prev => !prev);
        } else {
            setClickedDestination(false);
            setClickedOrigin(false);
        }
    }

    const filterAccounts = (currency: string) => {
        let filteredAccounts = accounts.filter(account => account.currency === currency);
        
        if (currentDestinationAccount) {
            filteredAccounts = filteredAccounts.filter(account => account.id !== currentDestinationAccount.id);
        }

        if (currentOriginAccount) {
            filteredAccounts = filteredAccounts.filter(account => account.id !== currentOriginAccount.id);
        }

        setShownAccounts(filteredAccounts);
    }

    const handleCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentCurrency(e.target.value);
        
        filterAccounts(e.target.value);
    }

    const handleAccounts = (account: AccountType) => {
        if (clickedOrigin) {
            setFormData(prev => ({
                ...prev,
                originAccountId: account.id,
                originCurrencyId: account.currency
            }));
    
            setCurrentOriginAccount(account);
    
            handleClicked('origin');
        }

        if (clickedDestination) {
            setFormData(prev => ({
                ...prev,
                destinationAccountId: account.id,
                destinationCurrencyId: account.currency
            }));

            setCurrentDestinationAccount(account);

            handleClicked('destination');
        }
    };

    const handleAmounts = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: Number(e.target.value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await createTransferAccount(formData);
            navigate(-1);
        } catch (error) {

        }
    };

    useEffect(() => {
        useTitle('Nueva transferencia')
        filterAccounts(currentCurrency);
        setCurrentCurrency
        
    }, []);
    
    return (
        <form 
            style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px'}}
            onSubmit={handleSubmit}    
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <h3>Origen</h3>
                <div>
                    { currentOriginAccount ?
                        <AccountCard 
                            accountBalance={currentOriginAccount.balance} 
                            accountId={currentOriginAccount.id} 
                            accountName={currentOriginAccount.name} 
                            symbol={currencies[currentOriginAccount.currency].symbol}
                            onClick={() => handleClicked('origin')}
                        /> 
                        : 
                        <div 
                            style={{
                                width: '100%',
                                height: '127px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '20px',
                                padding: '20px',
                                backgroundColor: '#192126',
                                borderRadius: '10px'
                            }}
                            onClick={() => handleClicked('origin')}
                        >
                            <GoPlus fontSize={'28px'}/>
                        </div>
                    }
                </div>
                <label htmlFor="" style={{ color: '#8F9395' }}>Monto</label>
                <MyInput 
                    variant="currency" 
                    currency={currentOriginAccount?.currency} 
                    type="number" 
                    step='any'
                    name="originAmount"
                    placeholder={currentOriginAccount ? '0.00' : 'Selecciona una cuenta de origen'}
                    disabled={currentOriginAccount === null}
                    onChange={handleAmounts}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <h3>Destino</h3>
                <div>
                    { currentDestinationAccount ?
                        <AccountCard 
                            accountBalance={currentDestinationAccount.balance} 
                            accountId={currentDestinationAccount.id} 
                            accountName={currentDestinationAccount.name} 
                            symbol={currencies[currentDestinationAccount.currency].symbol}
                            onClick={() => handleClicked('destination')}
                        /> 
                        : 
                        <div 
                            style={{
                                width: '100%',
                                height: '127px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '20px',
                                padding: '20px',
                                backgroundColor: '#192126',
                                borderRadius: '10px'
                            }}
                            onClick={() => handleClicked('destination')}
                        >
                            <GoPlus fontSize={'28px'}/>
                        </div>
                    }
                </div>
                <label htmlFor="" style={{ color: '#8F9395' }}>Monto</label>
                <MyInput 
                    variant="currency" 
                    currency={currentDestinationAccount?.currency} 
                    type="number" 
                    step='any' 
                    name="destinationAmount"
                    placeholder={currentDestinationAccount ? '0.00' : 'Selecciona una cuenta de destino'}
                    disabled={currentDestinationAccount === null}  
                    onChange={handleAmounts}
                />
            </div>

            <AccountSelector 
                clicked={clicked} 
                currencies={currencies} 
                currentCurrency={currentCurrency}
                handleAccount={handleAccounts}
                handleCurrency={handleCurrency}
                handleClick={handleClicked}
                shownAccounts={shownAccounts}
            />

            <div style={{position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '20px'}}>
                <MyButton>Agregar</MyButton>
            </div>
        </form>
    );
}

export default TransferAccount;