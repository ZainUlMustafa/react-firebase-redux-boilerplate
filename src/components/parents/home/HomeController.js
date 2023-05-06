import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, Route, Routes, Outlet } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'
import HomeDashboard from '../../home/HomeDashboard';
import { connect } from "react-redux";
import ProjectDashboardWrapper from '../../home/components/project/ProjectDashboardWrapper';
import AccountDashboardController from '../../home/components/account/AccountDashboardController';
import DemoAccountError from '../../cidgets/DemoAccountError';

const HomeController = (props) => {
  const isSignedIn = props.isSignedIn;
  const isEmailVerified = props.isEmailVerified;

  let location = useLocation();
  if (!isSignedIn) {
    return <Navigate to="/a" state={{ from: location }} replace />;
  }

  if (!isEmailVerified) {
    return <Navigate to="/a/verify" state={{ from: location }} replace />;
  }


  // console.log("HOME CONTROLLER PROPS", props)
  const isDemoAccount = props.userData.uid===props.charges?.demoAccount
  return (
    <div>
      <Routes>
        <Route path={ROUTES.HOME_DASHBOARD} element={<HomeDashboard appBarHeight={props.appBarHeight} />} />
        <Route path={ROUTES.HOME_PROJECT} element={<Outlet />}>
          <Route path={ROUTES.IND_PROJECT} element={<ProjectDashboardWrapper />} />
        </Route>
        <Route path={ROUTES.ACCOUNT} element={isDemoAccount ? <DemoAccountError/> : <AccountDashboardController appBarHeight={props.appBarHeight} />} />
        {/* <Route path={ROUTES.SURFACE_VIZ} element={<SurfaceVisualizerDashboard />} /> */}
        <Route path={ROUTES.UNKNOWN} element={<main style={{ padding: "1rem" }}><p>There's nothing here!</p></main>} />
      </Routes>

      {location.pathname === '/home' || location.pathname === '/home/' ? <Navigate to="/home/dashboard" state={{ from: location }} replace /> : <></>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.firebase.profile,
    charges: state.firestore.data.Charges,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getAssetData: () => dispatch(getAssetData()),
    // getDataInfo: () => dispatch(getDataInfo()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeController);
