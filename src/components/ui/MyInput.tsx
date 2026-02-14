import type { InputHTMLAttributes, ReactNode } from "react";
import type React from "react";

type InputVariant = 'number' | 'currency' | 'text';
type InputStatus = 'success' | 'error' | 'default';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: InputVariant;
    icon?: ReactNode;
    currency?: string;
    status?: InputStatus;
}

const MyInput: React.FC<InputProps> = ({ children, variant='text', style, icon, currency, status, ...props}) => {
    const containerStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '0 20px',
        borderRadius: '10px'
    };

    const inputStyles: React.CSSProperties = {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        width: '100%',
        padding: '20px 0',
        color: 'white'
    };

    const getStatusStyles = () => {
        if (status === 'success') return { border: '1px solid #A6FF00'}
        if (status === 'error') return { border: '1px solid #ff0000ff'}
        if (status === 'default') return { border: '1px solid #192126'}
    }

    return (
        <div 
            style={{
                backgroundColor: variant === 'number' ? 'transparent' : '#192126',
                ...containerStyles,
                ...getStatusStyles()
            }}
        >
            { icon && <span style={{ fontSize: '24px', display: 'flex', color: '#8C9092'}} >{ icon }</span>}
            <input 
                style={{
                    fontSize: variant === 'number' ? '32px' : '14px',
                    textAlign: variant === 'number' ? 'center' : 'left',
                    fontFamily: variant === 'number' ? 'Inter, sans-serif' : 'Sora, sans-serif',
                    fontWeight: variant === 'number' ? '700' : '400',
                    ...inputStyles,
                    ...style
                }}
                {...props}
            />
            { currency && <span style={{color: '#8C9092', fontSize: '14px'}}>{ currency }</span> }
        </div>
    )
};

export default MyInput;