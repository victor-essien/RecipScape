import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoMdArrowBack } from "react-icons/io";
import {  viewBookmarks } from "../utils";
import {
  Sidebar,
  PostCard,
  Spinner,
  MobNav,

} from "../components";

const Bookmark = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [spinLoad, setSpinLoad] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will navigate to the previous URL
  };
  const getBookmarks = async () => {
    const res = await viewBookmarks(user?.token);
    setBookmarks(res.bookmarks);
    setSpinLoad(false);
  };
  useEffect(() => {
    setSpinLoad(true);
    getBookmarks();
  }, []);

  return (
    <div
      id="scrollable-div"
      className="w-full pr-0 pl:0 lg:pr-10 lg:pl-2 pb-7 lg:pb-0 min-h-screen overflow-y-scroll 2xl:px-40 bg-darj lg:rounded-lg "
    >
      <div className="w-full flex  lg:gap-4  md:lg:pt-4 min-h-screen ">
        <div className="hidden  lg:w-[20%] h-full md:flex flex-col   overflow-hidden">
          <Sidebar user={user} />
        </div>

        {/* CENTER */}
        {/* {spinLoad ? (
        <div className="w-full  h-screen overflow-hidden ">
          <Spinner />
        </div>
      ) : userInfo ? (
        <div></div>
      ) : (
        <p>....</p>
      )} */}
        <div className="flex-1 h-full lg:md:px-4 flex flex-col  overflow-y-auto rounded-lg">
          {/* Horizontal Slider */}
          <div className="lg:p-0 pb-3 flex flex-col space-y-4">
            <div className=" overflow-y-auto  w-full pr-0 pl:0 bg-white">
              <div className="flex items-start pl-2 py-2" onClick={goBack}>
                <IoMdArrowBack size={24} />
              </div>
              <div className="">
                {spinLoad ? (
                  <div className="flex items-center justify-center h-screen w-full">
                    {/* Spinner centered */}
                    <Spinner />
                  </div>
                ) : bookmarks?.length > 0 ? (
                  bookmarks?.map((recp) => (
                    <PostCard
                      key={recp?._id}
                      recp={recp}
                      user={user}
                      deleteRecp={() => {}}
                      likeRecp={() => {}}
                    />
                  ))
                ) : (
                  <div className="flex w-full h-screen items-center justify-center">
                    <p className="text-lg text-ascent-2">No Bookmarks</p>
                  </div>
                )}
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
  );
};

export default Bookmark;
