import React, { useState, useEffect } from "react";
import { fetchFollowers } from "../utils";
import { useSelector } from "react-redux";
import { NoProfile } from "../assets/images";
import { Spinner, FollowButton } from "../components";
import { Link } from "react-router-dom";

const Followers = () => {
  const [followers, setFollowers] = useState([]);
  const [spinLoad, setSpinLoad] = useState(false);
  const { user } = useSelector((state) => state.user);
  const getFollowers = async () => {
    const res = await fetchFollowers(user?.token);
    setFollowers(res?.followersData.followers);
    setSpinLoad(false);
  };

  useEffect(() => {
    setSpinLoad(true);
    getFollowers(); // Fetch user posts only when userId is available
  }, []);
  return (
    <div className="flex flex-col items-center">
      {/* Following list logic */}
      <div className="space-y-4 w-full">
        {/* Spinner when loading */}
        {spinLoad ? (
          <div className="flex items-center justify-center h-20">
            <Spinner />
          </div>
        ) : followers?.length > 0 ? (
          followers?.map((followingUser) => (
            <div
              key={followingUser?._id}
              className="flex items-center justify-between space-x-4 px-4 py-2 "
            >
              <Link
                to={`/${followingUser?.userName}`}
                state={followingUser?._id}
              >
                <img
                  src={followingUser?.profileUrl ?? NoProfile}
                  alt={followingUser?.firstName}
                  className="w-12 h-12 object-cover rounded-full"
                />
              </Link>
              <Link to={`/${followingUser?.userName}`} className="flex-grow">
                <div>
                  <p className="font-bold text-lg">
                    {followingUser?.firstName} {followingUser?.lastName}
                  </p>
                  <p className="text-gray-500">@{followingUser?.userName}</p>
                </div>
              </Link>
              <FollowButton user={user} followingUser={followingUser} />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-lg text-gray font-bold"> No Follower</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Followers;
