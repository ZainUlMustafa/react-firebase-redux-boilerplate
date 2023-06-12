import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";
import PrimaryAppBar from "./laptopDrawer/PrimaryAppBar";
import { useLocation } from "react-router-dom";
import { get } from "lodash";

const SignedInDrawer = (props) => {
  const location = useLocation();
  const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
  const possibleProid = getLastItem(location.pathname)
  const isProid = possibleProid.includes('webproj')
  const { Child, isEmailVerified, isSignedIn, themeRed } = props;
  useEffect(() => {

  }, [])

  return (
    <PrimaryAppBar proid={isProid ? possibleProid : '-1'} Child={Child} isEmailVerified={isEmailVerified} isSignedIn={isSignedIn} themeRed={themeRed} />
  )
};

const mapStateToProps = (state) => {
  // console.log(state.firebase.data)
  return {
    project: state.project,
    userData: state.firebase.profile,
    themeRed: state.themeRed,
    sensorLogs: get(state.firebase.data, `logs`),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    const { userData } = props;
    return [
      {
        collection: "Configurations",
        doc: "OutputPredictions",
        storeAs: "OutputPredictions",
      },
      {
        collection: "SensorsData",
        storeAs: "SensorsData",
      },
      {
        collection: "Configurations",
        doc: "Charges",
        storeAs: "Charges",
      },
      {
        collection: "Companies",
        storeAs: "Company",
        doc: `${userData.coid}`,
      },
      {
        collection: "Notifications",
        where: [['uid', '==', userData?.uid ?? '-1']],
        storeAs: "GenNotifs",
      }
    ];
  }),
  firebaseConnect((props) => {
    // const project = props;
    // const proid =
    //   project !== undefined ? (project.proid ? project.proid : "-1") : "-1";

    return [
      `/logs`
    ]
  }),
)(SignedInDrawer);
