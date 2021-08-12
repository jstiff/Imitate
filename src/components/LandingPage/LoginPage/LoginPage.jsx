import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect} from "react-router-dom";
import axios from "axios";
// import { AuthContext } from "../../App/App";
import oAuth_reducer from "../../../redux/reducers/oAuth_reducer";

const LoginPage = () => {
	const dispatch_fetch = useDispatch();
	
	const [data, setData] = useState({ errorMessage: "", isLoading: false });

	const oAuth_data = useSelector(state => state.oAuth_reducer);
	const {isLoggedIn, user, client_id, redirect_uri} = oAuth_data;
	if(oAuth_data.loaded){
		localStorage.setItem("proxy_url", oAuth_data.proxy_url);
	}
	
        
	useEffect(() => {
		let isMounted = true;
		const url = window.location.href;
		const hasCode = url.includes("?code=");
	        
		
		
		// If Github API returns the code parameter
		if (hasCode) {
		
		console.log("hasCode url:", url);
		  const newUrl = url.split("?code=")[1].split("#/login");
		  
		  window.history.pushState({}, null, newUrl[0]);
		  setData({ ...data, isLoading: true });
	    
		  const requestData = {
		    code: newUrl[0]
		  };
		 
		  const proxy_url = localStorage.getItem("proxy_url");
		  
	    
		  // Use code parameter and other parameters to make POST request to proxy_server
		
		  fetch(proxy_url, {
			method: "POST",
			body: JSON.stringify(requestData)
		      })
		    .then(response => response.json())
		    .then(data => {
			console.log("??????????????", data)
		      dispatch_fetch({
			type: "LOGIN",
			payload: { user: data, isLoggedIn: true }
		      });
		    })
		    .catch(error => {
		      setData({
			isLoading: false,
			errorMessage: "Sorry! Login failed"
		      });
		    });
		}
	      }, [ oAuth_data, data]);
	    
	      if (oAuth_data.isLoggedIn) {
		return <Redirect to="/" />;
	}
	// ****************************************************** */

	

	      return (
		    
		<section className="container">
		<div>
		  <h1>Welcome</h1>
		  <span>Super amazing app</span>
		  <span>{data.errorMessage}</span>
		  <div className="login-container">
		    {oAuth_data.loaded ? (
		      <>
			{
			  // Link to request GitHub access
			}
			<a
			  className="login-link"
		          href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&login`}
			  onClick={() => {
			    setData({ ...data, errorMessage: "" });
			    //dispatch_fetch({type: "FETCH_TO_AUTHORIZE"})
			  }}
			>
			  <img
                    className="h-0 w-auto sm:h-10 inline-block rounded-md m-8"
                    src="gitHub.svg"
                    alt="open"/> 
			  <span>Login with GitHub</span>
			</a>
		      </>
		    ): ''}
		  </div>
		</div>
	      </section>
	);
}



export default LoginPage;