import React, { useState } from "react";
import { followAction, unfollowAction } from "../utils";

const FollowButton = ({ user, followingUser }) => {
  const [hover, setHover] = useState(false);
  const [action, setAction] = useState(true);
  const handleFollowAction = async (id) => {
     await followAction(user?.token, id);
    setAction(false);
  };
  const handleUnfollowAction = async (id) => {
     await unfollowAction(user?.token, id);
    setAction(false);
  };

  return (
    <>
      {user.following?.includes(followingUser?._id) || action ? (
        <button
          onClick={() => handleUnfollowAction(followingUser?._id)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`bg-secondary ${
            hover ? "text-[white]" : "text-black"
          } font-bold text-lg px-4 py-2 rounded-md`}
        >
          {hover ? "Unfollow" : "Following"}
        </button>
      ) : (
        <button
          className="bg-secondary text-black font-bold text-lg px-4 py-2 rounded-md"
          onClick={() => handleFollowAction(followingUser?._id)}
        >
          Follow
        </button>
      )}
    </>
  );
};

export default FollowButton;
