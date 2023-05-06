import React, { Component } from "react";
import * as ROUTES from "../../../../constants/routes";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
// import { Typography } from '@mui/material'
import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { removeAuthErrorAndMessage, sendPasswordResetEmail } from "../../../../store/actions/authActions";
import CircularProgress from "@mui/material/CircularProgress";
import newlogo from "../../../../assets/logo/logo.jpeg";

const textInputTheme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
            // main: "#ec2121",
        },
        secondary: {
            main: "#1b1c1a"
        }
    }
});

const styles = {
    heading: {
        margin: "0 auto 0 auto",
        width: "80%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "24px",
        color: "#1f0851",
    },
    textFieldStyle: {
        marginBottom: "20px",
        backgroundColor: "white",
    },
    existingAccountLink: {
        color: "purple",
        cursor: "pointer",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
            color: "red",
        },
    },
    tryForFreeButton: {
        textTransform: "capitalize",
        backgroundColor: "#1b1c1a",
        color: "white",
        fontSize: "17px",
        marginBottom: "15px",
        borderRadius: "4px",
    },
    forgotPass: {
        color: "#1f0851",
        textDecoration: "underline",
        // '&:hover'
    },
};
const ForgotPasswordForm = (props) => {
    const { error, showLoader, message } = props.auth;

    const [values, setValues] = React.useState({
        email: "",
    });

    const [errorMsg, setErrorMsg] = useState("");

    const isEmail = (email) => {
        var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (email !== '' && email.match(emailFormat)) { return true; }

        return false;
    }


    const handleSubmit = (e) => {
        setErrorMsg("");
        props.removeAuthErrorAndMessage();
        if (values.email.length > 0 ? !isEmail(values.email) : true) {
            setErrorMsg("Please enter a valid email.");
        } else {
            e.preventDefault();
            props.sendPasswordResetEmail(values.email);
        }
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const relevantSubmitComponent = showLoader ? (
        <CircularProgress style={{ color: "#1f0851" }} />
    ) : (
        <Button
            style={styles.tryForFreeButton}
            variant="contained"
            onClick={handleSubmit}
        >
            Send password reset link
        </Button>
    );

    return (
        <>
            <Box>
                <Box style={{ width: "70vh" }}>
                    <Box style={{ diplay: 'flex', margin: '0 auto', textAlign: 'center' }}>
                        <img src={newlogo} alt='logo' width="120px" height="auto" />
                        {/* <Typography fullWidth style={styles.heading}>
                        Login
                    </Typography> */}
                    </Box>
                    <ThemeProvider theme={textInputTheme}>
                        <div style={{ marginTop: '35px' }}>
                            <Typography sx={{ textAlign: 'center' }}>
                                To receive a link to reset your password, enter your email
                            </Typography>
                        </div>
                        <Box style={{ textAlign: "center", marginTop: "30px" }}>
                            <div>
                                <TextField
                                    fullWidth
                                    style={styles.textFieldStyle}
                                    value={values.email}
                                    onChange={handleChange("email")}
                                    size="small"
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    color='secondary'
                                />
                            </div>
                            <div>
                                {relevantSubmitComponent}
                                <Typography
                                    variant="subtitle2"
                                    style={{ color: "red", marginTop: "10px" }}
                                >
                                    {(errorMsg.length > 0) ? errorMsg : error ?? ""}
                                </Typography>
                                <Typography
                                    style={{ color: "green", margin: "4px 0" }}
                                    variant="body2"
                                >
                                    {message ?? ""}
                                </Typography>
                            </div>
                        </Box>
                    </ThemeProvider>
                </Box>
            </Box>
        </>
    );
};

const mapStateToProps = (state) => {
    // //console.log(state.auth)
    return {
        auth: state.auth,
        themeRed: state.themeRed,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendPasswordResetEmail: (email) => dispatch(sendPasswordResetEmail(email)),
        removeAuthErrorAndMessage: () => dispatch(removeAuthErrorAndMessage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);
