import { useLocation, useNavigate } from "react-router-dom";
import MyInput from "../../../components/ui/MyInput";
import CheckBoxInput from "../../../components/ui/CheckboxInput";
import React, { useEffect, useState } from "react";
import { BsWallet2 } from "react-icons/bs";
import MyButton from "../../../components/ui/MyButton";
import { useTitleContext } from "../../../layouts/ModuleLayout";
import { createAccount } from "../../../api/account.api";
import type { CreateAccountData } from "../../../types/accounts.type";

function CreateAccount() {
    const location = useLocation();

    const navigate = useNavigate();

    const [ currentCurrency, setCurrentCurrency ] = useState(location.state || '');
    
    const setTitle = useTitleContext();

    const [ formData, setFormData ] = useState<CreateAccountData>({
        name: '',
        currentBalance: 0,
        currencyId: currentCurrency
    });

    const handleChangeCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentCurrency(e.target.value);
        setFormData(prev => ({
            ...prev,
            currencyId: e.target.value
        }))
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);

        try {
            const response = await createAccount(formData); 
            navigate('/account', { state: currentCurrency })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setTitle('Agregar cuenta')
    }, []);
    return (
        <form style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px'}} onSubmit={ handleSubmit }>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <label htmlFor="">Nombre de cuenta</label>
                <MyInput icon={<BsWallet2 />} placeholder="Ej. Banco de Venezuela" name="name" onChange={handleChangeInput}/>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <label htmlFor="currentBalance">Monto inicial</label>
                <MyInput currency={ currentCurrency } type="number" placeholder="0.00" name="currentBalance" onChange={handleChangeInput}/>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <label htmlFor="currentBalance">Moneda</label>
                <div style={{ display: 'flex', backgroundColor: '#192126', borderRadius: '10px' }}>
                    <CheckBoxInput 
                        value="USD" 
                        style={{ flex: '1', justifyContent: 'center'}} 
                        name="currencyId" 
                        onChange={ handleChangeCurrency } 
                        checked={ currentCurrency === 'USD'}
                    >
                        $
                    </CheckBoxInput>

                    <CheckBoxInput 
                        value="VES" 
                        style={{ flex: '1', justifyContent: 'center'}} 
                        name="currencyId" 
                        onChange={ handleChangeCurrency } 
                        checked={ currentCurrency === 'VES'}
                    >
                        Bs
                    </CheckBoxInput>

                    <CheckBoxInput 
                        value="USDT" 
                        style={{ flex: '1', justifyContent: 'center'}} 
                        name="currencyId" 
                        onChange={ handleChangeCurrency } 
                        checked={ currentCurrency === 'USDT'}
                    >
                        USDT
                    </CheckBoxInput>

                    <CheckBoxInput 
                        value="EUR" 
                        style={{ flex: '1', justifyContent: 'center'}} 
                        name="currencyId" 
                        onChange={ handleChangeCurrency } 
                        checked={ currentCurrency === 'EUR'}>
                        EUR
                    </CheckBoxInput>
                </div>
            </div>

            <div style={{ position: 'fixed', bottom: '0', left: '0', width: '100%', padding: '20px'}}>
                <MyButton>Agregar</MyButton>
            </div>
        </form>
    );
}

export default CreateAccount;