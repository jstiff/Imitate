import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
//import "./Nav.css";


const Nav = () => {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	return (
		<div className="nav">
		  <Link to="/home">
		    <h1 className="nav-title">Imitate Hooks</h1>
		  </Link>
	      
		  <div className="nav-right">
		    <h4 className="welcome">Welcome, {user.first_name}!</h4>
	      
		    <Link
		      onClick={() => dispatch({ type: "CLEAR_ON_LOGOUT" })}
		      className="nav-link"
		      to="/home"
		    >
		     
		      {user.id ? "Home" : "Login / Register"}
		    </Link>
		    
		    {user.id && (
		      <>
			<Link className="nav-link" to="/lesson">
			  Lesson Page
			</Link>
			<LogOutButton />
		      </>
		    )}
		   
		    <Link className="nav-link" to="/about">
		      About
		    </Link>
		  </div>
		</div>
	      );
}





export default Nav;