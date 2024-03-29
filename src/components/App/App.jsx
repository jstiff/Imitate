import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import LessonPage from "../LessonPage/LessonPage";
import HistoryPage from "../HistoryPage/HistoryPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";

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
			  <h1>tailwind</h1>
		    <Nav />
		    <Switch>
		      <Redirect exact from="/" to="/home" />
		      <ProtectedRoute exact path="/home" component={UserPage} />
		      <ProtectedRoute exact path="/lesson" component={LessonPage} />
		      <ProtectedRoute exact path="/history" component={HistoryPage} />
		      <Route exact path="/about" component={AboutPage} />
		      <Route render={() => <h1>404</h1>} />
		    </Switch>
		    <Footer />
		  </div>
		</Router>
	      );
}




export default App;