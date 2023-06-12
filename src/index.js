import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import 'materialize-css';
// import 'materialize-css/dist/css/materialize.min.css';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, useSelector } from 'react-redux';
import mainReducer from './store/reducers/mainReducer';
import {
  reduxFirestore,
  getFirestore,
  createFirestoreInstance
} from "redux-firestore";
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  isLoaded
} from "react-redux-firebase";
import firebaseConfig from './config/firebaseConfig';
import firebase from "firebase/app";
import thunk from 'redux-thunk';
import { Box, CircularProgress, Container } from '@mui/material';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import LOGO from '../src/assets/logo/logo.jpeg'
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomProgress from './components/cidgets/CustomProgress';
// Creating store with middleware
const store = createStore(
  mainReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebaseConfig)
  )
);

// Adding persistence to store
const persistor = persistStore(store);

// Read user profile from here
const rrfConfig = {
  userProfile: 'Users',
  useFirestoreForProfile: true
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) {
    // if (true) {
    return (
      <Box display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh" className="loading-screen">
        <Container fixed sx={{ textAlign: 'center' }}>
          <img src={LOGO} alt="LOGO" width="150px" height="auto" />
          <br />
          <br />
          <p className='font-link' style={{ color: '#141414', fontSize: '30px' }}><b>Boilerplate</b></p>
          <CustomProgress />
          <br />
          <br />
          <p className='font-link' style={{ color: '#141414', fontSize: '18px' }}>Boilerplate by <u><a href="https://github.com/zainulmustafa" style={{ color: "#141414", textDecoration: 'none' }}>Zain Ul Mustafa</a></u></p>
        </Container>
      </Box>
    )
  };
  return children
}
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <div className='App-SignedIn' style={{backgroundColor: ''}}>
              <App />
            </div>
          </BrowserRouter>
        </PersistGate>
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
