import axios from "axios";

const BASE_API_URL = 'http://localhost:8000/';

export const api = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

export async function register(username, password) {
    try {
        const response = await api.post('user', {
            username,
            password
        }, {
            withCredentials: true
        });
        console.log('Registration successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}

export async function login(username, password) {
    try {
        const response = await api.post('api/login', {
            username,
            password
        }, {
            withCredentials: true
        });
        console.log('Login successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}