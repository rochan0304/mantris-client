import { useAuth } from "../context/AuthContext";
import { FaBell } from "react-icons/fa";
import { Outlet, useOutletContext } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { useState } from "react";

interface HeaderContextType {
    setTitle: (newTitle: string) => void;
}

export const useTitleContext = () => {
    const { setTitle } = useOutletContext<HeaderContextType>();
    return setTitle;
};

const CustomModuleLayout = () => {
    const { user } = useAuth();
    const [ title, setTitle ] = useState<string>('Cargando...');

    return (
        <div style={{
            height: '100dvh',
            position: 'relative',
        }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', alignItems: 'center' }}>
                <p style={{ color: title !== 'Cargando...' ? '#A6FF00' : '#8C9092', fontSize: '20px'}}>
                    { 
                        title === 'home' && 
                        <span>
                            <span style={{fontSize: '14px'}}>Hola, </span><br /> 
                            {user?.name ? user.name : 'invitado'}
                        </span>
                    }                    
                    { title !== 'home' && <span>{ title }</span>}
                </p>
                <div 
                    style={{ 
                        backgroundColor: '#192126', 
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: '15px', 
                        borderRadius: '10px',
                        color: '#8C9092'
                    }}
                >
                    <FaBell fontSize={'20px'}/>
                </div>
            </header>
            <main 
                style={{
                    padding: '10px 0px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    paddingBottom: '110px',
                }}
            >
                <Outlet context={{ setTitle }}/>
            </main>
        </div>
    )
};

export default CustomModuleLayout;