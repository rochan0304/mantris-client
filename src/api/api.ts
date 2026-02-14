import axios, { type AxiosInstance } from "axios";

export const serverApi = (path: string): AxiosInstance => {
    const server = axios.create({
        baseURL: `${import.meta.env.VITE_BASE_URL}/${path}`,
        headers: { 'Content-Type': 'application/json' },
    });

    server.interceptors.request.use(config => {
        const token = localStorage.getItem('user-token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, error => {
        return Promise.reject(error);
    });

    return server;
}