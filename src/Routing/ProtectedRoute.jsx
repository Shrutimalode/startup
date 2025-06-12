import React from 'react';
import { Navigate } from 'react-router';
import useSWR from 'swr';
import RoutesComponent from './RoutesComponent';
import { getUser } from '../Utils/AuthData';

const ProtectedRoute = () => {
    const {data : user} = useSWR('userAuthData',getUser);
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    return <RoutesComponent />;
};

export default ProtectedRoute;