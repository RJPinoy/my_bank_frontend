import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isAuthenticated = true; // Replace with actual authentication logic

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    
    return <Outlet />;
}

export default ProtectedRoute;