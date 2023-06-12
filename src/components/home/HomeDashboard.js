import React from 'react'
import { connect } from "react-redux";
import { Container, Toolbar } from '@mui/material';
import SensorSection from './components/sensors/SensorSection';
const HomeDashboard = (props) => {
  const {sensorsData} = props;

  return (
    <div style={{ backgroundColor: 'red', height: '100vh' }}>
      <Container maxWidth="xl">
        <Toolbar />

        <SensorSection sensorsData={sensorsData}/>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    themeColors: state.theme,
    userData: state.firebase.profile,
    project: state.project,
    sensorsData: state.firestore.data.SensorsData,
  };
};


export default connect(mapStateToProps)(HomeDashboard);
