import { api } from '../axios';

const API_CATEGORY_ENDPOINT = 'api/transaction';

export async function getTransactions() {
    try {
        const response = await api.get('api/transactions', {
            withCredentials: true
        });
        const data = response.data;
        console.log('Transactions fetched successfully:', data);

        return data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
}

export async function postTransaction(transactionData) {
    try {
        const response = await api.post(API_CATEGORY_ENDPOINT, transactionData, {
            withCredentials: true
        });
        const data = response.data;
        console.log('Transaction posted successfully:', data);

        return data;
    } catch (error) {
        console.error('Error posting transaction:', error);
        throw error;
    }
}

export async function deleteTransaction(transactionId) {
    try {
        const response = await api.delete(`${API_CATEGORY_ENDPOINT}/${transactionId}`, {
            withCredentials: true
        });
        const data = response.data;
        console.log('Transaction deleted successfully:', data);

        return data;
    } catch (error) {
        console.error('Error deleting transaction:', error);
        throw error;
    }
}

export async function updateTransaction(transactionId, transactionData) {
    try {
        const response = await api.put(`${API_CATEGORY_ENDPOINT}/${transactionId}`, transactionData, {
            withCredentials: true
        });
        const data = response.data;
        console.log('Transaction updated successfully:', data);

        return data;
    } catch (error) {
        console.error('Error updating transaction:', error);
        throw error;
    }
}