import type React from "react";
import CheckBoxInput from "./CheckboxInput";
import type { AccountType } from "../../types/accounts.type";
import AccountCard from "./AccountCard";
import MyButton from "./MyButton";
import type { CurrencyData } from "../../types/currency.type";
import { FaArrowLeft } from "react-icons/fa6";

interface AccountSelectorProps extends React.ComponentPropsWithoutRef<'div'> {
    clicked: boolean;
    handleCurrency: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAccount: (account: AccountType) => void;
    currentCurrency: string;
    shownAccounts?: AccountType[];
    currencies: Record<string, CurrencyData>;
    handleClick: (click?: string) => void;
}

const AccountSelector: React.FC<AccountSelectorProps> = ({
    clicked, 
    handleCurrency, 
    handleAccount, 
    currentCurrency, 
    shownAccounts, 
    currencies, 
    handleClick,
    ...props
}) => {
    return (
        <div 
            style={{ 
                width: '100%',
                height: '100dvh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '0',
                left: '0',
                zIndex: '2',
                transform: `${clicked ? 'translateX(0)': 'translateX(100%)'}`,
                transition: 'transform 0.2s ease',
            }}
            
        >
            <div 
                style={{ 
                    width: '100%',
                    height: '100dvh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    backgroundColor: '#192126',
                    borderRadius: '10px',
                    transform: `${clicked ? 'scale(1)': 'scale(0)'}`,
                    transition: 'transform 0.3s ease'
                }}
            >
                <div style={{ padding: '20px 20px 0'}}>
                    <div style={{ display: 'flex', backgroundColor: '#252C31', zIndex: '2', borderRadius: '10px' }}>
                        <CheckBoxInput
                            value="BCV" 
                            style={{ flex: '1', justifyContent: 'center', backgroundColor: 'transparent'}} 
                            name='currency'
                            onChange={handleCurrency}
                            checked={currentCurrency === 'BCV'}
                        >
                            BCV
                        </CheckBoxInput>

                        <CheckBoxInput 
                            value="VES" 
                            style={{ flex: '1', justifyContent: 'center', backgroundColor: 'transparent'}} 
                            name='currency'
                            onChange={handleCurrency}
                            checked={currentCurrency === 'VES'}
                        >
                            VES
                        </CheckBoxInput>

                        <CheckBoxInput 
                            value="USDT" 
                            style={{ flex: '1', justifyContent: 'center', backgroundColor: 'transparent'}} 
                            name='currency'
                            onChange={handleCurrency}
                            checked={currentCurrency === 'USDT'}
                        >
                            USDT
                        </CheckBoxInput>

                        <CheckBoxInput 
                            value="EUR" 
                            style={{ flex: '1', justifyContent: 'center', backgroundColor: 'transparent'}} 
                            name='currency' 
                            onChange={handleCurrency}
                            checked={currentCurrency === 'EUR'}
                        >
                            EUR
                        </CheckBoxInput>
                    </div>
                </div>
                <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '100%', padding: '20px 20px 0' }}>
                    { shownAccounts && shownAccounts.length > 0 ? 
                        shownAccounts.map(account => (
                            <AccountCard
                                key={account.id}
                                accountId={account.id} 
                                accountName={account.name} 
                                accountBalance={account.balance}
                                symbol={currencies[account.currency].symbol}
                                style={{ backgroundColor: '#252C31', margin: '10px 0'}}
                                onClick={() => handleAccount(account)}
                            />
                        ))
                        :
                        <p style={{ textAlign: 'center', padding: '20px', color: '#8F9395'}}>No hay cuentas para seleccionar</p>
                    }
                </div>
                <div>
                    <MyButton
                        variant="secondary" 
                        style={{ backgroundColor: '#252C31', borderRadius: '0', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)', color: '#8F9395', padding: '20px'}}
                        onClick={()=> handleClick()}
                        type="button"
                    >
                        <FaArrowLeft />
                        Atrás
                    </MyButton>
                </div>
            </div>


        </div>
    );
}

export default AccountSelector;