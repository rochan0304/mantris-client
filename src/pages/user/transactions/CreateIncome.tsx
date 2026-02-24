import React, { useEffect, useState } from "react";
import { useTitleContext } from "../../../layouts/ModuleLayout";
import CheckBoxInput from "../../../components/ui/CheckboxInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MyInput from "../../../components/ui/MyInput";
import { useAuth } from "../../../context/AuthContext";
import MyButton from "../../../components/ui/MyButton";
import type { AccountType } from "../../../types/accounts.type";
import { getAccounts } from "../../../api/account.api";
import { GoPlus } from "react-icons/go";
import { createIncome } from "../../../api/transaction.api";
import type { CreateIncomeData } from "../../../types/transactions.type";
import { getAllRates } from "../../../api/exchangeRates.api";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useLoading } from "../../../context/LoadingContext";


function CreateIncome() {
    const { user } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    
    const location = useLocation();
    const navigate = useNavigate();

    const setTitle = useTitleContext();

    const [ currentCurrency, setCurrentCurrency ] = useState(location.state || user?.baseCurrency.id);

    const [ rates, setRates ] = useState<any>();

    const [ formData, setFormData ] = useState<CreateIncomeData>({
        amount: 0,
        baseAmount: 0,
        type: 'INGRESO',
        currencyId: currentCurrency,
        accountId: ''
    });

    const [ accounts, setAccounts ] = useState<AccountType[]>();

    const [ shownAccounts, setShownAccounts ] = useState<AccountType[]>();

    const filterAccounts = (currency: string, accounts: AccountType[]) => {
        const filteredAccounts = accounts.filter(account => account.currency === currency);
        setShownAccounts(filteredAccounts);
    }

    const handleCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentCurrency(e.target.value);
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
            accountId: '',
            amount: 0,
            baseAmount: 0
        }))

        filterAccounts(e.target.value, accounts!);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(typeof e.target.valueAsNumber)
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.type === 'number' ? e.target.valueAsNumber : e.target.value,
        }));
    };

    const convertAmount = (amount: number, origin: number) => {
        const convertedAmount = + ((amount * origin) / rates[user!.baseCurrency.id]).toFixed(2);
        return convertedAmount;
    };

    const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const convertedAmount = convertAmount(e.target.valueAsNumber, rates[currentCurrency]);

        setFormData(prev => ({
            ...prev,
            amount: e.target.valueAsNumber,
            baseAmount: convertedAmount,
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        showLoading();
        e.preventDefault();

        try {
            await createIncome(formData);
            navigate('/account', { state: formData.currencyId })
        } catch (error) {
            console.log(error);
        } finally {
            hideLoading();
        }
    };

    useEffect(() => {
        setTitle('Nueva transacción');

        const accounts = async () => {
            try {
                const response = await getAccounts();
                const data = response.data;
                setAccounts(data.accounts);
                filterAccounts(currentCurrency, data.accounts);
            } catch (error) {
                console.log(error);
            }
        }

        const rates = async () => {
            try {
                const response = await getAllRates();
                const data = response.data;
                setRates(data);
            } catch (error) {
                
            }
        }

        accounts();
        rates();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
             <div style={{ display: 'flex', backgroundColor: '#192126', borderRadius: '10px', fontSize: '16px' }}>
                <Link to='/income'
                    style={{ 
                        flex: '1', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        color: '#A6FF00', 
                        textDecoration: 'none',
                        padding: '10px 0',
                        border: '1px solid #A6FF00',
                        borderRadius: '10px'
                    }}
                >
                    Ingreso
                </Link>

                <Link 
                    to='/spent' 
                    style={{ 
                        flex: '1', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        color: '#8F9395', 
                        textDecoration: 'none',
                        padding: '10px 0',
                    }}
                >
                    Gasto
                </Link>
            </div>
            <form onSubmit={ handleSubmit }>
                <div style={{ padding: '20px 0'}}>
                    <MyInput variant="number" type="number" step='any' placeholder="0.00" name="amount" onChange={ handleAmount } style={{ padding: '10px'}} value={ formData.amount ? formData.amount : '' }/>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '16px', color: '#8F9395'}}>
                        <FaArrowRightArrowLeft /> {user?.baseCurrency.symbol} { formData.baseAmount ? formData.baseAmount : '0.00' }
                    </div>
                </div>

                <div>
                    <label htmlFor="" style={{ fontSize: '16px', fontWeight: '700' }}>Moneda</label>
                    <div style={{ display: 'flex', backgroundColor: '#192126', borderRadius: '10px', fontSize: '16px', margin: '20px 0' }}>
                        <CheckBoxInput 
                            value="BCV"
                            name="currencyId"
                            checked={ currentCurrency === 'BCV' }
                            onChange={ handleCurrency }
                        >
                            $
                        </CheckBoxInput>

                        <CheckBoxInput 
                            value="VES"
                            name="currencyId"
                            checked={ currentCurrency === 'VES' }
                            onChange={ handleCurrency }
                        >
                            Bs
                        </CheckBoxInput>

                        <CheckBoxInput 
                            value="USDT"
                            name="currencyId"
                            checked={ currentCurrency === 'USDT' }
                            onChange={ handleCurrency }
                        >
                            USDT
                        </CheckBoxInput>

                        <CheckBoxInput 
                            value="EUR"
                            name="currencyId"
                            checked={ currentCurrency === 'EUR' }
                            onChange={ handleCurrency }
                        >
                            EUR
                        </CheckBoxInput>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="" style={{ fontSize: '16px', fontWeight: '700' }}>Cuenta</label>
                    <div style={{ display: 'flex', gap: '20px', width: '100%', overflowX: 'auto', padding: '20px 0' }}>
                        <Link to='/account/create'
                            style={{ 
                                color: 'white', 
                                textDecoration: 'none', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                flex: '0 0 80px',
                                minHeight: '140px'
                            }}
                        >
                            <GoPlus fontSize={'24px'}/>
                        </Link>
                        { shownAccounts && shownAccounts.map(account => (
                            <CheckBoxInput
                                key={ account.id }
                                value={ account.id }
                                name="accountId"
                                checked={ formData.accountId === account.id }
                                onChange={ handleInput }
                                style={{ flex: '0 0 200px', flexDirection: 'column', display: 'flex', gap: '10px', padding: '30px', minHeight: '140px' }}
                            >
                                <h3 style={{ fontSize: '14px'}}>{ account.name }</h3>
                                <p style={{ opacity: '0.6' }}>Saldo actual</p>
                                <p style={{ fontSize: '16px', fontFamily: 'Inter, sans-serif' }}>{ account.currency } { account.balance }</p>
                            </CheckBoxInput>
                        ))}
                        
                    </div>
                </div>
                <div style={{ position: 'fixed', bottom: '0', left: '0', width: '100%', padding: '20px' }}>
                    <MyButton>Agregar</MyButton>
                </div>
            </form>
        </div>
    );
}

export default CreateIncome;