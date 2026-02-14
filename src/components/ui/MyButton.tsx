import React from "react";

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonSize = '100%' | '50%';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    isLoading?: boolean;
    size?: ButtonSize;
}

const MyButton: React.FC<ButtonProps> = ({children, variant = 'primary', size = '100%', isLoading, style, ...props}) => {
    const getVariantStyle = () => {
        switch (variant) {
            case "primary": return { backgroundColor: '#A6FF00', color: 'black'}
            case 'secondary': return { backgroundColor: '#192126', color: 'white' };
            case 'outline': return { backgroundColor: 'transparent', border: '1px solid #A6FF00', color: '#A6FF00'}
        }
    }

    return (
        <button
            style={{
                width: size,
                padding: '15px',
                borderRadius: '10px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                border: 'none',
                fontSize: '16px',
                fontWeight: '400',
                fontFamily: 'Sora, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                ...getVariantStyle(),
                ...style
            }}
            disabled={isLoading}
            { ...props }
        >
            { isLoading ? 'Cargando...' : children }
        </button>
    );
};

export default MyButton;