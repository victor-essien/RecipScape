import React from "react";
import { MdHome } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { NoProfile } from "../assets/images";

import { RiRobot3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";


const MobNav = () => {
  const { user } = useSelector((state) => state.user);

  //  const displayName = user?.userName || user?.email.split('@')[0];

  return (
    <div className="lg:hidden md:hidden z-20 lg:top-0 px-2 mb-0 lg:py-4 bg-black    md:topbar smtopbar  w-full   md:items-center lg:items-center lg:justify-evenly md:justify-evenly ">
      <div className=" lg:hidden md:hidden px-8 py-2.5  rounded-2xl ">
        <div className="flex flex-row items-center justify-between">
          <Link to={"/"}>
            <MdHome size={27} className="text-white" />
          </Link>
          <Link to={"/explore"}>
            <FaSearch size={24} className="text-white" />
          </Link>

          <Link to={"/recipe-generator"}>
            <RiRobot3Fill size={27} className="text-white" />
          </Link>
         
          <Link to={`/${user?.userName}`} state={user?._id} className="">
            <div className="">
              <img
                src={user?.profileUrl ?? NoProfile}
                alt={user?.email}
                className="w-9 h-9 object-cover rounded-full"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobNav;
