// src/components/SignUp.js

import React, { useState } from "react";

import { useForm } from "react-hook-form";
import TextInput from "./TextInput";

import { useDispatch } from "react-redux";
import { Loading, GoogleSignIn } from "../components";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils";
import { UserLogin } from "../redux/userSlice";
import { FcGoogle } from "react-icons/fc";
const SignUp = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const res = await apiRequest({
        url: "/auth/signup",
        data: data,
        method: "POST",
      });

      if (res?.status === "failed") {
        setErrMsg(res);
        isSubmitting(false);
      } else {
        setErrMsg(res);
        const newData = { token: res?.token, ...res?.user };

        dispatch(UserLogin(newData));
        navigate("/");
      }
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };
  return (
    <div className=" min-h-screen  pb-0 lg:pb-16 ">
      <div className=" flex bg-bgColor">
        {/* Left Section with Background Image and Text */}
        <div className="w-1/2 bg-cover bg-center  bg-custom-bg">
          <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
            <h1 className="text-white text-4xl font-bold mb-4">
              Sign up to get your ideas
            </h1>
          </div>
        </div>

        {/* Right Section with Form */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl text-black font-bold mb-3">
              Welcome to RecipScape
            </h2>
            <p className="text-black mb-3 ">Find and try new recipes</p>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <TextInput
                  name="firstName"
                  placeholder="First Name"
                  label="First Name"
                  type="text"
                  register={register("firstName", {
                    required: "First Name is required ",
                  })}
                  styles="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  errors={errors.firstName ? errors.firstName.message : ""}
                />
              </div>
              <div>
                <TextInput
                  name="Last Name"
                  placeholder="Last Name"
                  label="Last Name"
                  type="text"
                  register={register("lastName", {
                    required: "Last Name is required ",
                  })}
                  styles="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  errors={errors.lastName ? errors.lastName.message : ""}
                />
              </div>
              <div>
                <TextInput
                  name="email"
                  placeholder="email@example.com"
                  label="Email Address"
                  type="email"
                  register={register("email", {
                    required: "Email Address is required ",
                  })}
                  styles="mt-1 block w-full text-black px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  errors={errors.email ? errors.email.message : ""}
                />
              </div>
              <div>
                <TextInput
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                  register={register("password", {
                    required: "Password is required ",
                  })}
                  styles="mt-1 block w-full text-black  px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  errors={errors.password ? errors.password?.message : ""}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-secondary text-black py-2 px-4 rounded-md mt-3"
              >
                Continue
              </button>
            </form>
            <div className="flex items-center justify-center mt-4">
              <span className="text-black">OR</span>
            </div>
            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status === "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}
            {isSubmitting ? (
              <Loading />
            ) : (
              <button className="w-full border-2 border-blue text-blue py-2 px-3 rounded-md mt-2  flex gap-2 items-center justify-center">
                <FcGoogle className="text-xl text-left" />
                <GoogleSignIn />
              </button>
            )}
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

export default SignUp;
