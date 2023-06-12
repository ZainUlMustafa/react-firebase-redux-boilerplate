import { BrowserRouter, Routes, Route } from 'react-router-dom'
import * as ROUTES from './constants/routes';
import { connect } from 'react-redux';
import LandingController from './components/parents/landing/LandingController';
import HomeController from './components/parents/home/HomeController';
import AuthController from './components/parents/auth/AuthController';
import GeneralController from './components/parents/general/GeneralController';
import GetSideBarsComponent from './components/parents/sidebars/SidebarsController';


const App = (props) => {
  const { isSignedIn, isEmailVerified } = props;
  return (
    // <BrowserRouter>
    <div 
    style={{backgroundColor: ''}}
    // className={isSignedIn ? "" : "App"} 
    // style={{ height: isSignedIn ? `` : `calc(100vh - ${props.appBarHeightSignedOut}px)`,}}
    >
      <Routes>
        <Route index element={<LandingController isSignedIn={isSignedIn} isEmailVerified={isEmailVerified} appBarHeightSignedOut={props.appBarHeightSignedOut} />} />
        <Route path={ROUTES.HOME} element={<HomeController isSignedIn={isSignedIn} isEmailVerified={isEmailVerified} appBarHeight={props.appBarHeight} />} />
        <Route path={ROUTES.AUTH} element={<AuthController isSignedIn={isSignedIn} isEmailVerified={isEmailVerified} appBarHeight={props.appBarHeight} appBarHeightSignedOut={props.appBarHeightSignedOut} />} />
        <Route path={ROUTES.PAGES} element={<GeneralController isSignedIn={isSignedIn} isEmailVerified={isEmailVerified} appBarHeight={props.appBarHeight} appBarHeightSignedOut={props.appBarHeightSignedOut}/>} />
        <Route path={ROUTES.UNKNOWN} element={<main style={{ padding: "1rem" }}>  <p>There's nothing here!</p>  </main>} />
      </Routes>
    </div>
    // </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: !state.firebase.auth.isEmpty,
    isEmailVerified: state.firebase.auth.emailVerified,
  };
};
export default connect(mapStateToProps)(GetSideBarsComponent(App));
