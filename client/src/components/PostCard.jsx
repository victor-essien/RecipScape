import React, { useState } from "react";
import { BiComment,} from "react-icons/bi";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { NoProfile,  } from "../assets/images";
import { useDispatch } from "react-redux";
import { UserLogin } from "../redux/userSlice";
import { Link } from "react-router-dom";
import moment from "moment";
import { RenderImages } from "../components";
import { createBookmark, getUserInfo } from "../utils";

const PostCard = ({ recp, user, deleteRecp, likeRecp }) => {

  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(false);
  const charLimit = 200; // Set your character limit

  // Truncate the content if it exceeds the character limit
  const truncatedContent =
    recp?.content?.length > charLimit
      ? recp?.content.slice(0, charLimit)
      : recp?.content;
  const [showComments, setShowComments] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  // Images

  // const handleLike = async (uri) => {
  //   await likeRecp(uri);
  // };
  const handleLike = async (uri) => {
    try {
      setIsLiking(true); // Set loading state
      await likeRecp(uri); // Wait for backend response
    } finally {
      setIsLiking(false); // Reset loading state
    }
  };
  const getUser = async () => {
    const res = await getUserInfo({ token: user?.token });

    const newData = { token: user?.token, ...res };

    dispatch(UserLogin(newData));
  };
  const handleBookmark = async (pid, token) => {
    await createBookmark({ pid, token });
    await getUser();
    
  };

  return (
    <div className="px-4 pt-4 md:pb-2 pb-5 lg:pb-2  bg-white shadow rounded-lg">
      <Link to={`/recp/${recp.userId?.userName}/${recp?._id}`}>
        <div className="flex items-center space-x-4 mb-4">
          <Link to={`/${recp?.userId?.userName}`} state={recp?.userId._id}>
            <img
              src={recp?.userId?.profileUrl ?? NoProfile}
              alt={recp?.userId?.firstName}
              // {user?.email}
              className="w-12 h-12 object-cover rounded-full"
            />
          </Link>
          <Link to={`/${recp?.userId?.userName}`}>
            <div>
              <div className="font-bold">
                {recp?.userId?.firstName} {recp?.userId?.lastName}
              </div>
              <div className="text-black flex flex-row gap-3">
                @{recp?.userId?.userName}{" "}
                <span className="text-black text-base">
                  {moment(recp?.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="mb-4">
          <div
            className="post-content"
            dangerouslySetInnerHTML={{
              __html: isExpanded ? recp?.content : truncatedContent,
            }}
          />
        </div>

        <div>
          <div>
            {recp?.content?.length > charLimit && !isExpanded && (
              <Link
                to={`recp/${recp.userId?.userName}/${recp?._id}`}
                onClick={() => setIsExpanded(true)}
              >
                <span className="font-semibold text-base ">See More</span>
              </Link>
            )}
          </div>
        </div>
      </Link>
      {/* Images */}
      <div className="mt-4">
        <RenderImages recp={recp} />
      </div>

      <div
        className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-2
      text-base border-t border-[#66666645]"
      >
        <p
          className="flex gap-2 items-center text-black font-medium text-base cursor-pointer"
          onClick={() => handleLike("/post/like/" + recp?._id)}

          // handleLike("/posts/like/" + post?._id)
        >
          {recp?.likes?.includes(user?._id) || isLiking ? (
        <FaHeart size={17} color={isLiking ? "lightcoral" : "red"} />
      ) : (
            <CiHeart size={17} />
          )}
          {recp?.likes?.length} Likes
        </p>
        <p
          className="flex gap-2 items-center text-black font-medium text-base cursor-pointer"
          onClick={() => handleBookmark(recp?._id, user?.token)}
        >
          {user?.bookmark?.includes(recp?._id) ? (
            <FaBookmark size={17} className="text-secondary" />
          ) : (
            <CiBookmark size={17} />
          )}
          Save
        </p>
        <p
          className="flex gap-2 text-black font-medium items-center text-base cursor-pointer"
          onClick={() => {
            setShowComments(showComments === recp._id ? null : recp._id);
            // getComments(post?._id);
          }}
        >
          <BiComment size={20} />
          {recp?.comments?.length} Comments
        </p>
      </div>
    </div>
  );
};

export default PostCard;
