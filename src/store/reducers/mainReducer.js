import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import appControlReducer from "./appControlReducer";
// import datastoreReducer from './datastoreReducer';

const persistConfig = {
  key: "boilerroot",
  storage,
  //DOCS: Conflicting datastore so uncomment when release build.
  whitelist: [],
};

const mainReducer = combineReducers({
  // APP CONTROL AN AUTH
  auth: authReducer,

  // FIREBASE
  firebase: firebaseReducer,
  firestore: firestoreReducer,

  // THEME
  themeRed: themeReducer,

  // APP CONTROL
  appControl: appControlReducer,
});

export default persistReducer(persistConfig, mainReducer);
