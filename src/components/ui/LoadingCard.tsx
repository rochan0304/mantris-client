import { createPortal } from "react-dom";
import { useLoading } from "../../context/LoadingContext";
import type React from "react";

const LoadingCard = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;
    
    const portalRoot = document.getElementById('loader-root');
    
    if (!portalRoot) return null;

    return createPortal(
        <div style={ styles.overlay }>
            <div style={ styles.card }>
                <img src="/loader.svg" alt="Cargando" style={ styles.loader }/>
            </div>
        </div>,
        portalRoot
    )
};

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100dvh',
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        padding: '20px',
        backgroundColor: '#192126',
        borderRadius: '20px'
    },
    loader: {
        width: '80px'
    }

};

export default LoadingCard;