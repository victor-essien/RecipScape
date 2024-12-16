import React from "react";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { NoProfile } from "../assets/images";
import { FaBookmark, FaSearch } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Logout } from "../redux/userSlice";
import {  HiOutlineLogout } from "react-icons/hi";

const Sidebar = ({ user, toggleCreate }) => {
  const dispatch = useDispatch()
  // const displayName = user?.userName || user?.email.split("@")[0];
  return (
    <div className="bg-black h-screen flex flex-col justify-between py-4 px-6 text-white">
      {/* Top Section */}
      <div className="space-y-6">
        {/* Logo */}
        <div className="text-3xl font-bold text-white pb-6"></div>

        {/* Menu Items */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-4 hover:text-secondary">
            <MdHome size={24} />
            <p className="text-lg">Home</p>
          </Link>
          <Link
            to="/explore"
            className="flex items-center gap-4 hover:text-secondary"
          >
            <FaSearch size={24} />
            <p className="text-lg">Explore</p>
          </Link>
              
          {/* You can decide to take this project further by using chatGpt api or anyother api to genetate recipes when prommpted
          <Link
            to="/recipe-generator"
            className="flex items-center gap-4 hover:text-secondary"
          >
            <RiRobot3Fill size={24} />
            <p className="text-lg">Bot</p>
          </Link> */}

          <Link
            to="/profile"
            className="flex items-center gap-4 hover:text-secondary"
          >
            <BsFillPersonFill size={24} />
            <p className="text-lg">Profile</p>
          </Link>
          <Link
            to="/bookmarks"
            className="flex items-center gap-4 hover:text-secondary"
          >
            <FaBookmark size={24} />
            <p className="text-lg">Bookmarks</p>
          </Link>
          <div
                className="flex flex-row gap-4 items-center cursor-pointer text-secondary"
                onClick={() => dispatch(Logout())}
              >
                <HiOutlineLogout size={33} />
                <p className="text-lg font-bold">LogOut</p>
              </div>
        </div>
      </div>

      {/* Post Button */}
      <div className="flex justify-center">
        <button
          className="bg-secondary text-lg font-semibold py-2 px-11 rounded-lg text-black "
          onClick={toggleCreate}
        >
          Create Post
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-4">
        <img
          src={user.profileUrl ?? NoProfile}
          alt="profile"
          className="w-10 h-10 object-cover rounded-full"
        />
        <div className="flex flex-col">
          <p className="font-bold">{`${user.firstName} ${user.lastName}`}</p>
          <p className="text-sm text-gray-400">@{user.userName}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
