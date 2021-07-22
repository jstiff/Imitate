import React from "react";
import { useDispatch } from "react-redux";
import "../Nav/Nav.css";


const LogOutButton = () => {
	const dispatch = useDispatch();

	return(
		<button
	  		className="nav-link"
	  		onClick={() => dispatch({ type: "LOGOUT" })}>
	  			Log Out
		</button>
	);
	
};
      
     
export default LogOutButton;