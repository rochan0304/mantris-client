import React, { useEffect, useState } from "react";
import CheckBoxInput from "../../../components/ui/CheckboxInput";
import { useAuth } from "../../../context/AuthContext";
import { useTitleContext } from "../../../layouts/ModuleLayout";
import { getAccounts } from "../../../api/account.api";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import MyButton from "../../../components/ui/MyButton";
import { CgArrowsExchange } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import type { AccountType } from "../../../types/accounts.type";
import { useRates } from "../../../context/ExchangeRatesContext";
import AccountCard from "../../../components/ui/AccountCard";

function AccountsPage() {
    const { user } = useAuth();
    const useTitle = useTitleContext();

    const rates = useRates();

    const location = useLocation();
    
    const [ currentCurrency, setCurrentCurrency ] = useState<string>(location.state || user!.baseCurrency.id);

    const [ accounts, setAccounts ] = useState<AccountType[]>();
    const [ totalByCurrency, setTotalByCurrency ] = useState<any>();
    const [ shownAccounts, setShownAccounts ] = useState<AccountType[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentCurrency(e.target.value);
        
        filterAccounts(e.target.value, accounts!);
    }
    
    const filterAccounts = (currency: string, accounts: AccountType[]) => {
        const filteredAccounts = accounts.filter(account => account.currency === currency);
        setShownAccounts(filteredAccounts);
    }
    
    useEffect(() => {
        useTitle('Mis Cuentas');
        const accounts = async () => {
            try {
                const response = await getAccounts();
                const data = response.data;
                setAccounts(data.accounts);
                filterAccounts(currentCurrency, data.accounts);
                setTotalByCurrency(data.totalByCurrencies);
            } catch (error) {
                console.log(error);
            }
        };
        
        accounts();
    }, []);
    
    if (!rates?.currencies) {
        return <>Cargando</>
    }
    
    return (
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'flex', backgroundColor: '#192126', borderRadius: '10px', }}>
                <CheckBoxInput 
                    value="BCV" 
                    style={{ flex: '1', justifyContent: 'center'}} 
                    name="currency" 
                    onChange={ handleChange } 
                    checked={ currentCurrency === 'BCV'}
                >
                    BCV
                </CheckBoxInput>

                <CheckBoxInput 
                    value="VES" 
                    style={{ flex: '1', justifyContent: 'center'}} 
                    name="currency" 
                    onChange={ handleChange } 
                    checked={ currentCurrency === 'VES'}
                >
                    VES
                </CheckBoxInput>

                <CheckBoxInput 
                    value="USDT" 
                    style={{ flex: '1', justifyContent: 'center'}} 
                    name="currency" 
                    onChange={ handleChange } 
                    checked={ currentCurrency === 'USDT'}
                >
                    USDT
                </CheckBoxInput>

                <CheckBoxInput 
                    value="EUR" 
                    style={{ flex: '1', justifyContent: 'center'}} 
                    name="currency" 
                    onChange={ handleChange } 
                    checked={ currentCurrency === 'EUR'}>
                    EUR
                </CheckBoxInput>
            </div>

            <div 
                style={{ 
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    borderRadius: '20px',
                    padding: '30px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: 'linear-gradient(to right, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.01) 100%)'
                }}
            >
                <p style={{ color: '#8F9395'}}>Saldo total</p>
                <p 
                    style={{ fontSize: '24px', fontFamily: 'Inter, sans-serif', fontWeight: '700'}}
                >
                    <span 
                        style={{ color: '#8F9395', fontWeight: '400', fontFamily: 'Sora, sans-serif'}}
                    >
                        { rates ? rates.currencies[currentCurrency].symbol : '$'}</span> { totalByCurrency && totalByCurrency[currentCurrency] }
                </p>
                
            </div>

            <div >
                <Link to='create' 
                    style={{ 
                        color: '#8F9395', 
                        textDecoration: 'none',
                        display: 'flex',
                        justifyContent: 'end',
                        gap: '5px',
                        alignItems: 'center'
                    }}
                    state={currentCurrency}
                >
                    <GoPlus fontSize={'24px'}/> Agregar cuenta
                </Link>
            </div>
            <Link to='transfer'
                style={{ 
                    color: '#8F9395', 
                    textDecoration: 'none',
                    display: 'flex',
                    justifyContent: 'end',
                    gap: '5px',
                    alignItems: 'center'
                }}
                state={ [accounts, rates.currencies, currentCurrency] }
            >
                <MyButton variant="outline">
                    <CgArrowsExchange fontSize={'24px'}/>
                    Nueva transferencia
                </MyButton>
            </Link>
            
            <section style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                { shownAccounts.map(account => (
                    <AccountCard 
                        key={account.id}
                        accountId={account.id} 
                        accountName={account.name} 
                        accountBalance={account.balance}
                        symbol={rates?.currencies[account.currency].symbol}
                    />
                ))}
            </section>
        </div>
    );
}

export default AccountsPage;