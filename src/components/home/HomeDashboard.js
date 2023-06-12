import React from 'react'
import { connect } from "react-redux";
import { Container, Toolbar, Grid, Typography } from '@mui/material';
import SensorSection from './components/sensors/SensorSection';
import GlassBeaker from '../cidgets/waterBeaker/GlassBeaker';
import WaterGatesStatus from './components/sensors/WaterGatesStatus';
import LogViewer from '../cidgets/LogViewer';
import { get } from "lodash";

const HomeDashboard = (props) => {
  const { sensorsData } = props;

  // const logs = [
  //   { timestamp: '2023-06-12 10:05:32', message: 'Beaker A filled up' },
  //   { timestamp: '2023-06-12 10:07:15', message: 'Beaker A emptied' },
  //   { timestamp: '2023-06-12 10:10:22', message: 'Beaker B filled up' },
  //   { timestamp: '2023-06-12 10:12:01', message: 'Beaker B emptied' },
  // ];

  // console.log(props.sensorLogs)

  return (
    <div style={{ backgroundColor: '', height: '100vh' }}>
      <Grid container>
        {/* <Grid item xs={2} sx={{ backgroundColor: '', height: '100vh' }}>

        </Grid> */}

        <Grid item xs={8} sx={{ overflow: 'auto', height: '100vh' }}>
          <Toolbar />
          <div style={{ padding: '40px 90px' }}>
            <div style={{ diplay: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <Typography variant='h5' sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                Reservoir levels
              </Typography>
              <div style={{ padding: '30px 0px' }}>
                <SensorSection sensorsData={sensorsData} />
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={4} sx={{ overflow: 'auto', height: '100vh' }}>
          <Toolbar />
          <div style={{ padding: '40px 20px' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
              Gate statuses
            </Typography>
            <hr />
            <WaterGatesStatus sensorsData={sensorsData} />
            <div style={{padding: '20px'}}></div>
            <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>
              Realtime logs
            </Typography>
            <div style={{padding: '5px'}}></div>
            {/* <hr/> */}
            <LogViewer logs={props.sensorLogs} />
          </div>
        </Grid>
      </Grid>
      {/* <Container maxWidth="xl">
        <Toolbar />

        <SensorSection sensorsData={sensorsData}/>
      </Container> */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    themeColors: state.theme,
    userData: state.firebase.profile,
    project: state.project,
    sensorsData: state.firestore.data.SensorsData,
    sensorLogs: get(state.firebase.data, `logs`),
  };
};


export default connect(mapStateToProps)(HomeDashboard);
