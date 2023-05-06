import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import { Typography, Button } from "@mui/material";
import countryList from 'country-list-js';
// import { Select, MenuItem } from "@material-ui/core";
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from "@mui/material/CircularProgress";
import Select from '@mui/material/Select';
let countries = Object.values(countryList.all)

const CardEditingForm = (props) => {
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
  const { companyDefaultPaymentMethod, companyData, payment, userData } = props;
  const { name, address, } = companyDefaultPaymentMethod.billing_details;
  const { postal_code, line1, line2, city } = address;
  const { country } = userData;
  const { exp_month, exp_year } = companyDefaultPaymentMethod.card;
  const [expMonth, setexpMonth] = useState(exp_month ?? "");
  const [expYear, setexpYear] = useState(exp_year ?? "");
  const [accountTitle, setaccountTitle] = useState(name ?? "");
  const [countryName, setCountry] = useState(country ?? "");
  const [cityName, setCity] = useState(city ?? "");
  const [cvc, setCvc] = useState("1234");
  const [addressLine1, setaddressLine1] = useState(line1 ? line1 : "");
  const [addressLine2, setaddressLine2] = useState(line2 ? line2 : "");
  const [postal, setpostal] = useState(postal_code ?? "");
  const [pmid, setPmid] = useState("");
  const [error, setError] = useState(companyDefaultPaymentMethod.id ?? "");
  const [billingDetails, setBillingDetails] = useState(companyDefaultPaymentMethod.billing_details ?? "");
  const [isFieldDisabled, setIsFieldDisabled] = useState(false);

  // useEffect(() => {
  //   const { companyDefaultPaymentMethod, companyData } = props;
  //   const { name, address, } = companyDefaultPaymentMethod.billing_details;
  //   const { postal_code, line1, line2, city, country } = address;
  //   const { exp_month, exp_year } = companyDefaultPaymentMethod.card;
  //   setPmid(companyDefaultPaymentMethod.id);
  //   setBillingDetails(companyDefaultPaymentMethod.billing_details);
  //   setaccountTitle(name);
  //   setCountry(country);
  //   setCity(city);
  //   setCvc(cvc);
  //   setpostal(postal_code);
  //   setaddressLine1(line1 ? line1 : "");
  //   setaddressLine2(line2 ? line2 : "");
  //   setexpMonth(exp_month);
  //   setexpYear(exp_year);
  // }, [props]);
  // validation
  const [accountTitleError, setAccountTitleError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [expMonthError, setExpMonthError] = useState(false);
  const [expYearError, setExpYearError] = useState(false);
  const [cvcError, setCvcError] = useState(false);
  const [addressLine1Error, setAdressLine1Error] = useState(false);
  const [addressLine2Error, setAdressLine2Error] = useState(false);
  const [postalError, setPostalError] = useState(false);
  const handleSubmit = async (event) => {
    console.log("CARD EDIT SUBMIT");
    setIsFieldDisabled(true);
    // validation 
    if (accountTitle.length === 0) {
      setAccountTitleError(true);
    }
    if (country.length === 0) {
      setCountryError(true);
    }
    if (expMonth.length === 0) {
      setExpMonthError(true);
    }
    if (expYear.length === 0) {
      setExpYearError(true);
    }
    if (cvc.length === 0) {
      setCvcError(true);
    }
    if (addressLine1.length === 0) {
      setAdressLine1Error(true);
    }
    if (addressLine2.length === 0) {
      setAdressLine2Error(true);
    }
    if (postal.length === 0) {
      setPostalError(true);
    }

    // Block native form submission.
    event.preventDefault();
    const { coid } = companyData;
    var accountAddress = { ...billingDetails.address };
    accountAddress["city"] = city;
    accountAddress["line1"] = addressLine1;
    accountAddress["line2"] = addressLine2;
    accountAddress["postal_code"] = postal;
    var isExpiryGood = Number.parseInt(expMonth) > 0 && Number.parseInt(expMonth) < 13;
    if (isExpiryGood) {
      setError("");
      var cardDetailsObject = {
        stripePmid: pmid,
        expMonth: expMonth,
        expYear: expYear,
        accountTitle: accountTitle,
        accountAddress: accountAddress,
      };

      console.log(cardDetailsObject);
      props.changeCardDetailsOnStripe(cardDetailsObject, coid);
    } else {
      setError("Please enter correct expiry date");
    }
  };


  const { isPaymentMethodActed, isPaymentMethodActing, paymentMessage } =
    payment;
  const relevantComponent = !isPaymentMethodActed ? (
    !isPaymentMethodActing ? (

      <Button
        variant="contained"
        type="submit"
        sx={{
          marginInline: '2px',
          textTransform: 'initial',
          backgroundColor: '#1b1c1a', ':hover': {
            backgroundColor: '#1b1c1a'
          }
        }}
      >
        <span>Update details</span>
      </Button>

    ) : (
      <Button
        variant="contained" disabled sx={{
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
        }}
      >
        <CircularProgress variant="indeterminate" size={15} sx={{ color: 'white' }} /><span style={{ paddingLeft: '15px' }}>Updating card</span>
      </Button>
    )
  ) : (
    <React.Fragment />
  );

  const relevantMessage = (
    <p style={{ color: `${isPaymentMethodActed ? "black" : "red"}` }}>
      {paymentMessage}
    </p>
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>

          <Grid item xs={12}>

          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" style={{ fontWeight: '550', fontSize: "15px" }}>
              Account name
            </Typography>
            <TextField
              id="account title"
              // label="Account Name"
              type="text"
              variant="outlined"
              fullWidth
              disabled={isFieldDisabled}
              value={accountTitle}
              onChange={(event) => setaccountTitle(event.target.value)}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <Typography style={{ fontWeight: '550', fontSize: "15px" }}>
              Country
            </Typography>
            <Select
              id="countrycode"
              variant="outlined"
              fullWidth
              value={countryName}
              onChange={(event) => setCountry(event.target.value)}
              disabled={isFieldDisabled}
              required
            >
              <MenuItem value="" disabled>
                Select a country
              </MenuItem>
              {countries.map((option, key) => (
                <MenuItem key={key} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>


          <Grid item sm={4} xs={6}>
            <Typography variant="h6" style={{ fontWeight: '550', fontSize: "15px" }}>
              {cvcError ? "Please enter organization name." : "CVC"}
            </Typography>
            <TextField
              id="cvc"
              type="text"
              variant="outlined"
              fullWidth
              value={cvc}
              disabled={isFieldDisabled}
              onChange={(event) => setCvc(event.target.value)}
              required
              error={cvcError}

            />
          </Grid>
          <Grid item sm={4} xs={6}>
            <Typography variant="h6" style={{ fontWeight: '550', fontSize: "15px" }}>
              Expiry month
            </Typography>
            <TextField
              id="expMonth"
              type="text"
              variant="outlined"
              fullWidth
              value={expMonth}
              disabled={isFieldDisabled}
              onChange={(event) => setexpMonth(event.target.value)}
              required
            />
          </Grid>
          <Grid item sm={4} xs={6}>
            <Typography variant="h6" style={{ fontWeight: '550', fontSize: "15px" }}>
              Expiry year
            </Typography>
            <TextField
              id="expYear"
              type="text"
              variant="outlined"
              fullWidth
              value={expYear}
              onChange={(event) => setexpYear(event.target.value)}
              required
              disabled={isFieldDisabled}
            />
          </Grid>

          <Grid item sm={4} xs={6}>
            <Typography variant="h6" style={{ fontWeight: '550', fontSize: "15px" }}>
              Address line 1
            </Typography>
            <TextField
              id="address"
              type="text"
              variant="outlined"
              fullWidth
              disabled={isFieldDisabled}
              value={addressLine1}
              onChange={(event) => setaddressLine1(event.target.value)}
              required
            />
          </Grid>
          <Grid item sm={4} xs={6}>
            <Typography variant="h6" style={{ fontWeight: '550', fontSize: "15px" }}>
              Address line 2
            </Typography>
            <TextField
              id="address"
              type="text"
              variant="outlined"
              fullWidth
              value={addressLine2}
              disabled={isFieldDisabled}
              onChange={(event) => setaddressLine2(event.target.value)}
              required
            />
          </Grid>
          <Grid item sm={4} xs={6}>
            <Typography variant="h6" style={{ fontWeight: '550', fontSize: "15px" }}>
              Postal code
            </Typography>
            <TextField
              id="code"
              type="text"
              variant="outlined"
              fullWidth
              disabled={isFieldDisabled}
              value={postal}
              onChange={(event) => setpostal(event.target.value)}
              required
            />
          </Grid>
          <Grid item xs={9}>

          </Grid>
          <Grid item xs={3} style={{
            display: "flex", justifyContent: "flex-end"
          }}>
            <br />
            {/* <p style={{ color: "red" }}>{error}</p> */}
            {relevantComponent}
          </Grid>

          <Grid item xs={12}>
            <br />
            {relevantMessage}
          </Grid>

        </Grid>
      </form>
    </div>
  );
}
export default CardEditingForm;