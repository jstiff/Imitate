import React, { createContext, useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter as Router,
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
import loginMode from "../../redux/reducers/loginModeReducer";
import oAuth_reducer from "../../redux/reducers/oAuth_reducer";

//export const AuthContext = createContext();

const App = () => {
  const dispatch_to_login_saga = useDispatch();
  useEffect(() => {
    console.log("in App.js useEFFECT");
    dispatch_to_login_saga({ type: "GITHUB_OAUTH" });
  }, []);

  // const startState = {
  // 	isLoggedIn: false,
  // 	user: null,
  // 	client_id: "",
  // 	redirect_uri:"",
  // 	client_secret: "",
  // 	proxy_url: "",
  // 	loaded: false,
  //       };

  //const [logInState, dispatch] = useReducer(loginMode, startState);

  // const oAuth_data = useSelector(state => state.oAuth_reducer);
  // console.log("logInState:::", oAuth_data)

  //console.log("STATE", state)

  // const dispatch = useDispatch();
  // useEffect(() =>{
  // 	dispatch({ type: "FETCH_USER" });
  // })

  return (
    <Router>
      <Nav3 />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/friends" component={FriendsPreviewPage} />
        <ProtectedRoute exact path="/user" component={UserPage} />
        <ProtectedRoute exact path="/lesson" component={LessonPage} />
        <ProtectedRoute exact path="/history" component={HistoryPage} />
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
