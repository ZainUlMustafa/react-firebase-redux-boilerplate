import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, Route, Routes } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RegisterPage from './pages/RegisterPage'
import VerifyEmailPage from './pages/VerifyEmailPage';
import LoginPage from './pages/LoginPage';


const AuthController = (props) => {
    const isSignedIn = props.isSignedIn;
    const isEmailVerified = props.isEmailVerified;

    let location = useLocation();
    if (isSignedIn && isEmailVerified) {
        return <Navigate to="/home" state={{ from: location }} replace />;
    }
    return (
        <div>
            <Routes>
                <Route path="/login" element={<LoginPage isSignedIn={isSignedIn} isEmailVerified={isEmailVerified} appBarHeightSignedOut={props.appBarHeightSignedOut} />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPage appBarHeightSignedOut={props.appBarHeightSignedOut} />} />
                <Route path={ROUTES.VERIFY_ACCOUNT} element={<VerifyEmailPage isSignedIn={isSignedIn} appBarHeight={props.appBarHeight} appBarHeightSignedOut={props.appBarHeightSignedOut} />} />
                <Route path={ROUTES.FORGOT_PASS} element={<ForgotPasswordPage appBarHeightSignedOut={props.appBarHeightSignedOut} />} />
                <Route path={ROUTES.UNKNOWN} element={<main style={{ padding: "1rem" }}><p>There's nothing here!</p></main>} />
            </Routes>

            {location.pathname === '/a' || location.pathname === '/a/' ? <Navigate to="/a/login" state={{ from: location }} replace /> : <React.Fragment />}
        </div>
    );
}

export default AuthController;