import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {TextInput} from '../components';
import {Loading} from "../components";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ImgLogo } from '../assets/images';
import { useNavigate } from "react-router-dom";
import { apiRequest } from '../utils';
import { UserLogin } from '../redux/userSlice';
import { Helmet } from 'react-helmet-async';
const MobLogin = () => {
  const [errMsg, setErrMsg] = useState('')
      const [isSubmitting, setIsSubmitting] = useState(false)
      const dispatch = useDispatch()
      const navigate = useNavigate();
    const {
        register, 
        handleSubmit,
        getValues,
         formState: {errors},
      } = useForm({
        mode: "onChange"
      })
      
       
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
  return (
    <>
       <Helmet>
      <title>Login | RecipScape</title>
      <meta name="description" content="Login to RecipScape to connect with your friends and explore." />
      <meta property="og:title" content="Login | RecipScape" />
      <meta property="og:description" content="Login to RecipScape to connect with your friends and explore." />
    
    </Helmet>
  <div className='mt-24'>
        <div className="flex justify-center  ">
          <Link to={"/"}>
         <img src={ImgLogo} alt="" className='h-20 w-20' />
         </Link>
          </div>
    <div className='flex items-center justify-center pt-2 pb-3 px-8'>
        <div className="w-full max-w-md ">
   
    <form className="space-y-4  "  onSubmit={handleSubmit(onSubmit)}>
          <div>
           
            <TextInput
            name="email"
            placeholder="email@example.com"
            label="Email Address"
            type ="email"
            register = {
              register('email', {
                required: 'Email Address is required '
              })}
              labelStyles='text-base font-bold'
              styles="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              errors={errors.email ? errors.email.message : ""}
           />
           
          </div>
          <div>
          <TextInput
            name="password"
            placeholder="Password"
            label="Password"
            type ="password"
            register = {
              register('password', {
                required: 'Password is required '
              })}
              styles="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              errors={errors.password ? errors.password?.message : ""}
            />
           
          </div>
         
         {
          isSubmitting ? <Loading/> : 
          <button
            type="submit"
            className="w-full bg-secondary text-black py-2 px-4 rounded-md mt-3"
          >
            Continue
          </button>
         }
          
          {errMsg?.message && (
            <span
            className={`text-sm font-semibold text-[#f64949fe]  ${
              errMsg?.status === "failed"
              ? "text-[#f64949fe]"
              : "text-[#2ba150fe]"
            }mt-0.5`}
            >
              {errMsg?.message}
            </span>
          )
            
          }
        </form>
        <div className='flex justify-center mt-3'>
        <span className='font-medium text-base'>Don't have an account? <Link to={'/signup'}><span className='text-[#e0e0e0]'>Sign up</span></Link></span>
        </div>
        </div>
    </div>
  </div>
  </>
  )
}

export default MobLogin