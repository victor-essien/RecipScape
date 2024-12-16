import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRecp, getComments, likeRecpComment, likeRecp } from "../utils";
import { apiRequest } from "../utils";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BiComment } from "react-icons/bi";
import { MdOutlineDeleteOutline, MdOutlineRefresh } from "react-icons/md";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { CiBookmark, CiHeart } from "react-icons/ci";
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
  ErrorComponent,
  MobNav,
  RenderImages
} from "../components";

const CommentCard = ({ comment, user, recp, likeComment }) => {
  const [showReply, setShowReply] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const replyName = `${comment?.userId?.firstName} ${comment?.userId?.lastName}`;

  const handleLike = async (uri) => {
    try{
      setIsLiking(true)
      await likeComment(uri);
    } finally{
      setIsLiking(false)
    }
    
  };

  return (
    <div className="w-full py-2" key={comment?._id}>
      <div className="flex gap-3 items-center mb-1">
        <Link to={`/${comment?.userId?.userName}`} state={comment?.userId?._id}>
          <img
            src={comment?.userId?.profileUrl ?? NoProfile}
            alt={comment?.userId?.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>
        <div>
          <Link
            to={`/${comment?.userId?.userName}`}
            state={comment?.userId?._id}
          >
            <p className="font-medium text-base ">
              {comment?.userId?.firstName} {comment?.userId?.lastName}
            </p>
          </Link>
          <span className=" text-sm">
            {moment(comment?.createdAt).fromNow()}
          </span>
        </div>
      </div>

      <div className="ml-12">
        <p className="">{comment?.comment}</p>

        <div className="mt-2 flex gap-6">
          <p
            className="flex gap-2 items-center text-base  cursor-pointer"
            onClick={() => {
              handleLike(`/post/like-comment/${comment?._id}`);
            }}
          >
            {comment?.likes?.includes(user?._id) || isLiking ? (
              <FaHeart size={17} color={isLiking ?  "lightcoral" : "red"} />
            ) : (
              <CiHeart size={17} />
            )}
            {comment?.likes?.length} Likes
          </p>
          <Link to={`/recp/${recp?._id}/reply/${comment?._id}`} state={replyName}>
          <span className="text-blue cursor-pointer">Reply</span>
          </Link>
        </div>

      </div>

      {/* REPLIES */}

      <div className="py-1 px-8 mt-5">
        {comment?.replies?.length > 0 && (
          <Link to={`/recp/${recp?._id}/reply/${comment?._id}`}>
            <p
              className="text-base text-secondary cursor-pointer"
              onClick={() =>
                setShowReply(
                  showReply === comment?.replies?._id
                    ? 0
                    : comment?.replies?._id
                )
              }
            >
              Show Replies ({comment?.replies?.length})
            </p>
          </Link>
        )}

       
  
      </div>
    </div>
  );
};

const Recp = () => {
  const [showAll, setShowAll] = useState(0);
  const { id } = useParams();
  const [comments, setComments] = useState({});
  const { username } = useParams();
  const { user } = useSelector((state) => state.user);
  const [errMsg, setErrMsg] = useState("");
  const [isLiking, setIsLiking] = useState(false);
  const [showReply, setShowReply] = useState(0);
  // const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [recp, setRecp] = useState({});
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
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
      const URL = `/post/comment/${user?.userName}/${id} `;

      const newData = {
        comment: data?.comment,
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
        await fetchComments();
      }
    
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const goBack = () => {
    navigate(-1); // This will navigate to the previous URL
  };
  
  const handleLike = async (uri) => {
    try {
      setIsLiking(true)
      await likeRecp({ url: uri, token: user?.token });
    } finally {
      setIsLiking(false)
    }
    await likeRecp({ url: uri, token: user?.token });

    
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

  const fetchComments = async () => {
    try {
      const res = await getComments({
        token: user?.token,
        username: user?.userName,
        postId: id,
      });

      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLikeComment = async (uri) => {
    await likeRecpComment({ url: uri, token: user?.token });

    await fetchComments();
  };
  const fetchRecip = async () => {
    try {
     
      const res = await fetchRecp(user?.token, id, username);
      
    
      if (res?.success === true) {
        setRecp(res.data);
       
        setLoading(false);
        setError(null)
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
  
  useEffect(() => {
    setLoading(true);

    fetchRecip();
    fetchComments();
   
  }, [refreshKey]);


  if (error) {
    return <ErrorComponent error={error} handleRefresh={handleRefresh} />;
  }

 
  const displayName =
    recp?.userId?.userName || recp?.userId?.email.split("@")[0];

  

  // Images
  

  //The Functions for rendering our Images
 

  if(error ){
    return(
      <ErrorComponent error={error} handleRefresh={handleRefresh}/>

    )
    
  }
  return (
    <div>
      {loading || (recp && Object.keys(recp).length === 0) ? (
        <div className="flex items-center justify-center h-20">
          <Spinner />
        </div>
      ) : (
        <div className="w-full pr-0 pl:0 lg:pr-10 lg:pl-2 pb-6  lg:pb-0  2xl:px-40 bg-darj lg:rounded-lg h-screen overflow-hidden">
          {/* NavBar */}
          

          <PopUp isVisible={isPopupVisible} closePopup={closePopup} />
          <div className="w-full flex  lg:gap-4  md:lg:pt-4  h-full">
            <div className="hidden  lg:w-1/5 h-full md:flex flex-col   overflow-hidden">
              <Sidebar user={user} />
            </div>

            {/* CENTER */}
            <div className="flex-1 h-full lg:md:px-4 flex flex-col bg-white overflow-y-auto rounded-lg">
              {/* Horizontal Slider */}

              <div className="p-4 pb-3 flex flex-col space-y-4">
                <div className="h-screen overflow-y-auto w-full pr-0 pl:0">
                  <div className="w-full flex  lg:gap-4  md:lg:pt-4 pb-10 h-full bg-white">
                    <div className="px-2 pt-4 md:pb-2 pb-5  lg:pb-2 mb-2 bg-white shadow rounded-lg flex-1">
                      <div className="block mb-2 ">
                        <button onClick={goBack}>
                          <IoMdArrowBack size={21} className="" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-4 mb-4">
                        <Link to={`/${recp?.userId?.userName}`} state={recp?.userId?._id}>
                          <img
                            src={recp?.userId?.profileUrl ?? NoProfile}
                            alt={recp?.userId?.firstName}
                            // {user?.email}
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        </Link>
                        <Link to={`/${recp?.userId?.userName}` }state={recp?.userId?._id}>
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
                          className="post-content prose prose-lg"
                          dangerouslySetInnerHTML={{ __html: recp?.content }}
                        />
                      </div>

                      {/* Images */}
                      <div className="mt-4">
                        <RenderImages recp={recp}/>
                      </div>

                      {/* Reaction Action */}
                      <div
                        className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-2
  text-base border-t border-[#66666645]"
                      >
                        <p
                          className="flex gap-2 items-center text-black font-medium text-base cursor-pointer"
                          onClick={() => handleLike("/post/like/" + recp?._id)}
                         
                        >
                         {recp?.likes?.includes(user?._id) || isLiking ? (
                       <FaHeart size={17} color={isLiking ? "lightcoral" : "red"} />
                         ) : (
                            <CiHeart size={17} />
                          )}
                          {recp?.likes?.length}
                        </p>
                        <p
                          className="flex gap-2 items-center text-black font-medium text-base cursor-pointer"
                          onClick={() => {}}
                          // handleLike("/posts/like/" + post?._id)
                        >
                          {user?.saved?.includes(recp?._id) ? (
                            <FaBookmark size={17} color="" />
                          ) : (
                            <CiBookmark size={17} />
                          )}
                          Save
                        </p>

                        <p
                          className="flex gap-2 text-black font-medium items-center text-base cursor-pointer"
                          onClick={() => {
                            setShowComments(
                              showComments === recp._id ? null : recp._id
                            );
                            // getComments(post?._id);
                          }}
                        >
                          <BiComment size={20} />
                          {recp?.comments?.length}
                        </p>
                      </div>
                      {/* Comments */}
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full border-b border-[#66666645]"
                      >
                        <div className="w-full flex items-center gap-2 py-4">
                          <img
                            src={user?.profileUrl ?? NoProfile}
                            alt="User Image"
                            className="w-10 h-10 rounded-full  object-cover"
                          />

                          <TextInput
                            name="comment"
                            styles="w-full rounded-full lg:bg-darj py-4 text-lg "
                            placeholder="Post Your Reply"
                            // placeholder={"Comment this post"}
                            register={register("comment", {
                              required: "Comment can not be empty",
                            })}
                            error={errors.comment ? errors.comment.message : ""}
                          />
                          <div className="flex items-end justify-end pb-2">
                            {/* {loading ? (
  <Loading />
  ) : ( */}
                            <button
                              title="Submit"
                              type="submit"
                              className="bg-secondary text-dark py-3 px-4 rounded-2xl font-bold text-base"
                            >
                              Post
                            </button>
                            {/* )} */}
                          </div>
                        </div>
                      </form>
                      {loading ? (
                        <div className="flex items-center justify-center h-20">
                          <Spinner />
                        </div>
                      ) : comments?.length > 0 ? (
                        comments?.map((comment) => (
                          <CommentCard
                            key={comment?._id}
                            recp={recp}
                            comment={comment}
                            user={user}
                            likeComment={ handleLikeComment }
                          />
                        ))
                      ) : (
                        <span className="flex text-sm py-4 text-dark text-center">
                          No Comments, be first to comment
                        </span>
                      )}
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
          <MobNav />
        </div>
      )}
    </div>
  );
};

export default Recp;
