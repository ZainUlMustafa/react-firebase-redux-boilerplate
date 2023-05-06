import React from 'react'
import { connect } from "react-redux";
import { Container, Toolbar } from '@mui/material';
const HomeDashboard = (props) => {
  const { appBarHeight } = props
  // console.log("APP BAR HEIGHT ", appBarHeight)
  // console.log(props.companyData, 'comdata')

  return (
    <div style={{ backgroundColor: '' }}>
      <Container maxWidth="xl">
        <Toolbar />
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    companyData: state.firestore.data.Company,
    themeColors: state.theme,
    userData: state.firebase.profile,
    project: state.project
  };
};


export default connect(mapStateToProps)(HomeDashboard);
