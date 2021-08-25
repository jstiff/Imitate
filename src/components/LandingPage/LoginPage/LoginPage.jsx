import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
// import { AuthContext } from "../../App/App";
import oAuth_reducer from "../../../redux/reducers/oAuth_reducer";
import RedirectLoader from "../../RedirectLoader/RedirectLoader";
const LoginPage = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({ errorMessage: "", isLoading: false });
  const [redirecting, setRedirecting] = useState(false);
  const oAuth_data = useSelector((state) => state.oAuth_reducer);
  const { isLoggedIn, user, client_id, redirect_uri } = oAuth_data;
  if (oAuth_data.loaded) {
    localStorage.setItem("proxy_url", oAuth_data.proxy_url);
  }

  const passport_login_two = () => {
    window.open("http://127.0.0.1:5000/authenticate/login", "_self");
  };

  return (
    <section className="text-left p-20">
      <div>
        <div className="text-center">
          <h1 className="text-6xl font-mono -ml-96 ">Log In!</h1>
          <span className="font-sans my-80 -ml-52 text-center text-8xl">➘</span>
        </div>

        <span>{data.errorMessage}</span>
        <div className="login-container">
          <div className="text-center">
            <a
              className=""
              //href="http://localhost:5000/authenticate/login"

              // onClick={() => {
              //   setData({ ...data, errorMessage: "" });

              //   //dispatch_fetch({type: "FETCH_TO_AUTHORIZE"})
              // }}
              //
              onClick={passport_login_two}
            >
              <img
                className="h-24 w-auto sm:h-16 inline-block rounded-md m-8  hover:bg-gray-200 rounded-full"
                src="gitHub.svg"
                alt="open"
              />
              <span className="block">GitHub</span>
            </a>
          </div>
          )
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
