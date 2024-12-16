import React, { useState, useEffect } from "react";
import { Spinner } from "../components";

const GoogleSignIn = () => {
  const [clicked, setClicked] = useState(false);
  const [authUrl, setAuthUrl] = useState(null);

  useEffect(() => {
    const fetchAuthUrl = async () => {
      try {
       
        const response = await fetch(
         
          "backendurl/auth/google", {  //ADD your backend url
            method: "post"
          }
        );
        const data = await response.json();
        setAuthUrl(data.url);
      } catch (error) {
        console.error("Error fetching auth URL:", error);
      }
    };
    fetchAuthUrl();
  }, []);

  const handleSignIn = () => {
    setClicked(true);
    if (authUrl) {
      window.location.href = authUrl;
    } else {
      console.error("Auth URL not available");
    }
    setClicked(false);
  };

  return (
    <div>
      {clicked ? (
        <Spinner />
      ) : (
        <button
          onClick={handleSignIn}
         >
          Sign In with Google
        </button>
      )}
    </div>
  );
};

export default GoogleSignIn;
