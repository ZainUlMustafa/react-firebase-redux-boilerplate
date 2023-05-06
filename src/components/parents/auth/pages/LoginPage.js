import React from 'react'
import LoginForm from '../forms/LoginForm';
import { connect } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import * as ROUTES from '../../../../constants/routes';
import Grid from '@mui/material/Grid'
import { Navigate } from 'react-router-dom';
import { Container } from '@mui/material';

const LoginPage = (props) => {
    const { isSignedIn, themeRed, isEmailVerified } = props;
    const { authPageStyle } = themeRed;
    const location = useLocation()

    if (isSignedIn && !isEmailVerified) {
        return <Navigate to="/a/verify" state={{ from: location }} replace />;
    }
    else {
        return (
            <Container sx={{paddingInline: {xs: 5, sm: 5, md: 20, lg: 40} }}>
                <div style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', height: `calc(100vh - ${props.appBarHeightSignedOut}px)`, backgroundColor: '#FAFAFA'
                }}>
                    <LoginForm />
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: !state.firebase.auth.isEmpty,
        themeRed: state.themeRed
    }
}

export default connect(mapStateToProps)(LoginPage);