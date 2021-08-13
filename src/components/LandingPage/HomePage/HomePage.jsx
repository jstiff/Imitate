import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchUser from "../../Lesson/SeachUser/SearchUser";
import UserPage from "../../Lesson/UserPage/UserPage";
//import { AuthContext } from "../../App/App";

const HomePage = () => {
  const oAuth_data = useSelector((state) => state.oAuth_reducer);
  //const { state, dispatch } = useContext(AuthContext);

  if (!oAuth_data.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  const { avatar_url, name, public_repos, followers, following, bio } =
    oAuth_data.user;

  const handleLogout = () => {
    alert("ARE YOU SURE???");
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <div className="container">
      {/* <button onClick={() => handleLogout()}>Logout</button> */}
      <div>
        <div className="content">
          {/* <h1 className="mt-20 ml-20 text-6xl font-sans">Welcome {name}...</h1> */}
          {/* <h1 className="mt-20 ml-20 text-4xl font-sans">{bio}</h1> */}
          {/* <SearchUser name={oAuth_data.user.name} /> */}
          <UserPage />
          {/* <span>{public_repos} Repos</span>
          <span>{followers} Followers</span>
          <span>{following} Following</span> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
