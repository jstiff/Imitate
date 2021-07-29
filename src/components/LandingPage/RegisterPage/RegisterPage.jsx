import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import "./RegisterPage.css";


const RegisterPage = () => {
	const errors = useSelector(state => state.errors);
	const dispatch = useDispatch(); 
	const [register, setRegister] = useState({
		first_name: "",
		email: "",
		username: "",
		password: "",
	      });
	
	const registerUser = (event) => {
		event.preventDefault();
	    
		if (
		  register.username &&
		  register.password &&
		  register.first_name &&
		  register.email
		) {
		  dispatch({
		    type: "REGISTER",
		    payload: {
		      first_name: register.first_name,
		      email: register.email,
		      username: register.username,
		      password: register.password,
		    },
		  });
		} else {
		  dispatch({ type: "REGISTRATION_INPUT_ERROR" });
		  alert("Please fill in all feilds");
		}
	      }; // end registerUser
	    
	const handleInputChangeFor = (propertyName) => (event) => {
		setRegister((prevState) => ({
			...prevState,
		  [propertyName]: event.target.value,
		}));
	      };

	      return (
		<div>
		  {errors.registrationMessage && (
		    <h2 className="alert" role="alert">
		      {errors.registrationMessage}
		    </h2>
		  )}
		  <div className="container">
		    <form className="" onSubmit={registerUser}>
		      <h1>Register User</h1>
		      <div className="register-form">
			<label htmlFor="First name">
			  First name:
			  <input
			    type="text"
			    name="name"
			    value={register.first_name}
			    onChange={handleInputChangeFor("first_name")}
			  />
			</label>
		      </div>
		      <div className="register-form">
			<label htmlFor="email">
			  email:
			  <input
			    type="text"
			    name="email"
			    value={register.email}
			    onChange={handleInputChangeFor("email")}
			  />
			</label>
		      </div>
		      <div className="register-form">
			<label htmlFor="username">
			  Username:
			  <input
			    type="text"
			    name="username"
			    value={register.username}
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
			    value={register.password}
			    onChange={handleInputChangeFor("password")}
			  />
			</label>
		      </div>
		      <div>
			<input
			  className="register-form-button button-ghost"
			  type="submit"
			  name="submit"
			  value="Register"
			/>
		      </div>
		    </form>
		  </div>
		  {/* <center>
		    <button
		      type="button"
		      className="link-button"
		      onClick={() => {
			dispatch({ type: "SET_TO_LOGIN_MODE" });
		      }}
		    >
		      Login
		    </button>
		  </center> */}
		</div>
	      );
}

export default RegisterPage;