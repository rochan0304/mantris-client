import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type React from "react";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
    children: ReactNode;
}

interface Currency {
    id: string,
    symbol: string;
    name: string;
}

interface UserPayload {
    sub: string;
    name?: string;
    lastName?: string;
    email: string;
    iat: number;
    exp: number;
    role: string;
    baseCurrency: Currency;
}

interface AuthState {
    token: string | null;
    user: UserPayload | null;
    isLoggedIn: boolean; 
}

interface AuthContextType extends AuthState {
    login?: (token: string) => void;
    logout?: () => void | null;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    user: null,
    isLoggedIn: false,
    isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const navigate = useNavigate();

    const [ auth, setAuth ] = useState<AuthState>({
        token: null,
        user: null,
        isLoggedIn: false,
    });

    const [ isLoading, setIsLoading ] = useState(true);

    const handleLogin = (token: string) => {
        localStorage.setItem('user-token', token);

        const decodedUser: UserPayload = jwtDecode(token);

        setAuth({
            token,
            isLoggedIn: true,
            user: decodedUser
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('user-token');
        setAuth({
            token: null,
            isLoggedIn: false,
            user: null
        });
        navigate('/login');
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('user-token');

        if (storedToken) {
            try {
                const decodedUser: UserPayload = jwtDecode(storedToken);
                const currentTime = Date.now() / 1000;
                
                if (decodedUser.exp > currentTime) {
                    setAuth({
                        token: storedToken,
                        isLoggedIn: true,
                        user: decodedUser
                    });
                } else {
                    handleLogout();
                }
                
            } catch (err) {
                handleLogout();
            } finally {
                setIsLoading(false);
            }
        }
        setIsLoading(false);
    }, [])

    const contextValue: AuthContextType = {
        ...auth,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}