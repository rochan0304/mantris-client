import { useEffect, useState } from "react";
import { useTitleContext } from "../../../layouts/ModuleLayout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { AssignmentData } from "../../../types/assignment.type";
import AssignmentCard from "../../../components/ui/AssignmentCard";
import { useAuth } from "../../../context/AuthContext";
import { BiEdit, BiTrash } from "react-icons/bi";
import MyButton from "../../../components/ui/MyButton";
import { useLoading } from "../../../context/LoadingContext";
import { deleteAssignment } from "../../../api/assignment.api";


function ShowAssignment() {
    const { user } = useAuth();
    const setTitle = useTitleContext();
    const { showLoading, hideLoading } = useLoading();
    const navigate = useNavigate();
    const assignment: AssignmentData = useLocation().state.assignment;
    const [clickDelete, setClickDelete] = useState(false);
    const handleClickDelete = () => {
        setClickDelete(prev => !prev);
    };

    const handleDelete = async () => {
        showLoading()
        try {
            await deleteAssignment(assignment.id);
            navigate('/assignment');

        } catch (error) {
            console.log(error);
        } finally {
            hideLoading();
        }
    }
    useEffect(()=>{
        setTitle('Asignación')
    }, []);

    return (
        <div style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
        }}>
            <AssignmentCard assignment={assignment} currency={user!.baseCurrency.symbol} />
            <div style={{
                display: 'flex',
                gap: '10px',
            }}>
                <Link to='/assignment/edit' state={{assignment}} style={{
                    backgroundColor: '#192126',
                    color: 'white',
                    padding: '15px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    flex: '1'
                }}>
                    <BiEdit fontSize={'20px'}/>
                    Editar
                </Link>
                <div style={{
                    backgroundColor: '#192126',
                    color: 'red',
                    padding: '15px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    flex: '1'
                }} onClick={handleClickDelete}>
                    <BiTrash fontSize={'20px'}/>
                    Eliminar
                </div>
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
                transform: clickDelete ? 'translate(0)' : 'translate(100%)',
                opacity: clickDelete ? '1' : '0',
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
                        <MyButton variant="secondary" onClick={handleClickDelete} style={{ backgroundColor: '#252C31'}}>Cancelar</MyButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowAssignment;