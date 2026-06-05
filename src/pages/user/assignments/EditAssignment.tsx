import { useForm } from "react-hook-form";
import MyInput from "../../../components/ui/MyInput";
import { useAuth } from "../../../context/AuthContext";
import { GoQuestion } from "react-icons/go";
import CheckBoxInput from "../../../components/ui/CheckboxInput";
import MyButton from "../../../components/ui/MyButton";
import React, { useEffect, useState } from "react";
import { useTitleContext } from "../../../layouts/ModuleLayout";
import { formatter } from "../Home";
import AssignmentCard from "../../../components/ui/AssignmentCard";
import { createAssignment, editAssignment } from "../../../api/assignment.api";
import type { AssignmentData, CreateAssignmentData } from "../../../types/assignment.type";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoading } from "../../../context/LoadingContext";

function EditAssignment () {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const assignment: AssignmentData = useLocation().state.assignment;
    console.log(assignment);

    const symbolCurrency: string = user!.baseCurrency.symbol;
    const setTitle = useTitleContext();

    const [ formData, setFormData ] = useState<CreateAssignmentData>({
        name: assignment.name,
        type: assignment.type,
        assignedAmount: Number(formatter.format(assignment.assignedAmount)),
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        showLoading();
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const data = Object.fromEntries(form.entries());
        console.log(formData);
        try {
            const response = await editAssignment(assignment.id, formData);
            const assignmentResponse = response.data;
            navigate(`/assignment`, {state: {assignment: assignmentResponse}});
        } catch (error) {
            console.log(error);
        } finally {
            hideLoading();
        }
    };
    
    const handlheChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.type === 'number' ? e.target.valueAsNumber : e.target.value,
        }));
    };

    useEffect(() => {
        setTitle('Nueva asignación')
    }, []);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 20px'}}>
                <AssignmentCard 
                    currency={ symbolCurrency }
                    assignment={ { id: '', name: formData.name , type: formData.type, assignedAmount: formData.assignedAmount, availableBalance: assignment.availableBalance }}
                />
            </div>
            <form 
                style={{
                    padding: '0 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }} 
                onSubmit={handleSubmit }
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <label htmlFor="name">Nombre de la asignación</label>
                    <MyInput  placeholder="Ej. Alquiler" name="name" onChange={handlheChange} maxLength={23} value={formData.name}/>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <label htmlFor="assignedAmount">Monto objetivo</label>
                    <MyInput placeholder="0.00" currency={ user?.baseCurrency.symbol } type="number" step='any' name="assignedAmount" onChange={handlheChange} value={formData.assignedAmount}/>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <div>Categoría</div>

                    <CheckBoxInput 
                        name="type" 
                        value='FIJO' 
                        icon={ <GoQuestion fontSize={'18px'}/>}
                        onChange={ handlheChange }
                        checked={formData.type === 'FIJO'}
                    >
                        Gasto Fijo
                    </CheckBoxInput>
                    <CheckBoxInput 
                        name="type" 
                        value='VARIABLE' 
                        icon={ <GoQuestion fontSize={'18px'}/>}
                        onChange={ handlheChange }
                        checked={formData.type === 'VARIABLE'}
                    >
                        Gasto Variable
                    </CheckBoxInput>
                    <CheckBoxInput 
                        name="type" 
                        value='AHORRO' 
                        icon={ <GoQuestion fontSize={'18px'}/>}
                        onChange={ handlheChange }
                        checked={formData.type === 'AHORRO'}
                    >
                        Ahorro
                    </CheckBoxInput>
                    <CheckBoxInput 
                        name="type" 
                        value='EXTRA' 
                        icon={ <GoQuestion fontSize={'18px'}/>}
                        onChange={ handlheChange }
                        checked={formData.type === 'EXTRA'}
                    >
                        Gasto Extra
                    </CheckBoxInput>
                </div>
                <MyButton >Continuar</MyButton> 
            </form>
        </>
    );
}

export default EditAssignment;