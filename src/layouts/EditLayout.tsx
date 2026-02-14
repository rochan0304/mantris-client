import { useState } from "react";
import styles from './EditLayout.module.css';
import BackButton from "../components/ui/BackButton";
import { Outlet, useLocation } from "react-router-dom";

const EditLayout = () => {
    const [ title, setTitle ] = useState<string>('');
    const location = useLocation();
    
    const getPath = () => {
        if (location.pathname === '/income' || location.pathname === '/spent') {
            return 'home';
        }
        return;
    }

    return (
        <div style={{
            minHeight: '100dvh',
            width: '100dvw',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
        }}>
            <header className={ styles.headerContainer }>
                <BackButton path={ getPath() } />
                { title }
            </header>
            <main style={{ padding: '0', flex: '1', overflowY: 'auto', paddingBottom: '10px', overflowX: 'hidden', borderRadius: '1px solid red'}}>
                <Outlet context={{ setTitle }}/>
            </main>
        </div>
    );
};

export default EditLayout;