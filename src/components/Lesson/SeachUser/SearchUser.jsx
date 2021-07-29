import React, { useState } from "react";

import { useDispatch, useSelector} from "react-redux";
import "../../../dist/style.css";
//import "tailwindcss/style.css";
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
		
		  <h2 className="mt-20 mx-60 text-black-100 antialiased font-mono text-3xl">
		
		    Welcome {user.first_name},{" "}
		    <span style={{ marginLeft: "10px" }}></span>search GitHub for your
		    favorite developer!
		  </h2>
		  <br />
		  <div className="mt-40 mx-16">
		    <input type="text" placeholder="Placeholder" className="ml-96 px-3 py-3 placeholder-blueGray-200  text-blueGray-600 relative bg-white bg-white rounded text-sm border-2 border-black-300 outline-none focus:outline-none focus:ring w-4/12"
		      onChange={handleChange}
		      type="text"
		      autoFocus
		      placeholder="search GitHub"
		    />
		    <button
		      className="ml-9 border-2 border-black-500 border-opacity-100 hover:border-gray-500 py-2 px-6 rounded-l font-mono"
		      onClick={sendUserName}
		    >
		      search
		    </button>
		  </div>
		</div>
	      );
}


export default SearchUser;