import { GoQuestion } from "react-icons/go";
import { Link } from "react-router-dom";
import MyButton from "./MyButton";
import type React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AssignmentCard from "./AssignmentCard";
import type { AssignmentData } from "../../types/assignment.type";

interface AssignmentSectionProps {
    titleSection: string;
    assignments?: AssignmentData[];
    currency: string;
}

const AssignmentSection: React.FC<AssignmentSectionProps> = ({ titleSection, assignments, currency,  }) => {
    if (!assignments) {
        return <p>Cargando...</p>
    }

    return (
        <section style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '5px', color: '#8F9395'}}>
                    { titleSection } <GoQuestion fontSize={'18px'}/>
                </div>
                <Link to={'create'} style={{ display: 'flex'}}>
                    <MyButton variant="secondary" style={{ padding: '10px', display: 'flex', alignItems: 'center' }}><AiOutlinePlus fontSize={'16px'}/></MyButton>
                </Link>
            </div>
            <div style={{
                display: 'flex',
                gap: '10px',
                minHeight: '140px',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                { assignments.length > 0 ? assignments.map(assignment => (
                    <AssignmentCard
                        key={ assignment.id }
                        currency={currency} 
                        assignedAmount={assignment.assignedAmount} 
                        name={assignment.name} 
                        type={assignment.type}
                        availableBalance={ assignment.availableBalance }
                        remainingAmount={String(Number(assignment.assignedAmount) - Number(assignment.availableBalance))}
                    />
                )) : (
                    <p style={{ textAlign: 'center', width: '100%', color: '#8C9092'}}>No hay asignaciones</p>
                )}
            </div>
        </section>
    );
}

export default AssignmentSection;