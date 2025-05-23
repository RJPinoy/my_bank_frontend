import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../api/user/route';

const ProtectedRoute = () => {
    const [authChecked, setAuthChecked] = React.useState(false);
    const [isAuth, setIsAuth] = React.useState(false);

    React.useEffect(() => {
        const checkAuth = async () => {
            const user = await isAuthenticated();
            setIsAuth(!!user);
            setAuthChecked(true);
        };

        checkAuth();
    }, []);

    if (!authChecked) return null; // or a spinner/loading indicator

    if (!isAuth) return <Navigate to="/" replace />;

    return <Outlet />;
}

export default ProtectedRoute;