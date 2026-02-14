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
import { GoPlus } from "react-icons/go";

interface UnassignedBalanceResponse {
    unassignedAmount: string;
}

function AssignmentPage() {
    const { user } = useAuth();
    const [ unassignedAmount, setUnassignedAmount ] = useState('0.00');

    const [ currentType, setCurrentType ] = useState<string>('FIJO');
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

    useEffect(() => {
        setTitle('Presupuesto')
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
                setUnassignedAmount(data.unassignedAmount);
            } catch (error) {
                console.log(error);
            }
        }

        assignments();
        unassignedBalance();
    }, [])

    return (
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'flex', backgroundColor: '#192126', borderRadius: '10px', }}>
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
            <section style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
            }}>
                <div 
                    style={{
                        padding: '20px',
                        border: `1px solid ${unassignedAmount !== '0.00' ? '#A6FF00' : '#8F9395'}`,
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))'
                    }}
                >
                    <p 
                        style={{ 
                            fontSize: '24px', 
                            fontFamily: 'Inter, sans-serif', 
                            fontWeight: '700',
                            color: unassignedAmount !== '0.00' ? '#A6FF00' : '#8F9395',
                            }}
                    >
                        { user?.baseCurrency.symbol } { unassignedAmount }
                    </p>
                    <p style={{ opacity: '0.5'}}>Sin asignar</p>
                </div>
                <div style={{ width: '100%', display: 'flex', gap: '10px'}}>
                    { unassignedAmount === '0.00' ? 
                        <div style={{ flex: '1'}}><MyButton variant="secondary" style={{ color: '#8F9395'}}>Asignar</MyButton></div>
                        : 
                        <Link to={'assign'} style={{ flex: '1', textDecoration: 'none' }}>
                            <MyButton >Asignar</MyButton>
                        </Link>
                    }
                    <Link 
                        to={'transfer'} 
                        style={{ flex: '1', textDecoration: 'none'}}
                        state= {{assignments, currency: user?.baseCurrency, currentType }}>
                        <MyButton variant="secondary">Transferir</MyButton>
                    </Link>
                </div>
            </section>
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
                    state={currentType}
                >
                    <GoPlus fontSize={'24px'}/> Nueva asignación
                </Link>
                        </div>
            <section>
                { shownAssignments && shownAssignments.map(assignment => (
                    <AssignmentCard 
                        key={assignment.id}
                        assignment={assignment}
                        currency={user!.baseCurrency.symbol}
                        style={{ margin: '20px 0'}}
                    />
                ))}
            </section>
        </div>
    );
}

export default AssignmentPage;