import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import {
  changeCardDetailsOnStripe,
  openStripePaymentMethodModal,
} from "../../../../../store/actions/paymentActions";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import countryList from 'country-list-js';
// import { Select, MenuItem } from "@material-ui/core";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CardEditingForm from "../subpages/generalSettingsComponents/CardEditingForm";

const CardSettings = (props) => {
  const {
    userData,
    companyData,
    payment,
    companyDefaultPaymentMethod,
    changeCardDetailsOnStripe,
  } = props;
  const { coid } = companyData;
  useEffect(() => {
    props.openStripePaymentMethodModal(coid);
  }, []);

  return (
    <div>
      <div>
        <div>
          {companyDefaultPaymentMethod ? (
            <CardEditingForm
              userData={userData}
              payment={payment}
              companyDefaultPaymentMethod={companyDefaultPaymentMethod}
              companyData={companyData}
              changeCardDetailsOnStripe={changeCardDetailsOnStripe}
            />
          ) : (
            <div>
              <span>Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    themeColors: state.theme,
    userData: state.firebase.profile,
    userId: state.firebase.auth.uid,
    companyData: state.firestore.data.Company,
    companyDefaultPaymentMethod: state.firestore.data.PaymentMethod,
    payment: state.payment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openStripePaymentMethodModal: (coid) =>
      dispatch(openStripePaymentMethodModal(coid)),
    changeCardDetailsOnStripe: (cardDetailsObject, coid) =>
      dispatch(changeCardDetailsOnStripe(cardDetailsObject, coid)),
  };
};
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    var { stripeDefaultPmid, coid } = props.companyData;
    stripeDefaultPmid = stripeDefaultPmid
      ? stripeDefaultPmid === ""
        ? "-1"
        : stripeDefaultPmid
      : "-1";
    return [
      {
        collection: `PaymentMethods/${coid}/StripePaymentMethods`,
        storeAs: "PaymentMethod",
        doc: stripeDefaultPmid,
      },
    ];
  })
);
export default enhance(CardSettings);