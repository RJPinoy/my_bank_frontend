import * as React from 'react';
import { useNavigate } from 'react-router';
import { logout } from '../../api/axios';
import { useModal } from '../modals/ModalProvider';

const DashboardTemplate = () => {
    const [user, setUser] = React.useState(null);
    const [showProfileMenu, setShowProfileMenu] = React.useState(false);
    const { showModal, hideModal } = useModal();

    const navigate = useNavigate();

    React.useEffect(() => {
        const currentUser = localStorage.getItem('user');
        if (currentUser) {
            setUser(JSON.parse(currentUser).username);
        }
    }, []);

    const handleProfileClick = () => {
        console.log("Profile clicked");
        setShowProfileMenu(prev => !prev);
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        logout();
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
                    <h1 className="dashboard-title">My Bank</h1>
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
                        <div className="absolute top-10 right-8 mt-4 w-40 bg-black/50 border rounded shadow-md z-50 flex justify-center">
                                <button
                                    onClick={handleLogout}
                                className="block w-full text-center px-4 py-2 transition-all duration-200 ease-in-out hover:bg-gray-100 text-red-600"
                                >
                                Log out
                                </button>
                            </div>
                        )}
                    </div>
                </header>
            </div>
        </>
     );
}
 
export default DashboardTemplate;