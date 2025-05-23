import * as React from 'react';
import { useNavigate } from 'react-router';
import { logout } from '../../api/axios';

const DashboardTemplate = () => {
    const [user, setUser] = React.useState(null);
    const [showProfileMenu, setShowProfileMenu] = React.useState(false);
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

    return ( 
        <>
            <div className="dashboard-container flex justify-between flex-col items-center w-full">
                <header className="dashboard-header flex justify-between items-center w-full px-4">
                    <img src="https://via.placeholder.com/100" alt="Logo" className="logo m-4" />
                    <h1 className="dashboard-title">My Bank</h1>
                    <div className="dashboard-user-info flex flex-row items-center m-4 relative hover:cursor-pointer" onClick={handleProfileClick}>
                        <span className="user-name mr-4">{user}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" stroke="white" fill="white" className="user-icon w-8 h-8">
                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
                        </svg>
                        
                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-50 animate-slide-down">
                                <button
                                    onClick={handleLogout}
                                    className="block text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                                >
                                    Logout
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