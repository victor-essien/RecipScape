import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "../components";
import { search, likeRecp } from "../utils";
import {
  Sidebar,
  TopNavBar,
  CategorySlider,
  PostCard,
  Loading,
  PopUp,
  MobNav,
} from "../components";
import { CreateRecp } from "../pages";
import { IoMdArrowBack } from "react-icons/io";
const Search = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [posts, setPosts] = useState({});
  const query = new URLSearchParams(location.search).get("query");
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // This will navigate to the previous URL
  };
  const handleQueryResults = async () => {
    try {
      const response = await search(`/post/search?search=${query}`);
      if (response.success) {
        setPosts(response.data.postWithKeywords);
      } else {
        setError("Failed to fetch search results.");
      }
    } catch (err) {
      setError("An error occurred while searching.");
    } finally {
      setLoading(false);
    }
  };

  console.log("postfromsearch", posts);
  const toggleCreate = () => {
    setShowCreate((prex) => !prex);
  };
  const handleLikeRecp = async (uri) => {
    await likeRecp({ url: uri, token: user?.token });

    await handleQueryResults();
  };
  useEffect(() => {
    setLoading(true);
    handleQueryResults();
  }, [query]);
  return (
    <div className="w-full pr-0 pl:0 lg:pr-10 lg:pl-2  lg:pb-0  2xl:px-40 bg-darj lg:rounded-lg h-screen overflow-hidden">
      {/* NavBar */}
      {/* <TopNavBar user={user} togglePopup={togglePopup} />
      
      <PopUp isVisible={isPopupVisible} closePopup={closePopup} /> */}
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
            {loading ? (
              <div className="flex items-center justify-center h-20">
                <Spinner />
              </div>
            ) : posts?.length > 0 ? (
              <>
                <div className="p-2 pb-3 flex flex-col space-y-4">
                  <div className="flex items-start pl-2 py-2" onClick={goBack}>
                    <IoMdArrowBack size={24} />
                  </div>
                  {/* <div className="fixed bottom-[140px] right-6 lg:hidden">
          <Link to={"/create-recp"} className="">
            <div className="text-black font-medium text-lg bg-secondary p-3 md:py-2 w-15 h-15 object-cover rounded-full">
              <IoIosCreate size={36} />
            </div>
          </Link>
        </div> */}
                  {/* Our PostCard would've used the component but made major changes */}
                  {posts?.map((recp) => (
                    <PostCard
                      key={recp?._id}
                      recp={recp}
                      user={user}
                      deleteRecp={() => {}}
                      likeRecp={handleLikeRecp}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-black">No Recp Available</p>
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
  );
};

export default Search;
