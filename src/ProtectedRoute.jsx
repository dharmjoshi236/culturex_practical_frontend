import React from 'react'
import {Navigate, Outlet} from 'react-router-dom';
import checkTokenInLocalStorage from './helpers/checkForTokenInLocalStorage';

const ProtectedRouteSystem = ()=> {
    let isAuth = checkTokenInLocalStorage();
    if (!isAuth) {
        return <Navigate to={"/login"} replace/>
    }

    return <Outlet />
}

export default ProtectedRouteSystem;