import React, { createContext, useReducer, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "tailwindcss/tailwind.css";
import "./App.css";
import Nav3 from "../Nav/Nav3";
import Footer from "../Footer/Footer";
import AboutPage from "../LandingPage/AboutPage/AboutPage";
import UserPage from "../Lesson/UserPage/UserPage";
import LessonPage from "../Lesson/LessonPage/LessonPage";
import HistoryPage from "../Lesson/HistoryPage/HistoryPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PricingPage from "../LandingPage/PricingPage/PricingPage";
import HomePage from "../LandingPage/HomePage/HomePage";
import LoginPage from "../LandingPage/LoginPage/LoginPage";
import RegisterPage from "../LandingPage/RegisterPage/RegisterPage";
import FriendsPreviewPage from "../LandingPage/FriendsPreviewPage/FriendsPreviewPage";
import ProfilePage from "../../components/LandingPage/ProfilePage/ProfilePage";
import loginMode from "../../redux/reducers/loginModeReducer";
import oAuth_reducer from "../../redux/reducers/oAuth_reducer";
import RedirectLoader from "../RedirectLoader/RedirectLoader";

//export const AuthContext = createContext();

const App = () => {
  const oAuth_reducer = useSelector((state) => state.oAuth_reducer);
  const dispatch = useDispatch();
  const user = oAuth_reducer.authenticated;

  useEffect(() => {
    //this just checks to see if there are existing cookies. Might be a better way...
    console.log("APP", user);
    dispatch({ type: "FETCH_USER" });
  }, []);

  return (
    <Router>
      <Nav3 />

      <Switch>
        {/* <Route exact path="/load" component={RedirectLoader} /> */}
        <ProtectedRoute
          exact
          path="/"
          component={HomePage}
          authenticated_user={{ authenticated: user }}
        />
        <ProtectedRoute
          exact
          path="/userProfile"
          component={ProfilePage}
          authenticated_user={{ authenticated: user }}
        />
        {/* <Route path="/login" component={LoginPage} /> */}
        <Route path="/register" component={RegisterPage} />
        <Route path="/friends" component={FriendsPreviewPage} />
        {/* <ProtectedRoute path="/user" component={UserPage} />
        <ProtectedRoute path="/lesson" component={LessonPage} />
        <ProtectedRoute path="/history" component={HistoryPage} /> */}
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/pricing" component={PricingPage} />
        <Route render={() => <h1>404</h1>} />
      </Switch>

      <Footer />
    </Router>
  );
};

export default App;

{
  /* <Redirect exact from="/" to="/home" />
		      <ProtectedRoute exact path="/home" component={HomePage} />
		      <ProtectedRoute exact path="/home" component={UserPage} /> */
}

// 	      <AuthContext.Provider
// 	value={{
// 	  logInState,
// 	  dispatch

// 	}}
//       ></AuthContext.Provider>
