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
import { signIn } from "../../../../store/actions/authActions";
import CircularProgress from "@mui/material/CircularProgress";
import newlogo from "../../../../assets/logo/logo.jpeg";

const textInputTheme = createTheme({
  palette: {
    primary: {
      main: "#1b1c1a",
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
    width: "8rem",
    marginBottom: "15px",
    borderRadius: "4px",
  },
  forgotPass: {
    color: "#1f0851",
    textDecoration: "underline",
    // '&:hover'
  },
};
const LoginForm = (props) => {
  const { error, showLoader } = props.auth;

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    if (values.email.length == 0) {
      setErrorMsg("Please enter a valid email.");
    } else if (values.password.length == 0) {
      setErrorMsg("Please enter a valid password.");
    } else {
      e.preventDefault();
      props.signIn(values.email, values.password);
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const relevantSubmitComponent = showLoader ? (
    <CircularProgress style={{ color: "#1f0851" }} />
  ) : (
    <Button
      style={styles.tryForFreeButton}
      variant="contained"
      onClick={handleSubmit}
    >
      Login
    </Button>
  );

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box style={{ diplay: 'flex', margin: '0 auto', textAlign: 'center' }}>
            <img src={newlogo} alt='logo' width="120px" height="auto" />
            {/* <Typography fullWidth style={styles.heading}>
                        Login
                    </Typography> */}
          </Box>
          <ThemeProvider theme={textInputTheme}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ marginTop: "60px", width: '80%', backgroundColor: '', textAlign: 'center' }}>
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
                  <FormControl fullWidth variant="outlined">
                    <InputLabel
                      htmlFor="outlined-adornment-password"
                      size="small"
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      style={{
                        marginBottom: "30px",
                        backgroundColor: "white",
                        color: "#000",
                      }}
                      size="small"
                      color='secondary'
                      id="outlined-adornment-password"
                      label="Password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {/* {values.showPassword ? <VisibilityOff /> : <Visibility />} */}
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div>
                  {relevantSubmitComponent}
                  <Typography
                    variant="subtitle2"
                    style={{ color: "red", marginTop: "10px" }}
                  >
                    {errorMsg}
                  </Typography>
                  <Typography
                    style={{ color: "red", margin: "4px 0" }}
                    variant="body2"
                  >
                    {error ?? ""}
                  </Typography>
                </div>

                <Typography variant="subtitle1" style={styles.forgotPass}>
                  <Link to="/a/forgot-pass" style={{ color: "#1f0851" }}>
                    Forgot password?
                  </Link>
                </Typography>
              </Box>
            </div>
          </ThemeProvider>
        </Grid>
      </Grid>
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
    signIn: (email, password) => dispatch(signIn(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
