import {  Navigate } from 'react-router-dom';
import { LocalStorage } from '../hooks/useLocalStorage';
import { ReactNode } from 'react';


interface PrivateRouteProps {
    children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    
    const token = LocalStorage("token")

   

    if (!token) {
      
        return <Navigate to="/login" />;
    } else {
        return <>{children}</>;
    }
}


