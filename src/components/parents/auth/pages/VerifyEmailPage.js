import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { sendVerificationEmail, signOut } from '../../../../store/actions/authActions';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Card, Stack } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import newlogo from "../../../../assets/logo/logo.jpeg";
// import { Redirect } from 'react-router-dom';
import * as ROUTES from '../../../../constants/routes';
import { useLocation, Navigate } from 'react-router-dom';



const VerifyEmailPage = (props) => {

    const { isSignedIn, userData } = props;
    const { name } = userData
    const location = useLocation()




    const [snackbarState, setSnackbarState] = React.useState({
        openSnackbar: false,
        vertical: 'bottom',
        horizontal: 'right',
    });

    const { vertical, horizontal, openSnackbar } = snackbarState;

    const handleClickSnackbar = (newState) => {
        setSnackbarState({ openSnackbar: true, ...newState });
    };

    const handleCloseSnackbar = () => {
        setSnackbarState({ ...snackbarState, openSnackbar: false });
    };

    const resendEmail = () => {
        props.sendVerificationEmail();
        handleClickSnackbar({
            vertical: 'bottom',
            horizontal: 'right',
        })
        console.log("h")
    }

    const styles = {
        verifyBtn: {
            backgroundColor: 'red',
            textTransform: 'none',
            cursror: 'pointer',
            padding: '5px 10px',
            borderRadius: '20px'
        },
        signinBtn: {
            backgroundColor: 'green',
            textTransform: 'none',
            padding: '4px 9px',
            borderRadius: '14px',
            marginLeft: '15px'
        },
        clickHere: {
            textDecoration: 'underline',
            cursor: 'pointer',
        },
        reloadClick: {
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    }
    if (!isSignedIn) {
        return <Navigate to="/a/login" state={{ from: location }} replace />;
    }
    else if (props.isSignedIn && props.isEmailVerified) {
        return <Navigate to="/home/dashboard" state={{ from: location }} replace />;
    }
    else if (props.isSignedIn && !props.isEmailVerified) {
        return (
            <div style={{ height: `100vh`, backgroundColor: '', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                        <img
                            src={newlogo}
                            alt="logo"
                            width="130px"
                            height="auto"
                        />
                    </div>
                    <div>
                        <Card elevation={3} sx={{ display: 'block' }}>
                            <Box style={{ padding: '20px' }}>
                                <Box>
                                    <Typography variant="h6" color="initial"><b>Hi</b>, {name}</Typography>
                                    <Typography variant="body1" color="initial" style={{ marginTop: '12px' }}>
                                        Check your inbox as we have dispatched a verification email to you.
                                    </Typography>
                                    <div style={{ marginTop: '20px' }}>
                                        <span style={{ marginTop: '8px', display: 'block' }}>
                                            Once you have completed the verification process, <span style={styles.reloadClick} onClick={() => { window.location.reload() }}>click on this link</span>
                                        </span>
                                        <span>
                                            In case you have not received any email yet, <span style={styles.clickHere} 
                                            onClick={resendEmail}>click on this link</span>
                                        </span>

                                        <span style={{ marginTop: '20px', display: 'block' }}>
                                            <span style={styles.reloadClick} onClick={() => { props.signOut() }}>Click on this link</span> to sign out
                                        </span>
                                    </div>

                                </Box>
                            </Box>
                            <div>
                                <Snackbar
                                    anchorOrigin={{ vertical, horizontal }}
                                    open={openSnackbar}
                                    onClose={handleCloseSnackbar}
                                    message='Link has been sent again.'
                                    key={vertical + horizontal}
                                    autoHideDuration={6000}

                                />
                            </div>
                        </Card >
                    </div>
                </Stack>




            </div>

        )
    } else {
        // return <Redirect to={ROUTES.LANDING} />;
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        isSignedIn: !state.firebase.auth.isEmpty,
        isEmailVerified: state.firebase.auth.emailVerified,
        userAuth: state.firebase.auth,
        theme: state.themeRed,
        userData: state.firebase.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendVerificationEmail: () => dispatch(sendVerificationEmail()),
        signOut: () => dispatch(signOut()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailPage);