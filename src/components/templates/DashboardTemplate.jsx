import * as React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { logout } from '../../api/axios';
import { getCategories } from '../../api/categories/route';
import { getTransactions } from '../../api/transactions/route';
import { useModal } from '../modals/ModalProvider';

const DashboardTemplate = () => {
    const [user, setUser] = React.useState(null);
    const [showProfileMenu, setShowProfileMenu] = React.useState(false);
    const [transactions, setTransactions] = React.useState([]);
    const { showModal } = useModal();

    const navigate = useNavigate();
    const transaction = useSelector(state => state.transaction);

    React.useEffect(() => {
        const currentUser = localStorage.getItem('mybank-user');
        if (currentUser) {
            setUser(JSON.parse(currentUser).username);

            getCategories().then(categories => {
                localStorage.setItem('mybank-categories', JSON.stringify(categories));
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
        }
    }, []);

    React.useEffect(() => {
        console.log("Updated transaction:", transaction);

        getTransactions()
            .then(fetchedTransactions => {
                setTransactions(fetchedTransactions);
                console.log("Fetched transactions:", fetchedTransactions);
            })
            .catch(error => {
                console.error("Error fetching transactions:", error);
            });
    }, [transaction]);

    const handleProfileClick = () => {
        console.log("Profile clicked");
        setShowProfileMenu(prev => !prev);
    }

    const handleLogout = () => {
        logout();
        localStorage.removeItem('user');
        navigate('/');
    };

    const openModal = (e) => {
        console.log("Open modal clicked");
        e.preventDefault();
        showModal('transaction');
    }

    return ( 
        <>
            <div className="dashboard-container flex justify-between flex-col items-center w-full">
                <header className="dashboard-header flex justify-between items-center w-full px-4">
                    <img src="#" alt="Logo" className="logo m-4" />
                    <h1 className="dashboard-title text-2xl font-bold">My Bank</h1>
                    <div className="dashboard-user-info flex flex-row justify-end items-center m-4 w-40 relative hover:cursor-pointer" onClick={handleProfileClick}>
                        <span className="user-name mr-4">{user}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" stroke="white" fill="white" className="user-icon w-8 h-8">
                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
                        </svg>

                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512" 
                            className={"arrow-icon w-4 h-4 ml-2 transition-all duration 300" + (showProfileMenu ? " max-w-4" : " rotate-180 max-w-0")}
                        >
                            <path fill='white' d="M143 352l-136-136c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0L160 274.1l116.5-116.5c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.4 9.4-24.6 9.4-33.9 0z"/>
                        </svg>
                    </div>
                        
                    {showProfileMenu && (
                        <div className="absolute top-10 right-8 mt-4 p-4 w-40 bg-black/90 rounded-[8px] shadow-md z-50 flex justify-center overflow-hidden">
                            <button
                                onClick={handleLogout}
                                className="block w-full text-center px-4 py-2 rounded-[8px] transition-all duration-200 ease-in-out text-mybank-red hover:bg-mybank-red hover:text-white"
                            >
                                Log out
                            </button>
                        </div>
                    )}
                </header>

                <main className="dashboard-main flex flex-row items-center w-full h-dvh">
                    <nav className='bg-white flex-1 h-full p-4 pr-0 border-r border-mybank-darkblue flex flex-col justify-between text-mybank-darkblue'>
                        <ul className='flex flex-col' dir='ltr'>
                            <li className='p-2 pl-4 mb-2 rounded-s-[10px] bg-[#D9D9D9] font-bold cursor-pointer'>All my transactions :</li>
                        </ul>
                    </nav>

                    <div className='bg-[#D9D9D9] w-4/5 h-full p-4'>
                        <h2 className='text-mybank-darkblue text-2xl font-bold mb-4'>
                            Welcome to your dashboard, {user}!
                            <button
                                id='button-create_transaction'
                                className="text-center ml-2 px-2 rounded-[8px] transition-all duration-300 ease-in-out bg-mybank-red text-white"
                                onClick={openModal}
                            >
                                +
                            </button>
                        </h2>
                        { transactions.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {transactions.map((transaction, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-semibold text-mybank-darkblue">{transaction.name}</h3>
                                            <p className="text-sm text-right font-semibold text-mybank-darkblue">
                                                {new Date(transaction.date).toLocaleString("fr-FR", { timeZone: "UTC" })}
                                            </p>
                                        </div>
                                    
                                        <p className="text-mybank-green font-bold text-xl">{transaction.amount} €</p>
                                        <p className="mt-1 text-gray-500">Category: {transaction.category?.name}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-mybank-darkblue'>You have no transactions yet. Start and create a new one!</p>
                        )}
                    </div>
                </main>
            </div>
        </>
     );
}
 
export default DashboardTemplate;