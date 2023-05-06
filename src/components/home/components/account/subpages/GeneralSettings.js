import React from "react";
import { useState, useEffect } from "react";
// import { Box, CardContent, makeStyles, Grid, Dialog, DialogContent, IconButton, Select, MenuItem } from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Stack from "@mui/material/Stack";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Card from '@mui/material/Card';
import SettingsIcon from '@mui/icons-material/Settings';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import countryList from 'country-list-js';
import { createTheme } from "@mui/material/styles";
import { updateButton } from "../../../../../store/actions/authActions";

let countries = Object.values(countryList.all)

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  Heading: {
    fontWeight: "500",
  },
  paymentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(3),
  },
}));

const GeneralSettings = (props) => {

  const classes = useStyles();
  console.log(props, 'props')
  const { auth, userData } = props;
  const { isUpdating } = auth;
  const { organizationName, name, uid, country } = userData;
  console.log(userData, 'user123', isUpdating)
  const [tokensPurchased, setTokensPurchased] = useState(5989);
  const [tokensConsumed, setTokensConsumed] = useState(3456);
  const [countryName, setCountryName] = useState(country ?? "");
  const [accountTitle, setaccountTitle] = useState(name ?? "");
  const [organization, setOrganization] = useState(organizationName ?? "");
  
  const handleSubmit = async (event) => {
    console.log("CARD EDIT SUBMIT");
    // Block native form submission.
    event.preventDefault();
  }

  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const handleEditClose = () => {
    setShowEditForm(false);
  };

  console.log(isUpdating, 'updated')

  const validateAccountTitle = () => {
    return accountTitle.trim().length > 0;
  };

  const validateOrganization = () => {
    return organization.trim().length > 0;
  };

  const validateCountry = () => {
    return countryName.trim().length > 0;
  };

  const validateInfo = () => {
    return (tokensPurchased && tokensConsumed);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="flex-end">

          <Grid item xs={12}>

          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" style={{ fontWeight: '550', fontSize: "15px" }}>
              Name
            </Typography>
            <TextField
              id="account title"
              type="text"
              variant="outlined"
              fullWidth
              value={accountTitle}
              onChange={(event) => setaccountTitle(event.target.value)}
              required
              error={!validateAccountTitle()}
              helperText={!validateAccountTitle() && 'Please enter a name.'}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" style={{ fontWeight: '550', fontSize: "15px" }}>
              Organization name
            </Typography>
            <TextField
              type="text"
              variant="outlined"
              fullWidth
              value={organization}
              onChange={(event) => setOrganization(event.target.value)}
              required
              error={!validateOrganization()}
              helperText={!validateOrganization() && 'Please enter an organization name.'}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" style={{ fontWeight: '550', fontSize: "15px" }}>
              Country
            </Typography>
            <Select
              id="countrycode"
              variant="outlined"
              fullWidth
              value={countryName}
              onChange={(event) => setCountryName(event.target.value)}
              required
              error={!validateCountry()}
              displayEmpty
              renderValue={() => countryName ? countryName : 'Select a country'}
            >
              {countries.map((option, key) => (
                <MenuItem key={key} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            {!validateCountry() && <Typography variant="caption" color="error">Please select a country.</Typography>}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" style={{ fontWeight: '550', fontSize: "15px" }}>
              Information
            </Typography>
            <TextField
              type="text"
              variant="outlined"
              fullWidth
              required
              error={!validateInfo()}
              helperText={!validateInfo() && 'Please enter some information.'}
              disabled
              multiline
              rows={2}
              value={`Tokens purchased: ${tokensPurchased}\nTokens consumed: ${tokensConsumed}`}
              InputProps={{
                disableUnderline: true
              }}
            />
          </Grid>

          <Grid item xs={12}>

          </Grid>

          <Grid item xs={10}>

          </Grid>

          <Grid item xs={2} justifyContent="center">

            {
              isUpdating ?
                <Button variant="contained" disabled sx={{
                  "&.Mui-disabled": {
                    backgroundColor: '#1b1c1a',
                    color: '#D9D9D9'
                  },
                  marginInline: '2px',
                  textTransform: 'initial',
                  color: '#1b1c1a',
                  backgroundColor: '#1b1c1a', ':hover': {
                    backgroundColor: '#1b1c1a'
                  }
                }} >
                  <CircularProgress variant="indeterminate" size={15} sx={{ color: 'white' }} /><span style={{ paddingLeft: '15px' }}>Updating</span>
                </Button>
                :
                <Button variant="contained"
                  sx={{
                    marginInline: '2px',
                    textTransform: 'initial',
                    backgroundColor: '#1b1c1a', ':hover': {
                      backgroundColor: '#1b1c1a'
                    },
                  }} onClick={() => { props.updateButton(organization, accountTitle, countryName, uid) }} >Update details</Button>
            }


          </Grid>

        </Grid>
      </form>
    </div>

  );
}

const mapStateToProps = (state) => {
  return {
    companyData: state.firestore.data.Company,
    themeColors: state.theme,
    userData: state.firebase.profile,
    userId: state.firebase.auth.uid,
    companyDefaultPaymentMethod: state.firestore.data.PaymentMethod,
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateButton: (organizationName, name, countryName, uid) => dispatch(updateButton(organizationName, name, countryName, uid))

  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    // var { stripeDefaultPmid, coid } = props.companyData ?? {};
    var stripeDefaultPmid = props.companyData?.stripeDefaultPmid ?? "-1"
    const coid = props.companyData?.coid ?? "-1"
    stripeDefaultPmid = stripeDefaultPmid
      ? stripeDefaultPmid === ""
        ? "-1"
        : stripeDefaultPmid
      : "-1";
    console.log(stripeDefaultPmid);
    return [
      {
        collection: `PaymentMethods/${coid}/StripePaymentMethods`,
        storeAs: "PaymentMethod",
        doc: stripeDefaultPmid,
      },
    ];
  })
);
export default enhance(GeneralSettings);
