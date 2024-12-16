import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NoProfile } from "../assets/images";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineRefresh } from "react-icons/md";
import { fetchRecps, fetchUserRecp, getUserInfo } from "../utils";
import { MdDateRange } from "react-icons/md";
import { UpdateProfile } from "../redux/userSlice";

import {
  Sidebar,
  Loading,
  PostCard,
  Spinner,
  MobNav,
  FollowButton,
  EditProfile,
} from "../components";

const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { user, edit } = useSelector((state) => state.user);
  const { recps } = useSelector((state) => state.recps);
  const displayName = user?.userName || user?.email.split("@")[0];
  const [spinLoad, setSpinLoad] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [userInfo, setUserInfo] = useState({});
  const userrname = user.userName;
  const navigate = useNavigate();
  const location = useLocation();
  const profileId = location.state;

  const goBack = () => {
    navigate(-1); // This will navigate to the previous URL
  };

  // useEffect(() => {
  //   console.log('SCROLLED');
  //   const handleScroll = () => {

  //     if (window.scrollY > 50) {
  //       console.log('SCROLLED');
  //       setIsScrolled(true);
  //     } else {
  //       console.log('NOT SCROLLED');
  //       setIsScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   // Cleanup listener on unmount
  //   return () => window.removeEventListener("scroll", handleScroll);
  // },[] );

  useEffect(() => {
    const scrollContainer = document.getElementById("scrollable-div");
    console.log(scrollContainer);
    const handleScroll = () => {
      if (scrollContainer.scrollTop > 20) {
        console.log("SCROLLED");
        setIsScrolled(true);
      } else {
        console.log("NOT SCROLLED");
        setIsScrolled(false);
      }
    };

    // Attach scroll listener to the div
    scrollContainer.addEventListener("scroll", handleScroll);

    // Cleanup listener on unmount
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const getUserPosts = async () => {
    const uri = "/post/get-user-post/" + user?._id;
    await fetchRecps(user?.token, dispatch, uri);
    setSpinLoad(false);
  };
  // const userPost = async () => {
  //   try {
  //     const res = await fetchUserRecp(user?.token, userInfo?._id )
  //     console.log('userpostre', res)
  //     if(res?.success){
  //       setPost(res?.data)
  //       setSpinLoad(false)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleRefresh = () => {
    // window.location.reload();
    setRefreshKey((prevKey) => prevKey + 1); // Increment to trigger useEffect
  };

  useEffect(() => {
    setSpinLoad(true);
    getUserPosts(); // Fetch user posts only when userId is available
  }, [refreshKey]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Get the month and year
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${month} ${year}`;
  };
  const createdAt = user?.createdAt;
  const formattedDate = formatDate(createdAt);

  const isFollowing = user.following.includes(userInfo.id);

  if (error) {
    return (
      <div className="w-full pr-0 pl:0 lg:pr-10 lg:pl-2 pb-10 lg:pb-0  2xl:px-40 bg-darj lg:rounded-lg h-screen overflow-hidden">
        <div className="flex text-gray font-bold text-xl w-full h-full items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            {" "}
            {/* Added items-center and space-y-4 for spacing */}
            <p>{error}</p> {/* Error text */}
            {/* Button will no longer be affected by flex of the parent */}
            <button
              onClick={() => handleRefresh()}
              className="bg-secondary text-black px-4 py-2 rounded-2xl flex items-center justify-center space-x-2"
            >
              {/* Icon and text side by side */}
              <MdOutlineRefresh size={30} className="font-" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        id="scrollable-div"
        className="w-full pr-0 pl:0 lg:pr-10 lg:pl-2 pb-4 lg:pb-0 min-h-screen overflow-y-scroll 2xl:px-40 bg-darj lg:rounded-lg "
      >
        <div className="w-full flex  lg:gap-4  md:lg:pt-4 min-h-screen ">
          <div className="hidden  lg:w-[20%] h-full md:flex flex-col   overflow-hidden">
            <Sidebar user={user} />
          </div>

          {/* CENTER */}

          <div className="flex-1 h-full lg:md:px-4 flex flex-col bg-darj  overflow-y-auto rounded-lg">
            {/* Horizontal Slider */}

            <div className=" lg:p-0  pb-3 flex flex-col space-y-4">
              <div className="h-screen overflow-y-auto w-full pr-0 pl:0 bg-white">
                {/* <div className="md:hidden lg:hidden ">
              <MobNav />
            </div> */}
                <div></div>
                <div className="w-full flex  lg:gap-4  ">
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
                        <p className="text-lg text-[#7393B3] font-bold">
                          {" "}
                          {recps?.length} posts
                        </p>
                      </div>
                    </div>
                    <div className="bg-hdColor p-32"></div>
                    <div className="px-4">
                      <div className="flex flex-row justify-between  relative bottom-8 ">
                        <div>
                          <img
                            src={user?.profileUrl ?? NoProfile}
                            alt={user?.email}
                            className="w-24 h-24 object-cover rounded-full"
                          />
                        </div>
                        <div className="">
                          <div className="mt-10">
                            <button
                              onClick={() => dispatch(UpdateProfile(true))}
                            >
                              Edit Profile
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className=" relative bottom-7 lg:bottom-1">
                        <div className="flex flex-col">
                          <p className="text-xl font-bold text-dark">
                            {user?.firstName} {user.lastName}
                          </p>
                          <p className="text-gray">@{user?.userName}</p>
                        </div>
                        <p>{user.proffession}</p>
                        <div className="flex flex-row gap-1 items-center text-sm">
                          <div>
                            <MdDateRange />
                          </div>

                          <span> Joined {formattedDate}</span>
                        </div>
                        <div className="flex flex-row gap-3">
                          <p>
                            <Link to="/following">
                              {userInfo?.following?.length}{" "}
                              <span className="text-gray">Following</span>
                            </Link>
                          </p>
                          <p>
                            <Link to="/followers">
                              {userInfo?.followers?.length}{" "}
                              <span className="text-gray">Followers</span>
                            </Link>
                          </p>
                        </div>
                        <div>
                          <div className="flex flex-row gap-72 mt-5 text-base font-semibold border-b pb-3 border-gray ">
                            <p className="cursor-pointer">Posts</p>
                            <p className="cursor-pointer"> Likes</p>
                          </div>

                          <div>
                            {spinLoad ? (
                              <div className="w-full mt-8  h-screen overflow-hidden ">
                                <Spinner />
                              </div>
                            ) : recps?.length > 0 ? (
                              recps?.map((recp) => (
                                <PostCard
                                  key={recp?._id}
                                  recp={recp}
                                  user={user}
                                  deleteRecp={() => {}}
                                  likeRecp={() => {}}
                                />
                              ))
                            ) : (
                              <div className="flex w-full h-full items-center justify-center">
                                <p className="text-lg text-ascent-2">
                                  No Post Available
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
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
      {edit && <EditProfile />}
    </>
  );
};

export default UserProfile;
