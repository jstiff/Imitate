import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import "../../dist/style.css";
const SearchUser = () => {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const [userName, setUserName] = useState("");

	const handleChange = (event) => {
		setUserName(event.target.value);
	      };
	const sendUserName = () => {
		dispatch({ type: "CLEAR_ON_LOGOUT" });
		dispatch({
		  type: "FETCH_GITHUB_USER",
		  payload: userName,
		});
	      };

	      return (
		<div className="SearchUser">
		  <h2 className="homeWelcome">
		<h1 className="text-blue-400 font-extrabold"> tailwinds</h1>
		    Welcome {user.first_name},{" "}
		    <span style={{ marginLeft: "10px" }}></span>search GitHub for your
		    favorite developer!
		  </h2>
		  <br />
		  <div className="gitHubSearchContainer">
		    <input
		      className="apiSearchInput"
		      onChange={handleChange}
		      type="text"
		      autoFocus
		      placeholder="search for user"
		    />
		    <button
		      className="register-form-button button-ghost"
		      onClick={sendUserName}
		    >
		      Search user
		    </button>
		  </div>
		</div>
	      );
}


export default SearchUser;