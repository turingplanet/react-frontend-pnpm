import { GoogleLogin, GoogleLogout } from "react-google-login";

import React from "react";
import { gapi } from "gapi-script";
import { styled } from "@mui/system";
import { useEffect } from "react";

const CLIENT_ID = "xxxxxx.apps.googleusercontent.com";

const OrSignInWith = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  fontSize: "0.9rem",
  width: "300px",
});

const GoogleButton = styled("button")({
  display: "flex",
  cursor: "pointer",
  justifyContent: "flex-end",
  alignItems: "center",
  border: "none",
  backgroundColor: "white",
});

const GoogleIcon = styled("img")({
  width: "20px",
  padding: "5px",
  borderRadius: "50%",
  border: "1px solid grey",
});

function ThirdPartyLogin(props) {
  const responseGoogleSuccess = (response) => {
    let userInfo = {
      name: response.profileObj.name,
      emailId: response.profileObj.email,
    };
    props.setGlobalUserInfo(userInfo);
    props.setGlobalIsLogin(true);
  };

  const responseGoogleError = (response) => {
    console.log("google login error");
    console.log(response);
  };

  const logout = () => {
    props.setGlobalUserInfo({});
    props.setGlobalIsLogin(false);
  };

  useEffect(() => {
    function start() {
      gapi.load("auth2", function () {
        gapi.auth2.init({
          client_id: CLIENT_ID,
        });
      });
    }
    start();
  }, []);

  return (
    <OrSignInWith>
      <div style={{ width: "100%" }}>Or sign in with</div>
      <div>
        {props.globalIsLogin ? (
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText={"Logout"}
            onLogoutSuccess={logout}
            render={(renderProps) => (
              <GoogleButton
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <GoogleIcon
                  src="https://cdn-icons-png.flaticon.com/512/2504/2504739.png"
                  alt="Google Icon"
                />
              </GoogleButton>
            )}
          ></GoogleLogout>
        ) : (
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Sign In with Google"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleError}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <GoogleButton
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <GoogleIcon
                  src="https://cdn-icons-png.flaticon.com/512/2504/2504739.png"
                  alt="Google Icon"
                />
              </GoogleButton>
            )}
          />
        )}
      </div>
    </OrSignInWith>
  );
}

export default ThirdPartyLogin;
