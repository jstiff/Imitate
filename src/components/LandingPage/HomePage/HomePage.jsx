import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchUser from "../../Lesson/SeachUser/SearchUser";
import UserPage from "../../Lesson/UserPage/UserPage";
import axios from "axios";
import oAuth_reducer from "../../../redux/reducers/oAuth_reducer";
//import { AuthContext } from "../../App/App";

const HomePage = () => {
  // const [userState, setUserState] = useState({
  //   authenticated1: false,
  //   user: {},
  // });
  const oAuth_reducer = useSelector((state) => state.oAuth_reducer);
  const { user_profile } = oAuth_reducer;

  //const { state, dispatch } = useContext(AuthContext);

  // useEffect(() => {
  //   fetch("http://localhost:5000/authenticate/login/success", {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Credentials": true,
  //     },
  //   })
  //     .then((response) => {
  //       if (response.status === 200) return response.json();
  //       throw new Error("failed to authenticate user");
  //     })
  //     .then((responseJson) => {
  //       console.log("responseJson", responseJson);
  //       // setState({
  //       //   authenticated1: true,
  //       //   user: responseJson.user,
  //       // });
  //     })
  //     .catch((error) => {
  //       console.log("error poop", error);
  //       // this.setState({
  //       //   authenticated: false,
  //       //   error: "Failed to authenticate user",
  //       // });
  //     });
  // }, []);

  // // const { avatar_url, name, public_repos, followers, following, bio } =
  // //   oAuth_data.user;

  // const handleLogout = () => {
  //   alert("ARE YOU SURE???");
  //   dispatch({
  //     type: "LOGOUT",
  //   });
  // };
  return (
    <div className="container">
      {/* <button onClick={() => handleLogout()}>Logout</button> */}
      <div>
        <div className="content">
          <h1 className="mt-20 ml-20 text-6xl font-sans">
            Welcome {user_profile.name.split(" ")[0]}...
          </h1>
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
