import Comments from "../models/commentsModel.js";
import Posts from "../models/postModel.js";
import Users from "../models/userModel.js";
import mongoose from "mongoose";

export const createRecp = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { content, keywords, image } = req.body;

    const post = await Posts.create({
      userId,

      keywords,
      image,
      content,
    });

    res.status(200).json({
      success: true,
      message: "Successfull",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getRecps = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { search } = req.body;

    const currentUser = await Users.findById(userId);
    const followers = currentUser?.followers || [];
    const following = currentUser?.following || [];


    const allUsers = await Users.find({ _id: { $ne: userId } });   // We are getting all the other users so that we will be able to fetch other user's post
    const nonPriorityUsers = allUsers.filter((user) => {
      return !followers.includes(user._id.toString()) && 
             !following.includes(user._id.toString());
    });

    // Now combine them to get the final priority order (followers, following, current user, then the others)
    const priorityUsers = [
      ...followers,
      ...following,
      userId, // Include the current user
      ...nonPriorityUsers.map(user => user._id.toString()) // Add non-followers/non-following users
    ];
   
    const priorityPostsQuery = {
      userId: { $in: priorityUsers },
    };
    console.log("Priority Posts Query:", priorityPostsQuery);
    const recps = await Posts.find(priorityPostsQuery)
      .populate({
        path: "userId",
        select: "firstName lastName location, userName profileUrl",
      })
      .sort({ _id: -1 });

    if (recps.length === 0) {
      // Perform this action if recps is empty
      const recpsd = await Posts.find()
        .populate({
          path: "userId",
          select: "firstName lastName location, userName profileUrl",
        })
        .sort({ _id: -1 });
  
      res.status(200).json({
        success: true,
        message: "successfully",
        data: recpsd,
      });
    } else {
    
      res.status(200).json({
        success: true,
        message: "successfully",
        data: recps,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const search = async (req, res, next) => {
  const { search } = req.query;

  try {
    const searchRegex = new RegExp(search, "i"); //for case-insentive

    const postSearchQuery = {
      description: { $regex: searchRegex },
    };
    const userSearchQuery = {
      $or: [
        { firstName: { $regex: searchRegex } },
        { lastName: { $regex: searchRegex } },
        { userName: { $regex: searchRegex } },
      ],
    };
    const keywordSearchQuery = {
      keywords: { $regex: searchRegex },
    };

    const [matchingPosts, matchingUsers, postWithKeywords] = await Promise.all([
      Posts.find(postSearchQuery)
        .populate({
          path: "userId",
          select: "firstName lastName location profileUrl",
        })
        .sort({ _id: -1 }),
      Users.find(userSearchQuery).select("-password"), // Exclude sensitive fields
      Posts.find(keywordSearchQuery).populate({
        path: "userId",
        select: "firstName lastName location userName profileUrl",
      }),
    ]);
    const keywordResults = Array.from(
      new Set(postWithKeywords.flatMap((post) => post.keywords))
    );
    const results = {
      posts: [...matchingPosts],
      users: matchingUsers,
      postWithKeywords: postWithKeywords,
      keyword: keywordResults,
    };

    res.status(200).json({
      success: true,
      message: "Search results fetched successfully.",
      data: results,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getRecp = async (req, res, next) => {
  const { id } = req.params;
  const { username } = req.params;
 

  try {
    const post = await Posts.findById(id).populate({
      path: "userId",
      select: "firstName lastName location profileUrl userName ",
    });
    res.status(200).json({
      success: true,
      message: "successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getUserRecp = async (req, res, next) => {
  try {
    // const { userName } = req.params
    const { id } = req.params;

    const post = await Posts.find({ userId: id })
      .populate({
        path: "userId",
        select: "firstName lastName userName location profileUrl ",
      })
      .sort({ _id: -1 });
    console.log("lll", post);
    res.status(201).json({
      success: true,
      message: "successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getComments = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const postComments = await Comments.find({ postId })
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl ",
      })
      .populate({
        path: "replies.userId",
        select: "firstName lastName location profileUrl ",
      })
      .sort({ _id: -1 });

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: postComments,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getComment = async (req, res, next) => {
  const { cId } = req.params;
  try {
    const comment = await Comments.findById(cId).populate({
      path: "userId",
      select: "firstName lastName userName location profileUrl ",
    });

    res.status(200).json({
      sucess: true,
      message: "successfujlly",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getReplies = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    console.log(commentId);
    const comment = await Comments.findById(commentId)
      .populate({
        path: "replies.userId",
        select: "firstName lastName userName profileUrl",
      })
      .sort({ _id: -1 });

    if (!comment) {
      throw new Error("Comment not found");
    }
    res.status(200).json({
      sucess: true,
      message: "Replies fetched successfully",
      data: comment.replies,
    });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: error.message || "Error fetching replies" });
  }
};

export const postReply = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { comment, replyuserName, from } = req.body;
    const { commentId } = req.params;

    const commentInfo = await Comments.findById(commentId);

    commentInfo.replies.push({
      comment,
      replyAt: replyuserName,
      from,
      userId,
      created_At: Date.now(),
    });

    commentInfo.save();

    res.status(200).json({
      sucess: true,
      message: "Replieffs posted successfully",
      data: commentInfo,
    });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: error.message || "Error fetching replies" });
  }
};

export const likeRecp = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.params;

    const post = await Posts.findById(id);
    const index = post.likes.findIndex((pid) => pid === String(userId));

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes = post.likes.filter((pid) => pid !== String(userId));
    }

    const newPost = await Posts.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ mesaage: error.mesaage });
  }
};

export const likeRecpComments = async (req, res, next) => {
  const { userId } = req.body.user;
  const { commentId, rid } = req.params;
  try {
    if (rid === undefined || rid === null || rid === "false") {
      const comment = await Comments.findById(commentId);
      const index = comment.likes.findIndex((el) => el === String(userId));

      if (index === -1) {
        comment.likes.push(userId);
      } else {
        comment.likes = comment.likes.filter((i) => i !== String(userId));
      }

      const updated = await Comments.findByIdAndUpdate(commentId, comment, {
        new: true,
      });

      res.status(201).json(updated);
    } else {
      const replyComments = await Comments.findOne(
        { _id: commentId },
        {
          replies: {
            $elemMatch: {
              _id: rid,
            },
          },
        }
      );

      const index = replyComments?.replies[0]?.likes.findIndex(
        (i) => i === String(userId)
      );

      if (index === -1) {
        replyComments.replies[0].likes.push(userId);
      } else {
        replyComments.replies[0].likes = replyComments.replies[0]?.likes.filter(
          (i) => i !== String(userId)
        );
      }
      const query = { _id: commentId, "replies._id": rid };
      const updated = {
        $set: {
          "replies.$.likes": replyComments.replies[0].likes,
        },
      };

      const result = await Comments.updateOne(query, updated, { new: true });

      res.status(201).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const createBookmark = async (req, res, next) => {
 
  try {
    const { userId } = req.body.user;
    const { pid } = req.params;
    console.log("CALLEDDDDD");
    const user = await Users.findById(userId);
    const index = user.bookmark.findIndex((pidd) => pidd === String(userId));

    const isBookmarked = user.bookmark.includes(pid);
    console.log("isBookmarked?", isBookmarked);
    if (isBookmarked) {
      // If the post is already bookmarked, remove it (unbookmark)
      user.bookmark = user.bookmark.filter((postId) => postId !== pid);
      console.log("Already bookmarked and removed");
    } else {
      // If the post is not bookmarked, add it
      user.bookmark.push(pid);
      console.log("bookmarked");
    }

    // Save the updated user document
    await user.save();

    // Respond with the updated bookmark list
    return res.status(200).json({
      message: isBookmarked ? "Post unbookmarked" : "Post bookmarked",
      bookmarks: user.bookmark,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const viewBookmarks = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const user = await Users.findById(userId);

    const bookmarkId = user.bookmark;
    if (bookmarkId.length === 0) {
      return res
        .status(200)
        .json({ message: "No bookmarks found", bookmarks: [] });
    }

    const bookmarkedPosts = await Posts.find({
      _id: { $in: bookmarkId },
    })
      .populate({
        path: "userId",
        select: "firstName lastName userName location profileUrl ",
      })
      .sort({ _id: -1 });
    return res.status(200).json({
      message: "Bookmarked posts retrieved successfully",
      bookmarks: bookmarkedPosts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const commentPost = async (req, res, next) => {
  try {
    const { comment, from } = req.body;
    const { userId } = req.body.user;
    const { id } = req.params;

    //   if (comment === null) {
    //     return res.status(404).json({ message: "Comment is required." });
    //   }

    const newComment = new Comments({ comment, from, userId, postId: id });

    await newComment.save();

    //updating the post with the comments id
    const post = await Posts.findById(id);

    post.comments.push(newComment._id);

    const updatedPost = await Posts.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const viewFollowing = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const user = await Users.findById(userId);

    const following = user.following;
    if (following.length === 0) {
      return res
        .status(200)
        .json({ message: "No bookmarks found", following: [] });
    }

    const userFollowing = await Posts.find({
      _id: { $in: following }.populate({
        path: "userId",
        select: "firstName lastName location profileUrl ",
      }),
    });
    return res.status(200).json({
      message: "Retrieved successfully",
      data: userFollowing,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const viewFollower = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const user = await Users.findById(userId);

    const follower = user.followers;
    if (follower.length === 0) {
      return res
        .status(200)
        .json({ message: "No bookmarks found", following: [] });
    }

    const userFollowers = await Posts.find({
      _id: { $in: follower }.populate({
        path: "userId",
        select: "firstName lastName location profileUrl ",
      }),
    });
    return res.status(200).json({
      message: "Retrieved successfully",
      data: userFollowers,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
