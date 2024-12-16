import React, { useState, useEffect } from "react";
import { comments } from "../assets/data";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchRecp, getComment, getReplies, likeRecpComment } from "../utils";
import { recps } from "../assets/data";
import { apiRequest } from "../utils";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline, MdOutlineRefresh } from "react-icons/md";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { NoProfile } from "../assets/images";
import { Link } from "react-router-dom";
import moment from "moment";
import { useForm } from "react-hook-form";
import {
  Sidebar,
  TopNavBar,
  CategorySlider,
  PostCard,
  Loading,
  TextInput,
  Spinner,
  PopUp,
  MobNav,
} from "../components";

// import { Loading, TextInput, TopNavBar, MobNav, Sidebar } from "../components";

// const CommentCard = ({comment, user}) => {
//   const [showReply, setShowReply] = useState(0);

//   return (
//     <div className="w-full py-2" key={comment?._id}>
//       <div className="flex gap-3 items-center mb-1">
//         <Link to={"/profile/" + comment?.userId?._id}>
//           <img
//             src={comment?.userId?.profileUrl ?? NoProfile}
//             alt={comment?.userId?.firstName}
//             className="w-10 h-10 rounded-full object-cover"
//           />
//         </Link>
//         <div>
//           <Link to={"/profile/" + comment?.userId?._id}>
//             <p className="font-medium text-base ">
//               {comment?.userId?.firstName} {comment?.userId?.lastName}
//             </p>
//           </Link>
//           <span className=" text-sm">
//             {moment(comment?.createdAt ?? "2023-05-25").fromNow()}
//           </span>
//         </div>
//       </div>

//       <div className="ml-12">
//         <p className="">{comment?.comment}</p>

//         <div className="mt-2 flex gap-6">
//           <p
//             className="flex gap-2 items-center text-base  cursor-pointer"
//             onClick={() => {
//               // handleLike(
//               //   "/posts/like-comment/" + comment?._id
//               // );
//             }}
//           >
//             {comment?.likes?.includes(user?._id) ? (
//               <BiSolidLike size={20} color="blue" />
//             ) : (
//               <BiLike size={20} />
//             )}
//             {comment?.likes?.length} Likes
//           </p>
//           <span
//             className="text-blue cursor-pointer"

//           >
//             Reply
//           </span>
//         </div>

//         {/* {replyComments === comment?._id && (
//   <CommentForm
//   user={user}
//   id={comment?._id}
//   replyAt={comment?.from}
//   getComments={() => getComments(post?._id)}
//   />
//   )} */}
//       </div>

//       {/* REPLIES */}

//       <div className="py-2 px-8 mt-5">

//         {comment?.replies?.length > 0 && (
//           <p
//             className="text-base text-secondary cursor-pointer"
//             onClick={() =>
//               setShowReply(
//                 showReply === comment?.replies?._id ? 0 : comment?.replies?._id
//               )
//             }
//           >
//             Show Replies ({comment?.replies?.length})
//           </p>
//         )}

//         {/* {showReply === comment?.replies?._id &&
//   comment?.replies?.map((reply) => (
//   <ReplyCard
//   reply={reply}
//   user={user}
//   key={reply?._id}
//   handleLike={() =>
//     handleLike(
//       "/posts/like-comment/" +
//         comment?._id +
//         "/" +
//         reply?._id
//     )
//   }
//   />
//   ))} */}
//       </div>
//     </div>
//   );
// };

