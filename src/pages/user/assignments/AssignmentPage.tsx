import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getUnassignedAmount } from "../../../api/unassignedBox.api";
import { Link } from "react-router-dom";
import { useTitleContext } from "../../../layouts/ModuleLayout";
import MyButton from "../../../components/ui/MyButton";
import { deleteAssignment, getAssignments } from "../../../api/assignment.api";
import type { AssignmentData, GetAssignmentsData } from "../../../types/assignment.type";
import CheckBoxInput from "../../../components/ui/CheckboxInput";
import AssignmentCard from "../../../components/ui/AssignmentCard";
import { GoPlus } from "react-icons/go";
import { useLoading } from "../../../context/LoadingContext";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from "./AssignmentPage.module.css";

interface UnassignedBalanceResponse {
    unassignedAmount: string;
}

function AssignmentPage() {
    const { user } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const [ unassignedAmount, setUnassignedAmount ] = useState('0.00');

    const [ currentType, setCurrentType ] = useState<string>('FIJO');
    const [ assignments, setAssignments ] = useState<AssignmentData[]>([]);
    const [ shownAssignments, setShownAssignments ] = useState<AssignmentData[]>([]);

    const [ assignmentIdClicked, setAssignmentClicked ] = useState<string | undefined>(undefined);
    const [ clicked, setClicked ] = useState(false);

    const setTitle = useTitleContext();

    const filterAssignments = (assignments: AssignmentData[], type:string) => {
        const filteredAssignments = assignments.filter(assignment => assignment.type === type);
        setShownAssignments(filteredAssignments);
    };

    const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentType(e.target.value);
        filterAssignments(assignments, e.target.value);
    };

    const handleDelete = async () => {
        showLoading()
        console.log(assignmentIdClicked);
        try {
            if (assignmentIdClicked) {
                await deleteAssignment(assignmentIdClicked);
                setAssignments(prev => prev?.filter(assignment => assignment.id !== assignmentIdClicked));
                filterAssignments(assignments!.filter(assignment => assignment.id !== assignmentIdClicked), currentType);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setClicked(false);
            hideLoading();
        }
    }

    const handleClick = (id?: string) => {
        setClicked(prev => !prev);
        if (id) {
            setAssignmentClicked(id);
        } else {
            setAssignmentClicked(undefined);
        }
    };

    useEffect(() => {
        setTitle('Presupuesto')
        showLoading();
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
            } finally {
                hideLoading();
            }
        }

        assignments();
        unassignedBalance();
    }, [])

    return (
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
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
            <section style={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
                { shownAssignments && shownAssignments.map(assignment => (
                    <Link to={assignment.id} state={{assignment}} key={assignment.id}
                        style={{ 
                            position: 'relative',
                            overflow: 'hidden',
                            textDecoration: 'none',
                            color: 'white'
                        }}
                    >
                        <AssignmentCard
                            assignment={assignment}
                            currency={user!.baseCurrency.symbol}
                            className={ styles.card }
                        />
                        {/*                         
                        <div
                            className={ styles.delete } 
                            style={{
                                color: 'red',
                            }}
                            onClick={() => handleClick(assignment.id)}
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
                                <p>¿Desea eliminar esta asignación?</p>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '15px'}}>
                                    <MyButton style={{ backgroundColor: 'rgb(171, 0, 0)', color: 'white' }} onClick={handleDelete}>Eliminar</MyButton>
                                    <MyButton variant="secondary" onClick={handleClick} style={{ backgroundColor: '#252C31'}}>Cancelar</MyButton>
                                </div>
                            </div>
                        </div> */}
                    </Link>
                ))}
            </section>
        </div>
    );
}

export default AssignmentPage;