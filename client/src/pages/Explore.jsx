import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { NoProfile } from "../assets/images";
import { IoMdArrowBack } from "react-icons/io";
import { search } from "../utils";

import {
  Sidebar,
  MobNav,
  Spinner,
} from "../components";
import { CreateRecp } from "../pages";

const Explore = () => {
  const { user } = useSelector((state) => state.user);
  const [showCreate, setShowCreate] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [results, setResults] = useState({ users: [], keywords: [] });
  const toggleCreate = () => {
    setShowCreate((prex) => !prex);
  };

  // Function to handle search input and fetch results dynamically
  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setResults({ users: [], keywords: [] });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await search(`/post/search?search=${term}`);
      console.log("responseddd", response.success);
      if (response.success) {
        setResults({
          users: response.data.users,
          keywords: response.data.keyword,
        });
      } else {
        setError("Failed to fetch search results.");
      }
    } catch (err) {
      setError("An error occurred while searching.");
    } finally {
      setLoading(false);
    }
  };
  const handleSuggestionClick = (suggestion) => {
    navigate(`/search?query=${suggestion}`);
  };
  return (
    <div className="w-full pr-0 pl:0 lg:pr-10 lg:pl-2 pb-10 lg:pb-0  2xl:px-40 bg-darj lg:rounded-lg h-screen overflow-hidden">
      {/* NavBar */}
      {/* <TopNavBar user={user} togglePopup={togglePopup} />
    
    <PopUp isVisible={isPopupVisible} closePopup={closePopup} /> */}
      <div className="w-full flex  lg:gap-4  md:lg:pt-4  h-full">
        <div className="hidden  lg:w-[20%] h-full md:flex flex-col   overflow-hidden">
          <Sidebar user={user} toggleCreate={toggleCreate} />
        </div>

        {/* CENTER */}
        <div className="flex-1 h-full  flex flex-col bg-white  overflow-y-auto rounded-lg">
          {/* Horizontal Slider */}
          {showCreate && <CreateRecp toggleCreate={toggleCreate} />}

          {/* Posts section */}
          <div className="">
            <>
              <div
                className={`flex flex-row mb-2 w-full  gap-7 fixed bg-transparent  shadow-lg   transition-all duration-300 ease-in-out p-4 z-50`}
              >
                <div className="">
                  {isClicked ? (
                    <IoMdArrowBack
                      onClick={() => setIsClicked(false)}
                      size={23}
                    />
                  ) : (
                    <img
                      src={user?.profileUrl ?? NoProfile}
                      alt={user?.email}
                      className="w-9 h-9 object-cover rounded-full"
                    />
                  )}
                </div>
                <div
                  onClick={() => setIsClicked(true)}
                  className="flex flex-row items-center bg-darj px-4 py-2 w-[58%] lg:w-[40%] rounded-full"
                >
                  <FaSearch size={16} className="text-[#666] " />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="text-base font-semibold w-full  outline-none bg-darj pl-1 placeholder:text-[#666]"
                  />
                </div>
              </div>

              {isClicked ? (
                <div className="bg-white h-[100vh] pt-16   ">
                  {loading && (
                    <div className="flex items-center justify-center h-20">
                      <Spinner />
                    </div>
                  )}
                  {!loading && (
                    <div className="search-dropdown bg-gray-800 text-black rounded-md mt-1 p-2 absolute z-10 w-full">
                      {/* Display matching keywords */}
                      {results.keywords.length > 0 && (
                        <div className="results-section mt-2">
                          {results.keywords.map((suggestion, index) => (
                            <div
                              key={index}
                              className="result-item flex items-center justify-between py-1 px-3 mb-1 hover:bg-gray-700 rounded-md cursor-pointer overflow-hidden"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              <div className="flex items-center">
                                <FaSearch className="mr-2 text-black" />
                                <p className="text-lg font-semibold">
                                  {suggestion}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Display matching users */}
                      {results.users.length > 0 && (
                        <div className="results-section mt-2 pt-2  border-gray">
                          {results.users.map((user, index) => (
                            <Link
                              to={`/${user?.userName}`}
                              state={user?._id}
                              key={index}
                              className="result-item flex items-center p-1 hover:bg-gray-700 rounded-md"
                            >
                              <img
                                src={user?.profileUrl ?? NoProfile}
                                alt={user?.userName}
                                className="w-8 h-8 rounded-full mr-2"
                              />
                              <div>
                                <p className="font-medium">
                                  {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-sm text-gray-400">
                                  @{user?.userName}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div></div>
              )}
              {isClicked ? (
                <div></div>
              ) : (
                <>
                  <div className="bg-hdColor p-32"></div>
                  <div className="px-4">
                    <div className="w-full bg-ivory shadow-sm rounded-lg  ">
                      <div className="flex  flex-col  text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
                        <span className="text-base text-left font-bold text-black">
                          Top Trending
                        </span>
                        {/* <span className="text-2xl font-extrabold text-secondary">
                #Popular Search
              </span> */}
                      </div>
                      {/* TRENDING */}
                      <div className="w-full flex justify-between ml-1  flex-col gap-2">
                        <div className="flex items-center mb-1 cursor-pointer  row gap-4">
                          <div className="bg-secondary bg-opacity-40 rounded-full px-4 py-2 text-secondary">
                            <span className="text-lg font-bold">#</span>
                          </div>
                          <span className="text-lg font-semibold">
                            FrenchPies
                          </span>
                        </div>
                        <div className="flex items-center mb-1  cursor-pointer row gap-4">
                          <div className="bg-secondary bg-opacity-40 rounded-full px-4 py-2 text-secondary">
                            <span className="text-lg font-bold">#</span>
                          </div>
                          <span className="text-lg font-semibold">
                            FrenchPies
                          </span>
                        </div>
                        <div className="flex items-center mb-1 cursor-pointer row gap-4">
                          <div className="bg-secondary bg-opacity-40 rounded-full px-4 py-2 text-secondary">
                            <span className="text-lg font-bold">#</span>
                          </div>
                          <span className="text-lg font-semibold">
                            FrenchPies
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="p-4 pb-3 flex flex-col space-y-4">
                {isClicked ? (
                  <div></div>
                ) : (
                  <div className="fixed bottom-[140px] right-6 lg:hidden">
                    <Link to={"/create-recp"} className="">
                      <div className="text-black font-medium text-lg bg-secondary p-3 md:py-2 w-15 h-15 object-cover rounded-full">
                        <IoIosCreate size={36} />
                      </div>
                    </Link>
                  </div>
                )}

                {/* FOR THE Trending  */}
              </div>
            </>
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

export default Explore;
