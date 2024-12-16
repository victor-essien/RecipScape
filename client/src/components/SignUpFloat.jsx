import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { GoogleSignIn, Loading } from "../components";
import { useDispatch } from "react-redux";
import TextInput from "./TextInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils";
import { UserLogin } from "../redux/userSlice";
const SignUpFloat = ({ showSignUp, closedForm }) => {
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

  if (!showSignUp) return null;
  return (
    <>
      <div className="lg:fixed lg:z-50  lg:inset-0 overflow-y-auto">
        <div className="p-3">
          <button className="text-black lg:hidden md:hidden">
            <Link to={"/"} className="">
              {" "}
              <MdClose size={22} />{" "}
            </Link>
          </button>
        </div>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-0 text-center sm:block sm:p-0">
          <div className="lg:fixed inset-0 transition-opacity">
            <div className="lg:absolute lg:inset-0 bg-[#000] opacity-70"></div>
          </div>
          <span className=" sm:inline-block sm:align-middle sm:h-screen"></span>

          <div
            className="inline-block align-bottom bg-ivory rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="lg:flex hidden justify-between px-6 pt-5 pb-2">
              <button onClick={() => closedForm()} className="text-black">
                <MdClose size={22} />
              </button>
            </div>
            <div className=" flex items-center justify-center pb-3 px-3 ">
              <div className="w-full max-w-md">
                <div className="hidden lg:flex justify-center  ">
                  {/* <img src={ImgLogo} alt="" className='h-20 w-20' /> */}
                </div>
                {/* <h2 className="text-2xl hidden lg:block text-black text-center font-bold mb-3">Welcome to RecipScape</h2> */}

                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
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
                      className="w-full bg-secondary text-black py-1 px-4 rounded-md mt-3"
                    >
                      Continue
                    </button>
                  )}
                </form>
                <div className="lg:flex hidden items-center justify-center mt-2">
                  <span className="text-black">OR</span>
                </div>

                <button className="w-full bg-blue text-lg text-white font-semibold py-1 px-3 rounded-md mt-2 hidden lg:flex gap-5 items-center justify-center">
                  <FcGoogle className="text-2xl text-white text-left" />
                  <GoogleSignIn />
                </button>
                <p className="text-sm lg:hidden  text-center text-black font-medium mt-4">
                  Have an Account?
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                  >
                    <Link to={"/login"} className="">
                      Log in
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

export default SignUpFloat;
