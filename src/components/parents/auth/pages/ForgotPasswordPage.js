import React from 'react'
import { connect } from 'react-redux';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { Container, Grid } from '@mui/material';


const ForgotPasswordPage = (props) => {
    const { theme } = props;
    console.log("FORGOT PASS PROPS", props)
    return (
        <Container sx={{ paddingInline: { xs: 5, sm: 5, md: 20, lg: 40 } }}>
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', height: `calc(100vh - ${props.appBarHeightSignedOut}px)`, backgroundColor: '#FAFAFA'
            }}>
                <ForgotPasswordForm />
            </div>
        </Container>
        // <Grid
        //     container
        //     spacing={0}
        //     direction="column"
        //     alignItems="center"
        //     justifyContent="center"
        //     style={{ minHeight: '100vh', }}
        // >
        //     <ForgotPasswordForm />
        // </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme
    }
}

export default connect(mapStateToProps)(ForgotPasswordPage);