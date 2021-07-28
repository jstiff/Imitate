//import Nav2 from "../Nav/Nav2";
import Nav3 from "../Nav/Nav3";
import Footer from "../Footer/Footer";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import LessonPage from "../LessonPage/LessonPage";
import HistoryPage from "../HistoryPage/HistoryPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PricingPage from "../PricingPage/PricingPage";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import "./App.css";
import "tailwindcss/tailwind.css";

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
		    <Switch>
		      <Route exact path="/" component={HomePage} />
		      <Route exact path="/login" component={LoginPage} />
		      <Route exact path="/register" component={RegisterPage} />
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