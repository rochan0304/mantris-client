import type React from "react";
import CheckBoxInput from "./CheckboxInput";
import type { AccountType } from "../../types/accounts.type";
import AccountCard from "./AccountCard";
import MyButton from "./MyButton";
import type { CurrencyData } from "../../types/currency.type";
import { FaArrowLeft } from "react-icons/fa6";
import type { AssignmentData } from "../../types/assignment.type";
import AssignmentCard from "./AssignmentCard";

interface AccountSelectorProps extends React.ComponentPropsWithoutRef<'div'> {
    clicked: boolean;
    handleCurrency: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAssignment: (assignment: AssignmentData) => void;
    currentType: string;
    shownAssignments?: AssignmentData[];
    currency: string;
    handleClick: (click?: string) => void;
}

const AssignmentSelector: React.FC<AccountSelectorProps> = ({
    clicked, 
    handleCurrency, 
    handleAssignment, 
    currentType, 
    shownAssignments, 
    currency, 
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
                            value="FIJO" 
                            style={{ flex: '1', justifyContent: 'center', backgroundColor: 'transparent'}} 
                            name='type'
                            onChange={handleCurrency}
                            checked={currentType === 'FIJO'}
                        >
                            Fijos
                        </CheckBoxInput>

                        <CheckBoxInput 
                            value="VARIABLE" 
                            style={{ flex: '1', justifyContent: 'center', backgroundColor: 'transparent'}} 
                            name='type'
                            onChange={handleCurrency}
                            checked={currentType === 'VARIABLE'}
                        >
                            Variables
                        </CheckBoxInput>

                        <CheckBoxInput 
                            value="AHORRO" 
                            style={{ flex: '1', justifyContent: 'center', backgroundColor: 'transparent'}} 
                            name='type'
                            onChange={handleCurrency}
                            checked={currentType === 'AHORRO'}
                        >
                            Ahorros
                        </CheckBoxInput>

                        <CheckBoxInput 
                            value="EXTRA" 
                            style={{ flex: '1', justifyContent: 'center', backgroundColor: 'transparent'}} 
                            name='type' 
                            onChange={handleCurrency}
                            checked={currentType === 'EXTRA'}
                        >
                            Extras
                        </CheckBoxInput>
                    </div>
                </div>
                <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '100%', padding: '20px 20px 0' }}>
                    { shownAssignments && shownAssignments.length > 0 ? 
                        shownAssignments.map(assignment => (
                            <AssignmentCard
                                key={assignment.id}
                                assignment={assignment}
                                currency={currency}
                                style={{ backgroundColor: '#252C31', margin: '10px 0'}}
                                onClick={() => handleAssignment(assignment)}
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

export default AssignmentSelector;