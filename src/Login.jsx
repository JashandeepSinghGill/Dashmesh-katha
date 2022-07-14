import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
const Login = () => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const [accessToken, setAccessToken] = useState("");

  const handleFailure = (result) => {
    console.log(result);
  };
  const handleLogin = async (googleData) => {
    // console.log(googleData);
    // const res = await fetch("http://localhost:5000/api/google-drive", {
    //   method: "GET",
    //   // body: JSON.stringify({
    //   //   token: googleData.tokenId,
    //   // }),
    //   // headers: {
    //   //   "Content-Type": "application/json",
    //   // },
    // });
    // setLoginData(res.body);
    //localStorage.setItem("loginData", JSON.stringify(data));
  };
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
    setAccessToken("");
  };

  // useEffect(() =>
  //   gapi.load("client:auth2", () => {
  //     gapi.client.init({
  //       clientId:
  //         "795582226653-kkuk6grl96r9pjhach18ektel5p1j0as.apps.googleusercontent.com",
  //       scope: "https://www.googleapis.com/auth/drive",
  //       plugin_name: "chat",
  //     });
  //   })
  // );

  //--------------

  //--------------

  return (
    <div>
      <h1>Google Login</h1>
      <GoogleLogin
        clientId=""
        //"795582226653-kkuk6grl96r9pjhach18ektel5p1j0as.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={handleLogin}
        onFailure={handleFailure}
      />
    </div>
  );
};

export default Login;
