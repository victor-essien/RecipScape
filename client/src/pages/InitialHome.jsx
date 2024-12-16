import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleSignIn, Loading } from "../components";
import { Helmet } from "react-helmet-async";
import {
  Bot,
  Connect,
  ImgLogo,
  Saver,
  image1,
  image2,
  image3,
  image4,
} from "../assets/images";

import {
  FloatingText,
  AnimatedImage,
  SignUp,
  MobSignup,
  SignUpFloat,
  Login,
} from "../components";
const InitialHome = () => {
  const navigate = useNavigate();
  // AuthCallback.js

  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const [showForm, setShowForm] = useState(false);

  // const switchToSignUp = () => {
  //   setShowForm(true)

  // }
  // const switchToLogin = () => {
  //  setShowForm(true)

  // }
  const toggleSignupForm = () => {
    setShowSignUp(!showSignUp);
    setShowLogin(false);
  };
  const closeSignupForm = () => {
    setShowSignUp(false);
  };

  const toggleLoginForm = () => {
    setShowLogin(!showLogin);
    setShowSignUp(false);
  };
  const closeLoginForm = () => {
    setShowLogin(false);
  };
  const images = [
    { src: image1, alt: "Image 1" },
    { src: image2, alt: "Image 2" },
    { src: image3, alt: "Image 3" },
    { src: image4, alt: "Image 4" },
  ];

  return (
    <>
    <Helmet>
      <title>Home | RecipScape</title>
      <meta name="description" content="Welcome to RecipScape where food enthusiat connect with friends and like minds." />
      <meta property="og:title" content="Home | Recipscape" />
      <meta property="og:description" content="Connect and share moments." />
      <meta property="og:image" content="https://recipscape.netlify.app/img.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
      <meta
          name="keywords"
          content="recipes, recipscape, recipes website, recipScape, recipe socialmedia,"
        />

    </Helmet>
    <div className="w-full px-0 lg:px-1   bg-ivory  pb-0 2xl:px-40 lg:rounded-lg h-screen overflow-hidden">
      <div className=" px-4  bg-ivory lg:px-10">
        <div className="topbar hidden md:flex lg:flex w-full fixed  items-center justify-between ">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 ">
              <img src={ImgLogo} alt="" className="h-11 w-11" />
            </div>
            <span className="text-2xl text-black font-semibold">
              RecipScape
            </span>
          </Link>
          {/* ICONS */}
          <div className="flex gap-4 items-center text-black text-md md:text-xl">
            <div>
              <button
                onClick={toggleLoginForm}
                className="text-sm font-semibold text-black bg-secondary px-4 md:px-6 py-1 md:py-2  rounded-full"
              >
                LogIn
              </button>
              <button
                onClick={toggleSignupForm}
                className="text-sm font-semibold text-white ml-3 bg-black px-4 md:px-6 py-1 md:py-2  rounded-full"
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Login showLogin={showLogin} closeForm={closeLoginForm} />

        <SignUpFloat showSignUp={showSignUp} closedForm={closeSignupForm} />
      </div>

      {/* MAIN PAGE */}
      <div className=" lg:pt-6 ml-1 lg:ml-0 text-ascent-1 h-screen overflow-y-auto">
        <div>
          <section className="md:hidden lg:hidden ">
            <MobSignup />
          </section>
          <section id="top" className="hidden  md:block lg:block">
            <FloatingText />
            <div className="flex justify-center space-x-4">
              {images.map((image, index) => (
                <AnimatedImage key={index} src={image.src} alt={image.alt} />
              ))}
            </div>
          </section>
          <section
            id="get"
            className="w-full bg-hdColor lg:h-screen md:h-screen h-full flex flex-col lg:items-center lg:flex-row md:flex-row"
          >
            <div className="lg:w-1/2 md:w-1/2  flex flex-col items-center pt-3 lg:pl-9 lg:pr-6">
              <img
                src={Bot}
                alt="Bot"
                className="rounded-xl h-auto w-5/6 lg:h-auto lg:w-3/4"
              />
            </div>
            <div className="lg:w-1/2 md:w-1/2  h-full flex flex-col lg:pt-24">
              <div className="flex items-center justify-center p-8 text-center h-full">
                <div>
                  <h1 className="text-ivory text-3xl lg:text-5xl font-bold mt-0 lg:mt-5">
                    Get Favorite Recipes
                  </h1>
                  <div className="pt-4 px-4">
                    <p className="text-ivory text-2xl mb-0 lg:mb-4">
                      Get your desired favorite recipes from the best chef in
                      town --- our favorite chef Bot
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="save"
            className="w-full bg-yellow lg:h-screen md:h-screen lg:items-center  h-full flex flex-col-reverse md:flex-row  lg:flex-row"
          >
            <div className="lg:w-1/2 md:w-1/2 h-full flex flex-col lg:pt-24">
              <div className="flex items-center justify-center p-8 text-center h-full">
                <div>
                  <h1 className="text-red text-5xl font-bold mt-0 lg:mt-5">
                    Save Recipes
                  </h1>
                  <div className="pt-4 px-4">
                    <p className="text-red text-2xl mb-0 lg:mb-4">
                      Save Recipes you like to try out at a later time
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 md:w-1/2 flex flex-col items-center pt-3 lg:pl-9 lg:pr-6">
              <img
                src={Saver}
                alt="Pizza"
                className="rounded-xl h-auto w-5/6 lg:h-auto lg:w-3/4"
              />
            </div>
          </section>
          <section
            id="connect"
            className="w-full bg-ascent-2 lg:h-screen lg:items-center  h-full md:h-screen flex flex-col md:flex-row lg:flex-row"
          >
            <div className="lg:w-1/2 md:w-1/2 flex flex-col items-center pt-3 lg:pl-9 lg:pr-6">
              <img
                src={Connect}
                alt="People socializing"
                className="rounded-xl h-auto w-5/6 lg:h-auto lg:w-3/4"
              />
            </div>
            <div className="lg:w-1/2  md:w-1/2 h-full flex flex-col lg:pt-24">
              <div className="flex items-center justify-center p-8 text-center h-full">
                <div>
                  <h1 className="text-ascent-4 text-3xl md:text-2xl font-bold mt-0 lg:mt-5">
                    Connect with others
                  </h1>
                  <div className="pt-4 px-4">
                    <p className="text-ascent-4 text-2xl md:xl mb-0 lg:mb-4">
                      A community for food enthusiasts to share recipes, cooking
                      tips,culinary traditions and more...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MOBILE DEVICES SIGNUP */}
          <section id="bottom" className=" md:hidden :lg:hidden">
            <div className="lg:min-h-screen pb-0 lg:pb-16">
              <div className=" bg-bgColor">
                <div className=" w-full flex items-center lg:bg-none bg-custom-bg4 bg-cover h-screen justify-center px-8 pb-0">
                  <div className="w-full max-w-md mb-24 pb-9">
                    <div className="p-2 flex justify-center  ">
                      <img src={ImgLogo} alt="" className="h-20 w-20" />
                    </div>
                    <h2 className="text-2xl text-black text-center font-bold mb-3">
                      Sign Up to explore new{" "}
                      <span className="text-yellow">Recipes</span>
                    </h2>

                    <form className="space-y-4">
                      <button
                        type="submit"
                        className="w-full bg-secondary text-black py-2 px-4 text-lg font-semibold rounded-lg mt-3"
                      >
                        <Link to={"/signup"}>Continue with email</Link>
                      </button>
                    </form>

                    <button className="w-full bg-white text-blue text-lg font-semibold py-2 px-3 rounded-md mt-4  flex gap-2 items-center justify-center">
                      <FcGoogle className="text-2xl text-left" />
                      <GoogleSignIn />
                    </button>
                    <div className="flex items-center justify-center mt-2">
                      <span className="text-yellow font-medium text-lg">
                        Have an account? <Link to={"/login"}> Log in </Link>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 md:w-1/2  lg:bg-cover lg:bg-center hidden md:flex lg:flex lg:bg-custom-bg">
                  <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
                    <h1 className="text-white text-5xl font-bold mb-4 mx-4">
                      Sign up to get Recipes
                    </h1>
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex  h-10 w-full ">
                <p className=" text-center items-end justify-center font-bold text-lg text-black">
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
          </section>
          <section id="bottom" className="hidden md:block lg:block">
            <SignUp />
          </section>
        </div>
      </div>
    </div>
    </>
  );
};

export default InitialHome;
