import { useDispatch } from 'react-redux';
import { setTransaction } from '../../../stores/slices/transactionSlice';

const TransactionModal = ({ handleCancel, handleConfirm }) => {
    const dispatch = useDispatch(); // ✅ Get dispatch from react-redux

    const categories = localStorage.getItem('mybank-categories') ? JSON.parse(localStorage.getItem('mybank-categories')) : [];
    console.log("Categories from localStorage:", categories);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const transactionData = {
            name: formData.get('name'),
            amount: formData.get('amount'),
            category: parseInt(formData.get('category')),
        };
        // Dispatch the transaction data to the Redux store
        dispatch(setTransaction(transactionData));
        console.log("Transaction data submitted:", transactionData);
    };

    return (
        <>
            <h3 className="text-center text-3xl pb-4 mb-4 border-b-2 border-mybank-orange">Transaction</h3>
            <div className="transactionModal-container">
                <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                    <div className="flex flex-row items-center justify-center">
                        <div className="w-1/2 p-4 text-base">
                            <label htmlFor="name" className="block mb-2">Name :</label>
                            <input type="text" id="name" name="name" className="text-white font-normal border border-mybank-darkblue bg-mybank-darkblue rounded-[8px] p-2 mb-4 w-full" required />
                        </div>

                        <div className="w-1/2 p-4 text-base">
                            <label htmlFor="amount" className="block mb-2">Amount :</label>
                            <input type="number" id="amount" name="amount" className="text-white font-normal border border-mybank-darkblue bg-mybank-darkblue rounded-[8px] p-2 mb-4 w-full" required />
                        </div>
                    </div>

                    <div className="w-full p-4 text-base">
                        <label htmlFor="category" className="block mb-2">Category :</label>
                        <select id="category" name="category" className="w-full text-white font-normal border border-mybank-darkblue bg-mybank-darkblue rounded-[8px] p-2 mb-4" required>
                            {
                                categories.length > 0 ? (
                                    categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>No categories available</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="flex flex-row items-center justify-center mt-4">
                        <button className="bg-mybank-red p-2 text-white rounded-[5px] m-4 transition-all duration-300 ease-in-out hover:bg-red-600" onClick={ handleCancel }>Annuler</button>
                        <button type="submit" className="bg-mybank-green p-2 text-white rounded-[5px] m-4 transition-all duration-300 ease-in-out hover:bg-green-600">Confirmer</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default TransactionModal;