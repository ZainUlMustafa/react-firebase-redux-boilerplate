import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import Greetings from './pages/Greetings'
import { Toolbar } from '@mui/material';

const LandingController = (props) => {
    const isSignedIn = props.isSignedIn;
    const { appBarHeightSignedOut } = props;
    let location = useLocation();
    if (isSignedIn) {
        return <Navigate to="/home" state={{ from: location }} replace />;
    }
    return (
        <>
            {/* <Toolbar /> */}
            <Greetings appBarHeightSignedOut={appBarHeightSignedOut} />
        </>
    );
}

export default LandingController;