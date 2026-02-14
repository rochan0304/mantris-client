import axios from "axios";

interface AuthData {
    email: string;
    password: string;
}

const authApi = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/auth`,
    headers: { 'Content-Type': 'application/json' }
});

export const registerUser = (registerData: AuthData) => {
    return authApi.post('/register', registerData);
};

export const loginUser = (loginData: AuthData) => {
    return authApi.post('/login', loginData);
};