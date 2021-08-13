import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
// import { AuthContext } from "../../App/App";
import oAuth_reducer from "../../../redux/reducers/oAuth_reducer";

const LoginPage = () => {
  const dispatch_fetch = useDispatch();

  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  const oAuth_data = useSelector((state) => state.oAuth_reducer);
  const { isLoggedIn, user, client_id, redirect_uri } = oAuth_data;
  if (oAuth_data.loaded) {
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
        code: newUrl[0],
      };

      const proxy_url = localStorage.getItem("proxy_url");

      // Use code parameter and other parameters to make POST request to proxy_server

      fetch(proxy_url, {
        method: "POST",
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("??????????????", data);
          dispatch_fetch({
            type: "LOGIN",
            payload: { user: data, isLoggedIn: true },
          });
        })
        .catch((error) => {
          setData({
            isLoading: false,
            errorMessage: "Sorry! Login failed",
          });
        });
    }
  }, [oAuth_data, data]);

  if (oAuth_data.isLoggedIn) {
    return <Redirect to="/" />;
  }
  // ****************************************************** */

  return (
    <section className="text-left p-20">
      <div>
        <div className="text-center">
          <h1 className="text-6xl font-mono -ml-96 ">In Here!</h1>
          <span className="font-sans my-80 -ml-52 text-center text-8xl">➘</span>
        </div>
        <span>{data.errorMessage}</span>
        <div className="login-container">
          {oAuth_data.loaded ? (
            <div className="text-center">
              {
                // Link to request GitHub access
              }

              <a
                className=""
                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&login`}
                onClick={() => {
                  setData({ ...data, errorMessage: "" });
                  //dispatch_fetch({type: "FETCH_TO_AUTHORIZE"})
                }}
              >
                <img
                  className="h-24 w-auto sm:h-16 inline-block rounded-md m-8  hover:bg-gray-200 rounded-full"
                  src="gitHub.svg"
                  alt="open"
                />
                <span className="block">Login with GitHub</span>
              </a>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
