import { api } from '../axios';

const API_CATEGORY_ENDPOINT = 'api/categories';

export async function getCategories() {
    try {
        const response = await api.get(API_CATEGORY_ENDPOINT, {
            withCredentials: true
        });
        const data = response.data;
        console.log('Categories fetched successfully:', data);

        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}