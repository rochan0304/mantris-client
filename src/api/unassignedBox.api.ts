import axios from "axios";

const unassignedBoxApi = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/unassigned-boxes`,
    headers:  { 'Content-Type': 'application/json' }
});

unassignedBoxApi.interceptors.request.use(config => {
    const token = localStorage.getItem('user-token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export const getUnassignedAmount = () => {
    return unassignedBoxApi.get('/amount');
};