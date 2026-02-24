import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getUnassignedAmount } from "../../../api/unassignedBox.api";
import { Link } from "react-router-dom";
import { useTitleContext } from "../../../layouts/ModuleLayout";
import MyButton from "../../../components/ui/MyButton";
import { getAssignments } from "../../../api/assignment.api";
import type { AssignmentData, GetAssignmentsData } from "../../../types/assignment.type";
import CheckBoxInput from "../../../components/ui/CheckboxInput";
import AssignmentCard from "../../../components/ui/AssignmentCard";
import styles from './AddToAssignment.module.css';
import { formatter } from "../Home";
import { GoArrowLeft } from "react-icons/go";
import { useLoading } from "../../../context/LoadingContext";

interface UnassignedBalanceResponse {
    unassignedAmount: string;
}

function AddToAssignment() {
    const { user } = useAuth();
    const { showLoading, hideLoading } = useLoading();

    const [ unassignedAmount, setUnassignedAmount ] = useState('0.00');
    const [ customUnassignedAmount, setCustomUnassignedAmount ] = useState('0.00');
    const [ amountColor, setAmountColor ] = useState('#8F9395');

    const [ currentType, setCurrentType ] = useState<string>('FIJO');
    const [ currentAssignment, setCurrentAssignment ] = useState<AssignmentData | null>(null);

    const [ assignments, setAssignments ] = useState<AssignmentData[]>([]);
    const [ shownAssignments, setShownAssignments ] = useState<AssignmentData[]>([]);

    const setTitle = useTitleContext();

    const filterAssignments = (assignments: AssignmentData[], type:string) => {
        const filteredAssignments = assignments.filter(assignment => assignment.type === type);
        setShownAssignments(filteredAssignments);
    };

    const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentType(e.target.value);
        filterAssignments(assignments, e.target.value);
    };

    const handleAssignment = (assignment: AssignmentData) => {
        if (currentAssignment === assignment) {
            setCurrentAssignment(null);
            return;
        } else {
            setCurrentAssignment(assignment);
        }
    };

    const handleCustomUnassignedAmount = (amount: number) => {
        if (!amount) {
            setAmountColor('#A6FF00');
            setCustomUnassignedAmount(unassignedAmount);
            return;
        }
        
        if (amount > +unassignedAmount) {
            setAmountColor('red');
        }

        if (amount <= +unassignedAmount) {
            setAmountColor('#A6FF00');
        }

        if (amount < 0) {
            setCustomUnassignedAmount(unassignedAmount);
            return;
        }

        const result = formatter.format(+ unassignedAmount - amount);
            
        setCustomUnassignedAmount(result);
    };

    const handleUnassignedAmount = (amount: number) => {
        const result = formatter.format(+unassignedAmount - amount);
        setUnassignedAmount(result);
    }

    const handleReset = () => {
        setCustomUnassignedAmount(unassignedAmount);
        setAmountColor('#A6FF00')
    };

    useEffect(() => {
        showLoading();
        setTitle('Asignando...')
        const assignments = async () => {
            try {
                const response = await getAssignments();
                const data = response.data;
                filterAssignments(data, currentType);
                setAssignments(data);
            } catch (error) {
                console.log(error);
            }
        }

        const unassignedBalance = async () => {
            try {
                const response = await getUnassignedAmount();
                const data = response.data;

                if (+data.unassignedAmount > 0) {
                    setAmountColor('#A6FF00 ')
                }

                setUnassignedAmount(formatter.format(data.unassignedAmount));
                setCustomUnassignedAmount(data.unassignedAmount);
            } catch (error) {
                console.log(error);
            } finally {
                hideLoading();
            }
        }

        assignments();
        unassignedBalance();
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '0 20px'}}>
                <div style={{ display: 'flex', backgroundColor: '#192126', borderRadius: '10px', overflowX: 'auto' }}>
                    <CheckBoxInput 
                        value="FIJO" 
                        style={{ flex: '1', justifyContent: 'center'}} 
                        name="type"
                        onChange={ handleType }
                        checked={ currentType === 'FIJO' }
                    >
                        Fijos
                    </CheckBoxInput>

                    <CheckBoxInput 
                        value="VARIABLE" 
                        style={{ flex: '1', justifyContent: 'center'}} 
                        name="type"
                        onChange={ handleType }
                        checked={ currentType === 'VARIABLE' }
                    >
                        Variables
                    </CheckBoxInput>

                    <CheckBoxInput 
                        value="AHORRO" 
                        style={{ flex: '1', justifyContent: 'center'}} 
                        name="type"
                        onChange={ handleType }
                        checked={ currentType === 'AHORRO' }
                    >
                        Ahorros
                    </CheckBoxInput>

                    <CheckBoxInput 
                        value="EXTRA" 
                        style={{ flex: '1', justifyContent: 'center'}} 
                        name="type"
                        onChange={ handleType }
                        checked={ currentType === 'EXTRA' }
                    >
                        Extras
                    </CheckBoxInput>
                </div>
            </div>
            <section style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'sticky',
                top: '0',
                padding: '20px',
                zIndex: '99',
                backgroundColor: '#0d151a',
                borderRadius: '0 0 20px 20px',
            }}>
                <div 
                    style={{
                        padding: '20px',
                        border: `1px solid ${amountColor }`,
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                        zIndex: '0'
                    }}
                >
                    <p 
                        style={{ 
                            fontSize: '24px', 
                            fontFamily: 'Inter, sans-serif', 
                            fontWeight: '700',
                            color: amountColor,
                            }}
                    >
                        { user?.baseCurrency.symbol } { customUnassignedAmount }
                    </p>
                    <p style={{ opacity: '0.5'}}>Sin asignar</p>
                </div>
                <div style={{ width: '100%', display: 'flex', gap: '10px'}}>
                    <Link to='/assignment' style={{ flex: '1', textDecoration: 'none'}}>
                        <MyButton variant="secondary"><GoArrowLeft /> Atrás</MyButton>
                    </Link>
                </div>
            </section>
            <section style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', padding: '0 20px' }}>
                { shownAssignments && shownAssignments.map(assignment => (
                    <CheckBoxInput 
                        key={assignment.id} 
                        value={assignment.id} 
                        name="assignment" 
                        onClick={ () => handleAssignment(assignment)}
                        style={{ padding: '0px', background: 'transparent', border: 'none', color: '#ffffff'}}
                        readOnly={true}
                    >
                        <AssignmentCard 
                            assignment={assignment}
                            currency={user!.baseCurrency.symbol}
                            calculateUnassignedBalance={ handleCustomUnassignedAmount }
                            resetAmount={ handleReset }
                            setUnassignedBox={ handleUnassignedAmount }
                            style={{ border: '1px solid rgba(166, 255, 0, 0.8)'}}
                        />
                    </CheckBoxInput>
                ))}
            </section>
        </div>
    );
}

export default AddToAssignment;