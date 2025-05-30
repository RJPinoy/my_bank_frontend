import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setTransaction } from '../../../stores/slices/transactionSlice';
import { postTransaction, deleteTransaction, updateTransaction } from '../../../api/transactions/route';
import { useModal } from '../ModalProvider';
import { sanitizeInput } from '../../../utils';

const TransactionModal = ({ handleCancel, handleConfirm, initialId = null, initialName = '', initialAmount = '', initialCategory = '' }) => {
    const [name, setName] = React.useState(initialName);
    const [amount, setAmount] = React.useState(initialAmount);
    const [category, setCategory] = React.useState(initialCategory);
    const [error, setError] = React.useState(null);

    const dispatch = useDispatch();
    const { hideModal } = useModal();

    const categories = localStorage.getItem('mybank-categories') ? JSON.parse(localStorage.getItem('mybank-categories')) : [];

    const handleSubmit = (event) => {
        event.preventDefault();

        // Sanitize inputs
        const sanitizedName = sanitizeInput(name.trim());
        const sanitizedAmount = sanitizeInput(amount.toString());
        const sanitizedCategory = parseInt(sanitizeInput(category.toString()));

        // Validation
        if (!sanitizedName || !sanitizedAmount || !sanitizedCategory) {
            setError('Please fill in all fields.');
            return;
        }

        if (Number(sanitizedAmount) < 0) {
            setError('Amount cannot be negative.');
            return;
        }

        if (sanitizedName.length > 100) {
            setError('Name cannot exceed 100 characters.');
            return;
        }

        const transactionData = {
            name: sanitizedName,
            amount: sanitizedAmount,
            category: sanitizedCategory,
        };

        if (initialId) {
            updateTransaction(initialId, transactionData)
            dispatch(setTransaction(transactionData));
        } else {
            // Dispatch and post
            dispatch(setTransaction(transactionData));
            postTransaction(transactionData);
        }

        setError(null);
        hideModal();
    };

    const handleDelete = () => {
        if (initialId) {
            deleteTransaction(initialId)
                .then(() => {
                    dispatch(setTransaction({
                        name: '',
                        amount: '',
                        category: 2,
                    })); // Clear transaction state
                    hideModal();
                })
                .catch((err) => {
                    setError('Failed to delete transaction. Please try again.');
                    console.error(err);
                });
        } else {
            setError('No transaction to delete.');
        }
    }

    return (
        <>
            <h3 className="text-center text-3xl pb-4 mb-4 border-b-2 border-mybank-orange">Transaction</h3>
            <div className="transactionModal-container">
                {error && (
                    <p className="text-center text-red-500 font-semibold mb-4">{error}</p>
                )}

                <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                    <div className="flex flex-row items-center justify-center w-full">
                        <div className="w-1/2 p-4 text-base">
                            <label htmlFor="name" className="block mb-2">Name :</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="text-white font-normal border border-mybank-darkblue bg-mybank-darkblue rounded-[8px] p-2 mb-4 w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={100}
                                required
                            />
                        </div>

                        <div className="w-1/2 p-4 text-base">
                            <label htmlFor="amount" className="block mb-2">Amount :</label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                className="text-white font-normal border border-mybank-darkblue bg-mybank-darkblue rounded-[8px] p-2 mb-4 w-full"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                min={0}
                                step="any"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full p-4 text-base">
                        <label htmlFor="category" className="block mb-2">Category :</label>
                        <select
                            id="category"
                            name="category"
                            className="w-full text-white font-normal border border-mybank-darkblue bg-mybank-darkblue rounded-[8px] p-2 mb-4"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            {categories.length > 0 ? (
                                categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No categories available</option>
                            )}
                        </select>
                    </div>

                    <div className="flex flex-row items-center justify-center mt-4">
                        <button
                            type="button"
                            className="bg-mybank-red p-2 text-white rounded-[5px] m-4 transition-all duration-300 ease-in-out hover:bg-red-600"
                            onClick={initialId ? handleDelete : handleCancel}
                        >
                            {
                                initialId ? 'Supprimer' : 'Annuler'
                            }
                        </button>
                        <button
                            type="submit"
                            className="bg-mybank-green p-2 text-white rounded-[5px] m-4 transition-all duration-300 ease-in-out hover:bg-green-600"
                        >
                            Confirmer
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default TransactionModal;