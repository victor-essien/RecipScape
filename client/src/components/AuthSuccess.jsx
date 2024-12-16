import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserLogin } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const AuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Parse the query parameters from the URL
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    const encodedUser = params.get("user");

    if (encodedUser) {
      const user = JSON.parse(atob(encodedUser));
      console.log("Decoded User: ", user);

      const newData = { token, ...user };
      console.log("newData", newData);
      // Save user information (e.g., in localStorage or state)
      dispatch(UserLogin(newData));
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-4xl text-black font-semibold items-center">
        {" "}
        Logging you in...
      </div>
    </div>
  );
};

export default AuthSuccess;
