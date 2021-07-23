import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";


const ProtectedRoute = ({component: ComponentToProtect,
	
	...otherProps}) => {


	console.log("PROTECTED ROUTE", {...otherProps})
	const user = useSelector(state => state.user);
        const loginMode = useSelector(state => state.loginMode);

	
let ComponentToShow;

  if (user.id) {
   
    ComponentToShow = ComponentToProtect;
  } else if (loginMode === "login") {
  
    ComponentToShow = LoginPage;
  } else {
    
    ComponentToShow = RegisterPage;
  }

  return (
	<Route
	  {...otherProps}
	  component={ComponentToShow}
	/>
      );

}




export default ProtectedRoute;