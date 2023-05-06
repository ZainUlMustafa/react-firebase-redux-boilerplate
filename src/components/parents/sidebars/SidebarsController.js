import React, { Component } from 'react';
import { useLocation } from 'react-router-dom'
import VerifyEmailPage from '../auth/pages/VerifyEmailPage';
import SignedInDrawer from './components/signedIn/SignedInDrawer'
import SignedOutDrawer from './components/signedOut/SignedOutDrawer'
import { createTheme, ThemeProvider } from "@mui/material/styles";




export const GetSideBarsComponent = (Component) => {
    return function SideBarsController(props) {
        const isSignedIn = props.isSignedIn;
        const isEmailVerified = props.isEmailVerified;

        const relevantComponent = isSignedIn ?
            <SignedInDrawer isSignedIn={isSignedIn} isEmailVerified={isEmailVerified} Child={Component} />
            :
            <SignedOutDrawer isSignedIn={isSignedIn} isEmailVerified={isEmailVerified} Child={Component} />
        return (
            <>
                <header>
                    {relevantComponent}
                </header>
            </>

        );
    }
}

export default GetSideBarsComponent;