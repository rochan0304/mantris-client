import React, { useEffect, useState } from "react";
import CheckBoxInput from "../../../components/ui/CheckboxInput";
import { useAuth } from "../../../context/AuthContext";
import { useTitleContext } from "../../../layouts/ModuleLayout";
import { deleteAccount, getAccounts } from "../../../api/account.api";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import MyButton from "../../../components/ui/MyButton";
import { CgArrowsExchange } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import type { AccountType } from "../../../types/accounts.type";
import { useRates } from "../../../context/ExchangeRatesContext";
import AccountCard from "../../../components/ui/AccountCard";
import { useLoading } from "../../../context/LoadingContext";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from "./AccountsPage.module.css";

function AccountsPage() {
    const { user } = useAuth();
    const useTitle = useTitleContext();
    const { showLoading, hideLoading } = useLoading();

    const rates = useRates();

    const location = useLocation();
    
    const [ currentCurrency, setCurrentCurrency ] = useState<string>(location.state || user!.baseCurrency.id);

    const [ accounts, setAccounts ] = useState<AccountType[]>();
    const [ totalByCurrency, setTotalByCurrency ] = useState<any>();
    const [ shownAccounts, setShownAccounts ] = useState<AccountType[]>([]);

    const [ clicked, setClicked ] = useState(false);
    const [ accountIdClicked, setAccountIdClicked ] = useState<string | undefined>(undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentCurrency(e.target.value);
        
        filterAccounts(e.target.value, accounts!);
    }

    const handleClick = (id?: string) => {
        setClicked(prev => !prev);
        if (id) {
            setAccountIdClicked(id);
        } else {
            setAccountIdClicked(undefined);
        }
    };
    
    const filterAccounts = (currency: string, accounts: AccountType[]) => {
        const filteredAccounts = accounts.filter(account => account.currency === currency);
        setShownAccounts(filteredAccounts);
    }

    const handleDelete = async () => {
        showLoading()
        console.log(accountIdClicked);
        try {
            if (accountIdClicked) {
                await deleteAccount(accountIdClicked);
                setAccounts(prev => prev?.filter(account => account.id !== accountIdClicked));
                filterAccounts(currentCurrency, accounts!.filter(account => account.id !== accountIdClicked));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setClicked(false);
            hideLoading();
        }
    }
    
    useEffect(() => {
        useTitle('Mis Cuentas');
        const accounts = async () => {
            showLoading();
            try {
                const response = await getAccounts();
                const data = response.data;
                setAccounts(data.accounts);
                filterAccounts(currentCurrency, data.accounts);
                setTotalByCurrency(data.totalByCurrencies);
            } catch (error) {
                console.log(error);
            } finally {
                hideLoading();
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
                    <div key={account.id} 
                        style={{ 
                            display: 'flex',
                            position: 'relative', 
                            height: '127px', 
                            alignItems: 'center',
                            overflow: 'hidden'
                        }}
                    >
                        <AccountCard 
                            accountId={account.id} 
                            accountName={account.name} 
                            accountBalance={account.balance}
                            symbol={rates?.currencies[account.currency].symbol}
                            className={ styles.card }
                        />
                        <div
                            className={ styles.delete } 
                            style={{
                                color: 'red',
                            }}
                            onClick={() => handleClick(account.id)}
                        >
                            <FaRegTrashAlt fontSize={'20px'}/>
                        </div>
                        <div style={{
                            position: 'fixed',
                            top: '0',
                            left: '0',
                            width: '100vw',
                            height: '100dvh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: clicked ? 'translate(0)' : 'translate(100%)',
                            opacity: clicked ? '1' : '0',
                            backgroundColor: 'rgba(0,0,0,0.1)',
                        }}>
                            <div style={{
                                backgroundColor: '#192126',
                                padding: '20px',
                                borderRadius: '10px'
                            }}>
                                <p>¿Desea eliminar esta cuenta?</p>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '15px'}}>
                                    <MyButton style={{ backgroundColor: 'rgb(171, 0, 0)', color: 'white' }} onClick={handleDelete}>Eliminar</MyButton>
                                    <MyButton variant="secondary" onClick={handleClick} style={{ backgroundColor: '#252C31'}}>Cancelar</MyButton>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default AccountsPage;