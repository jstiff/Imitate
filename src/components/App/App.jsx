//import Nav2 from "../Nav/Nav2";
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
import "./App.css";
import "tailwindcss/tailwind.css";
import io from 'socket.io-client'
import OAuth from './OAuth'
import Loading from './Loading'
import TestOauth from "../TestOauth";

import React, { useEffect} from "react";
import { useDispatch } from "react-redux";

import {
	HashRouter as Router,
	Route,
	Redirect,
	Switch,
      } from "react-router-dom";


const App = () => {
        const dispatch = useDispatch();
	useEffect(() =>{
		dispatch({ type: "FETCH_USER" });
   	})

	return (
		<Router>
		  <div>
		    <Nav3 />
		    <TestOauth />
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
		  </div>
		</Router>
	      );
}




export default App;



{/* <Redirect exact from="/" to="/home" />
		      <ProtectedRoute exact path="/home" component={HomePage} />
		      <ProtectedRoute exact path="/home" component={UserPage} /> */}