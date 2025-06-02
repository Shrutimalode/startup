import React from 'react';
import LoginPage from '../Pages/LoginPage/LoginPage';
import useSWR from 'swr';
import RoutesComponent from './RoutesComponent';
import { getUser } from '../Utils/AuthData';

const ProtectedRoute = () => {
    const {data : user} = useSWR('userAuthData',getUser);
    return user ? <RoutesComponent/> : <LoginPage />;
};

export default ProtectedRoute;