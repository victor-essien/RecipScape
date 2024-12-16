import React from "react";
import { FcGoogle } from "react-icons/fc";
import { ImgLogo } from "../assets/images";
import { Link } from "react-router-dom";
import { GoogleSignIn} from "../components";

const MobSignup = () => {
  return (
    <div className="lg:min-h-screen pb-0 lg:pb-16">
      <div className=" bg-bgColor">
        <div className=" w-full flex items-center lg:bg-none bg-custom-bg4 bg-cover h-screen justify-center px-8 pb-0">
          <div className="w-full max-w-md  pb-9">
            <div className="p-2 flex justify-center  ">
              <img src={ImgLogo} alt="" className="h-20 w-20" />
            </div>
            <h2 className="text-4xl text-black text-center font-bold mb-3">
              Welcome to <span className="text-yellow">RecipScape</span>
            </h2>

            <form className="space-y-4">
              <button
                type="submit"
                className="w-full bg-secondary text-black py-2 px-4 text-lg font-semibold rounded-lg mt-3"
              >
                <Link to={"/signup"} className="">
                  {" "}
                  Continue with email
                </Link>
              </button>
            </form>

            <button className="w-full bg-white text-blue text-lg font-semibold py-2 px-3 rounded-md mt-4  flex gap-2 items-center justify-center">
              <FcGoogle className="text-2xl text-left" />
              <GoogleSignIn />
            </button>
            <div className="flex items-center justify-center mt-2">
              <span className="text-yellow font-medium text-lg">
                Have an account?
                <span>
                  {" "}
                  <Link to={"/login"} className="">
                    Log in
                  </Link>
                </span>{" "}
              </span>
            </div>
          </div>
        </div>

        {/* RightSection with Background Image and Text */}
        <div className="lg:w-1/2  lg:bg-cover lg:bg-center hidden lg:flex lg:bg-custom-bg">
          <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
            <h1 className="text-white text-5xl font-bold mb-4 mx-4">
              Sign up to get Recipes
            </h1>
          </div>
        </div>
      </div>
      <div className="hidden lg:block   h-10 w-full ">
        <p className=" text-center font-bold text-lg text-black">
          Images by{" "}
          <a
            className="text-blue"
            rel="noreferrer"
            target="_blank"
            href="https://www.freepik.com/"
          >
            Freepix
          </a>
        </p>
      </div>
    </div>
  );
};

export default MobSignup;
