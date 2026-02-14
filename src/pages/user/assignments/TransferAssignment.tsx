import React, { useEffect, useState } from "react";
import { useTitleContext } from "../../../layouts/ModuleLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import MyInput from "../../../components/ui/MyInput";
import MyButton from "../../../components/ui/MyButton";
import type { AssignmentData } from "../../../types/assignment.type";
import type { CurrencyData } from "../../../types/currency.type";
import AssignmentCard from "../../../components/ui/AssignmentCard";
import AssignmentSelector from "../../../components/ui/AssignmentSelector";
import { createTransferAssignment } from "../../../api/transaction.api";

function TransferAssignment() {
    const useTitle = useTitleContext();
    const location = useLocation();
    const navigate = useNavigate();

    const assignments: AssignmentData[] = location.state.assignments;
    const currency: CurrencyData = location.state.currency;

    const [currentOriginAssignment, setCurrentOriginAssignment] = useState<AssignmentData | null>(null);
    const [currentDestinationAssignment, setCurrentDestinationAssignment] = useState<AssignmentData | null>(null);

    const [clicked, setClicked] = useState<boolean>(false);
    const [clickedOrigin, setClickedOrigin] = useState<boolean>(false);
    const [clickedDestination, setClickedDestination] = useState<boolean>(false);

    const [ shownAssignments, setShownAssignments ] = useState<AssignmentData[]>();

    const [ currentType, setCurrentType ] = useState<string>(location.state.currentType);

    const [ formData, setFormData ] = useState({
        originAssignmentId: '',
        destinationAssignmentId: '',
        amount: 0,
        type: 'TRANSFERENCIA',
    });

    const handleClicked = (click?: string) => {
        filterAccounts(currentType);
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

    const filterAccounts = (type: string) => {
        let filteredAssignments = assignments.filter(assignment => assignment.type === type);
        
        if (currentDestinationAssignment) {
            filteredAssignments = filteredAssignments.filter(assignment => assignment.id !== currentDestinationAssignment.id);
        }

        if (currentOriginAssignment) {
            filteredAssignments = filteredAssignments.filter(assignment => assignment.id !== currentOriginAssignment.id);
        }

        setShownAssignments(filteredAssignments);
    }

    const handleCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentType(e.target.value);
        
        filterAccounts(e.target.value);
    }

    const handleAssignments = (assignment: AssignmentData) => {
        if (clickedOrigin) {
            setFormData(prev => ({
                ...prev,
                originAssignmentId: assignment.id,
            }));
    
            setCurrentOriginAssignment(assignment);
    
            handleClicked('origin');
        }

        if (clickedDestination) {
            setFormData(prev => ({
                ...prev,
                destinationAssignmentId: assignment.id,
            }));

            setCurrentDestinationAssignment(assignment);

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
        console.log(formData);

        try {
            await createTransferAssignment(formData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        useTitle('Nueva transferencia')
        filterAccounts(currentType);
    }, []);
    
    return (
        <form 
            style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px'}}
            onSubmit={handleSubmit}    
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <h3>Origen</h3>
                <div>
                    { currentOriginAssignment ?
                        <AssignmentCard 
                            assignment={currentOriginAssignment}
                            currency={currency.symbol}
                            fixed={true}
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
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <h3>Destino</h3>
                <div>
                    { currentDestinationAssignment ?
                        <AssignmentCard 
                            assignment={currentDestinationAssignment}
                            currency={currency.symbol}
                            fixed={true}
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
            </div>
            <label htmlFor="" style={{ color: '#8F9395' }}>Monto</label>
            <MyInput 
                variant="currency" 
                currency={currency.symbol} 
                type="number" 
                step='any' 
                name="amount"
                placeholder={currentDestinationAssignment ? '0.00' : 'Selecciona una cuenta de destino'}
                disabled={currentDestinationAssignment === null}  
                onChange={handleAmounts}
            />

            <AssignmentSelector 
                clicked={clicked} 
                currency={currency.symbol} 
                currentType={currentType}
                handleAssignment={handleAssignments}
                handleCurrency={handleCurrency}
                handleClick={handleClicked}
                shownAssignments={shownAssignments}
            />

            <div style={{position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '20px'}}>
                <MyButton>Agregar</MyButton>
            </div>
        </form>
    );
}

export default TransferAssignment;