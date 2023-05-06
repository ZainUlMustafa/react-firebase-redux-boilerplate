import React, { useState } from 'react'
import Menu from "@mui/material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography'
import { Link } from "react-router-dom";
import * as ROUTES from '../../../../constants/routes';
import { connect } from 'react-redux';
import { signIn } from "../../../../store/actions/authActions";
import CircularProgress from '@mui/material/CircularProgress';


const loginModalTheme = createTheme({
    palette: {
        primary: {
            // main: "#fa3f3f",
            main: "#ec2121",
        },
    },
    shape: {
        borderRadius: "30px",
    },
});



const LoginModal1 = (props) => {
    const { error, showLoader } = props.auth;
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        isShowPassword: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        props.signIn(values.email, values.password);
        setValues({email:'',password:''})
    }


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // ----styles
    const styles = {
        menu: {
            width: '27rem',
            // backgroundColor:'#fafafa'
            // backgroundColor:'red'
        },
        mainBox: {
            width: "30rem",
            // paddingLeft:'24px'
            padding: "14px 0 14px 24px"
        },
        headingStyles: {
            display: 'flex',
            flexDirection: "row",
            // alignItems:'center',
            // justifyContent:'center'
        },
        fieldBox: {
            margin: '24px 0 40px 0',
        },
        signInBtn: {
            width: '7rem',
            padding: '4px 8px',
            color: '#1f0851',
            backgroundColor: '#ffffff',
            textTransform: 'capitalize',
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
            marginBottom: '15px'
        },
        forgotPassword: {
            textDecoration: 'underline',
            color: '#1f0851',
            cursor: 'pointer'
        },
        btnBox: {
            textAlign: 'center',
            marginRight: '120px'
        },
        closeTypoStyles:{
            float: 'right',
            marginLeft: '230px',
            color:'red',
            cursor:'pointer'
        }
    }

    const relevantSubmitComponent = showLoader ? <CircularProgress style={{color:'#1f0851'}} /> : <Button style={styles.signInBtn} onClick={handleSubmit}  >Sign me in</Button>;



    return (
        <>
            <ThemeProvider theme={loginModalTheme}>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={props.loginAnchorEl}
                    open={props.LoginOpen}
                    onClose={props.handleLoginModalClose}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    style={styles.menu}
                >
                    {/* ---------main Box------- */}
                    <Box style={styles.mainBox}>
                        {/* --------------------- Search modal text field ------------------------- */}

                        <Box style={styles.headingStyles}>
                            <Typography variant="h5" color="initial" style={{ float: 'left' }}>Login</Typography>
                            <Typography onClick={props.handleLoginModalClose} variant="subtitle2" color="initial" style={styles.closeTypoStyles}>
                                <Button style={{textTransform:'capitalize'}} variant='filled'>close</Button>                                
                            </Typography>
                        </Box>
                        <Box style={styles.fieldBox}>
                            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '22rem', marginBottom: '13px' }}                        >
                                <InputBase
                                    sx={{ ml: 3, flex: 1 }}
                                    placeholder="Email"
                                    inputProps={{ 'aria-label': 'email' }}
                                    value={values.email}
                                    onChange={handleChange('email')}
                                    id='email'
                                />
                            </Paper>
                            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '22rem', marginBottom: '13px' }}                        >
                                <InputBase
                                    sx={{ ml: 3, flex: 1 }}
                                    placeholder="Password"
                                    inputProps={{ 'aria-label': 'password' }}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    id='password'
                                />
                            </Paper>
                        </Box>
                        <Box style={styles.btnBox}>
                            {relevantSubmitComponent}
                            <Typography style={{color:'red',margin:'4px 0'}} variant='body2'>{error??''}</Typography>
                            <Typography style={styles.forgotPassword} variant='subtitle2' color="initial">Forgot Password?</Typography>
                        </Box>
                    </Box>
                </Menu>
            </ThemeProvider>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        theme: state.theme,
        modalTitleStyle: state.appControl.modalTitleStyle,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (email, password) => dispatch(signIn(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal1);