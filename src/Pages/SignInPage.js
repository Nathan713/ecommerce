import React from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { setUser, clearUser } from "../features/user/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SignInPage.module.css";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token" + response.credential);
    var userObject = jwtDecode(response.credential);
    dispatch(setUser(userObject));
    document.getElementById("signInDiv").hidden = true;
    console.log(userObject);
    console.log(user);
    navigate("/");
  }

  function handleSignOut() {
    dispatch(clearUser());
    document.getElementById("signInDiv").hidden = false;
    google.accounts.id.disableAutoSelect();
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline, size: large",
    });
  }

  useEffect(() => {
    /*global google*/

    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline, size: large",
    });
    google.accounts.id.prompt();
  }, []);

  return (
    <div className={styles.container}>
      <div id="signInDiv" className={styles.signIn}>
        SignInPage
      </div>

      {user && (
        <div className={styles.details}>
          <img src={user.picture} alt="profile pic"></img>
          <h3>{user.name}</h3>

          <button
            className={styles.signOutButton}
            onClick={() => handleSignOut()}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
