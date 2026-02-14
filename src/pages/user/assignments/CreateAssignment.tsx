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
import { createAssignment } from "../../../api/assignment.api";
import type { CreateAssignmentData } from "../../../types/assignment.type";
import { useNavigate } from "react-router-dom";

function CreateAssignment () {
    const { user } = useAuth();
    const navigate = useNavigate();

    const symbolCurrency: string = user!.baseCurrency.symbol;
    const setTitle = useTitleContext();

    const [ formData, setFormData ] = useState<CreateAssignmentData>({
        name: '',
        type: '',
        assignedAmount: formatter.format(0),
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const data = Object.fromEntries(form.entries());
        console.log(formData);
        try {
            const response = await createAssignment(formData);
            const assignment = response.data;
            navigate(-1);
        } catch (error) {
            console.log(error);
        }
    };
    
    const handlheChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.type === 'number' ? formatter.format(+e.target.value) : e.target.value,
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
                    assignment={ { id: '', name: formData.name , type: formData.type, assignedAmount: formData.assignedAmount, availableBalance: '0.00' }}
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
                    <MyInput  placeholder="Ej. Alquiler" name="name" onChange={handlheChange} maxLength={23}/>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <label htmlFor="assignedAmount">Monto objetivo</label>
                    <MyInput placeholder="0.00" currency={ user?.baseCurrency.symbol } type="number" step='any' name="assignedAmount" onChange={handlheChange}/>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <div>Categoría</div>

                    <CheckBoxInput 
                        name="type" 
                        value='FIJO' 
                        icon={ <GoQuestion fontSize={'18px'}/>}
                        onChange={ handlheChange }
                    >
                        Gasto Fijo
                    </CheckBoxInput>
                    <CheckBoxInput 
                        name="type" 
                        value='VARIABLE' 
                        icon={ <GoQuestion fontSize={'18px'}/>}
                        onChange={ handlheChange }
                    >
                        Gasto Variable
                    </CheckBoxInput>
                    <CheckBoxInput 
                        name="type" 
                        value='AHORRO' 
                        icon={ <GoQuestion fontSize={'18px'}/>}
                        onChange={ handlheChange }
                    >
                        Ahorro
                    </CheckBoxInput>
                    <CheckBoxInput 
                        name="type" 
                        value='EXTRA' 
                        icon={ <GoQuestion fontSize={'18px'}/>}
                        onChange={ handlheChange }
                    >
                        Gasto Extra
                    </CheckBoxInput>
                </div>
                <MyButton >Continuar</MyButton> 
            </form>
        </>
    );
}

export default CreateAssignment;