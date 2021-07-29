import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory} from "react-router-dom";


const LoginPage = () => {
	const history = useHistory();
	const errors = useSelector(state => state.errors);
	const dispatch = useDispatch();
	const [login, setLogin] = useState({
		username: "",
		password: "",
	      }); 

	const loginUser = (event) => {
		event.preventDefault();
	    
		if (login.username && login.password) {
			
		  dispatch({
		    type: "LOGIN",
		    payload: {
		      username: login.username,
		      password: login.password,
		    },
		  });
		} else {
		  dispatch({ type: "LOGIN_INPUT_ERROR" });
		}
		history.push("/user");
	      }; // end login
	    
	const handleInputChangeFor = (propertyName) => (event) => {
		setLogin((prevState)=>({
			...prevState,
		  [propertyName]: event.target.value,
		}));
	      };

	      return (
		<div>
		  {errors.loginMessage && (
		    <h2 className="alert" role="alert">
		      {errors.loginMessage}
		    </h2>
		  )}
		  <div className="container">
		    <form onSubmit={loginUser}>
		      <h1>Login</h1>
		      <div className="register-form">
			<label htmlFor="username">
			  Username:
			  <input
			    type="text"
			    name="username"
			    value={login.username}
			    onChange={handleInputChangeFor("username")}
			  />
			</label>
		      </div>
		      <div className="register-form">
			<label htmlFor="password">
			  Password:
			  <input
			    type="password"
			    name="password"
			    value={login.password}
			    onChange={handleInputChangeFor("password")}
			  />
			</label>
		      </div>
		      <div>
			<input
			  className="register-form-button button-ghost"
			  type="submit"
			  name="submit"
			  value="Log In"
			/>
		      </div>
		    </form>
		  </div>
		  <center>
		    {/* <button
		      type="button"
		      className="link-button"
		      onClick={() => {
			dispatch({ type: "SET_TO_REGISTER_MODE" });
		      }}
		    >
		      Register
		    </button> */}
		  </center>
		</div>
	      );
}



export default LoginPage;