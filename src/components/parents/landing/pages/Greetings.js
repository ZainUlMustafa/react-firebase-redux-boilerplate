import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Card } from "@mui/material";
import releaseNotes from "../../../../constants/releaseNotes.json"

const Greetings = (props) => {
  const { appBarHeightSignedOut } = props;

  const cardLightStyle = {
    "border": "0px solid grey",
    "borderRadius": "8px",
    "padding": "8px",
    "backgroundColor": '#f5f1f1'
    // "backgroundColor": '#f5f1f1'
  }

  const wnpStyle = { lineHeight: '5px' }
  const showWnp = releaseNotes.notes.length > 0 && !releaseNotes.forceNoShow

  // const classes = useStyles();
  return (
    <div style={{ width: '100vw', backgroundColor: '#FAFAFA', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '85%', backgroundColor: 'transparent' }}>
        {/* <Box sx={{ width: '100%', height: '100%', backgroundColor: 'pink' }}> */}
        <Grid container spacing={0}>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: '', alignItems: 'center', backgroundColor: '', height: `calc(100vh - ${appBarHeightSignedOut}px)` }}>
            <div>
              <Typography className="greeting-main" variant="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: { sm: 41, md: 49, lg: 56 } }}>
                {releaseNotes.greeting}
              </Typography>
              {!showWnp ? <></> : <Card sx={{ ...cardLightStyle, marginTop: '50px' }} elevation={0}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {releaseNotes.title}
                </Typography>
                <p style={{ ...wnpStyle, fontSize: '13px', marginLeft: '27px' }}>Release {releaseNotes.version}</p>
                <div style={{ margin: '25px' }}></div>
                {releaseNotes.notes.map((eachNote, i) => <p key={i} style={wnpStyle}>* {eachNote}</p>)}
              </Card>
              }
              <div style={{ marginTop: '50px' }}>
                <Link to='/a/register' style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" style={{ borderColor: '#000000', color: '#000000', textTransform: 'initial', cursor: 'pointer', paddingInline: '30px', fontWeight: 'bold', fontSize: '16px' }}>Register now!</Button>
                </Link>
                <Link to='/a/login' style={{ color: 'black', backgroundColor: 'white' }}>
                  <Typography variant="body1" sx={{ marginTop: '15px', color: 'black' }}>
                    Or login in to your existing account
                  </Typography>
                </Link>
              </div>
            </div>

          </Grid>
        </Grid>
        {/* </Box> */}
      </div>
    </div>
  );
};

export default Greetings;