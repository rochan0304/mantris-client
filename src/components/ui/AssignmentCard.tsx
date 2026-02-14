import type React from "react";
import MyInput from "./MyInput";
import MyButton from "./MyButton";
import styles from "./AssignmentCard.module.css";
import { useRef, useState } from "react";
import type { AssignmentData } from "../../types/assignment.type";
import { incomeAssignment } from "../../api/assignment.api";

interface AssignmentCardProps extends React.ComponentPropsWithoutRef<'div'> {
    currency: string;
    assignment: AssignmentData;
    calculateUnassignedBalance?: (amount: number) => void;
    setUnassignedBox?: (amount: number) => void;
    resetAmount?: () => void;
    fixed?: boolean
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ 
    currency, 
    assignment, 
    calculateUnassignedBalance, 
    resetAmount, 
    setUnassignedBox, 
    fixed = false,
    style, 
    ...props 
}) => {
    const [ clicked, setClicked ] = useState<boolean>(false);

    const [ formData, setFormData ] = useState({
        amount: '',
        id: assignment.id
    });

    const [ availableBalance, setAvailableBalance ] = useState<string>(assignment.availableBalance);
    const [ customAvailableBalance, setCustomAvailableBalance ] = useState<string>(assignment.availableBalance);

    const contentRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setClicked(!clicked);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        
        try {
            const result = Number(formData.amount) + Number(assignment.availableBalance);
    
            if (result > +assignment.assignedAmount) {
                throw new Error('Monto excede el presupuesto asignado.')
            }
            const response = await incomeAssignment(formData);
            const data = response.data;
            if (setUnassignedBox) {
                setUnassignedBox(+formData.amount);
            }

            setAvailableBalance(data.availableBalance);
            handleClick();
            setFormData(prev => ({
                ...prev,
                amount: ''
            }));
        } catch (error) {
            console.error(error);
        }
    }

    const handleReset = () => {
        if (resetAmount) {
            resetAmount();
        }
        handleClick();

        setCustomAvailableBalance(availableBalance);
        setFormData(prev => ({
                ...prev,
                amount: ''
            }));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const amount = e.target.value;

        if (calculateUnassignedBalance) {
            calculateUnassignedBalance(+amount);
            setCustomAvailableBalance((Number(+availableBalance + +amount).toFixed(2)));
        }


        if (!amount) {
            setFormData(prev => ({
                ...prev,
                amount: ''
            }));
            return;
        }
        
        if (amount) {
            setFormData(prev => ({
                ...prev,
                amount
            }));
        }
    }

    const getPercentage = () => {
        const assignedAmount = assignment.assignedAmount;

        const result = ((Number(customAvailableBalance) * 100) / Number(assignedAmount)).toFixed(2);

        return result; 
    };
    
    return(
        <div 
            style={{ 
                padding: '20px',
                backgroundColor: '#192126',
                width: '100%',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                height: 'auto',
                overflow: 'hidden',
                ...style
            }}
            { ...props }
        >
            <h3 style={{ width: 'fit-content', whiteSpace: 'nowrap' }}>
                { assignment.name ? assignment.name : 'Sin nombre' }
            </h3>
            <div 
                style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'end'}}
                onClick={ handleClick }
            >
                <p style={{
                    fontSize: '20px',
                    color: 'white',
                    fontFamily: 'Inter, sans-serif', 
                }}>
                    {currency} { fixed ?  assignment.availableBalance : customAvailableBalance } <span style={{ fontSize: '14px', color: '#8C9092'}}>/ {assignment.assignedAmount}</span>
                </p>
                <div style={{ width: '100%', height: '8px', borderRadius: '1000px', backgroundColor: '#44631A', margin: '10px 0', overflow: 'hidden' }}>
                    <div style={{ width: `${getPercentage()}%`, backgroundColor: '#A6FF00', height: '100%', borderRadius: '1000px', transition: 'all 0.5s ease'}}>
                    </div>
                </div>
                <div style={{ fontSize: '14px', textAlign: 'right' }}>
                    <span style={{ color: '#8C9092'}}>Faltan</span> {currency} { (Number(assignment.assignedAmount) - Number(fixed ? assignment.availableBalance : customAvailableBalance)).toFixed(2) }
                </div>
            </div>
            <div 
                ref={contentRef} 
                style={{
                maxHeight: clicked ? `${contentRef.current?.scrollHeight}px` : '0px',
                transition: 'max-height 0.4s ease' 
            }}>
                { calculateUnassignedBalance && 
                
                <form className={ `${styles.form} ${ clicked ? styles.formActive : '' }`} onSubmit={ handleSubmit }>
                    <MyInput type="number" step='any' variant="number" placeholder="0.00" onChange={ handleChange } value={formData.amount}/>
                    <div style={{ display: 'flex', gap: '10px'}}>
                        <MyButton style={{ flex: '0 0 calc(50% - 5px)'}}>Guardar</MyButton>
                        <MyButton 
                            style={{ flex: '0 0 calc(50% - 5px)', background: '#252C31', color: '#969696'}} 
                            variant="secondary"
                            onClick={ handleReset }
                            type="button"
                        >
                            Cancelar
                        </MyButton>
                    </div>
                </form>
                }
            </div>
        </div>
    );
}

export default AssignmentCard;