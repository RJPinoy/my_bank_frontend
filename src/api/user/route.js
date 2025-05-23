import { api } from "../axios";

const API_USER_ENDPOINT = '/api/user';

export async function isAuthenticated() {
    try {
        const response = await api.get(API_USER_ENDPOINT, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return null;
    }
}