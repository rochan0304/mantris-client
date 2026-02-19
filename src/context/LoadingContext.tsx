import React, { createContext, useContext, useState, type ReactNode } from "react";

interface LoadingProviderProps {
    children: ReactNode;
}

interface LoadingContextType {
    isLoading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}


const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<LoadingProviderProps> = ({children}) => {
    const [ isLoading, setIsLoading] = useState<boolean>(false);
    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
            { children }
        </LoadingContext.Provider>
    )
}

export const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading debe usarse dentro de un LoadingProvider');
    }
    return context;
}