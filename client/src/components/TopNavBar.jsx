import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MobNav,  TextInput } from "../components";
import { ImgLogo } from "../assets/images";



import { Link } from "react-router-dom";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { NoProfile } from "../assets/images";
const TopNavBar = ({ user, togglePopup }) => {

  const [searchboxOpen, setSearchboxOpen] = useState(false);

  const displayName = user?.userName || user?.email.split('@')[0];
  const openSearchbox = () => {
    setSearchboxOpen(true)
  }

  const closeSearchbox = () => {
    setSearchboxOpen(false)
  }
  return (
    <div className="">
         <div className="md:hidden lg:hidden ">
          <MobNav />
         </div>
      <div className="lg:py-2 md:py-2  lg:mt-4  pr-5   md:px-4 lg:px-4 ">
        <div className="lg:sticky md:sticky z-20 lg:top-0 px-2 mb-0 lg:py-4 bg-white  lg:white  md:topbar smtopbar  w-full lg:flex md:flex md:items-center lg:items-center lg:justify-evenly md:justify-evenly ">
          {/* Smaller Screens */}
      

        
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded text-white">
              <img
                src={ImgLogo}
                alt=""
                className="h-14 hidden lg:block md:block w-14"
              />
            </div>
          </Link>

          <form
            className="hidden md:flex items-center justify-center"
            // onSubmit={handleSubmit(handleSearch)}
          >
            <TextInput
              placeholder="Search..."
              styles="w-[18rem] lg:w-[43rem] bg-darj rounded-1-full border-none  py-4 px-2 text-black "
              // register={register("search")}
            />
            <button className="bg-black text-white px-6 py-4 mt-2 rounded-r-full">
              Search
            </button>
          </form>
          {/* IcONS */}
          <div className="lg:flex md:flex hidden gap-4 items-center text-black text-md md:text-xl">
          <Link to={`/${displayName}`}>
            <div className="p-2 rounded-lg text-white ">
              <img
                src={user?.profileUrl ?? NoProfile}
                alt={user?.email}
                className="h-9 w-9"
              />
            </div>
            </Link>
            <div className="hidden lg:flex md:flex gap-4">
              <div className="cursor-pointer">
                <IoMdNotificationsOutline size={28} />
              </div>
              <button onClick={togglePopup} className="cursor-pointer">
                {" "}
                <IoIosArrowDropdownCircle size={28} />
              </button>
            </div>
            {/* <div>
            <CustomButton
              onClick={() => dispatch(Logout())}
              title="Log Out"
              containerStyles="text-sm text-ascent-q px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
            />
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
