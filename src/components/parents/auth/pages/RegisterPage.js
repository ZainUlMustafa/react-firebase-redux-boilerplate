import React from "react";
import RegisterForm from "../forms/RegisterForm";
import { connect } from "react-redux";
import * as ROUTES from "../../../../constants/routes";
import Grid from "@mui/material/Grid";
import { Navigate } from "react-router-dom";
import { Container, Paper, Typography } from "@mui/material";

const RegisterPage = (props) => {
  const { isSignedIn, theme } = props;
  if (isSignedIn) {
    return <Navigate to="/home/dashboard" />;
  } else {
    return (
      <Container>
        <Grid
          container
          // spacing={5}
          // rowSpacing={100}
          columnSpacing={17}
          direction="row"
          style={{ height: `calc(100vh - ${props.appBarHeightSignedOut}px)`, backgroundColor: '' }}
        >
          
          <Grid item xs={12} style={{ backgroundColor: "#FAFAFA", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <RegisterForm />
          </Grid>
        </Grid>
      </Container>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: !state.firebase.auth.isEmpty,
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(RegisterPage);