const Replies = () => {
  const [showAll, setShowAll] = useState(0);
  const { commentId } = useParams();
  const [comment, setComment] = useState({});
  const [replies, setReplies] = useState([]);
  const { username } = useParams();
  const { user } = useSelector((state) => state.user);
  const [errMsg, setErrMsg] = useState("");
  const [showReply, setShowReply] = useState(0);
  // const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [recp, setRecp] = useState({});
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [replyTo, setReplyTo] = useState("");
  const [commentText, setCommentText] = useState("")
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const replyName = location.state;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  
  
  const onSubmit = async (data) => {
   
    setErrMsg("");
    try {
      const URL = `/post/addreply/comment/${commentId} `;
      const cleanedComment = commentText.replace(`${replyTo} `, "").trim() //Remove the replyTo from our comment
      if (!cleanedComment.trim()) return;
     
      const newData = {
        comment: cleanedComment,
        replyuserName:replyTo,
        from: user?.firstName + " " + user.lastName,
      };
      const res = await apiRequest({
        url: URL,
        data: newData,
        token: user?.token,
        method: "POST",
      });
      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        reset({
          comment: "",
        });
        setErrMsg("");
        await fetchReplies();
        setCommentText("")
      }
     
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const goBack = () => {
    navigate(-1); // This will navigate to the previous URL
  };
  
  
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };
  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
    // Increment to trigger useEffect
  };
  const fetchComment = async () => {
    try {
     
      const res = await getComment({  token: user?.token,commentId: commentId,
      });
      console.log("rrrrrrrrresss", res);
      setComment(res.data);
      
    } catch (error) {
      console.log(error);
    }
  };
  const fetchReplies = async () => {
    
    try {
      const res = await getReplies({
        token: user?.token,
        commentId: commentId,
      });
      setReplies(res.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  const handleLike = async (uri) => {
    await likeRecpComment({ url: uri, token: user?.token });
    fetchComment()
   }
  const handleLikeReply = async (uri) => {
    await likeRecpComment({ url: uri, token: user?.token });
    fetchReplies()
   }

   useEffect(() => {
    if (replyName) {
      setCommentText(`${replyName} `);
    }
  }, [replyName]);

// Handle reply button click
const handleReply = ({firstName, lastName}) => {
  setReplyTo(`${firstName} ${lastName}`); // Add the username with '@'
  setCommentText(`${replyTo} `)
};

  useEffect(() => {
    setLoading(true);
    console.log("loading", loading);
    fetchComment()
    fetchReplies()
    console.log("setRecp2", recp);
  }, [refreshKey]);
  // if (error) {
  //   return (
  //     <div className="w-full pr-0 pl:0 lg:pr-10 lg:pl-2 pb-10 lg:pb-0  2xl:px-40 bg-darj lg:rounded-lg h-screen overflow-hidden">
  //       <div className="flex text-gray font-bold text-xl w-full h-full items-center justify-center">
  //         <div className="flex flex-col items-center space-y-4">
  //           {" "}
  //           {/* Added items-center and space-y-4 for spacing */}
  //           <p>{error}</p> {/* Error text */}
  //           {/* Button will no longer be affected by flex of the parent */}
  //           <button
  //             onClick={() => handleRefresh}
  //             className="bg-secondary text-black px-4 py-2 rounded-2xl flex items-center justify-center space-x-2"
  //           >
  //             {/* Icon and text side by side */}
  //             <MdOutlineRefresh size={30} className="font-" />
  //             <span>Retry</span>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  

  // console.log("display", recp.image.slice(1));

  // Images
  console.log("recpimageurl", recp.image);

  // {loading ? (<Loading/>) : recps?.length > 0 ? (
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-20">
          <Spinner />
        </div>
      ) : (
        <div className="w-full pr-0 pl:0 relative lg:pr-10 lg:pl-2 lg:pb-20 2xl:px-40 bg-darj lg:rounded-lg h-screen">
          {/* NavBar */}
          <TopNavBar user={user} togglePopup={togglePopup} />

          <PopUp isVisible={isPopupVisible} closePopup={closePopup} />
          <div className="w-full flex lg:gap-4 md:lg:pt-4 pb-10 h-full">
            <div className="hidden lg:w-1/5 h-full md:flex flex-col overflow-hidden">
              <Sidebar user={user} />
            </div>

            {/* CENTER */}
            <div className="flex-1 h-full lg:md:px-4 flex flex-col bg-white overflow-y-auto rounded-lg relative">
              <div className=" pb-3 flex flex-col space-y-4">
                <div className="overflow-y-auto w-full pr-0 pl:0">
                  <div className="md:hidden lg:hidden">
                    <MobNav />
                  </div>
                  <div className="w-full flex lg:gap-4 md:lg:pt-4 lg:pb-10 h-full bg-white">
                    <div className="px-4 pt-4 md:pb-2 pb-5 lg:pb-2 mb-2 bg-white  flex-1">
                      <div className="block mb-2">
                        <button onClick={goBack}>
                          <IoMdArrowBack size={21} />
                        </button>
                      </div>

                      {/* Comments */}
                     <div className="flex-1 overflow-y-auto">

  <div className="w-full ">
    {/* Main Comment */}
    <div className="mb-4">
  {/* User Info */}
  <div className="flex gap-3 items-center mb-2">
    {/* User Image */}
    <Link
      to={`/${comment?.userId?.userName}`}
      state={comment?.userId?._id}
    >
      <img
        src={comment?.userId?.profileUrl ?? NoProfile}
        alt={comment?.userId?.firstName}
        className="w-8 h-8 rounded-full object-cover"
      />
    </Link>

  
    <div className="shadow-md hover:shadow-lg hover:shadow-gray-300 transition-shadow py-3 rounded-lg px-4">
      <Link
        to={`/${comment?.userId?.userName}`}
        state={comment?.userId?._id}
      >
        <p className="font-medium text-base text-gray-800">
          {comment?.userId?.firstName} {comment?.userId?.lastName}
        </p>
      </Link>
      <div className="">
    <p className="text-gray-700">{comment?.comment}</p>

    {/* Meta and Actions */}
    <div className="mt-2 flex gap-6 items-center text-sm">
      <span className="text-sm text-gray-500">
        {moment(comment?.createdAt).fromNow()}
      </span>
      <button
        className="flex gap-2 items-center text-gray-600 hover:text-blue-600"
        onClick={() => {
          handleLike(`/post/like-comment/${comment?._id}`)
        }}
      >
        {comment?.likes?.includes(user?._id) ? (
          <FaHeart size={17} color="red" />
        ) : (
          <CiHeart size={17} />
        )}
        <span>{comment?.likes?.length} Likes</span>
      </button>
      <button className="text-secondary font-medium hover:underline cursor-pointer"
      onClick={() => handleReply({ 
                  firstName: comment.userId?.firstName, 
                  lastName: comment.userId?.lastName 
                })}>
        Reply
      </button>
    </div>
  </div>
    </div>
  </div>

  {/* Comment */}
 
</div>




    {/* Replies */}
   <div className="">
  {replies?.map((reply) => (
    <div key={reply?.rid} className="ml-6">
      <div className="flex gap-3 items-center">
        <Link
          to={`/${reply?.userId?.userName}`}
          state={reply?.userId?._id}
        >
          <img
            src={reply?.userId?.profileUrl ?? NoProfile}
            alt={reply?.userId?.firstName}
            className="w-8 h-8 rounded-full object-cover"
          />
        </Link>
        {/* Wrapping the user's name and associated text */}
        <div
          className="shadow-md hover:shadow-lg hover:shadow-gray-300 transition-shadow py-3 rounded-lg px-4"
        >
          <Link
            to={`/${reply?.userId?.userName}`}
            state={reply?.userId?._id}
          >
            <p className="font-medium text-base">
              {reply?.userId?.firstName} {reply?.userId?.lastName}
            </p>
          </Link>
          <div className="mt-2 flex flex-row">
            <p className="text-secondary">@{reply?.replyAt}</p> {/* Display replyTo */}
            <p className="text-gray-700 ml-2">{reply?.comment}</p>
          </div>
        </div>
      </div>
      {/* Additional reply actions */}
      <div className="ml-12 mt-2 flex gap-6 items-center text-sm">
        <span className="text-sm text-gray">
          {moment(reply?.created_At).fromNow()}
        </span>
        <button
          className="flex gap-2 items-center text-gray-600 hover:text-blue-600"
          onClick={() => {
            handleLikeReply(`/post/like-comment/${comment?._id}/${reply?._id}`);
          }}
        >
          {reply?.likes?.includes(user?._id) ? (
            <FaHeart size={17} color="red" />
          ) : (
            <CiHeart size={17} />
          )}
          <span>{reply?.likes?.length} Likes</span>
        </button>
        <button
          className="text-secondary font-medium hover:underline cursor-pointer"
          onClick={() =>
            handleReply({
              firstName: reply.userId?.firstName,
              lastName: reply.userId?.lastName,
            })
          }
        >
          Reply
        </button>
      </div>
    </div>
  ))}
</div>

     {/* Form at the Bottom */}
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4"
                      >
                        <div className="w-full flex items-center gap-2">
                        
                          <input
                            
                            value={commentText} // Set the replyTo username in the input
                         onChange={(e) => setCommentText(e.target.value)} // Allow editing if needed
                          className="w-full rounded-full bg-gray-200 py-2 px-4 text-lg"
                            placeholder="Post Your Reply"
                          />
                          <button
                            title="Submit"
                            type="submit"
                            className=""
                            

                          >
                           <IoSend  size={20} className="text-secondary"/>
                          </button>
                        </div>
                      </form>
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
                <div className="flex flex-col text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
                  <span className="text-base text-left font-bold text-black">
                    Top Trending
                  </span>
                  <span className="text-2xl font-extrabold text-secondary">
                    #Popular Search
                  </span>
                </div>
                <div className="w-full flex justify-between ml-5 flex-col gap-2">
                  <div className="flex items-center mb-1 cursor-pointer row gap-4">
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
        </div>
      )}
    </div>
  );
};

export default Replies;
