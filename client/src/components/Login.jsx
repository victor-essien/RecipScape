import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { ImgLogo } from "../assets/images";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import { GoogleSignIn, Loading } from "../components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils";
import { UserLogin } from "../redux/userSlice";
const Login = ({ showLogin, closeForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const res = await apiRequest({
        url: "/auth/login",
        data: data,
        method: "POST",
      });

      if (res?.status === "failed") {
        setErrMsg(res);
        isSubmitting(false);
      } else {
        setErrMsg("");

        const newData = { token: res?.token, ...res?.user };

        dispatch(UserLogin(newData));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };
  if (!showLogin) return null;
  return (
    <>
      <div className="lg:fixed lg:z-50 lg:inset-0 overflow-y-auto">
        <div className="lg:hidden flex justify-between px-2 pt-2 pb-2">
          <button className="text-black">
            <Link to={"/"} className="">
              {" "}
              <MdClose size={22} />{" "}
            </Link>
          </button>
        </div>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="lg:fixed lg:inset-0 lg:transition-opacity">
            <div className="lg:absolute inset-0 lg:bg-[#000] opacity-70"></div>
          </div>

          <span className=" sm:inline-block sm:align-middle sm:h-screen"></span>

          <div
            className="inline-block align-bottom bg-ivory rounded-lg text-left overflow-hidden shadow-xl transform transition-all  sm:my-8 sm:align-middle max-w-lg w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="lg:flex hidden justify-between px-6 pt-5 pb-2">
              <button onClick={() => closeForm()} className="text-black">
                <MdClose size={22} />
              </button>
            </div>

            <div className=" flex items-center justify-center pb-3 px-3 ">
              <div className="w-full max-w-md ">
                <div className=" lg:flex hidden justify-center  ">
                  <img src={ImgLogo} alt="" className="h-20 w-20" />
                </div>
                <h2 className="text-2xl text-black text-center lg:block hidden font-bold mb-3">
                  Welcome to RecipScape
                </h2>

                <form
                  className="space-y-4  
        "
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <TextInput
                      name="email"
                      placeholder="email@example.com"
                      label="Email Address"
                      type="email"
                      register={register("email", {
                        required: "Email Address is required ",
                      })}
                      styles="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
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
                      styles="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      errors={errors.password ? errors.password?.message : ""}
                    />
                  </div>

                  {isSubmitting ? (
                    <Loading />
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-secondary text-black py-2 px-4 rounded-md mt-3"
                    >
                      Continue
                    </button>
                  )}

                  {errMsg?.message && (
                    <span
                      className={`text-sm ${
                        errMsg?.status === "failed"
                          ? "text-[#f64949fe]"
                          : "text-[#2ba150fe]"
                      }mt-0.5`}
                    >
                      {errMsg?.message}
                    </span>
                  )}
                </form>
                <div className="flex items-center justify-center mt-4">
                  <span className=" hidden lg:block text-black">OR</span>
                </div>
                <button className="w-full bg-blue text-lg hidden text-white font-semibold py-2 px-3 rounded-md mt-4  lg:flex gap-2 items-center justify-center">
                  <FcGoogle className="text-2xl text-white text-left" />
                  <GoogleSignIn />
                </button>
                <p className="text-sm lg:hidden text-center text-black font-medium mt-4">
                  Don't Have an Account?
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                  >
                    <Link to={"/signup"} className="">
                      Signup
                    </Link>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
