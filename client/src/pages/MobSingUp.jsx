import React, {useState} from 'react'
import { useRef } from 'react';
import {useForm} from 'react-hook-form'
import {TextInput} from '../components';
import {Loading} from "../components";
import { useDispatch } from 'react-redux';
import { ImgLogo } from '../assets/images';
import { useNavigate } from "react-router-dom";
import { apiRequest } from '../utils';
import { UserLogin } from '../redux/userSlice';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const MobSingUp = () => {
  const [errMsg, setErrMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();
    const {
        register, 
        handleSubmit,
         formState: { errors },
      } = useForm({
        mode: "onChange"
      })
      console.log('errorfromsignup', errors)
      
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
            isSubmitting(false)
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
      <>
       <Helmet>
      <title>Sign Up | RecipScape</title>
      <meta name="description" content="Sign up for RecipScape to create an account and start sharing moments." />
      <meta property="og:title" content="Sign Up | RecipScape" />
      <meta property="og:description" content="Sign up for RecipScape to create an account and start sharing moments." />
    
    </Helmet>
  <div className='mt-9'>
    <div className="flex justify-center  ">
      <Link to={"/"}>
         <img src={ImgLogo} alt="" className='h-20 w-20' />
         </Link>
          </div>
    <div className='flex items-center justify-center pt-3 pb-3 px-8'>
    
        <div className="w-full max-w-md ">
   
    <form className="space-y-4  " onSubmit={handleSubmit(onSubmit)}>
    <div>
          <TextInput
       
            name="firstName"
            placeholder="First Name"
            label="First Name"
            type ="text"
           styles="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
           register={register('firstName', {
            required: 'First Name is required!'
          })}
           errors={errors.firstName ? errors.firstName.message : ""}
           />
          </div>
          <div>
          <TextInput
            name="lastname"
            placeholder="Last Name"
            label="Last Name"
            type ="text"
            register = {
              register('lastName', {
                required: 'Last Name is required '
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
            className={`text-sm ${
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
        <span className='font-medium text-base'>Have an account? <Link to={'/login'}><span className='text-[#253ece]'>Login</span></Link></span>
        </div>
        </div>
    </div>
  </div>
  </>
  )
}

export default MobSingUp