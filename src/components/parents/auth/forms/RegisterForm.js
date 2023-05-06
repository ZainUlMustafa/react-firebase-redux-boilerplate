import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { connect } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import InputBase from '@mui/material/InputBase';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import { signUp } from "../../../../store/actions/authActions";
import newlogo from "../../../../assets/logo/logo.jpeg";
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import countryList from 'country-list-js';
import Autocomplete from '@mui/material/Autocomplete';

const countries = Object.values(countryList.all).sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});
// console.log('countryList=======>', typeof (countries['0']))
// console.log('names=======>', countries['0'].name)



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

function RegisterForm(props) {
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
      textAlign: 'start'
      // borderRadius: "30px",
    },
    existingAccountLink: {
      color: "#1f0851",
      cursor: "pointer",
      textDecoration: "underline",
      display: 'flex',
      justifyContent: 'center'
    },
    tryForFreeButton: {
      textTransform: "capitalize",
      backgroundColor: "#1b1c1a",
      color: "white",
      marginBottom: "15px",
      borderRadius: '2px',
      width: '100px',
    },
  };

  const { error, showLoader } = props.auth;

  const [values, setValues] = React.useState({
    fullName: "",
    email: "",
    orgName: "",
    password: "",
    showPassword: false,
    countryName: ''
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    if (values.fullName.length == 0) {
      setErrorMsg("Please enter the Full name.");
    } else if (values.email.length == 0) {
      setErrorMsg("Please enter a valid email.");
    } else if (values.orgName.length == 0) {
      setErrorMsg("Please enter the Organization name.");
    } else if (values.password.length < 6) {
      setErrorMsg("Password must be atleast 6 characters.");
    }
    else if (values.countryName.length == 0) {
      setErrorMsg("Please select your country name.");
    }
    else {
      let trimmedfullName = values.fullName.trim()
      let trimmedEmail = values.email.trim()
      let trimmedOrgName = values.orgName.trim()
      e.preventDefault();
      props.signUp(trimmedfullName, trimmedEmail, trimmedOrgName, values.password, values.countryName)
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
    <Button variant="contained" disabled sx={{
      textTransform: 'initial', backgroundColor: '#1b1c1a', color: '#D9D9D9',
      "&.Mui-disabled": {
        backgroundColor: '#1b1c1a',
        color: '#D9D9D9'
      }
    }}>
      <CircularProgress variant="indeterminate" size={15} sx={{ color: 'white' }} /><span style={{ paddingLeft: '15px' }}>Creating an account...</span>
    </Button>
  ) : (
    <Button
      style={styles.tryForFreeButton}
      variant="contained"
      sx={{ textTransform: 'inherit' }}
      onClick={handleSubmit}

    >
      Register
    </Button>
  );

  // console.log(countries)
  return (
    // <Box style={{ width: "70vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Grid container>
      <Grid item xs={12}>
        <ThemeProvider theme={textInputTheme}>
          <Box sx={{ marginTop: { xs: '20px', md: '0px' }, width: '100%' }}>


            {/* <Typography variant="h5" gutterBottom sx={{ fontWeight: '', marginBottom: '50px',display:'flex',justifyContent:'center', color:'#1e1e1e' }}>
            Create a free account
          </Typography> */}
            <Box style={{ diplay: 'flex', margin: '0 auto', textAlign: 'center' }} >
              <img src={newlogo} alt='logo' height='60px' />
            </Box>

            <div style={{ padding: '20px' }}></div>

            {/* name */}
            <TextField
              fullWidth
              style={styles.textFieldStyle}
              value={values.fullName}
              onChange={handleChange("fullName")}
              size="small"
              id="outlined-basic"
              label="Full name"
              variant="outlined"
              color="secondary"
            />
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
                color="secondary"
              />
            </div>
            <div>
              <TextField
                fullWidth
                style={styles.textFieldStyle}
                value={values.orgName}
                onChange={handleChange("orgName")}
                size="small"
                id="outlined-basic"
                label="Organisation name"
                variant="outlined"
                color="secondary"
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
                    marginBottom: "20px",
                    backgroundColor: "white",
                    color: "#000",
                  }}
                  size="small"
                  id="outlined-adornment-password"
                  label="Password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  color="secondary"
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
            {/* country */}
            <div>
              <TextField
                id="outlined-select-currency"
                select
                label="Country"
                value={values.countryName}
                onChange={handleChange("countryName")}
                // helperText="Please select country name"
                fullWidth
                color="secondary"
                style={styles.textFieldStyle}
                size="small"
              >
                {countries.map((option, key) => (
                  <MenuItem key={key} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {relevantSubmitComponent}

            </div>

            <Typography
              variant="subtitle2"
              style={{ color: "red", marginTop: "10px", display: 'flex', justifyContent: 'center' }}
            >
              {errorMsg}
            </Typography>
            <Typography style={{ color: "red", margin: "0px", display: 'flex', justifyContent: 'center' }}>
              {error ?? ""}
            </Typography>
            <Link style={styles.existingAccountLink} to="/a/login">
              Or sign into an existing account
            </Link>
          </Box>
        </ThemeProvider>
      </Grid>
    </Grid>
    // </Box>
  );
}
const mapStateToProps = (state) => {
  // //console.log(state.auth)
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (fullName, email, orgName, password, country, userData) =>
      dispatch(signUp(fullName, email, orgName, password, country, userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
