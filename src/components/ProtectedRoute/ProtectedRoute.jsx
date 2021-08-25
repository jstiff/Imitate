import React from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "../LandingPage/LoginPage/LoginPage";
import HomePage from "../LandingPage/HomePage/HomePage";
import RegisterPage from "../LandingPage/RegisterPage/RegisterPage";
//import oAuth_reducer from "../../redux/reducers/oAuth_reducer";
import loginMode from "../../redux/reducers/loginModeReducer";

const ProtectedRoute = ({
  component: ComponentToProtect,
  authenticated_user,

  ...otherProps
}) => {
  console.log("PROTECTED ROUTE", authenticated_user);
  let { authenticated } = authenticated_user;

  let ComponentToShow;

  if (authenticated) {
    ComponentToShow = ComponentToProtect;
  } else {
    ComponentToShow = LoginPage;
  }

  return <Route {...otherProps} component={ComponentToShow} />;
};

export default ProtectedRoute;

// else if (loginMode === "home"){

//   ComponentToShow = HomePage;
// }
