import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
//import { AuthContext } from "../../App/App";



const HomePage = () => {
	const oAuth_data = useSelector(state => state.oAuth_reducer);
	//const { state, dispatch } = useContext(AuthContext);

  if (!oAuth_data.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  const { avatar_url, name, public_repos, followers, following } = oAuth_data.user

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  } 
	return(
		
	<div className="container">
        <button onClick={()=> handleLogout()}>Logout</button>
        <div>
          <div className="content">
	  <h1 className="mt-20 ml-20 text-6xl font-sans">Home Page</h1>
            <img src={avatar_url} alt="Avatar"/>
            <span>{name}</span>
            <span>{public_repos} Repos</span>
            <span>{followers} Followers</span>
            <span>{following} Following</span>
          </div>
        </div>
      </div>
	);
}

export default HomePage;