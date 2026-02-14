import { forwardRef, type ReactNode } from "react";
import type React from "react";
import styles from './CheckboxInput.module.css';

type VariantType = 'primary' | 'secondary';

interface CheckBoxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
    children: ReactNode;
    value: string;
    widthCustom?: boolean;
    variant?: VariantType
}

const CheckBoxInput: React.FC<CheckBoxInputProps> = ({ name, children, icon, value, style, widthCustom = false, variant='primary', ...props  }) => {
    const getWidth = () => {
        if (widthCustom) {
            return { flex: '0 0 calc(50% - 5px)' };
        }
        return { width: '100%' };
    };

    return (
        <div 
            style={{ display: 'flex', ...getWidth()  }}
        >
            <input 
                type="radio"
                { ...props }
                id={ value }
                value={ value }
                name={ name }
                className={ styles.hiddenCheckbox }
            />
            <label 
                htmlFor={ value }
                className={ variant === 'primary' ? styles.customCheckboxLabel : styles.customCheckboxLabelSecondary }
                style={{ justifyContent: icon ? 'space-between' : 'center', ...style}}
            >    
                { children }
                { icon }
            </label>
        </div>
    );
};

export default CheckBoxInput;