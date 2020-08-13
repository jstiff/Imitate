import { combineReducers } from "redux";
import errors from "./errorsReducer";
import loginMode from "./loginModeReducer";
import user from "./userReducer";
import lessonText from "./lessonText";
import apiReducer from "./apiReducer";
import reposReducer from "./reposReducer";
import treeReducer from "./treeReducer";
import contentReducer from "./contentReducer";
import contentReducer2 from "./contentReducer2";
import historyReducer from "./historyReducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user,
  lessonText,
  apiReducer,
  reposReducer,
  treeReducer,
  contentReducer,
  contentReducer2,
  historyReducer,

  // will have an id and username if someone is logged in
});

export default rootReducer;
