import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { Logout } from "../redux/userSlice";
import { recps } from "../assets/data";
import { NoProfile } from "../assets/images";
import { IoIosCreate } from "react-icons/io";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineRefresh } from "react-icons/md";
import { useDispatch } from "react-redux";
import { ImgLogo } from "../assets/images";
import { IoPersonSharp } from "react-icons/io5";
import {
  Sidebar,
  TopNavBar,
  CategorySlider,
  PostCard,
  Loading,
  PopUp,
  ErrorComponent,
  MobNav,
} from "../components";
import { Helmet } from "react-helmet-async";
import { CreateRecp } from "../pages";
import { apiRequest, fetchRecps, likeRecp } from "../utils";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { recps } = useSelector((state) => state.recps);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [error, setError] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };
  const toggleCreate = () => {
    setShowCreate((prex) => !prex);
  };
  const handleRefresh = () => {
    // window.location.reload();
    setRefreshKey((prevKey) => prevKey + 1); // Increment to trigger useEffect
  };

  const fetchRecp = async () => {
    try {
      const res = await fetchRecps(user?.token, dispatch);
      // Ensure that you're correctly checking the response structure
      if (res?.success === true) {
        setLoading(false);
        setError(null);
      } else {
        setError("Something went wrong Refresh");
      }
    } catch (error) {
      setError("Error fetching data. Refresh");
    } finally {
      // Ensure loading is set to false whether successful or failed
      setLoading(false);
    }
  };
  const handleLikeRecp = async (uri) => {
    await likeRecp({ url: uri, token: user?.token });

    await fetchRecp();
  };

  //   console.log(user)
  // useEffect(() => {
  //   dispatch(Logout(user));
  //   navigate('/');

  // }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (!recps || recps.length === 0) {
      setLoading(true); // Set loading only if data isn't already available
    }
    fetchRecp();
  }, [refreshKey]);

  if (error) {
    return <ErrorComponent error={error} handleRefresh={handleRefresh} />;
  }
  return (
    <>
       <title>Home | RecipScape</title>
      <meta name="description" content="Welcome to RecipScape where food enthusiat connect with friends and like minds." />
      <meta property="og:title" content="Home | Your Social Media Project" />
      <meta property="og:description" content="Connect and share moments." />
    <div className="w-full pr-0 pl:0 lg:pr-10 lg:pl-2 pb-10 lg:pb-0  2xl:px-40 bg-darj lg:rounded-lg h-screen overflow-hidden">
      {/* NavBar */}
      {/* <TopNavBar user={user} togglePopup={togglePopup} /> */}

      <div className="relative lg:hidden">
        {/* Button to toggle the sidebar */}
        {/* <button
        onClick={toggleSidebar}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Toggle Sidebar
      </button> */}

        {/* Sidebar for Mobile */}
        <div
          ref={sidebarRef}
          className={`fixed inset-y-0 left-0 w-64 bg-black text-white transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4">
            <div>
              <img
                src={user?.profileUrl ?? NoProfile}
                alt={user?.firstName}
                // {user?.email}
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>
            <div className="text-lg font-bold">
              {" "}
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-base font-semibold">@{user?.userName}</div>
            <div className="mt-6 space-y-4 flex flex-col gap-8">
              <Link
                to={`/profile`}
                // state={user?._id}
                // Prevent sidebar from closing
              >
                <div className="flex flex-row gap-4 items-center">
                  <IoPersonSharp size={23} />
                  <p className="text-lg font-bold">Profile</p>
                </div>
              </Link>
              <Link to={"/bookmarks"}>
                <div className="flex flex-row gap-4 items-center">
                  <FaBookmark size={23} />
                  <p className="text-lg font-bold">Bookmarks</p>
                </div>
              </Link>

              <div
                className="flex flex-row gap-4 items-center text-secondary"
                onClick={() => dispatch(Logout())}
              >
                <HiOutlineLogout size={33} />
                <p className="text-lg font-bold">LogOut</p>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay to darken the screen when sidebar is open */}
        {isOpen && (
          <div
            className=" top-[0px] right-[0px] bottom-[0px] left-[50%] bg-black opacity-50 fixed "
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>
      <PopUp isVisible={isPopupVisible} closePopup={closePopup} />
      <div className="w-full flex  lg:gap-4  md:lg:pt-4  h-full">
        <div className="hidden  lg:w-[20%] h-full md:flex flex-col   overflow-hidden">
          <Sidebar user={user} toggleCreate={toggleCreate} />
        </div>

        {/* CENTER */}
        <div className="flex-1 h-full lg:md:px-4 flex flex-col bg-white  overflow-y-auto rounded-lg">
          {/* Horizontal Slider */}
          {showCreate && <CreateRecp toggleCreate={toggleCreate} />}

          {/* Posts section */}
          <div className="">
            {/* // This loading component won't run cause we are setting it at false when fetching the recps */}
            {loading ? (
              <div className="w-full  h-screen overflow-hidden ">
                <Loading />
              </div>
            ) : recps?.length > 0 ? (
              <>
                <div className=" pt-1 pb-0 bg-[#F2F0EF] border-b  border-gray lg:hidden">
                  <div className="px-3 py-3 rounded-lg shadow-lg">
                    <div className="flex flex-row justify-between">
                      <img
                        src={user?.profileUrl ?? NoProfile}
                        alt={user?.email}
                        className="w-9 h-9 object-cover rounded-full"
                        onClick={toggleSidebar}
                      />
                      <img
                        src={ImgLogo}
                        alt="recipscape-logo"
                        className="h-10 w-10"
                      />
                      {/* Button has no function just for the css */}
                      <button className="text-[#F2F0EF]">iii</button>
                    </div>
                  </div>
                </div>

                <div className="px-3 pb-3 flex flex-col space-y-4">
                  <div className="fixed bottom-[140px] right-6 lg:hidden">
                    <Link to={"/createrecp"} className="">
                      <div className="text-black font-medium text-lg bg-secondary p-3 md:py-2 w-15 h-15 object-cover rounded-full">
                        <IoIosCreate size={36} />
                      </div>
                    </Link>
                  </div>

                  {recps?.map((recp) => (
                    <PostCard
                      key={recp?._id}
                      recp={recp}
                      user={user}
                      likeRecp={handleLikeRecp}
                    />
                  ))}
                </div>
              </>
            ) : (
              // Decided to use the loading component here instead
              <div className="w-full  h-screen overflow-hidden ">
                <Loading />
              </div>
            )}
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
    </>
  );
};

export default Home;
