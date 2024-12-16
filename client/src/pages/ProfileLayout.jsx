import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { NoProfile } from "../assets/images";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { fetchRecps, fetchUserRecp, getUserInfo } from "../utils";
import { MdDateRange } from "react-icons/md";
import { Sidebar, Loading, PostCard, Spinner, MobNav } from "../components";




const ProfileLayout = () => {
    const { user } = useSelector((state) => state.user);
      const { recps } = useSelector((state) => state.recps);
      const displayName = user?.userName || user?.email.split("@")[0];
      const [userInfo, setUserInfo] = useState({});
      const [hanldeClick, setHandleClick] = useState(false);
      const [isScrolled, setIsScrolled] = useState(false);
      const [loading, setLoading] = useState(false);
      const [spinLoad, setSpinLoad] = useState(false);
      const navigate = useNavigate()
      
      const goBack = () => {
        navigate(-1); // This will navigate to the previous URL
      };
  return (
    <div
    id="scrollable-div"
    className="w-full pr-0 pl:0 lg:pr-10 lg:pl-2 pb-4 lg:pb-0 min-h-screen overflow-y-scroll 2xl:px-40 bg-darj lg:rounded-lg "
  >
    <div className="w-full flex  lg:gap-4  md:lg:pt-4 min-h-screen ">
      <div className="hidden  lg:w-[20%] h-full md:flex flex-col   overflow-hidden">
        <Sidebar user={user} />
      </div>

      {/* CENTER */}
      {loading ? (
        <div className="w-full  h-screen overflow-hidden ">
          <Loading />
        </div>
      ) : userInfo ? (
        <div></div>
      ) : (
        <p>....</p>
      )}
      <div className="flex-1 h-full lg:md:px-4 flex flex-col bg-darj  overflow-y-auto rounded-lg">
        {/* Horizontal Slider */}

        <div className=" lg:p-0  pb-3 flex flex-col space-y-4">
          <div className="h-screen overflow-y-auto w-full pr-0 pl:0">
            {/* <div className="md:hidden lg:hidden ">
              <MobNav />
            </div> */}
            <div></div>
            <div className="w-full flex  lg:gap-4 h-full bg-white  ">
              <div className="  md:pb-2 pb-5  lg:pb-2 mb-2  shadow bg-white rounded-lg flex-1">
                <div
                  className={`flex flex-row mb-2 w-full gap-5 fixed  ${
                    isScrolled
                      ? "bg-[#7393B3]  shadow-lg" // When scrolled, dark background and shadow
                      : "bg-transparent"
                  } transition-all duration-300 ease-in-out p-4 z-50`}
                >
                  <button onClick={goBack}>
                      <IoMdArrowBack size={21} className="" />
                    </button>
                  <div className="flex flex-col ">
                    <p className="text-xl font-bold text-dark">
                      {user?.firstName} {user.lastName}
                    </p>
                    <p className="text-xl font-bold text-gray">
                    @{user?.userName}
                    </p>
                  </div>
                </div>
                <div className=" p-12"></div>
                {/* Navigation Tabs */}
                <div className="px-4">
                <div className="flex space-x-4 border-b-2 gap-32 border-gray-700 pb-2">
                  <Link
                    to="followers"
                    className="text-gray text-2xl font-bold hover:text-secondary"
                  >
                    Followers
                  </Link>
                  <Link
                    to="following"
                    className="text-gray text-2xl font-bold hover:text-secondary"
                  >
                    Following
                  </Link>
                </div>

                {/* Content will be rendered here depending on the route */}
                <div className="mt-4">
                  <Outlet />
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
        <div className="w-full bg-ivory shadow-sm rounded-lg px-6 py-5">
          <div className="flex  flex-col  text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
            <span className="text-base text-left font-bold text-black">
              Top Trending
            </span>
            <span className="text-2xl font-extrabold text-secondary">
              #Popular Search
            </span>
          </div>
          <div className="w-full flex justify-between ml-5  flex-col gap-2">
            <div className="flex items-center mb-1 cursor-pointer  row gap-4">
              <div className="bg-secondary bg-opacity-40 rounded-full px-4 py-2 text-secondary">
                <span className="text-lg font-bold">#</span>
              </div>
              <span className="text-lg font-semibold">FrenchPies</span>
            </div>
            <div className="flex items-center mb-1  cursor-pointer row gap-4">
              <div className="bg-secondary bg-opacity-40 rounded-full px-4 py-2 text-secondary">
                <span className="text-lg font-bold">#</span>
              </div>
              <span className="text-lg font-semibold">FrenchPies</span>
            </div>
            <div className="flex items-center mb-1 cursor-pointer row gap-4">
              <div className="bg-secondary bg-opacity-40 rounded-full px-4 py-2 text-secondary">
                <span className="text-lg font-bold">#</span>
              </div>
              <span className="text-lg font-semibold">FrenchPies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <MobNav />
    </div>
  </div>
  )
}


// const ProfileLayout = () => {
//  
 
//  return (

//  )
// };

// const ProfilecLayout = () => {
//   return (
//     <div className="w-full max-w-lg mx-auto bg-gray-900 text-black p-4">
//       {/* User Header Section */}
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <h1 className="text-xl font-bold">Victor Essien</h1>
//           <p>@victor_codes</p>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="flex space-x-4 border-b-2 border-gray-700 pb-2">
//         <Link to="followers" className="text-gray-400 hover:text-secondary">
//           Followers
//         </Link>
//         <Link to="following" className="text-gray-400 hover:text-secondary">
//           Following
//         </Link>
//       </div>

//       {/* Content will be rendered here depending on the route */}
//       <div className="mt-4">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

export default ProfileLayout;
