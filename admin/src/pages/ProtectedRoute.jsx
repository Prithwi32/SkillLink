import { AdminContext } from '@/context/AdminContext';
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const { isLoggedIn } = useContext(AdminContext);

    return isLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectedRoute